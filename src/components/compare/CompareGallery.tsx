"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "motion/react";
import CompareSlider from "./CompareSlider";
import Heading from "../typography/Heading";
import { compareCases } from "@/data/compareCases";
import { cn } from "@/lib/cn";

export default function CompareGallery() {
  const t = useTranslations("invisalign.compare");
  const [active, setActive] = useState(0);
  const current = compareCases[active];

  return (
    <section className="bg-pine-deep relative h-svh min-h-140 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <CompareSlider
            fill
            autoSweep
            beforeImage={current.before}
            afterImage={current.after}
            beforeLabel={t("before")}
            afterLabel={t("after")}
          />
        </motion.div>
      </AnimatePresence>

      <div className="rounded-card bg-pine-deep/45 pointer-events-none absolute inset-s-4 inset-e-4 bottom-24 z-20 p-6 backdrop-blur-md md:inset-s-10 md:inset-e-auto md:bottom-10 md:max-w-85">
        <Heading size="h3" className="text-ivory mb-1">
          {t("heading")}
        </Heading>
        <p className="text-label text-mist">{t("hint")}</p>
      </div>

      <div
        role="group"
        aria-label={t("galleryLabel")}
        className="absolute inset-s-4 bottom-6 z-20 flex gap-2 md:inset-s-auto md:inset-e-10 md:bottom-10"
      >
        {compareCases.map((c, i) => (
          <button
            key={c.id}
            type="button"
            aria-pressed={i === active}
            aria-label={t("caseLabel", { n: i + 1 })}
            onClick={() => setActive(i)}
            className={cn(
              "rounded-card h-14 w-20 cursor-pointer overflow-hidden border-2 bg-cover bg-center transition-all duration-300",
              i === active ? "border-gold" : "border-ivory/30 opacity-70 hover:opacity-100"
            )}
            style={{ backgroundImage: `url(${c.after})` }}
          />
        ))}
      </div>
    </section>
  );
}
