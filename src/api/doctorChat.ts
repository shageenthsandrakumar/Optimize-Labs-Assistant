import type { Patient } from "../types";

export async function doctorChatRespond(
  message: string,
  patient: Patient,
  context?: string[]
): Promise<string> {
  const res = await fetch("http://localhost:8000/api/doctor-chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message,
      patient_id: patient.id,
      conditions: patient.conditions,
      medications: patient.medications,
      context: context ?? [],
    }),
  });
  if (!res.ok) throw new Error(`Doctor chat request failed (${res.status})`);
  const data = await res.json();
  return data.response;
}
