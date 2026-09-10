import { cn } from "@/lib/cn";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Card({ children, className }: CardProps) {
  return <div className={cn("rounded-card shadow-soft bg-white p-6", className)}>{children}</div>;
}
