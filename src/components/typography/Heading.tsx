import { cn } from "@/lib/cn";

type HeadingTag = "h1" | "h2" | "h3";
type HeadingSize = "h1" | "h2" | "h3";

type HeadingProps = {
  children: React.ReactNode;
  as?: HeadingTag;
  size?: HeadingSize;
  className?: string;
};

const sizeClasses: Record<HeadingSize, string> = {
  h1: "text-h1",
  h2: "text-h2",
  h3: "text-h3",
};

const weightClasses: Record<HeadingSize, string> = {
  h1: "font-semibold",
  h2: "font-semibold",
  h3: "font-medium",
};

export default function Heading({ children, as, size, className }: HeadingProps) {
  const Tag = as ?? size ?? "h2";
  const visualSize = size ?? as ?? "h2";

  return (
    <Tag
      className={cn("font-heading", sizeClasses[visualSize], weightClasses[visualSize], className)}
    >
      {children}
    </Tag>
  );
}
