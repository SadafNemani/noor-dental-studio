"use client";

import { motion, type Variants } from "motion/react";
import { useRevealState } from "@/hooks/useRevealState";

export const drawVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number = 0) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 1.1, ease: "easeInOut", delay: i * 0.15 },
      opacity: { duration: 0.3, delay: i * 0.15 },
    },
  }),
};

type DrawIconProps = { size?: number; className?: string; children: React.ReactNode };

export default function DrawIcon({ size = 64, className, children }: DrawIconProps) {
  const reveal = useRevealState();

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <motion.g
        initial="hidden"
        animate={reveal.animate}
        whileInView={reveal.whileInView}
        viewport={reveal.viewport}
      >
        {children}
      </motion.g>
    </svg>
  );
}
