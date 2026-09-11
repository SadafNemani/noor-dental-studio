"use client";

import { useTranslations } from "next-intl";
import Eyebrow from "../typography/Eyebrow";
import Quote from "../typography/Quote";
import Button from "../ui/Button";
import Arrive from "../motion/Arrive";
import Text from "../typography/Text";

export default function DoctorTeaser() {
  const t = useTranslations("home.doctor");

  return (
    <div className="grid grid-cols-1 items-center gap-9 md:grid-cols-[0.8fr_1.2fr]">
      <Arrive>
        <div className="rounded-card bg-sand flex aspect-square flex-col items-center justify-center gap-2">
          <i className="ti ti-photo text-stone text-2xl" aria-hidden="true" />

          <Text as="span" muted className="text-xs">
            doctor portrait
          </Text>
        </div>
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
          <Button href="/about" variant="ghost" className="border-pine text-pine mt-6">
            {t("cta")}
          </Button>
        </Arrive>
      </div>
    </div>
  );
}
