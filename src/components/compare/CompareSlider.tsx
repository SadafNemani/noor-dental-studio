"use client";

import { useTranslations } from "next-intl";
import React, { useRef, useState, useCallback } from "react";
import Text from "../typography/Text";
import { cn } from "@/lib/cn";

type CompareSliderProps = {
  beforeLabel: string;
  afterLabel: string;
  className?: string;
};

export default function CompareSlider({ beforeLabel, afterLabel, className }: CompareSliderProps) {
  const t = useTranslations("compare");
  const containerRef = useRef<HTMLDivElement>(null);
  const [percent, setPercent] = useState(50);
  const draggingRef = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const raw = ((clientX - rect.left) / rect.width) * 100;
    setPercent(Math.min(100, Math.max(0, raw)));
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true;
    containerRef.current?.setPointerCapture(e.pointerId);
    updateFromClientX(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    updateFromClientX(e.clientX);
  };

  const stopDragging = () => {
    draggingRef.current = false;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setPercent((p) => Math.max(0, p - 2));
    if (e.key === "ArrowRight") setPercent((p) => Math.min(100, p + 2));
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "rounded-card relative aspect-4/3 w-full cursor-grab overflow-hidden select-none active:cursor-grabbing",
        className
      )}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
    >
      {/* after */}
      <div className="bg-sand absolute inset-0 flex items-center justify-center">
        <Text as="span" muted className="text-xs">
          {afterLabel} photograph
        </Text>
      </div>

      {/* before */}
      <div
        className="bg-stone/30 absolute inset-0 flex items-center justify-center"
        style={{ clipPath: `inset(0 ${100 - percent}% 0 0)` }}
      >
        <Text as="span" muted className="text-xs">
          {beforeLabel} photograph
        </Text>
      </div>

      {/* labels */}
      <span className="bg-charcoal/70 text-label text-ivory absolute top-4 left-4 rounded-full px-3 py-1">
        {beforeLabel}
      </span>
      <span className="bg-charcoal/70 text-label text-ivory absolute top-4 right-4 rounded-full px-3 py-1">
        {afterLabel}
      </span>

      {/* divider + handle */}
      <div
        className="bg-ivory pointer-events-none absolute inset-y-0 w-0.5"
        style={{ left: `${percent}` }}
      >
        <div
          role="slider"
          tabIndex={0}
          aria-valuenow={Math.round(percent)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={t("sliderLabel", { before: beforeLabel, after: afterLabel })}
          onKeyDown={handleKeyDown}
          className="text-charcoal pointer-events-auto"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
