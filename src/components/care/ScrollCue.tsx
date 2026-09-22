"use client";

export default function ScrollCue({ targetId, label }: { targetId: string; label: string }) {
  function handleClick() {
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="text-label text-stone mt-16 flex cursor-pointer items-center gap-2 tracking-wide uppercase transition-opacity hover:opacity-70"
    >
      {label}
      <span aria-hidden="true">↓</span>
    </button>
  );
}
