"use client";

import { AnimatePresence, motion } from "motion/react";

type SceneProgressIndicatorProps = {
  total: number;
  activeIndex: number;
  fillRef: React.RefObject<HTMLDivElement | null>;
};

export default function SceneProgressIndicator({
  total,
  activeIndex,
  fillRef,
}: SceneProgressIndicatorProps) {
  return (
    <div className="bg-charcoal/35 pointer-events-none absolute inset-e-8 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-4 rounded-full px-2.5 py-4 backdrop-blur-sm md:flex">
      <div className="relative h-5 w-5 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={activeIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="font-body text-label text-ivory absolute inset-x-0 top-0 text-center tabular-nums"
          >
            {String(activeIndex + 1).padStart(2, "0")}
          </motion.span>
        </AnimatePresence>
      </div>

      <div className="bg-ivory/25 relative h-24 w-px">
        <div ref={fillRef} className="bg-gold absolute inset-x-0 top-0" style={{ height: "0%" }} />
      </div>

      <span className="font-body text-label text-ivory/50 tabular-nums">
        {String(total).padStart(2, "0")}
      </span>
    </div>
  );
}
