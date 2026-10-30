"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { IconSparkles, IconX } from "@tabler/icons-react";
import { useHasMounted } from "@/hooks/useHasMounted";

const STORAGE_KEY = "noor-demo-banner-dismissed";
const PORTFOLIO_URL = "https://sadafnemani.netlify.app";

function readDismissed() {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

export default function DemoBanner() {
  const t = useTranslations("demoBanner");
  const hasMounted = useHasMounted();
  const [dismissed, setDismissed] = useState(() => readDismissed());

  function dismiss() {
    try {
      sessionStorage.setItem(STORAGE_KEY, "true");
    } catch {}
    setDismissed(true);
  }

  if (!hasMounted || dismissed) return null;

  return (
    <div
      role="region"
      aria-label={t("label")}
      className="bg-charcoal/95 fixed inset-x-3 bottom-3 z-90 mx-auto flex max-w-160 items-center gap-3 rounded-3xl py-2.5 ps-5 pe-2.5 shadow-[0_16px_40px_rgba(24.38.32.0.35)] backdrop-blur-md"
    >
      <IconSparkles size={16} className="text-gold hidden shrink-0 sm:block" aria-hidden="true" />
      <p className="font-body text-ivory flex-1 text-[13px] leading-snug">
        {t.rich("text", { b: (chunks) => <span className="font-semibold">{chunks}</span> })}{" "}
        <a
          href={PORTFOLIO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gold hover:text-gold/80 font-semibold underline underline-offset-2 transition-colors"
        >
          {t("cta")}
        </a>
      </p>
      <button
        type="button"
        onClick={dismiss}
        aria-label={t("dismiss")}
        className="text-ivory/70 hover:bg-ivory/10 hover:text-ivory focus-visible:outline-gold flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors focus-visible:outline-2"
      >
        <IconX size={16} aria-hidden="true" />
      </button>
    </div>
  );
}
