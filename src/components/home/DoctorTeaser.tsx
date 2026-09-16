"use client";

import { useTranslations } from "next-intl";
import Eyebrow from "../typography/Eyebrow";
import Button from "../ui/Button";
import Arrive from "../motion/Arrive";
import Quote from "../typography/Quote";
import Image from "next/image";

export default function DoctorTeaser() {
  const t = useTranslations("home.doctor");

  return (
    <div className="grid grid-cols-1 items-center gap-9 md:grid-cols-[0.8fr_1.2fr]">
      <Arrive>
        <Image
          className="rounded-card bg-ivory/10 h-100 w-100 object-cover"
          src="/images/doctor-portrait.webp"
          alt={t("eyebrow")}
          width={832}
          height={1248}
          style={{ aspectRatio: "832/1248" }}
        />
      </Arrive>

      <div>
        <Arrive>
          <Eyebrow className="mb-2">{t("eyebrow")}</Eyebrow>
        </Arrive>

        <Arrive delay={0.8}>
          <Quote align="left" attribution={t("attribution")}>
            {t("quote")}
          </Quote>
        </Arrive>

        <Arrive delay={0.16}>
          <Button href="/about" variant="secondary" className="mt-6">
            {t("cta")}
          </Button>
        </Arrive>
      </div>
    </div>
  );
}
