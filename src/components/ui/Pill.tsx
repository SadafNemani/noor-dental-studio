import { cn } from "@/lib/cn";

type PillProps = {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
};

export default function Pill({ children, icon, className }: PillProps) {
  return (
    <span
      className={cn(
        "text-label inline-flex items-center gap-1.5 rounded-full border border-current/30 px-3 py-1",
        className
      )}
    >
      {icon}
      {children}
    </span>
  );
}
