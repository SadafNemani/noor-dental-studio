// src/lib/cn.ts
import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "text-color": [
        {
          text: [
            "ivory",
            "white",
            "pine",
            "pine-deep",
            "gold",
            "charcoal",
            "stone",
            "mist",
            "sand",
            "sage",
            "error",
          ],
        },
      ],
      "font-size": [
        {
          text: ["h1", "h2", "h3", "body", "label"],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
