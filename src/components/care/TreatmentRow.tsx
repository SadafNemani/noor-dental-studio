"use client";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

type TreatmentRowProps = {
  href?: string | null;
  isActive?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  className?: string;
  children: React.ReactNode;
};

export default function TreatmentRow({
  href,
  isActive,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  className,
  children,
}: TreatmentRowProps) {
  const base = cn(
    "block border-t border-sand py-7 first:border-t-0 md:py-8 transition-opacity duration-300",
    isActive === false && "opacity-60",
    className
  );

  if (href) {
    return (
      <Link
        href={href}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onFocus={onFocus}
        onBlur={onBlur}
        className={cn(base, "cursor-pointer")}
      >
        {children}
      </Link>
    );
  }
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={cn(base, "cursor-default")}
    >
      {children}
    </div>
  );
}
