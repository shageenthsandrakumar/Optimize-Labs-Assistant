import type { ScannedDocument } from "../types";
import { API_BASE_URL } from "./config";

export async function scanDocument(file: File): Promise<ScannedDocument> {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch(`${API_BASE_URL}/api/scan`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error(`Scan request failed (${res.status})`);
  return res.json();
}
