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
    "group/row relative block py-7 first:pt-0 md:py-8 transition-opacity duration-300",
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
        <span aria-hidden="true" className="bg-sand absolute inset-x-0 top-0 h-px" />
        <span
          aria-hidden="true"
          className="origin-start bg-gold absolute inset-x-0 top-0 h-px scale-x-0 transition-transform duration-500 ease-out group-hover/row:scale-x-100"
        />
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
      <span aria-hidden="true" className="bg-sand absolute inset-x-0 top-0 h-px" />
      <span
        aria-hidden="true"
        className="origin-start bg-gold absolute inset-x-0 top-0 h-px scale-x-0 transition-transform duration-500 ease-out group-hover/row:scale-x-100"
      />
      {children}
    </div>
  );
}
