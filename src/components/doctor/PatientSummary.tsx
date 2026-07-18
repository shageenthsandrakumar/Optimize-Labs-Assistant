import type { Patient } from "../../types";
import { MOCK_PATIENT_SUMMARIES } from "../../data/mockPatientSummaries";

interface PatientSummaryProps {
  patient: Patient;
}

function statusColor(status: "normal" | "warning" | "critical"): string {
  if (status === "critical") return "bg-red-50 text-red-700 border-red-200";
  if (status === "warning") return "bg-amber-50 text-amber-700 border-amber-200";
  return "bg-emerald-50 text-emerald-700 border-emerald-200";
}

function statusDot(status: "normal" | "warning" | "critical"): string {
  if (status === "critical") return "bg-red-400";
  if (status === "warning") return "bg-amber-400";
  return "bg-emerald-400";
}

export default function PatientSummary({ patient }: PatientSummaryProps) {
  const data = MOCK_PATIENT_SUMMARIES[patient.id];
  if (!data) return null;

  return (
    <div className="space-y-5">
      <div>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-800">{patient.label}</h2>
            <div className="flex gap-1.5 mt-0.5">
              {patient.conditions.map((c) => (
                <span key={c} className="px-2 py-0.5 bg-amber-50 text-amber-700 text-xs rounded-full border border-amber-200">{c}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Clinical Summary</h3>
          <p className="text-sm text-slate-700 leading-relaxed">{data.summary}</p>
        </div>
      </div>

      <div>
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Key Vitals & Markers</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {data.vitals.map((v) => (
            <div key={v.label} className={`rounded-lg border p-3 ${statusColor(v.status)}`}>
              <div className="flex items-center gap-1.5 mb-1">
                <span className={`w-1.5 h-1.5 rounded-full ${statusDot(v.status)}`} />
                <span className="text-xs font-medium opacity-75">{v.label}</span>
              </div>
              <p className="text-lg font-semibold">{v.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Recent History</h3>
        <div className="space-y-1.5">
          {data.recentHistory.map((item, i) => (
            <div key={i} className="flex gap-2 text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5 flex-shrink-0" />
              <span className="text-slate-600">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
