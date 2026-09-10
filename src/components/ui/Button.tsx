import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "ghost";

type ButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  onClick?: () => void;
  href?: string;
  type?: "button" | "submit";
  className?: string;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-pine text-ivory hover:bg-pine-deep",
  ghost: "border border-current text-current hover:bg-ivory/10",
};

export default function Button({
  children,
  variant = "primary",
  onClick,
  href,
  type = "button",
  className,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center gap-2 rounded-button px-6 py-3 text-label transition-color duration-300",
    variantClasses[variant],
    className
  );

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
