"use client";
import { SceneActiveProvider } from "@/context/SceneActiveContext";
import { cn } from "@/lib/cn";

type SceneProps = {
  background: "dark" | "light" | "image";
  image?: string;
  active?: boolean;
  layout?: "pinned" | "flow";
  children: React.ReactNode;
};

const bgClasses: Record<SceneProps["background"], string> = {
  dark: "bg-gradient-to-br from-pine-deep to-pine text-ivory",
  light: "bg-gradient-to-b from-ivory to-[#F3ECDF] text-charcoal",
  image: "bg-cover bg-center text-ivory",
};

export default function Scene({
  background,
  image,
  active = true,
  layout = "pinned",
  children,
}: SceneProps) {
  const layoutClasses =
    layout === "pinned"
      ? cn("absolute inset-0", active ? "opacity-100" : "opacity-0")
      : background === "image"
        ? "relative min-h-[80vh] py-16 md:min-h-[85vh] md:py-20"
        : "relative py-16 md:min-h-[85vh] md:py-20";

  return (
    <section
      className={cn(
        "scene flex w-full items-center overflow-hidden px-[8vw]",
        layoutClasses,
        bgClasses[background]
      )}
      style={background === "image" && image ? { backgroundImage: `url(${image})` } : undefined}
    >
      {background === "image" && <div className="bg-pine-deep/40 absolute inset-0" />}
      {layout === "pinned" ? (
        <SceneActiveProvider value={active}>
          <div className="relative z-10 w-full">{children}</div>
        </SceneActiveProvider>
      ) : (
        <div className="relative z-10 w-full">{children}</div>
      )}
    </section>
  );
}
