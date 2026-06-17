import React, { useState, useRef, useCallback } from "react";
import { motion } from "motion/react";

const ORIGINAL_IMG = "/Sample Image 1.jpg";
const REMOVED_IMG = "/Sample Image 1 tarnsparent.png";

export default function ShowcaseSection() {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updateSlider = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(pct);
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      dragging.current = true;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      updateSlider(e.clientX);
    },
    [updateSlider]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging.current) return;
      updateSlider(e.clientX);
    },
    [updateSlider]
  );

  const handlePointerUp = useCallback(() => {
    dragging.current = false;
  }, []);

  return (
    <section className="w-full flex flex-col">
      <div className="w-full bg-primary pt-16 sm:pt-24 pb-16 sm:pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl mx-auto"
          >
            <h2
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-black text-white tracking-tight leading-[1.3] mb-6"
              style={{ fontFamily: '"Fraunces", serif', letterSpacing: "-0.02em" }}
            >
              Remove backgrounds with{" "}
              <br className="hidden sm:block" />
              <span className="relative inline-block px-4 py-1 sm:py-2 rounded-[2rem] bg-surface-950 text-white mt-3 sm:mt-2">
                incredible quality
              </span>
            </h2>
          </motion.div>
        </div>

        <div className="max-w-md mx-auto px-4 sm:px-6 flex flex-col items-center mt-10 sm:mt-14">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            <div
              ref={containerRef}
              className="relative w-full aspect-[3/4] sm:aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl cursor-col-resize select-none border border-white/20"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              role="slider"
              aria-label="Before and after comparison"
              aria-valuenow={Math.round(sliderPos)}
              aria-valuemin={0}
              aria-valuemax={100}
              tabIndex={0}
            >
              <div className="absolute inset-0 checkerboard">
                <img
                  src={REMOVED_IMG}
                  alt="After — background removed"
                  className="w-full h-full object-cover pointer-events-none"
                  draggable={false}
                />
              </div>

              <div
                className="absolute inset-0"
                style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
              >
                <img
                  src={ORIGINAL_IMG}
                  alt="Before — original photo"
                  className="w-full h-full object-cover pointer-events-none"
                  draggable={false}
                />
              </div>

              <div
                className="absolute top-0 bottom-0 w-[2px] bg-white/90 z-20"
                style={{ left: `calc(${sliderPos}% - 1px)` }}
              />

              <div
                className="absolute top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white shadow-lg border-2 border-surface-200 flex items-center justify-center"
                style={{ left: `calc(${sliderPos}% - 20px)` }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-surface-500">
                  <path d="M5 3L2 8L5 13M11 3L14 8L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            <p className="text-center text-white/70 text-sm sm:text-base mt-6 font-medium leading-relaxed max-w-sm mx-auto">
              Flawlessly isolate subjects in your photos while seamlessly removing the background.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
