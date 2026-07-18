export const MOCK_PATIENT_SUMMARIES: Record<string, { summary: string; vitals: { label: string; value: string; status: "normal" | "warning" | "critical" }[]; recentHistory: string[] }> = {
  p1: {
    summary:
      "58-year-old male managing Type 2 Diabetes (diagnosed 2018) and Hypertension (diagnosed 2015). Currently stable on Metformin 500mg BID and Lisinopril 10mg daily. Most recent HbA1c of 7.2% is slightly above target — may benefit from medication adjustment or lifestyle intervention. Blood pressure well-controlled at last visit. Recently hospitalized for an acute hyperglycemic episode due to medication non-compliance; now back on regimen with added Atorvastatin 20mg. Lipid panel shows elevated LDL at 138 mg/dL.",
    vitals: [
      { label: "HbA1c", value: "7.2%", status: "warning" },
      { label: "Blood Pressure", value: "128/78 mmHg", status: "normal" },
      { label: "eGFR", value: "52 mL/min", status: "warning" },
      { label: "LDL Cholesterol", value: "138 mg/dL", status: "critical" },
      { label: "BMI", value: "29.4", status: "warning" },
      { label: "Fasting Glucose", value: "142 mg/dL", status: "warning" },
    ],
    recentHistory: [
      "07/01/2026 — Discharged after acute hyperglycemic episode (glucose 385 mg/dL)",
      "07/06/2026 — Lab work: HbA1c 7.2%, eGFR 52, elevated LDL",
      "07/10/2026 — Prescription renewal: Metformin, Lisinopril, Atorvastatin (new)",
    ],
  },
  p2: {
    summary:
      "45-year-old female with Rheumatoid Arthritis diagnosed in 2021. Currently on Methotrexate 15mg weekly (oral). Disease activity moderate — DAS28 score of 3.8 at last rheumatology visit. Liver function tests stable on current monitoring schedule. Patient reports intermittent morning stiffness lasting ~45 minutes. Taking folic acid 5mg weekly as adjunct. No extra-articular manifestations observed. Consider escalation to biologic therapy if DAS28 does not improve at next 3-month review.",
    vitals: [
      { label: "DAS28 Score", value: "3.8", status: "warning" },
      { label: "ESR", value: "28 mm/hr", status: "warning" },
      { label: "CRP", value: "1.4 mg/dL", status: "warning" },
      { label: "ALT", value: "32 U/L", status: "normal" },
      { label: "WBC", value: "6.2 K/uL", status: "normal" },
      { label: "Hemoglobin", value: "12.8 g/dL", status: "normal" },
    ],
    recentHistory: [
      "06/15/2026 — Rheumatology visit: DAS28 3.8, continued methotrexate",
      "06/15/2026 — Labs: liver enzymes stable, CBC within normal limits",
      "05/01/2026 — Reported increased morning stiffness (~45 min)",
    ],
  },
  p3: {
    summary:
      "67-year-old male with Chronic Kidney Disease Stage 3 (eGFR 45, diagnosed 2022) and Type 2 Diabetes (diagnosed 2016). Current regimen of Metformin 500mg BID and Empagliflozin 10mg daily. Kidney function has been stable over the past 6 months with empagliflozin showing protective effect. HbA1c at 6.9% — well controlled. Blood pressure managed with lifestyle modifications. Potassium levels within normal range. Patient is adherent to low-sodium, moderate-protein diet. No episodes of hypoglycemia reported. Next nephrology follow-up scheduled.",
    vitals: [
      { label: "eGFR", value: "45 mL/min", status: "warning" },
      { label: "HbA1c", value: "6.9%", status: "normal" },
      { label: "Creatinine", value: "1.6 mg/dL", status: "warning" },
      { label: "Potassium", value: "4.5 mEq/L", status: "normal" },
      { label: "Blood Pressure", value: "132/82 mmHg", status: "normal" },
      { label: "Albumin/Creatinine Ratio", value: "85 mg/g", status: "warning" },
    ],
    recentHistory: [
      "07/02/2026 — Nephrology visit: eGFR stable at 45, continue current regimen",
      "07/02/2026 — Labs: HbA1c 6.9%, potassium 4.5, creatinine 1.6",
      "06/01/2026 — Dietary counseling: reinforced low-sodium, moderate-protein goals",
    ],
  },
};
