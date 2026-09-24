export type Treatment = {
  slug: "invisalign" | "smileDesign" | "whitening";
  image: string;
  href: string | null;
};

export const treatments: Treatment[] = [
  {
    slug: "invisalign",
    image: "/images/care-invisalign.webp",
    href: "/your-care/invisalign",
  },
  { slug: "smileDesign", image: "/images/care-smile-design.webp", href: null },
  { slug: "whitening", image: "/images/care-whitening.webp", href: null },
];
