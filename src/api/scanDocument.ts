import type { ScannedDocument } from "../types";
import { SCAN_RESPONSE } from "./staticData";

// Static replay of a real captured OCR response — see staticData.ts.
export async function scanDocument(file: File): Promise<ScannedDocument> {
  await new Promise((r) => setTimeout(r, 1500));

  return {
    ...SCAN_RESPONSE,
    id: crypto.randomUUID(),
    fileName: file.name,
    uploadedAt: new Date().toISOString(),
  };
}
