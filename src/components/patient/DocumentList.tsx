import { useState } from "react";
import type { ScannedDocument } from "../../types";

interface DocumentListProps {
  documents: ScannedDocument[];
}

function DocumentItem({ doc }: { doc: ScannedDocument }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
      <button
        onClick={() => doc.status === "done" && setExpanded(!expanded)}
        className={`w-full p-3 flex items-center gap-3 text-left ${
          doc.status === "done" ? "cursor-pointer hover:bg-slate-50" : ""
        }`}
      >
        <div className="flex-shrink-0">
          {doc.status === "processing" ? (
            <svg
              className="animate-spin h-5 w-5 text-teal-500"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
          ) : doc.status === "error" ? (
            <svg
              className="w-5 h-5 text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ) : (
            <svg
              className="w-5 h-5 text-emerald-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-700 truncate">
            {doc.fileName}
          </p>
          <p className="text-xs text-slate-400">
            {new Date(doc.uploadedAt).toLocaleString()}
          </p>
        </div>

        <span
          className={`flex-shrink-0 px-2 py-0.5 text-xs rounded-full font-medium ${
            doc.status === "processing"
              ? "bg-amber-100 text-amber-700"
              : doc.status === "error"
              ? "bg-red-100 text-red-700"
              : "bg-emerald-100 text-emerald-700"
          }`}
        >
          {doc.status === "processing"
            ? "Processing..."
            : doc.status === "error"
            ? "Error"
            : "Done"}
        </span>

        {doc.status === "done" && (
          <svg
            className={`w-4 h-4 text-slate-400 transition-transform ${
              expanded ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        )}
      </button>

      {expanded && doc.status === "done" && (
        <div className="border-t border-slate-100 bg-slate-50 p-4">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
            Extracted Text
          </p>
          <pre className="text-xs text-slate-600 whitespace-pre-wrap font-mono bg-white p-3 rounded-lg border border-slate-200 max-h-48 overflow-y-auto">
            {doc.extractedText}
          </pre>
        </div>
      )}
    </div>
  );
}

export default function DocumentList({ documents }: DocumentListProps) {
  if (documents.length === 0) {
    return (
      <p className="text-sm text-slate-400 text-center py-6">
        No documents uploaded yet.
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {documents.map((doc) => (
        <DocumentItem key={doc.id} doc={doc} />
      ))}
    </div>
  );
}
