import {
  MOCK_DOCTOR_CHAT_RESPONSES,
  DOCTOR_FALLBACK_RESPONSE,
} from "../data/mockDoctorChatResponses";

export async function doctorChatRespond(
  message: string,
  patientId: string,
  _context?: string[]
): Promise<string> {
  // MOCK — replace with a real fetch() when backend is ready:
  // const res = await fetch("http://localhost:8000/api/doctor-chat", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ message, patient_id: patientId, context }),
  // });
  // const data = await res.json();
  // return data.response;

  await new Promise((r) => setTimeout(r, 1200));

  const lower = message.toLowerCase();

  for (const entry of MOCK_DOCTOR_CHAT_RESPONSES) {
    const keywordMatch = entry.keywords.some((kw) => lower.includes(kw));
    if (!keywordMatch) continue;
    if (entry.patientIds && !entry.patientIds.includes(patientId)) continue;
    return entry.response;
  }

  for (const entry of MOCK_DOCTOR_CHAT_RESPONSES) {
    if (entry.patientIds) continue;
    if (entry.keywords.some((kw) => lower.includes(kw))) {
      return entry.response;
    }
  }

  return DOCTOR_FALLBACK_RESPONSE;
}
