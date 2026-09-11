"use client";

import { useTranslations } from "next-intl";
import Eyebrow from "../typography/Eyebrow";
import Heading from "../typography/Heading";
import Text from "../typography/Text";
import Button from "../ui/Button";
import Arrive from "../motion/Arrive";

export default function TreatmentTeaser() {
  const t = useTranslations("home.treatment");

  return (
    <div className="rounded-card bg-pine text-ivory grid grid-cols-1 items-center gap-7 p-9 md:grid-cols-[1.2fr_0.8fr]">
      <div>
        <Arrive>
          <Eyebrow className="mb-2">{t("eyebrow")}</Eyebrow>
        </Arrive>

        <Arrive delay={0.8}>
          <Heading size="h2" className="mb-3">
            {t("heading")}
          </Heading>
        </Arrive>

        <Arrive delay={0.16}>
          <Text className="text-mist mb-5 max-w-[320px]">{t("body")}</Text>
        </Arrive>

        <Arrive delay={0.24}>
          <Button href="/your-care/invisalign" className="bg-gold text-charcoal hover:bg-gold/90">
            {t("cta")}
          </Button>
        </Arrive>
      </div>

      <Arrive delay={0.1}>
        <div className="rounded-card bg-ivory/10 flex aspect-4/3 items-center justify-center">
          <i className="ti ti-photo text-ivory text-2xl" aria-hidden="true" />
        </div>
      </Arrive>
    </div>
  );
}
