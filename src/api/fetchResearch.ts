import type { ResearchResponse } from "../types";
import { MOCK_RESEARCH_RESPONSES } from "../data/mockResearchResponses";

export async function fetchResearch(patient: {
  id?: string;
  conditions: string[];
  medications: string[];
  notes?: string;
}): Promise<ResearchResponse> {
  // MOCK — replace with a real fetch() when backend is ready:
  // const res = await fetch("http://localhost:8000/api/research", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({
  //     conditions: patient.conditions,
  //     medications: patient.medications,
  //     notes: patient.notes ?? "",
  //   }),
  // });
  // return res.json();

  await new Promise((r) => setTimeout(r, 2500));

  const patientId = patient.id ?? "p1";
  return (
    MOCK_RESEARCH_RESPONSES[patientId] ?? MOCK_RESEARCH_RESPONSES["p1"]
  );
}
