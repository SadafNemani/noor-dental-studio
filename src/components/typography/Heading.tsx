import { cn } from "@/lib/cn";

type HeadingTag = "h1" | "h2" | "h3";
type HeadingSize = "h1" | "h2" | "h3";

type HeadingProps = {
  children: React.ReactNode;
  as?: HeadingTag;
  size?: HeadingSize;
  className?: string;
};

export default function Heading({ children, as, size, className }: HeadingProps) {
  const Tag = as ?? size ?? "h2";
  const visualSize = size ?? as ?? "h2";

  return <Tag className={cn("font-heading", `text-${visualSize}`, className)}>{children}</Tag>;
}
