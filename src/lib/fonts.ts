import { Fraunces, Inter, Markazi_Text, IBM_Plex_Sans_Arabic } from "next/font/google";

export const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-heading-en",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body-en",
  display: "swap",
});

export const markaziText = Markazi_Text({
  subsets: ["arabic"],
  weight: ["500", "600"],
  variable: "--font-heading-ar",
  display: "swap",
});

export const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500"],
  variable: "--font-body-ar",
  display: "swap",
});
