"use client";
import { cn } from "@/lib/cn";

type Option = { value: string; label: string };

type RadioGroupProps = {
  name: string;
  legend: string;
  options: Option[];
  value: string | null;
  onChange: (value: string) => void;
  variant?: "dot" | "card";
  className?: string;
};

export default function RadioGroup({
  name,
  legend,
  options,
  value,
  onChange,
  variant = "dot",
  className,
}: RadioGroupProps) {
  return (
    <fieldset className={cn("flex flex-col gap-3", className)}>
      <legend className="font-body text-label text-charcoal mb-1">{legend}</legend>
      <div
        className={cn(
          variant === "card" ? "grid grid-cols-2 gap-3 sm:grid-cols-4" : "flex flex-col gap-2"
        )}
      >
        {options.map((option) => {
          const checked = value === option.value;
          return (
            <label
              key={option.label}
              className={cn(
                "rounded-button-sm flex cursor-pointer items-center gap-2.5 border px-4 py-2.5 transition-colors duration-200",
                variant === "card" && "rounded-card flex-col justify-center p-4 text-center",
                checked ? "border-pine bg-pine/5" : "hover:border-stone border-s-amber-50 bg-white"
              )}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={checked}
                onChange={() => onChange(option.value)}
                className="sr-only"
              />
              <span
                aria-hidden="true"
                className={cn(
                  "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border",
                  checked ? "border-pine" : "border-stone",
                  variant === "card" && "sr-only"
                )}
              >
                {checked && <span className="bg-pine h-2 w-2 rounded-full" />}
              </span>
              <span className="font-body text-body text-charcoal">{option.label}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
