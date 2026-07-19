import type { ResearchResponse } from "../types";
import { RESEARCH_RESPONSES } from "./staticData";

// Static replay of real captured backend responses — see staticData.ts and the
// README "Why static" section for why this isn't a live fetch() anymore.
export async function fetchResearch(patient: {
  id?: string;
  conditions: string[];
  medications: string[];
  notes?: string;
}): Promise<ResearchResponse> {
  await new Promise((r) => setTimeout(r, 1800));

  const patientId = patient.id ?? "p1";
  return RESEARCH_RESPONSES[patientId] ?? RESEARCH_RESPONSES["p1"];
}
