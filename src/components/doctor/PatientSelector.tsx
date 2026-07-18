import type { Patient } from "../../types";
import { DEMO_PATIENTS } from "../../data/patients";

interface PatientSelectorProps {
  selected: Patient | null;
  onSelect: (patient: Patient) => void;
}

export default function PatientSelector({
  selected,
  onSelect,
}: PatientSelectorProps) {
  return (
    <div>
      <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-3">
        Select a Patient
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {DEMO_PATIENTS.map((patient) => {
          const isSelected = selected?.id === patient.id;
          return (
            <button
              key={patient.id}
              onClick={() => onSelect(patient)}
              className={`text-left p-4 rounded-xl border-2 transition-all cursor-pointer ${
                isSelected
                  ? "border-teal-500 bg-teal-50 shadow-md"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
              }`}
            >
              <p className="font-semibold text-slate-800 mb-2">
                {patient.label}
              </p>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-slate-400 mb-1">Conditions</p>
                  <div className="flex flex-wrap gap-1">
                    {patient.conditions.map((c) => (
                      <span
                        key={c}
                        className="px-2 py-0.5 bg-amber-50 text-amber-700 text-xs rounded-full border border-amber-200"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-1">Medications</p>
                  <div className="flex flex-wrap gap-1">
                    {patient.medications.map((m) => (
                      <span
                        key={m}
                        className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-full border border-blue-200"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
