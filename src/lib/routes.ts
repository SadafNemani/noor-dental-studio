export const routes = {
  home: { path: "/" },
  yourCare: { path: "/your-care" },
  invisalign: { path: "/your-care/invisalign" },
  firstVisit: { path: "/first-visit" },
  about: { path: "/about" },
  booking: { path: "/booking" },
  contact: { path: "/contact" },
} as const;

export type PageKey = keyof typeof routes;
