import { cn } from "@/lib/cn";

type LegendProps = { children: React.ReactNode; hint?: string; className?: string };

export default function Legend({ children, hint, className }: LegendProps) {
  return (
    <legend className={cn("mb-8 block w-full", className)}>
      <span className="font-heading text-charcoal block text-[clamp(1.6rem,2.6vw,2.25rem)] leading-[1.15] font-medium text-balance">
        {children}
      </span>
      {hint && (
        <span className="font-body text-body text-stone mt-3 block leading-[1.6]">{hint}</span>
      )}
    </legend>
  );
}
