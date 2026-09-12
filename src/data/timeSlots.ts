export type TimeSlot = {
  id: string;
  period: "morning" | "afternoon" | "evening";
  time: string;
  available: boolean;
};

export const nextAvailableDate = "2026-09-15";

export const timeSlots: TimeSlot[] = [
  { id: "m1", period: "morning", time: "9:00 AM", available: true },
  { id: "m2", period: "morning", time: "10:15 AM", available: true },
  { id: "m3", period: "morning", time: "11:30 AM", available: false },
  { id: "a1", period: "afternoon", time: "1:00 PM", available: true },
  { id: "a2", period: "afternoon", time: "2:30 PM", available: true },
  { id: "a3", period: "afternoon", time: "3:45 PM", available: false },
  { id: "e1", period: "evening", time: "5:00 PM", available: true },
  { id: "e2", period: "evening", time: "6:15 PM", available: true },
];
