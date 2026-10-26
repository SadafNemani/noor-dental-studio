"use client";
import { IconCheck } from "@tabler/icons-react";
import Legend from "./Legend";
import { cn } from "@/lib/cn";

type IconComponent = React.ComponentType<{ size?: number; className?: string }>;
type Option = { value: string; label: string; icon?: IconComponent };

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
    <fieldset className={cn("min-w-0", className)}>
      <Legend>{legend}</Legend>
      <div
        className={cn(
          variant === "card" ? "grid grid-cols-2 gap-4 sm:grid-cols-2" : "flex flex-col gap-2"
        )}
      >
        {options.map((option) => {
          const checked = value === option.value;
          const Icon = option.icon;

          return (
            <label
              key={option.label}
              className={cn(
                "relative cursor-pointer transition-all duration-300",
                variant === "card"
                  ? "rounded-card has-focus-visible:ring-gold flex min-h-37 flex-col items-start justify-between gap-6 p-6 text-start ring-inset has-focus-visible:ring-2"
                  : "rounded-button-sm flex items-center gap-2.5 px-4 py-2.5 ring-1 ring-inset",
                checked
                  ? variant === "card"
                    ? "bg-pine/5 ring-pine ring-2"
                    : "bg-pine/5 ring-pine"
                  : variant === "card"
                    ? "ring-charcoal/15 hover:ring-gold/70 bg-white ring-1 hover:-translate-y-0.5"
                    : "ring-charcoal/15 hover:ring-stone bg-white"
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

              {variant === "card" ? (
                <>
                  {Icon && (
                    <Icon
                      size={44}
                      className={cn(
                        "transition-colors duration-300",
                        checked ? "text-pine" : "text-gold"
                      )}
                    />
                  )}
                  <span className="font-heading text-charcoal text-[1.3rem] leading-snug">
                    {option.label}
                  </span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "bg-pine text-ivory absolute inset-e-4 top-4 flex h-6 w-6 items-center justify-center rounded-full transition-all duration-300",
                      checked ? "scale-100 opacity-100" : "scale-50 opacity-0"
                    )}
                  >
                    <IconCheck size={14} strokeWidth={2.5} />
                  </span>
                </>
              ) : (
                <>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border",
                      checked ? "border-pine" : "border-stone"
                    )}
                  >
                    {checked && <span className="bg-pine h-2 w-2 rounded-full" />}
                  </span>
                  <span className="font-body text-body text-charcoal">{option.label}</span>
                </>
              )}

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
