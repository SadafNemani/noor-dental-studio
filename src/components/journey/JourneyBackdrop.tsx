type JourneyBackdropProps = {
  images: readonly string[];
  staticIndex?: number;
};

export default function JourneyBackdrop({ images, staticIndex }: JourneyBackdropProps) {
  const isStatic = staticIndex !== undefined;
  return (
    <div aria-hidden="true" className="bg-pine-deep absolute inset-0 overflow-hidden">
      {images.map((src, i) => {
        const shown = isStatic ? i === staticIndex : i === 0;

        return (
          <div
            key={src}
            className="journey-layer absolute inset-0 bg-cover bg-center will-change-[transform,filter]"
            style={{ backgroundImage: `url(${src})`, opacity: shown ? 1 : 0 }}
          />
        );
      })}
      <div className="from-pine-deep/85 via-pine-deep/40 to-pine-deep/60 absolute inset-0 bg-linear-to-t" />
    </div>
  );
}
