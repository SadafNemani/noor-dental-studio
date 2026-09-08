"use client";

import { useDirection } from "@/hooks/useDirection";

export default function Navbar() {
  const { isRTL } = useDirection();

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-8 py-4"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <span className="font-heading text-lg">Noor</span>

      <nav className="flex gap-6 text-sm">
        <span>Home</span>
        <span>Your Care</span>
        <span>About</span>
        <span>Contact</span>
      </nav>

      <div className="flex items-center gap-3">
        <span className="text-xs">EN / عربي</span>
        <span className="rounded-button bg-pine text-ivory px-4 py-2 text-xs">Book a visit</span>
      </div>
    </header>
  );
}
