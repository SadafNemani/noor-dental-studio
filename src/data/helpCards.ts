import SparkleDraw from "@/components/motion/icons/SparkleDraw";
import ToothDraw from "@/components/motion/icons/ToothDraw";
import HeartHandshakeDraw from "@/components/motion/icons/HeartHandshakeDraw";
import ClockDraw from "@/components/motion/icons/ClockDraw";

export const helpCards = [
  { key: "improveSmile", icon: SparkleDraw, layout: "wide" },
  { key: "careForTeeth", icon: ToothDraw, layout: "tall" },
  { key: "nervous", icon: HeartHandshakeDraw, layout: "ghost" },
  { key: "needHelpToday", icon: ClockDraw, layout: "compact" },
] as const;
