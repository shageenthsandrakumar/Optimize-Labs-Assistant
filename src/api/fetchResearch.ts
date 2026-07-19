import type { ResearchResponse } from "../types";
import { API_BASE_URL } from "./config";

export async function fetchResearch(patient: {
  id?: string;
  conditions: string[];
  medications: string[];
  notes?: string;
}): Promise<ResearchResponse> {
  const res = await fetch(`${API_BASE_URL}/api/research`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      conditions: patient.conditions,
      medications: patient.medications,
      notes: patient.notes ?? "",
    }),
  });
  if (!res.ok) throw new Error(`Research request failed (${res.status})`);
  return res.json();
}
