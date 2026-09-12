"use client";

import { useTranslations } from "next-intl";
import { timeSlots, type TimeSlot } from "@/data/timeSlots";
import { cn } from "@/lib/cn";

type TimeSlotPickerProps = {
  value: string | null;
  onChange: (id: string) => void;
};

const periods: TimeSlot["period"][] = ["morning", "afternoon", "evening"];

export default function TimeSlotPicker({ value, onChange }: TimeSlotPickerProps) {
  const t = useTranslations("booking.step2");

  return (
    <fieldset className="flex flex-col gap-6">
      <legend className="font-body text-label text-charcoal mb-1">{t("legend")}</legend>
      {periods.map((period) => {
        const slots = timeSlots.filter((s) => s.period === period);
        if (slots.length === 0) return null;

        return (
          <div key={period}>
            <p className="font-heading text-h3 text-pine mb-2">{t(period)}</p>
            <div className="flex flex-wrap gap-2">
              {slots.map((slot) => {
                const checked = value === slot.id;
                return (
                  <label
                    key={slot.id}
                    className={cn(
                      "rounded-button-sm font-body text-label cursor-pointer border px-4 py-2 transition-colors duration-200",
                      !slot.available && "cursor-not-allowed opacity-40",
                      checked
                        ? "border-pine bg-pine text-ivory"
                        : "border-sand text-charcoal hover:border-stone bg-white"
                    )}
                  >
                    <input
                      type="radio"
                      name="timeSlot"
                      value={slot.id}
                      checked={checked}
                      disabled={!slot.available}
                      onChange={() => onChange(slot.id)}
                      className="sr-only"
                    />
                    {slot.time}
                    {!slot.available && <span className="sr-only"> ({t("unavailable")})</span>}
                  </label>
                );
              })}
            </div>
          </div>
        );
      })}
    </fieldset>
  );
}
