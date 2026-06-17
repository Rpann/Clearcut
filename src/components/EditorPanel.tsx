import {
  Check, Download, RotateCcw, Palette, Sparkles, Layers,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { PRESET_COLORS, PRESET_GRADIENTS } from "../constants";
import type { BgType } from "../constants";

interface EditorPanelProps {
  resultImageUrl: string | null;
  bgType: BgType;
  setBgType: (type: BgType) => void;
  bgColor: string;
  setBgColor: (color: string) => void;
  gradientPreset: string;
  setGradientPreset: (preset: string) => void;
  onDownload: () => void;
  onReset: () => void;
}

export default function EditorPanel({
  resultImageUrl,
  bgType,
  setBgType,
  bgColor,
  setBgColor,
  gradientPreset,
  setGradientPreset,
  onDownload,
  onReset,
}: EditorPanelProps) {
  return (
    <div className="lg:col-span-5 flex flex-col space-y-5 order-2 lg:order-none">
      <div className="bg-white dark:bg-surface-900 rounded-3xl border border-surface-200 dark:border-surface-700 shadow-sm p-4 sm:p-6 space-y-5 sm:space-y-6 transition-colors duration-300">
        <h3 className="text-lg sm:text-xl font-display font-extrabold tracking-tight text-surface-900 dark:text-white">
          Background Editor
        </h3>

        <div className="space-y-3">
          <label className="text-xs font-semibold text-surface-400 block">Background Style</label>
          <div className="grid grid-cols-3 gap-2">
            {([
              { type: "transparent" as const, icon: <Layers className="w-4 h-4" />, label: "Transparent" },
              { type: "color" as const, icon: <Palette className="w-4 h-4" />, label: "Solid Color" },
              { type: "gradient" as const, icon: <Sparkles className="w-4 h-4" />, label: "Gradient" },
            ]).map(({ type, icon, label }) => (
              <button
                key={type}
                onClick={() => setBgType(type)}
                className={`py-2.5 sm:py-3 px-2 sm:px-3 rounded-2xl border flex flex-col items-center justify-center gap-1.5 sm:gap-2 transition-all duration-200 cursor-pointer ${
                  bgType === type
                    ? "bg-primary border-primary text-white shadow-md shadow-primary/20"
                    : "bg-surface-50 dark:bg-surface-800 border-surface-200 dark:border-surface-700 text-surface-500 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-700 hover:border-surface-300"
                }`}
              >
                {icon}
                <span className="text-[10px] sm:text-[11px] font-semibold">{label}</span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {bgType === "color" && (
            <motion.div
              key="color"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              className="space-y-3 bg-surface-50 dark:bg-surface-800 p-3 sm:p-4 rounded-2xl border border-surface-200 dark:border-surface-700"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-surface-400">Choose Color</span>
                <span className="text-[11px] font-mono font-semibold text-surface-500 dark:text-surface-400 bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 px-2.5 py-1 rounded-lg">
                  {bgColor.toUpperCase()}
                </span>
              </div>

              <div className="flex flex-wrap gap-2.5 pt-1">
                {PRESET_COLORS.map((clr) => (
                  <button
                    key={clr.name}
                    title={clr.name}
                    onClick={() => setBgColor(clr.value)}
                    className="w-9 h-9 rounded-xl border border-surface-200 dark:border-surface-600 relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer hover:scale-110 active:scale-90 transition-transform shadow-sm"
                    style={{ backgroundColor: clr.value }}
                  >
                    {bgColor.toLowerCase() === clr.value.toLowerCase() && (
                      <span className="absolute inset-0 flex items-center justify-center bg-black/10 text-white drop-shadow">
                        <Check className="w-4 h-4" />
                      </span>
                    )}
                  </button>
                ))}

                <div className="relative w-9 h-9 rounded-xl border border-surface-300 dark:border-surface-600 overflow-hidden cursor-pointer hover:scale-110 active:scale-95 transition-transform flex items-center justify-center shadow-sm">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="absolute inset-0 w-full h-full p-0 border-0 scale-150 cursor-pointer"
                  />
                  <Palette className="w-3.5 h-3.5 text-surface-500 pointer-events-none mix-blend-difference" />
                </div>
              </div>
            </motion.div>
          )}

          {bgType === "gradient" && (
            <motion.div
              key="gradient"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              className="space-y-3.5 bg-surface-50 dark:bg-surface-800 p-3 sm:p-4 rounded-2xl border border-surface-200 dark:border-surface-700"
            >
              <span className="text-xs font-semibold text-surface-400 block mb-2">Preset Gradients</span>
              <div className="grid grid-cols-2 gap-2.5">
                {PRESET_GRADIENTS.map((grad) => (
                  <button
                    key={grad.label}
                    onClick={() => setGradientPreset(grad.label)}
                    className={`flex items-center gap-2.5 p-2 rounded-xl border text-left transition-all duration-200 hover:bg-white dark:hover:bg-surface-700 text-sm font-medium cursor-pointer ${
                      gradientPreset === grad.label
                        ? "bg-white dark:bg-surface-700 border-primary shadow-sm ring-1 ring-primary/30"
                        : "bg-transparent border-surface-200 dark:border-surface-600 text-surface-600 dark:text-surface-300"
                    }`}
                  >
                    <div
                      className="w-7 h-7 rounded-lg shrink-0 border border-surface-200/50 shadow-sm"
                      style={{ backgroundImage: grad.value }}
                    />
                    <span className="truncate text-xs">{grad.name}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-3 pt-4 border-t border-surface-200/60 dark:border-surface-700/60">
          <button
            disabled={!resultImageUrl}
            onClick={onDownload}
            className="w-full bg-primary hover:bg-primary-dark disabled:bg-surface-100 dark:disabled:bg-surface-800 disabled:text-surface-300 dark:disabled:text-surface-600 disabled:cursor-not-allowed text-white py-3.5 sm:py-4 rounded-2xl font-display font-bold flex items-center justify-center gap-2.5 text-sm shadow-md shadow-primary/20 active:scale-[0.98] transition-all duration-200 cursor-pointer hover:shadow-lg hover:shadow-primary/30"
          >
            <Download className="w-4.5 h-4.5" />
            Download High-Res PNG
          </button>

          <button
            onClick={onReset}
            className="w-full bg-surface-900 dark:bg-surface-700 hover:bg-surface-800 dark:hover:bg-surface-600 text-white py-3.5 rounded-2xl font-display font-bold flex items-center justify-center gap-2.5 text-sm active:scale-[0.98] transition-all duration-200 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-surface-400" />
            Process Another Image
          </button>
        </div>
      </div>
    </div>
  );
}
