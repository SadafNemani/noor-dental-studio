"use client";

import { SceneActiveProvider } from "@/context/SceneActiveContext";

type SceneProps = {
  background: "dark" | "light" | "image";
  image?: string;
  active?: boolean;
  children: React.ReactNode;
};

const bgClasses: Record<SceneProps["background"], string> = {
  dark: "bg-gradient-to-br from-pine-deep to-pine text-ivory",
  light: "bg-white text-charcoal",
  image: "bg-cover bg-center text-ivory",
};

export default function Scene({ background, image, active = true, children }: SceneProps) {
  return (
    <section
      className={`scene absolute inset-0 flex items-center overflow-hidden px-[8vw] opacity-0 ${bgClasses[background]}`}
      style={background === "image" && image ? { backgroundImage: `url(${image})` } : undefined}
    >
      {background === "image" && <div className="bg-pine-deep/40 absolute inset-0" />}
      <SceneActiveProvider value={active}>
        <div className="relative z-10 w-full">{children}</div>
      </SceneActiveProvider>
    </section>
  );
}
