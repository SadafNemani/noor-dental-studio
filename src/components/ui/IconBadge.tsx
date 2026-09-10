import { cn } from "@/lib/cn";

type IconBadgeProps = {
  children: React.ReactNode;
  className?: string;
};

export default function IconBadge({ children, className }: IconBadgeProps) {
  return (
    <div
      className={cn(
        "bg-sand text-gold flex h-10 w-10 items-center justify-center rounded-full",
        className
      )}
    >
      {children}
    </div>
  );
}
