"use client";

import { useTranslations } from "next-intl";
import Heading from "../typography/Heading";
import Text from "../typography/Text";
import Arrive from "../motion/Arrive";
import Button from "../ui/Button";

export default function ClosingCTA() {
  const t = useTranslations("yourCare.closing");

  return (
    <div className="rounded-card grid grid-cols-1 overflow-hidden md:grid-cols-2">
      <div
        className="aspect-4/3 bg-cover bg-center"
        style={{ backgroundImage: "url(/images/care-closing-room.webp" }}
      />

      <div className="bg-pine p10 flex flex-col justify-center md:p-14">
        <Arrive>
          <Heading size="h2" className="text-gold mb-4">
            {t("heading")}
          </Heading>

          <Text className="text-mist mb-8 max-w-90">{t("body")}</Text>

          <Button href="/booking" className="bg-ivory text-charcoal hover:bg-ivory/90 w-fit">
            {t("cta")}
          </Button>
        </Arrive>
      </div>
    </div>
  );
}
