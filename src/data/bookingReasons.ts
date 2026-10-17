export const reasonKeys = ["improveSmile", "careForTeeth", "nervous", "needHelpToday"] as const;
export type ReasonKey = (typeof reasonKeys)[number];

export function isReasonKey(value: unknown): value is ReasonKey {
  return typeof value === "string" && (reasonKeys as readonly string[]).includes(value);
}
