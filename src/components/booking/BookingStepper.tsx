"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "motion/react";
import RadioGroup from "../forms/RadioGroup";
import TimeSlotPicker from "./TimeSlotPicker";
import FormField from "../forms/FormField";
import Input from "../forms/Input";
import Textarea from "../forms/Textarea";
import ConfirmationCard from "./ConfirmationCard";
import Button from "../ui/Button";
import { timeSlots } from "@/data/timeSlots";

type BookingData = {
  reason: string | null;
  slot: string | null;
  name: string;
  phone: string;
  email: string;
  notes: string;
};

const initialData: BookingData = {
  reason: null,
  slot: null,
  name: "",
  phone: "",
  email: "",
  notes: "",
};

export default function BookingStepper() {
  const t = useTranslations("booking");
  const tHelp = useTranslations("home.help");
  const [step, setStep] = useState(1);
  const [data, setData] = useState<BookingData>(initialData);
  const [errors, setErrors] = useState<Partial<Record<"name" | "phone" | "email", string>>>({});
  const totalSteps = 4;

  const reasonOptions = [
    { value: "improveSmile", label: tHelp("improveSmile") },
    { value: "careForTeeth", label: tHelp("careForTeeth") },
    { value: "nervous", label: tHelp("nervous") },
    { value: "needHelpToday", label: tHelp("needHelpToday") },
  ];

  function validateStep3() {
    const next: typeof errors = {};
    if (!data.name.trim()) next.name = t("step3.nameError");
    if (!/^\+?[0-9\s-]{7,}$/.test(data.phone)) next.phone = t("step3.phoneError");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) next.email = t("step3.emailError");
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function goNext() {
    if (step === 1 && !data.reason) return;
    if (step === 2 && !data.slot) return;
    if (step === 3 && !validateStep3()) return;
    setStep((s) => Math.min(totalSteps, s + 1));
  }

  function goBack() {
    setStep((s) => Math.max(1, s - 1));
  }

  const selectedSlot = timeSlots.find((s) => s.id === data.slot);

  if (step === 4) {
    return <ConfirmationCard slotLabel={selectedSlot?.time ?? ""} />;
  }

  return (
    <div className="mx-auto max-w-140">
      <p className="font-body text-label text-stone mb-6">
        {t("nav.stepLabel", { current: step, total: totalSteps })}
      </p>

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
              onChange={(reason) => setData((d) => ({ ...d, reason }))}
              variant="card"
            />
          )}

          {step === 2 && (
            <TimeSlotPicker
              value={data.slot}
              onChange={(slot) => setData((d) => ({ ...d, slot }))}
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

      <div className="mt-8 flex justify-between">
        {step > 1 ? (
          <Button variant="ghost" onClick={goBack} className="border-stone text-stone">
            {t("nav.back")}
          </Button>
        ) : (
          <span />
        )}
        <Button onClick={goNext}>{step === 3 ? t("nav.confirm") : t("nav.next")}</Button>
      </div>
    </div>
  );
}
