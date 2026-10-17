export type TimeSlot = {
  id: string;
  period: "morning" | "afternoon" | "evening";
  time: string;
  available: boolean;
};

export const nextAvailableDate = "2026-09-15";

export const timeSlots: TimeSlot[] = [
  { id: "m1", period: "morning", time: "09:00", available: true },
  { id: "m2", period: "morning", time: "10:15", available: true },
  { id: "m3", period: "morning", time: "11:30", available: false },
  { id: "a1", period: "afternoon", time: "13:00", available: true },
  { id: "a2", period: "afternoon", time: "14:30", available: true },
  { id: "a3", period: "afternoon", time: "15:45", available: false },
  { id: "e1", period: "evening", time: "17:00", available: true },
  { id: "e2", period: "evening", time: "18:15", available: true },
];
