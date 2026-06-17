import React, { useState, useEffect, useRef } from "react";
import { removeBackground } from "@imgly/background-removal";
import { AnimatePresence, motion } from "motion/react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingUpload from "./components/LandingUpload";
import ImageViewer from "./components/ImageViewer";
import EditorPanel from "./components/EditorPanel";
import FaqSection from "./components/FaqSection";
import ShowcaseSection from "./components/ShowcaseSection";
import ReviewPopup from "./components/ReviewPopup";
import { downloadImage } from "./utils";
import type { ViewMode, BgType } from "./constants";

export default function App() {
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  const [originalBlob, setOriginalBlob] = useState<Blob | null>(null);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [resultImageUrl, setResultImageUrl] = useState<string | null>(null);

  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState("");
  const [error, setError] = useState<string | null>(null);

  const [viewMode, setViewMode] = useState<ViewMode>("compare");
  const [bgType, setBgType] = useState<BgType>("transparent");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [gradientPreset, setGradientPreset] = useState("sunrise");
  const [sliderPosition, setSliderPosition] = useState(50);

  const [isDragOver, setIsDragOver] = useState(false);
  const [showReviewPopup, setShowReviewPopup] = useState(false);
  const hasShownReview = useRef(false);

  useEffect(() => {
    return () => {
      if (resultImageUrl) URL.revokeObjectURL(resultImageUrl);
    };
  }, [resultImageUrl]);

  const processBlob = async (blob: Blob) => {
    const processed = await removeBackground(blob, {
      progress: (item, current, total) => {
        setStage(item || "processing");
        setProgress(Math.round((current / total) * 100));
      },
    });
    setResultBlob(processed);
    setResultImageUrl(URL.createObjectURL(processed));

    if (!hasShownReview.current) {
      setTimeout(() => setShowReviewPopup(true), 1500);
      hasShownReview.current = true;
    }
  };

  const loadAndProcessFile = async (file: File | Blob) => {
    setIsProcessing(true);
    setProgress(0);
    setError(null);
    setResultImageUrl(null);
    setResultBlob(null);

    if (originalImageUrl && !originalImageUrl.startsWith("https://")) {
      URL.revokeObjectURL(originalImageUrl);
    }

    setOriginalImageUrl(URL.createObjectURL(file));
    setOriginalBlob(file);

    try {
      setStage("fetch:model");
      await processBlob(file);
    } catch (err: any) {
      console.error("Background removal failed:", err);
      setError(err.message || "Failed to process. Try a smaller file (under 8MB).");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) loadAndProcessFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => setIsDragOver(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      loadAndProcessFile(file);
    } else {
      setError("Please drop a valid image file (PNG, JPG, or WebP).");
    }
  };

  const handleChooseSample = async (url: string) => {
    setIsProcessing(true);
    setProgress(5);
    setStage("fetch:sample");
    setError(null);
    setResultImageUrl(null);
    setResultBlob(null);
    setOriginalImageUrl(url);

    try {
      const resp = await fetch(url);
      const blob = await resp.blob();
      setOriginalBlob(blob);
      await processBlob(blob);
    } catch (err: any) {
      console.error(err);
      setError("Failed to process sample. Try uploading your own image.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (resultImageUrl) downloadImage(resultImageUrl, bgType, bgColor, gradientPreset);
  };

  const handleReset = () => {
    setOriginalImageUrl(null);
    setOriginalBlob(null);
    setResultBlob(null);
    setResultImageUrl(null);
    setError(null);
    setProgress(0);
    setBgType("transparent");
  };

  const handleReviewSubmit = (rating: number, feedback: string) => {
    console.log("Review submitted:", { rating, feedback });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-surface-950 text-surface-900 dark:text-surface-100 font-sans flex flex-col antialiased relative transition-colors duration-300">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-10 md:py-16 flex flex-col justify-center relative z-10">
        <AnimatePresence mode="wait">
          {!originalImageUrl ? (
            <LandingUpload
              isDragOver={isDragOver}
              error={error}
              onFileChange={handleFileChange}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onChooseSample={handleChooseSample}
            />
          ) : (
            <motion.div
              key="editor"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="grid lg:grid-cols-12 gap-5 sm:gap-8 items-stretch"
            >
              <ImageViewer
                originalImageUrl={originalImageUrl}
                resultImageUrl={resultImageUrl}
                isProcessing={isProcessing}
                progress={progress}
                stage={stage}
                viewMode={viewMode}
                setViewMode={setViewMode}
                bgType={bgType}
                bgColor={bgColor}
                gradientPreset={gradientPreset}
                sliderPosition={sliderPosition}
                setSliderPosition={setSliderPosition}
              />

              <EditorPanel
                resultImageUrl={resultImageUrl}
                bgType={bgType}
                setBgType={setBgType}
                bgColor={bgColor}
                setBgColor={setBgColor}
                gradientPreset={gradientPreset}
                setGradientPreset={setGradientPreset}
                onDownload={handleDownload}
                onReset={handleReset}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {!originalImageUrl && <ShowcaseSection />}

      <FaqSection />
      <Footer />

      <ReviewPopup
        isOpen={showReviewPopup}
        onClose={() => setShowReviewPopup(false)}
        onSubmit={handleReviewSubmit}
      />
    </div>
  );
}
