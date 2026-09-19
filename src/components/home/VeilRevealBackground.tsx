"use client";

export default function VeilRevealBackground({ image }: { image: string }) {
  return (
    <>
      <div
        className="invisalign-photo pointer-events-none absolute inset-0 bg-cover bg-position-[center_30%]"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="invisalign-veil from-ivory/80 via-pine/30 to-pine-deep/70 pointer-events-none absolute inset-0 bg-linear-to-br" />
      <div className="from-pine-deep/75 via-pine-deep/10 pointer-events-none absolute inset-0 bg-linear-to-t to-transparent" />
    </>
  );
}
