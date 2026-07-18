import type { Patient } from "../../types";
import { DEMO_PATIENTS } from "../../data/patients";

interface PatientRosterProps {
  selected: Patient | null;
  onSelect: (patient: Patient) => void;
}

export default function PatientRoster({
  selected,
  onSelect,
}: PatientRosterProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-3 border-b border-slate-200">
        <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Patient Roster
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          {DEMO_PATIENTS.length} patients
        </p>
      </div>
      <div className="flex-1 overflow-y-auto">
        {DEMO_PATIENTS.map((patient) => {
          const isSelected = selected?.id === patient.id;
          return (
            <button
              key={patient.id}
              onClick={() => onSelect(patient)}
              className={`w-full text-left px-4 py-3 border-b border-slate-100 transition-colors cursor-pointer ${
                isSelected
                  ? "bg-teal-50 border-l-3 border-l-teal-500"
                  : "hover:bg-slate-50"
              }`}
            >
              <p
                className={`text-sm font-medium ${
                  isSelected ? "text-teal-800" : "text-slate-700"
                }`}
              >
                {patient.label}
              </p>
              <div className="flex flex-wrap gap-1 mt-1.5">
                {patient.conditions.map((c) => (
                  <span
                    key={c}
                    className="px-1.5 py-0.5 bg-amber-50 text-amber-700 text-[10px] rounded border border-amber-200 leading-tight"
                  >
                    {c}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-1 mt-1">
                {patient.medications.map((m) => (
                  <span
                    key={m}
                    className="px-1.5 py-0.5 bg-blue-50 text-blue-600 text-[10px] rounded border border-blue-200 leading-tight"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
