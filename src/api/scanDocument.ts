import type { ScannedDocument } from "../types";
import { MOCK_OCR_TEXTS } from "../data/mockOcrResults";

let mockIndex = 0;

export async function scanDocument(file: File): Promise<ScannedDocument> {
  // MOCK — replace with a real fetch() when OCR backend is ready:
  // const formData = new FormData();
  // formData.append("file", file);
  // const res = await fetch("http://localhost:8000/api/scan", {
  //   method: "POST",
  //   body: formData,
  // });
  // return res.json();

  await new Promise((r) => setTimeout(r, 2000));

  const text = MOCK_OCR_TEXTS[mockIndex % MOCK_OCR_TEXTS.length];
  mockIndex++;

  return {
    id: crypto.randomUUID(),
    fileName: file.name,
    uploadedAt: new Date().toISOString(),
    extractedText: text,
    status: "done",
  };
}
