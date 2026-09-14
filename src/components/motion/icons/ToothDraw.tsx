"use client";
import { motion } from "motion/react";
import DrawIcon, { drawVariants } from "../DrawIcon";

export default function ToothDraw({ size, className }: { size?: number; className?: string }) {
  return (
    <DrawIcon size={size} className={className}>
      <motion.path
        d="
          M24 10
          C21.5 7 18.5 6 15.5 6
          C11 6 8 9 8 13.5
          C8 19 10.5 24 12 29
          C13 32.5 13 36 14.5 39
          C15.5 41 18 41.5 19.5 40
          C21.5 38.5 21.5 34 22.5 30
          C23 28 23.5 26 24 26
          C24.5 26 25 28 25.5 30
          C26.5 34 26.5 38.5 28.5 40
          C30 41.5 32.5 41 33.5 39
          C35 36 35 32.5 36 29
          C37.5 24 40 19 40 13.5
          C40 9 37 6 32.5 6
          C29.5 6 26.5 7 24 10
          Z
        "
        variants={drawVariants}
      />
    </DrawIcon>
  );
}
