"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "motion/react";
import TreatmentRow from "./TreatmentRow";
import Text from "../typography/Text";
import { treatments } from "@/data/treatments";
import { cn } from "@/lib/cn";
import { IconArrowUpRight } from "@tabler/icons-react";

export default function TreatmentSelector() {
  const t = useTranslations("yourCare.treatments");
  const [activeImage, setActiveImage] = useState(0);
  const [focused, setFocused] = useState<number | null>(null);

  function handleEnter(i: number) {
    setActiveImage(i);
    setFocused(i);
  }
  function handleLeave() {
    setFocused(null);
  }

  return (
    <div>
      <div className="hidden md:grid md:grid-cols-[1.05fr_0.95fr] md:items-start md:gap-16">
        <div>
          {treatments.map((treatment, i) => {
            const isActive = focused === i;
            return (
              <TreatmentRow
                key={treatment.slug}
                href={treatment.href}
                isActive={isActive}
                onMouseEnter={() => handleEnter(i)}
                onMouseLeave={handleLeave}
                onFocus={() => handleEnter(i)}
                onBlur={handleLeave}
              >
                <div className="flex items-center gap-6">
                  <span
                    className={cn(
                      "font-heading text-[clamp(2.5rem,4vw,3.5rem)] leading-none tabular-nums transition-colors duration-300",
                      isActive ? "text-gold" : "text-charcoal/25"
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1 pt-1">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="font-heading text-h3 text-charcoal">
                        {t(`${treatment.slug}.name`)}
                      </h3>
                      {treatment.href && (
                        <IconArrowUpRight
                          size={26}
                          className="animate-bounce-diagonal text-pine rtl:-scale-x-100"
                          aria-hidden="true"
                        />
                      )}
                    </div>

                    <Text muted className="mt-1 max-w-95">
                      {t(`${treatment.slug}.desc`)}
                    </Text>

                    <Text muted className="text-label text-stone/60 mt-2 tracking-wide uppercase">
                      {t(`${treatment.slug}.meta`)}
                    </Text>
                  </div>
                </div>
              </TreatmentRow>
            );
          })}
        </div>

        <div className="noor-image-frame sticky aspect-square overflow-hidden">
          <AnimatePresence>
            <motion.div
              key={treatments[activeImage].slug}
              initial={{ clipPath: "inset(100% 0 0 0)", scale: 1.1 }}
              animate={{ clipPath: "inset(0% 0 0 0)", scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${treatments[activeImage].image})` }}
            />
          </AnimatePresence>
        </div>
      </div>

      <div className="md:hidden">
        {treatments.map((treatment, i) => (
          <TreatmentRow key={treatment.slug} href={treatment.href}>
            <div className="mb-4 flex items-start gap-6">
              <span className="font-heading text-h3 text-charcoal/70 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex-1 pt-1">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-heading text-h3 text-charcoal">
                    {t(`${treatment.slug}.name`)}
                  </h3>
                  {treatment.href && (
                    <span
                      aria-hidden="true"
                      className="font-body text-pine text-lg rtl:-scale-x-100"
                    >
                      ↗
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div
              className="noor-image-frame bg-sand mb-3 aspect-4/5 bg-cover bg-center"
              style={{ backgroundImage: `url(${treatment.image})` }}
            />
            <Text muted>{t(`${treatment.slug}.desc`)}</Text>
          </TreatmentRow>
        ))}
      </div>
    </div>
  );
}
