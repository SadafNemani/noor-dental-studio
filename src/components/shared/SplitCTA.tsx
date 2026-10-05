"use client";

import Arrive from "../motion/Arrive";
import Heading from "../typography/Heading";
import Text from "../typography/Text";
import Button from "../ui/Button";

type SplitCTAProps = {
  image: string;
  heading: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
};

export default function SplitCTA({ image, heading, body, ctaLabel, ctaHref }: SplitCTAProps) {
  return (
    <div className="rounded-card grid grid-cols-1 overflow-hidden md:grid-cols-2">
      <div
        className="aspect-4/3 bg-cover bg-center md:aspect-auto"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="bg-pine flex flex-col justify-center p-10 md:p-14">
        <Arrive>
          <Heading size="h2" className="text-gold mb-4">
            {heading}
          </Heading>
          <Text className="text-mist mb-8 max-w-90">{body}</Text>
          <Button href={ctaHref} className="bg-ivory text-charcoal hover:bg-ivory/90 w-fit">
            {ctaLabel}
          </Button>
        </Arrive>
      </div>
    </div>
  );
}
