import { useState } from "react";
import type { Patient } from "../types";
import Header from "../components/shared/Header";
import PatientRoster from "../components/doctor/PatientRoster";
import PatientSummary from "../components/doctor/PatientSummary";
import DoctorChatAssistant from "../components/doctor/DoctorChatAssistant";

export default function DoctorView() {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  return (
    <div className="h-screen flex flex-col bg-slate-50">
      <Header role="doctor" userName="Dr. Smith" />

      <div className="flex-1 flex overflow-hidden">
        {/* Roster sidebar */}
        <aside className="w-64 flex-shrink-0 bg-white border-r border-slate-200 overflow-y-auto">
          <PatientRoster
            selected={selectedPatient}
            onSelect={setSelectedPatient}
          />
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          {selectedPatient ? (
            <div className="max-w-4xl mx-auto p-6 space-y-6">
              <PatientSummary patient={selectedPatient} />
              <DoctorChatAssistant patient={selectedPatient} />
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-slate-600 mb-2">
                  Select a patient
                </h3>
                <p className="text-slate-400 max-w-sm">
                  Choose a patient from the roster to view their clinical summary,
                  ask questions about their data, and search for relevant research.
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
