export const richText = {
  accent: (chunks: React.ReactNode) => <span className="text-gold">{chunks}</span>,

  accent2: (chunks: React.ReactNode) => <span className="text-pine italic">{chunks}</span>,

  em: (chunks: React.ReactNode) => <span className="approach-word">{chunks}</span>,

  br: () => <br />,
};
