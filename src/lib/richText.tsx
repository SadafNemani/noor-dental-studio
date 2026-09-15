export const richText = {
  accent: (chunks: React.ReactNode) => <span className="text-gold">{chunks}</span>,

  em: (chunks: React.ReactNode) => <span className="approach-word">{chunks}</span>,

  br: () => <br />,
};
