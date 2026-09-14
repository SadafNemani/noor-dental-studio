"use client";
import { motion } from "motion/react";
import DrawIcon, { drawVariants } from "../DrawIcon";

export default function ClockDraw({ size, className }: { size?: number; className?: string }) {
  return (
    <DrawIcon size={size} className={className}>
      <motion.circle cx="24" cy="24" r="17" variants={drawVariants} custom={0} />
      <motion.path d="M24 13.5V24L31.5 29" variants={drawVariants} custom={1} />
    </DrawIcon>
  );
}
