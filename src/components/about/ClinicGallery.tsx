"use client";

import { useTranslations } from "next-intl";
import Arrive from "../motion/Arrive";
import { clinicGallery } from "@/data/clinicGallery";
import { cn } from "@/lib/cn";

export default function ClinicGallery() {
  const t = useTranslations("about.clinic.images");

  return (
    <div className="px-3 md:px-4">
      <div className="grid auto-rows-[22vw] grid-cols-2 gap-3 md:auto-rows-[7vw] md:grid-cols-12 md:gap-4">
        {clinicGallery.map((item, i) => (
          <Arrive
            key={item.key}
            delay={i * 0.08}
            className={cn("noor-image-frame group", item.className)}
          >
            <div
              role="img"
              aria-label={t(item.key)}
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
              style={{ backgroundImage: `url(${item.src})`, backgroundPosition: item.position }}
            />
          </Arrive>
        ))}
      </div>
    </div>
  );
}
