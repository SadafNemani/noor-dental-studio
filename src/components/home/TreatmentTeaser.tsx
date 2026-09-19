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
    <div className="relative mx-auto flex min-h-[70vh] max-w-250 items-end justify-start ps-0">
      <div className="invisalign-panel rounded-card bg-pine-deep/80 -ms-4 max-w-110 p-8 backdrop-blur-md md:-ms-25">
        <Arrive>
          <Eyebrow className="invisalign-heading mb-4">{t("eyebrow")}</Eyebrow>
        </Arrive>
        <Arrive delay={0.1}>
          <Heading size="h2" className="invisalign-heading text-ivory mb-4">
            {t("heading")}
          </Heading>
        </Arrive>
        <Arrive delay={0.2}>
          <Text className="invisalign-heading text-ivory/90 mb-8">{t("body")}</Text>
        </Arrive>
        <Arrive delay={0.3}>
          <Button href="/your-care/invisalign" className="invisalign-cta">
            {t("cta")}
          </Button>
        </Arrive>
      </div>
    </div>
  );
}
