export type TreatmentAspect = "tall" | "wide" | "crop";

export type Treatment = {
  slug: "invisalign" | "smileDesign" | "whitening";
  image: string;
  aspect: TreatmentAspect;
  href: string | null;
};

export const treatments: Treatment[] = [
  {
    slug: "invisalign",
    image: "/images/care-invisalign.jpg",
    aspect: "tall",
    href: "/your-care/invisalign",
  },
  { slug: "smileDesign", image: "/images/care-smile-design.jpg", aspect: "wide", href: null },
  { slug: "whitening", image: "/images/care-whitening.jpg", aspect: "crop", href: null },
];
