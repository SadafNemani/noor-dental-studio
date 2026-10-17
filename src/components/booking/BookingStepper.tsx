"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion } from "motion/react";
import { IconArrowLeft } from "@tabler/icons-react";
import RadioGroup from "../forms/RadioGroup";
import TimeSlotPicker from "./TimeSlotPicker";
import FormField from "../forms/FormField";
import Input from "../forms/Input";
import Textarea from "../forms/Textarea";
import ConfirmationCard from "./ConfirmationCard";
import Button from "../ui/Button";
import { timeSlots } from "@/data/timeSlots";
import { reasonKeys, isReasonKey, type ReasonKey } from "@/data/bookingReasons";
import { formatDay, formatSlotTime, getNextAvailableDate } from "@/lib/booking";
import { cn } from "@/lib/cn";

type BookingData = {
  reason: ReasonKey | null;
  slot: string | null;
  name: string;
  phone: string;
  email: string;
  notes: string;
};

const FORM_STEPS = 3;

export default function BookingStepper({
  initialReason = null,
}: {
  initialReason?: ReasonKey | null;
}) {
  const t = useTranslations("booking");
  const tHelp = useTranslations("home.help");
  const locale = useLocale();
  const [slotDate] = useState(() => getNextAvailableDate());
  const [step, setStep] = useState(initialReason ? 2 : 1);
  const [data, setData] = useState<BookingData>({
    reason: initialReason,
    slot: null,
    name: "",
    phone: "",
    email: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Partial<Record<"name" | "phone" | "email", string>>>({});
  const [stepError, setStepError] = useState<string | null>(null);

  const reasonOptions = reasonKeys.map((key) => ({ value: key, label: tHelp(key) }));
  const dateLabel = formatDay(slotDate, locale);
  const selectedSlot = timeSlots.find((s) => s.id === data.slot);

  function validateStep3() {
    const next: typeof errors = {};
    if (!data.name.trim()) next.name = t("step3.nameError");
    if (!/^\+?[0-9\s-]{7,}$/.test(data.phone)) next.phone = t("step3.phoneError");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) next.email = t("step3.emailError");
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function goNext() {
    if (step === 1 && !data.reason) {
      setStepError(t("step1.error"));
      return;
    }
    if (step === 2 && !data.slot) {
      setStepError(t("step2.error"));
      return;
    }
    if (step === 3 && !validateStep3()) return;
    setStepError(null);
    setStep((s) => s + 1);
  }

  function goBack() {
    setStepError(null);
    setStep((s) => Math.max(1, s - 1));
  }

  if (step === 4) {
    return (
      <ConfirmationCard
        dateLabel={dateLabel}
        slotLabel={selectedSlot ? formatSlotTime(selectedSlot.time, locale) : ""}
      />
    );
  }

  return (
    <div className="w-full">
      <div className="mb-8 flex items-center gap-4">
        <p aria-label="polite" className="font-body text-label text-stone whitespace-nowrap">
          {t("nav.stepLabel", { current: step, total: FORM_STEPS })}
        </p>
        <div className="flex flex-1 gap-1.5" aria-hidden="true">
          {Array.from({ length: FORM_STEPS }).map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-0.5 flex-1 rounded-full transition-colors duration-500",
                i < step ? "bg-gold" : "bg-sand"
              )}
            />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
        >
          {step === 1 && (
            <RadioGroup
              name="reason"
              legend={t("step1.legend")}
              options={reasonOptions}
              value={data.reason}
              onChange={(value) => {
                if (!isReasonKey(value)) return;
                setData((d) => ({ ...d, reason: value }));
                setStepError(null);
              }}
              variant="card"
            />
          )}

          {step === 2 && (
            <TimeSlotPicker
              value={data.slot}
              dayLabel={dateLabel}
              onChange={(slot) => {
                setData((d) => ({ ...d, slot }));
                setStepError(null);
              }}
            />
          )}

          {step === 3 && (
            <div className="flex flex-col gap-4">
              <FormField label={t("step3.nameLabel")} required error={errors.name}>
                <Input
                  value={data.name}
                  onChange={(e) => setData((d) => ({ ...d, name: e.target.value }))}
                />
              </FormField>
              <FormField label={t("step3.phoneLabel")} required error={errors.phone}>
                <Input
                  type="tel"
                  value={data.phone}
                  onChange={(e) => setData((d) => ({ ...d, phone: e.target.value }))}
                />
              </FormField>
              <FormField label={t("step3.emailLabel")} required error={errors.email}>
                <Input
                  type="email"
                  value={data.email}
                  onChange={(e) => setData((d) => ({ ...d, email: e.target.value }))}
                />
              </FormField>
              <FormField label={t("step3.notesLabel")}>
                <Textarea
                  value={data.notes}
                  onChange={(e) => setData((d) => ({ ...d, notes: e.target.value }))}
                />
              </FormField>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {stepError && (
        <p role="alert" className="font-body text-label text-error mt-4">
          {stepError}
        </p>
      )}

      <div className="mt-8 flex items-center justify-between">
        {step > 1 ? (
          <button
            type="button"
            onClick={goBack}
            className="text-stone hover:text-charcoal inline-flex cursor-pointer items-center gap-2 text-sm font-medium tracking-wide transition-colors"
          >
            <IconArrowLeft size={16} className="rtl:rotate-180" aria-hidden="true" />
            {t("nav.back")}
          </button>
        ) : (
          <span />
        )}
        <Button onClick={goNext}>{step === FORM_STEPS ? t("nav.confirm") : t("nav.next")}</Button>
      </div>
    </div>
  );
}
