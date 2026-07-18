import type { ScannedDocument } from "../types";

export async function scanDocument(file: File): Promise<ScannedDocument> {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch("http://localhost:8000/api/scan", {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error(`Scan request failed (${res.status})`);
  return res.json();
}
