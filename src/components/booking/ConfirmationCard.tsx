"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion } from "motion/react";
import Heading from "../typography/Heading";
import Text from "../typography/Text";
import Button from "../ui/Button";
import { nextAvailableDate } from "@/data/timeSlots";

type ConfirmationCardProps = {
  slotLabel: string;
};

export default function ConfirmationCard({ slotLabel }: ConfirmationCardProps) {
  const t = useTranslations("booking.confirmation");
  const locale = useLocale();
  const formattedDate = new Intl.DateTimeFormat(locale, {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date(nextAvailableDate));

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mx-auto flex max-w-110 flex-col items-center gap-4 text-center"
    >
      <div className="bg-sage/20 flex h-14 w-14 items-center justify-center rounded-full">
        <i className="ti ti-check text-sage text-2xl" aria-hidden="true" />
      </div>
      <Heading size="h2">{t("heading")}</Heading>
      <Text className="text-pine" as="span">
        {formattedDate}, {slotLabel}
      </Text>
      <Text muted>{t("body")}</Text>
      <Button href="/" variant="ghost" className="border-pine text-pine mt-2">
        {t("backHome")}
      </Button>
    </motion.div>
  );
}
