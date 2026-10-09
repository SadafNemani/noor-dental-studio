import { cn } from "@/lib/cn";

export default function JourneyBackdrop({
  images,
  activeIndex,
}: {
  images: readonly string[];
  activeIndex: number;
}) {
  return (
    <div aria-hidden="true" className="bg-pine-deep absolute inset-0 overflow-hidden">
      {images.map((src, i) => (
        <div
          key={src}
          className={cn(
            "absolute inset-0 bg-cover bg-center transition-[opacity,transform] duration-1400 ease-out motion-reduce:transition-none",
            i === activeIndex && "scale-100 opacity-100",
            i < activeIndex && "scale-[1.15] opacity-0",
            i > activeIndex && "scale-[0.92] opacity-0"
          )}
          style={{ backgroundImage: `url(${src})` }}
        />
      ))}
      <div className="from-pine-deep/85 via-pine-deep/40 to-pine-deep/60 absolute inset-0 bg-linear-to-t" />
    </div>
  );
}
