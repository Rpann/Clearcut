import React, { useRef } from "react";
import { Upload } from "lucide-react";
import { motion } from "motion/react";
import { SAMPLES } from "../constants";

interface LandingUploadProps {
  isDragOver: boolean;
  error: string | null;
  isModelReady: boolean;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent) => void;
  onChooseSample: (url: string) => void;
}

export default function LandingUpload({
  isDragOver,
  error,
  isModelReady,
  onFileChange,
  onDragOver,
  onDragLeave,
  onDrop,
  onChooseSample,
}: LandingUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="grid lg:grid-cols-12 gap-8 sm:gap-12 items-stretch"
    >
      <div className="lg:col-span-5 text-left space-y-5 sm:space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="text-3xl sm:text-5xl lg:text-[3.4rem] font-display font-black text-surface-900 dark:text-white tracking-tight leading-[1.3]"
        >
          Remove any{" "}
          <span className="relative inline-block px-3 py-1.5 rounded-xl bg-primary/15 dark:bg-primary/25 text-primary hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors duration-300 cursor-default" style={{ fontFamily: '"Playfair Display", serif' }}>
            background
          </span>
          <br />
          instantly for free
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="text-surface-500 dark:text-surface-400 leading-relaxed text-sm sm:text-[15px] max-w-lg"
        >
          Isolate portraits, products, pets, and objects without paying a dime. Processing runs{" "}
          <strong className="text-surface-700 dark:text-surface-200">entirely inside your browser</strong> via WebAssembly — your
          images never leave your device.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.5 }}
          className="pt-1"
        >
          <p className="text-xs font-semibold text-surface-400 mb-3 tracking-wide">Try a sample image</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {SAMPLES.map((sample) => (
              <button
                key={sample.id}
                onClick={() => onChooseSample(sample.url)}
                className="group flex flex-col items-center gap-2 border-0 p-0 focus:outline-none focus:ring-2 focus:ring-primary/30 rounded-2xl overflow-hidden cursor-pointer"
              >
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-surface-100 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 shadow-sm group-hover:shadow-md group-hover:scale-[1.03] transition-all duration-300">
                  <img
                    src={sample.url}
                    alt={sample.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="lg:col-span-7">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-300 h-full ${
            isDragOver
              ? "border-primary bg-primary-50/50 dark:bg-primary/10 scale-[1.01] shadow-lg shadow-primary/10"
              : "border-surface-300 dark:border-surface-700 bg-surface-50 dark:bg-surface-900 hover:border-primary/40 hover:bg-primary-50/20 dark:hover:bg-primary/5 hover:shadow-md"
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={onFileChange}
            accept="image/*"
            className="hidden"
          />

          <div
            className={`p-5 rounded-2xl mb-6 transition-all duration-300 ${
              isDragOver ? "bg-primary/10 text-primary" : "bg-surface-100 dark:bg-surface-800 text-surface-500 dark:text-surface-400"
            }`}
          >
            <Upload className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>

          <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-extrabold text-surface-800 dark:text-white tracking-tight mb-2">
            Drop your image here
          </h3>

          <p className="text-surface-400 text-xs sm:text-sm max-w-sm mb-6 sm:mb-8 leading-relaxed">
            Supports PNG, JPG, JPEG, and WebP formats up to any resolution.
          </p>

          <button className="bg-primary hover:bg-primary-dark text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl font-display font-bold text-sm active:scale-[0.97] transition-all duration-200 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30">
            Browse Files
          </button>


        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200/60 dark:border-red-800/40 rounded-2xl text-red-600 dark:text-red-400 font-semibold text-sm text-center"
          >
            ⚠️ {error}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
