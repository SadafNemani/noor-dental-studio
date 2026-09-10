import { cn } from "@/lib/cn";

type TextProps = {
  children: React.ReactNode;
  as?: "p" | "span";
  muted?: boolean;
  className?: string;
};

export default function Text({ children, as: Tag = "p", muted, className }: TextProps) {
  return (
    <Tag className={cn("font-body text-body", muted && "text-stone", className)}>{children}</Tag>
  );
}
