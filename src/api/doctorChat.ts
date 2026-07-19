import type { Patient } from "../types";
import { DOCTOR_CHAT_RESPONSES, DOCTOR_CHAT_FALLBACK } from "./staticData";

// Static replay of real captured doctor-chat responses — see staticData.ts.
export async function doctorChatRespond(
  message: string,
  patient: Patient,
  _context?: string[]
): Promise<string> {
  await new Promise((r) => setTimeout(r, 1100));

  const lower = message.toLowerCase();

  for (const entry of DOCTOR_CHAT_RESPONSES) {
    const keywordMatch = entry.keywords.some((kw) => lower.includes(kw));
    if (!keywordMatch) continue;
    if (entry.patientIds && !entry.patientIds.includes(patient.id)) continue;
    return entry.response;
  }

  for (const entry of DOCTOR_CHAT_RESPONSES) {
    if (entry.patientIds) continue;
    if (entry.keywords.some((kw) => lower.includes(kw))) {
      return entry.response;
    }
  }

  return DOCTOR_CHAT_FALLBACK;
}
