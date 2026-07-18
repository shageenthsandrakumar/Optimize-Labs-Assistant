import { useState, useRef } from "react";
import type { ScannedDocument } from "../../types";
import { scanDocument } from "../../api/scanDocument";
import DocumentList from "./DocumentList";

export default function DocumentScanner() {
  const [documents, setDocuments] = useState<ScannedDocument[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFiles(files: FileList | null) {
    if (!files) return;

    for (const file of Array.from(files)) {
      const placeholder: ScannedDocument = {
        id: crypto.randomUUID(),
        fileName: file.name,
        uploadedAt: new Date().toISOString(),
        extractedText: "",
        status: "processing",
      };
      setDocuments((prev) => [placeholder, ...prev]);

      try {
        const result = await scanDocument(file);
        setDocuments((prev) =>
          prev.map((d) => (d.id === placeholder.id ? { ...result, id: placeholder.id } : d))
        );
      } catch {
        setDocuments((prev) =>
          prev.map((d) =>
            d.id === placeholder.id ? { ...d, status: "error" as const } : d
          )
        );
      }
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragOver(false);
    handleFiles(e.dataTransfer.files);
  }

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-3">
        Scan Documents
      </h2>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
          isDragOver
            ? "border-teal-400 bg-teal-50"
            : "border-slate-300 hover:border-teal-300 hover:bg-slate-50"
        }`}
      >
        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <svg
            className="w-6 h-6 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <p className="text-sm font-medium text-slate-600 mb-1">
          Drop files here or click to upload
        </p>
        <p className="text-xs text-slate-400">
          Supports images (JPG, PNG) and PDFs
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,.pdf"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      <div className="mt-4 flex-1 overflow-y-auto min-h-0">
        <DocumentList documents={documents} />
      </div>
    </div>
  );
}
