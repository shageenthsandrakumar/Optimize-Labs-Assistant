export type UserRole = "doctor" | "patient";

export interface Patient {
  id: string;
  label: string;
  conditions: string[];
  medications: string[];
}

export interface Match {
  source: string;
  external_id: string;
  title: string;
  url: string;
  published_date: string;
  relevance_score: number;
  relevance_reasoning: string;
}

export interface ResearchResponse {
  query_terms: string[];
  matches: Match[];
}

export interface ScannedDocument {
  id: string;
  fileName: string;
  uploadedAt: string;
  extractedText: string;
  status: "processing" | "done" | "error";
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}
