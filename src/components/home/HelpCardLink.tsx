"use client";

import { IconArrowUpRight } from "@tabler/icons-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

type HelpCardLinkProps = {
  href: string;
  className?: string;
  arrowClassName?: string;
  children: React.ReactNode;
};

export default function HelpCardLink({
  href,
  className,
  arrowClassName,
  children,
}: HelpCardLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group/card rounded-card relative block h-full cursor-pointer overflow-hidden transition-all duration-500 ease-out",
        "hover:-translate-y-1 hover:shadow-[0_24px_48px_rgba(35,36,25,)0.12]",
        "focus-visible:outline-gold focus-visible:outline-2 focus-visible:outline-offset-4",
        className
      )}
    >
      {children}
      <span
        aria-hidden="true"
        className={cn(
          "text-pine pointer-events-none absolute inset-e-5 top-5 opacity-60 transition-all duration-300",
          "group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 group-hover/card:opacity-100 rtl:group-hover/card:-translate-x-0.5",
          arrowClassName
        )}
      >
        <IconArrowUpRight size={22} className="rtl:-scale-x-100" />
      </span>
    </Link>
  );
}
