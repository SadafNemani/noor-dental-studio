import { cn } from "@/lib/cn";

type QuoteProps = {
  children: React.ReactNode;
  attribution?: string;
  align?: "left" | "center";
  className?: string;
};

export default function Quote({ children, attribution, align = "center", className }: QuoteProps) {
  return (
    <blockquote className={cn(align === "center" && "text-center", className)}>
      <p className="font-heading text-h2 leading-snug">&quot;{children}&quot;</p>
      {attribution && <p className="font-body text-label text-stone mt-6">{attribution}</p>}
    </blockquote>
  );
}
