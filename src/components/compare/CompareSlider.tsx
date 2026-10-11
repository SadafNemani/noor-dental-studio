"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { animate, useInView } from "motion/react";
import { IconArrowsHorizontal } from "@tabler/icons-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

type CompareSliderProps = {
  beforeImage: string;
  afterImage: string;
  beforeLabel: string;
  afterLabel: string;
  autoSweep?: boolean;
  fill?: boolean;
  className?: string;
  backgroundPosition: string;
};

export default function CompareSlider({
  beforeImage,
  afterImage,
  beforeLabel,
  afterLabel,
  autoSweep = false,
  fill = false,
  className,
  backgroundPosition,
}: CompareSliderProps) {
  const t = useTranslations("compare");
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const sweepRef = useRef<{ stop: () => void } | null>(null);
  const userControlledRef = useRef(false);
  const [percent, setPercent] = useState(50);
  const prefersReducedMotion = useReducedMotion();
  const inView = useInView(containerRef, { once: true, amount: 0.6 });

  const takeControl = useCallback(() => {
    userControlledRef.current = true;
    sweepRef.current?.stop();
  }, []);

  useEffect(() => {
    if (!autoSweep || !inView || prefersReducedMotion || userControlledRef.current) return;
    const controls = animate(0, 1, {
      duration: 3.6,
      delay: 0.6,
      ease: "easeInOut",
      onUpdate: (v) => setPercent(50 + Math.sin(v * Math.PI * 2) * 14),
    });
    sweepRef.current = controls;
    return () => controls.stop();
  }, [autoSweep, inView, prefersReducedMotion]);

  const updateFromClientX = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPercent(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)));
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full cursor-grab touch-pan-y overflow-hidden select-none active:cursor-grabbing",
        fill ? "h-full" : "rounded-card aspect-4/3",
        className
      )}
      onPointerDown={(e) => {
        takeControl();
        draggingRef.current = true;
        containerRef.current?.setPointerCapture(e.pointerId);
        updateFromClientX(e.clientX);
      }}
      onPointerMove={(e) => draggingRef.current && updateFromClientX(e.clientX)}
      onPointerUp={() => (draggingRef.current = false)}
      onPointerCancel={() => (draggingRef.current = false)}
    >
      <div
        className="absolute inset-0 bg-cover"
        style={{
          backgroundImage: `url(${afterImage})`,
          backgroundPosition: `${backgroundPosition}`,
        }}
      />

      <div
        className="absolute inset-0 bg-cover"
        style={{
          backgroundImage: `url(${beforeImage})`,
          clipPath: `inset(0 ${100 - percent}% 0 0)`,
          backgroundPosition: `${backgroundPosition}`,
        }}
      />

      <span
        className={cn(
          "bg-charcoal/70 text-label text-ivory absolute left-4 rounded-full px-3 py-1",
          fill ? "top-24 md:top-28" : "top-4"
        )}
      >
        {beforeLabel}
      </span>
      <span
        className={cn(
          "bg-charcoal/70 text-label text-ivory absolute right-4 rounded-full px-3 py-1",
          fill ? "top-24 md:top-28" : "top-4"
        )}
      >
        {afterLabel}
      </span>

      <div
        className="bg-ivory pointer-events-none absolute inset-y-0 w-0.5"
        style={{ left: `${percent}%` }}
      >
        <div
          role="slider"
          tabIndex={0}
          aria-valuenow={Math.round(percent)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={t("sliderLabel", { before: beforeLabel, after: afterLabel })}
          onKeyDown={(e) => {
            takeControl();
            if (e.key === "ArrowLeft") setPercent((p) => Math.max(0, p - 2));
            if (e.key === "ArrowRight") setPercent((p) => Math.min(100, p + 2));
          }}
          className="bg-ivory shadow-soft pointer-events-auto absolute top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
        >
          <IconArrowsHorizontal size={20} className="text-charcoal" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
