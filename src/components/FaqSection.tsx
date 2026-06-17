import { useState } from "react";
import { Plus, X } from "lucide-react";

import { motion, AnimatePresence } from "motion/react";

const FAQS = [
  {
    q: "Is ClearCut really 100% free?",
    a: "Yes! There are no subscriptions, paywalls, or hidden fees. ClearCut is free forever — we don't limit your downloads or add watermarks.",
  },
  {
    q: "Are my images uploaded to a server?",
    a: "No. ClearCut uses WebAssembly to run the AI model directly in your browser. Your images never leave your device, ensuring complete privacy. There's zero cloud tracking and zero telemetry — your photos stay yours.",
  },
  {
    q: "Are downloads full resolution with no watermarks?",
    a: "Absolutely. ClearCut provides full resolution downloads with no paywalls, no file size limits, and no watermarks. You get the exact same quality as your original image.",
  },
  {
    q: "What image formats are supported?",
    a: "We support all standard web image formats including JPG, PNG, JPEG, and WebP. There are no strict file size limits either.",
  },
  {
    q: "Why does the first image take longer to process?",
    a: "On your first run, ClearCut needs to download and cache the AI background removal model to your browser. Subsequent images will process almost instantly.",
  },
];

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="faq" className="border-t border-surface-200/50 dark:border-surface-800/50 relative overflow-hidden bg-[#FDFBF7] dark:bg-surface-900 transition-colors duration-300">
      <div
        className="absolute inset-0"
        style={{ backgroundImage: 'radial-gradient(#6366F1 2px, transparent 2px)', backgroundSize: '32px 32px', opacity: 0.8 }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-24 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-20">

          <div className="flex flex-col justify-between h-full gap-10">
            {/* Section heading */}
            <div className="hidden md:block bg-[#FDFBF7] dark:bg-surface-900 py-4 px-4 sm:px-6 relative z-10 w-max">
              <h2
                className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-surface-900 dark:text-surface-200 drop-shadow-sm transition-colors duration-300"
                style={{ fontFamily: '"Outfit", sans-serif' }}
              >
                FAQs
              </h2>
            </div>

            {/* Issue CTA */}
            <div className="space-y-3 md:-ml-4 bg-[#FDFBF7] dark:bg-surface-900 py-4 px-4 sm:px-6 relative z-10 w-max">
              <h4 className="font-sans font-medium text-surface-800 dark:text-surface-200 text-sm sm:text-[15px]">
                Spotted an issue?
              </h4>
              <p className="text-xs sm:text-sm text-surface-500 leading-relaxed">
                Help us improve — open it on GitHub.
              </p>
              <div className="flex items-center gap-4 pt-1">
                <a
                  href="https://github.com/Rpann"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md font-sans font-medium text-sm transition-colors duration-200"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  GitHub
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col bg-[#FDFBF7] dark:bg-surface-900 px-6 py-4 md:px-10 md:py-6 relative z-10 w-[calc(100%+2rem)] -ml-4 md:ml-0 md:w-full">
            {FAQS.map((faq, i) => (
              <div key={i} className="border-b border-surface-200/60 dark:border-surface-700/60 last:border-0">
                <button
                  onClick={() => setOpenIdx(openIdx === i ? null : i)}
                  className="w-full flex items-center justify-between py-6 text-left focus:outline-none group"
                >
                  <span className="font-sans font-medium text-[15px] sm:text-[16px] text-surface-900 dark:text-surface-100 group-hover:text-primary transition-colors pr-6">
                    {faq.q}
                  </span>
                  <div className="shrink-0 text-primary">
                    {openIdx === i ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </div>
                </button>
                <AnimatePresence initial={false}>
                  {openIdx === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-surface-500 dark:text-surface-400 text-sm leading-relaxed pr-8 font-sans">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
