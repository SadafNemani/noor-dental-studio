import { cn } from "@/lib/cn";

type EyebrowProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <p className={cn("font-body text-label text-gold tracking-wide uppercase", className)}>
      {children}
    </p>
  );
}
