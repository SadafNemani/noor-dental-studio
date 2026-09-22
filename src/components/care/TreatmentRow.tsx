"use client";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

type TreatmentRowProps = {
  href?: string | null;
  onMouseEnter?: () => void;
  onFocus?: () => void;
  className?: string;
  children: React.ReactNode;
};

export default function TreatmentRow({
  href,
  onMouseEnter,
  onFocus,
  className,
  children,
}: TreatmentRowProps) {
  const base = cn("block border-t border-sand py-7 first:border-t-0 md:py-8", className);

  if (href) {
    return (
      <Link
        href={href}
        onMouseEnter={onMouseEnter}
        onFocus={onFocus}
        className={cn(base, "cursor-pointer")}
      >
        {children}
      </Link>
    );
  }
  return (
    <div onMouseEnter={onMouseEnter} className={cn(base, "cursor-default")}>
      {children}
    </div>
  );
}
