import SparkleDraw from "@/components/motion/icons/SparkleDraw";
import ToothDraw from "@/components/motion/icons/ToothDraw";
import HeartHandshakeDraw from "@/components/motion/icons/HeartHandshakeDraw";
import ClockDraw from "@/components/motion/icons/ClockDraw";

export const helpCards = [
  { key: "improveSmile", icon: SparkleDraw, layout: "wide", href: "/your-care" },
  { key: "careForTeeth", icon: ToothDraw, layout: "tall", href: "/booking?reason=careForTeeth" },
  { key: "nervous", icon: HeartHandshakeDraw, layout: "ghost", href: "/first-visit" },
  {
    key: "needHelpToday",
    icon: ClockDraw,
    layout: "compact",
    href: "/booking?reason=needHelpToday",
  },
] as const;
