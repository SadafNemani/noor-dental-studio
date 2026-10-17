"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import Heading from "../typography/Heading";
import Text from "../typography/Text";
import Button from "../ui/Button";
import { IconCheck } from "@tabler/icons-react";

type ConfirmationCardProps = {
  dateLabel: string;
  slotLabel: string;
};

export default function ConfirmationCard({ dateLabel, slotLabel }: ConfirmationCardProps) {
  const t = useTranslations("booking.confirmation");

  return (
    <motion.div
      role="status"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mx-auto flex max-w-110 flex-col items-center gap-4 py-8 text-center"
    >
      <div className="bg-sage/20 flex h-14 w-14 items-center justify-center rounded-full">
        <IconCheck size={28} className="text-sage" aria-hidden="true" />
      </div>
      <Heading size="h2">{t("heading")}</Heading>
      <Text className="text-pine" as="span">
        {dateLabel}, {slotLabel}
      </Text>
      <Text muted>{t("body")}</Text>
      <Button href="/" variant="tertiary" className="text-pine mt-2">
        {t("backHome")}
      </Button>
    </motion.div>
  );
}
