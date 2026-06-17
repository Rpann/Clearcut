import React, { useRef } from "react";
import { Info } from "lucide-react";
import { motion } from "motion/react";
import { PRESET_GRADIENTS } from "../constants";
import type { ViewMode, BgType } from "../constants";
import { getFriendlyStageLabel } from "../utils";

interface ImageViewerProps {
  originalImageUrl: string;
  resultImageUrl: string | null;
  isProcessing: boolean;
  progress: number;
  stage: string;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  bgType: BgType;
  bgColor: string;
  gradientPreset: string;
  sliderPosition: number;
  setSliderPosition: (pos: number) => void;
}

export default function ImageViewer({
  originalImageUrl,
  resultImageUrl,
  isProcessing,
  progress,
  stage,
  viewMode,
  setViewMode,
  bgType,
  bgColor,
  gradientPreset,
  sliderPosition,
  setSliderPosition,
}: ImageViewerProps) {
  const sliderContainerRef = useRef<HTMLDivElement>(null);
  const isDraggingSlider = useRef(false);

  const handleSliderMove = (clientX: number) => {
    if (!sliderContainerRef.current) return;
    const rect = sliderContainerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    setSliderPosition(Math.max(0, Math.min(100, (x / rect.width) * 100)));
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) handleSliderMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDraggingSlider.current || e.buttons === 1) handleSliderMove(e.clientX);
  };

  const bgStyle = (type: BgType): React.CSSProperties => ({
    background: type === "transparent" ? undefined : type === "color" ? bgColor : undefined,
    backgroundImage:
      type === "transparent"
        ? "radial-gradient(#D4D4D4 1.2px, transparent 1.2px)"
        : type === "gradient"
        ? PRESET_GRADIENTS.find((g) => g.label === gradientPreset)?.value
        : undefined,
    backgroundSize: type === "transparent" ? "16px 16px" : undefined,
  });

  return (
    <div className="lg:col-span-7 flex flex-col space-y-5 order-1 lg:order-none">
      <div className="bg-white dark:bg-surface-900 rounded-3xl border border-surface-200 dark:border-surface-700 shadow-sm flex-1 flex flex-col overflow-hidden transition-colors duration-300">
        <div className="p-4 sm:p-5 border-b border-surface-100 dark:border-surface-800 bg-surface-50/50 dark:bg-surface-800/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h3 className="text-sm font-display font-bold text-surface-900 dark:text-white tracking-tight">Preview</h3>
            <p className="text-xs text-surface-400 mt-0.5">
              {isProcessing ? "Processing your image..." : "Interactive comparison view"}
            </p>
          </div>

          {!isProcessing && resultImageUrl && (
            <div className="flex bg-surface-100 dark:bg-surface-800 p-1 rounded-xl border border-surface-200 dark:border-surface-700 shrink-0 self-stretch sm:self-auto text-[11px] sm:text-xs font-semibold overflow-x-auto">
              {(["compare", "side-by-side", "result"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-2.5 sm:px-3.5 py-2 rounded-lg transition-all duration-200 whitespace-nowrap ${
                    viewMode === mode
                      ? "bg-white dark:bg-surface-700 text-primary shadow-sm"
                      : "text-surface-400 hover:text-surface-600 dark:hover:text-surface-300"
                  }`}
                >
                  {mode === "compare" ? "Split" : mode === "side-by-side" ? "Side by Side" : "Result"}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex-1 min-h-[280px] sm:min-h-[350px] md:min-h-[420px] max-h-[400px] sm:max-h-[500px] flex items-center justify-center relative overflow-hidden bg-surface-50/30 dark:bg-surface-900/30">
          {isProcessing && (
            <div className="absolute inset-0 z-20 bg-surface-900/95 flex flex-col items-center justify-center text-white p-6 text-center">
              <div className="w-16 h-16 border-4 border-white/10 border-t-primary rounded-full animate-spin mb-6" />
              <div className="w-full max-w-xs space-y-3">
                <span className="text-3xl font-display font-black tracking-tight block">{progress}%</span>
                <div className="w-64 h-1.5 bg-white/10 overflow-hidden rounded-full mx-auto">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-violet rounded-full transition-all duration-200"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-xs text-white/50 mt-4 leading-relaxed">
                  {getFriendlyStageLabel(stage)}
                </p>
              </div>
            </div>
          )}

          {!isProcessing && originalImageUrl && (
            <div className="w-full h-full p-4 flex items-center justify-center">
              {viewMode === "compare" && resultImageUrl && (
                <div
                  ref={sliderContainerRef}
                  onMouseMove={handleMouseMove}
                  onTouchMove={handleTouchMove}
                  onMouseDown={() => { isDraggingSlider.current = true; }}
                  onMouseUp={() => { isDraggingSlider.current = false; }}
                  onMouseLeave={() => { isDraggingSlider.current = false; }}
                  className="relative w-full h-full max-w-md md:max-w-xl aspect-square flex items-center justify-center select-none cursor-ew-resize overflow-hidden rounded-2xl border border-surface-200 dark:border-surface-700 touch-none"
                >
                  <div className="absolute inset-0 w-full h-full overflow-hidden">
                    <div className="absolute inset-0 w-full h-full" style={bgStyle(bgType)} />
                    <img src={resultImageUrl} alt="Result" className="absolute inset-0 w-full h-full object-contain p-2" style={{ pointerEvents: "none" }} />
                  </div>

                  <div
                    className="absolute inset-0 w-full h-full bg-surface-50 dark:bg-surface-800 overflow-hidden pointer-events-none"
                    style={{ clipPath: `inset(0px 0px 0px ${sliderPosition}%)` }}
                  >
                    <img src={originalImageUrl} alt="Original" className="absolute inset-0 w-full h-full object-contain p-2" />
                  </div>

                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-primary cursor-ew-resize z-10"
                    style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
                  >
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 w-9 h-9 sm:w-8 sm:h-8 rounded-full bg-primary border-2 border-white shadow-lg shadow-primary/30 flex items-center justify-center text-white pointer-events-none">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 9l-3 3 3 3M16 9l3 3-3 3" />
                      </svg>
                    </div>
                  </div>

                  <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-[10px] font-semibold text-surface-600 z-10 pointer-events-none select-none shadow-sm">Result</div>
                  <div className="absolute bottom-3 right-3 bg-surface-800/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-[10px] font-semibold text-surface-100 z-10 pointer-events-none select-none shadow-sm">Original</div>
                </div>
              )}

              {viewMode === "side-by-side" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-full h-full items-stretch">
                  <div className="flex flex-col space-y-2">
                    <span className="text-xs font-semibold text-surface-400 text-center">Original</span>
                    <div className="relative flex-1 bg-surface-100 dark:bg-surface-800 rounded-2xl overflow-hidden border border-surface-200 dark:border-surface-700 flex items-center justify-center p-2">
                      <img src={originalImageUrl} alt="Original" className="max-w-full max-h-[200px] sm:max-h-[300px] object-contain" />
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <span className="text-xs font-semibold text-surface-400 text-center">Transparent</span>
                    <div className="relative flex-1 checkerboard rounded-2xl overflow-hidden border border-surface-200 dark:border-surface-700 flex items-center justify-center p-2">
                      {resultImageUrl ? (
                        <img src={resultImageUrl} alt="Result" className="max-w-full max-h-[200px] sm:max-h-[300px] object-contain" />
                      ) : (
                        <span className="text-xs font-semibold text-surface-400">Processing...</span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {viewMode === "result" && resultImageUrl && (
                <div className="relative w-full h-full max-w-sm aspect-square rounded-2xl overflow-hidden border border-surface-200 dark:border-surface-700 flex items-center justify-center p-4">
                  <div className="absolute inset-0 w-full h-full" style={bgStyle(bgType)} />
                  <img src={resultImageUrl} alt="Finished Cutout" className="relative z-10 max-w-full max-h-full object-contain p-2" />
                  <div className="absolute top-3 right-3 bg-surface-900/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-[10px] font-semibold capitalize z-20">
                    {bgType} bg
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
