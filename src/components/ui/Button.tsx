"use client";

import { type ReactNode } from "react";
import { IconArrowRight, IconArrowUpRight } from "@tabler/icons-react";
import { cn } from "@/lib/cn";
import { Link } from "@/i18n/navigation";

type ButtonVariant = "primary" | "secondary" | "tertiary";

type ButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  onClick?: () => void;
  href?: string;
  type?: "button" | "submit";
  className?: string;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "group inline-flex items-center gap-3 rounded-button bg-gold py-2 pe-2 ps-6 text-charcoal shadow-soft transition-transform duration-300 hover:-translate-y-0.5",
  tertiary:
    "group inline-flex items-center gap-2 rounded-button border border-current px-6 py-3 transition-colors duration-300 hover:bg-current/5",
  secondary: "group inline-flex items-center gap-1.5",
};

export default function Button({
  children,
  variant = "primary",
  onClick,
  href,
  type = "button",
  className,
}: ButtonProps) {
  const content =
    variant === "primary" ? (
      <>
        <span className="text-sm font-medium tracking-wide">{children}</span>
        <span className="bg-charcoal/10 group-hover:bg-charcoal/15 flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 group-hover:w-11">
          <IconArrowRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
          />
        </span>
      </>
    ) : variant === "tertiary" ? (
      <>
        <span className="text-sm font-medium tracking-wide">{children}</span>
        <IconArrowRight
          size={16}
          className="transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
        />
      </>
    ) : (
      <>
        <span className="text-sm font-medium tracking-wide">{children}</span>
        <IconArrowUpRight
          size={16}
          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100"
        />
      </>
    );

  const classes = cn(variantClasses[variant], className);

  if (href) {
    const isExternal = /^(https?:|tel:|mailto:)/.test(href);
    if (isExternal)
      return (
        <a href={href} className={classes}>
          {content}
        </a>
      );
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={classes}>
      {content}
    </button>
  );
}
