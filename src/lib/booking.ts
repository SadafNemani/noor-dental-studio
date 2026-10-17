export function getNextAvailableDate(from: Date = new Date()): Date {
  const d = new Date(from);
  d.setDate(d.getDate() + 1);
  while (d.getDay() === 0) d.setDate(d.getDate() + 1);
  return d;
}

export function formatDay(date: Date, locale: string) {
  return new Intl.DateTimeFormat(locale, { weekday: "long", month: "long", day: "numeric" }).format(
    date
  );
}

export function formatSlotTime(time: string, locale: string) {
  const [h, m] = time.split(":").map(Number);
  return new Intl.DateTimeFormat(locale, { hour: "numeric", minute: "2-digit" }).format(
    new Date(2000, 0, 1, h, m)
  );
}
