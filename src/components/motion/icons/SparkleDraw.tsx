"use client";
import { motion } from "motion/react";
import DrawIcon, { drawVariants } from "../DrawIcon";

export default function SparkleDraw({ size, className }: { size?: number; className?: string }) {
  return (
    <DrawIcon size={size} className={className}>
      <motion.path
        d="M24 6c1 12 2 15 18 18-16 3-17 6-18 18-1-12-2-15-18-18 16-3 17-6 18-18Z"
        variants={drawVariants}
      />
    </DrawIcon>
  );
}
