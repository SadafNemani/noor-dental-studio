import { IconArrowUpRight } from "@tabler/icons-react";
import { cn } from "@/lib/cn";

type IconComponent = React.ComponentType<{
  size?: number;
  strokeWidth?: number;
  className?: string;
}>;

type ActionCardProps = {
  href: string;
  icon: IconComponent;
  title: string;
  detail: React.ReactNode;
  tone?: "light" | "dark";
  external?: boolean;
};

export default function ActionCard({
  href,
  icon: Icon,
  title,
  detail,
  tone = "light",
  external = false,
}: ActionCardProps) {
  const dark = tone === "dark";

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "group rounded-card relative flex h-full min-h-45 cursor-pointer flex-col justify-between gap-8 overflow-hidden p-7 transition-all duration-500 ease-out",
        "hover:-translate-y-1 hover:shadow-[0_24px_48px_rgba(35,36,25,0.12)]",
        "focus-visible:outline-gold focus-visible:outline-2 focus-visible:outline-offset-4",
        dark ? "bg-pine text-ivory" : "text-charcoal shadow-soft bg-white"
      )}
    >
      <Icon size={40} strokeWidth={1.25} className="text-gold" aria-hidden="true" />
      <div className="pe-8">
        <p className={cn("font-heading text-h3 mb-1", dark ? "text-ivory" : "text-charcoal")}>
          {title}
        </p>
        <p className={cn("font-body text-body", dark ? "text-mist" : "text-stone")}>{detail}</p>
      </div>
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-e-6 top-6 opacity-60 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 rtl:group-hover:-translate-x-0.5",
          dark ? "text-gold" : "text-pine"
        )}
      >
        <IconArrowUpRight size={22} className="rtl:-scale-x-100" />
      </span>
    </a>
  );
}
