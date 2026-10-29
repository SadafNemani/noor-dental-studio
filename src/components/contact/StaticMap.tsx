import { IconArrowUpRight } from "@tabler/icons-react";

type StaticMapProps = {
  label: string;
  ariaLabel: string;
  address: string;
  directionsLabel: string;
  href: string;
};

export default function StaticMap({
  label,
  ariaLabel,
  address,
  directionsLabel,
  href,
}: StaticMapProps) {
  return (
    <div className="rounded-card shadow-soft overflow-hidden bg-white">
      <div role="img" aria-label={ariaLabel} className="relative aspect-16/11 w-full bg-[#F1EADC]">
        <svg viewBox="0 0 640 440" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <rect x="400" y="300" width="150" height="90" rx="20" className="fill-sage/25" />

          <path
            d="M430 0 C395 78 337 138 256 200 C176 260 94 296 0 318"
            className="stroke-gold/25 fill-none"
            strokeWidth="18"
          />
          <path
            d="M0 0 H430 C390 70 330 130 250 190 C170 250 90 285 0 305 Z"
            className="fill-pine/15"
          />
          <path
            d="M430 0 C390 70 330 130 250 190 C170 250 90 285 0 305"
            className="stroke-sage/60 fill-none"
            strokeWidth="2"
          />

          <g className="stroke-white" strokeWidth="6" strokeLinecap="round" fill="none">
            <path d="M93 312 L249 520" />
            <path d="M183 260 L339 468" />
            <path d="M273 195 L429 403" />
            <path d="M363 132 L519 340" />
            <path d="M463 50 L619 258" />
          </g>

          <g fill="none" strokeLinecap="round">
            <path
              d="M-20 345 C100 322 190 270 280 205 C370 140 470 60 560 0"
              className="stroke-sand"
              strokeWidth="18"
            />
            <path
              d="M-20 345 C100 322 190 270 280 205 C370 140 470 60 560 0"
              className="stroke-white"
              strokeWidth="13"
            />
            <path
              d="M0 395 C130 370 240 300 330 235 C430 163 540 85 640 20"
              className="stroke-sand"
              strokeWidth="12"
            />
            <path
              d="M0 395 C130 370 240 300 330 235 C430 163 540 85 640 20"
              className="stroke-white"
              strokeWidth="8"
            />
          </g>

          <circle
            cx="320"
            cy="210"
            r="14"
            className="fill-gold/40 origin-center transform-fill motion-safe:animate-ping"
          />
          <circle cx="320" cy="210" r="13" className="fill-gold" />
          <circle cx="320" cy="210" r="5" className="fill-ivory" />
        </svg>

        <span className="bg-pine font-body text-label text-ivory shadow-soft absolute top-[30%] left-1/2 -translate-x-1/2 rounded-full px-3 py-1.5">
          {label}
        </span>
      </div>

      <div className="flex items-center justify-between gap-4 p-5">
        <span className="font-body text-label text-stone">{address}</span>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-pine hover:text-charcoal inline-flex shrink-0 cursor-pointer items-center gap-1.5 text-sm font-medium transition-colors"
        >
          {directionsLabel}
          <IconArrowUpRight size={16} className="rtl:-scale-x-100" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
