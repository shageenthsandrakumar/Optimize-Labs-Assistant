interface DoctorMockResponse {
  keywords: string[];
  patientIds?: string[];
  response: string;
}

export const MOCK_DOCTOR_CHAT_RESPONSES: DoctorMockResponse[] = [
  {
    keywords: ["summary", "overview", "tell me about"],
    patientIds: ["p1"],
    response:
      "Patient A is a 58-year-old male managing Type 2 Diabetes and Hypertension. His most recent HbA1c is 7.2% (slightly above target of <7%). He was recently hospitalized for a hyperglycemic episode due to medication non-compliance. Now back on Metformin 500mg BID, Lisinopril 10mg daily, and newly added Atorvastatin 20mg for elevated LDL (138 mg/dL). His eGFR of 52 warrants monitoring for early kidney involvement.",
  },
  {
    keywords: ["summary", "overview", "tell me about"],
    patientIds: ["p2"],
    response:
      "Patient B is a 45-year-old female with Rheumatoid Arthritis (DAS28 score 3.8, indicating moderate disease activity). She's on Methotrexate 15mg weekly with folic acid supplementation. Morning stiffness lasting ~45 minutes suggests suboptimal disease control. Liver enzymes are stable. If DAS28 doesn't improve at the next 3-month review, biologic therapy escalation should be considered.",
  },
  {
    keywords: ["summary", "overview", "tell me about"],
    patientIds: ["p3"],
    response:
      "Patient C is a 67-year-old male with CKD Stage 3 (eGFR 45) and Type 2 Diabetes. His kidney function has been stable on Empagliflozin 10mg + Metformin 500mg BID. HbA1c is well-controlled at 6.9%. Potassium is normal at 4.5. He's adherent to dietary recommendations. The current regimen is showing renoprotective benefit — continue and monitor eGFR trend.",
  },
  {
    keywords: ["hba1c", "a1c", "glucose", "sugar", "glycemic"],
    response:
      "Based on this patient's data, their glycemic control metrics show the current HbA1c level. For Type 2 Diabetes, the ADA recommends a target of <7% for most adults. Consider lifestyle modifications, medication adherence counseling, or dose adjustment if above target. Monitor fasting glucose trends alongside HbA1c for a complete picture.",
  },
  {
    keywords: ["kidney", "renal", "egfr", "ckd", "creatinine"],
    response:
      "Looking at this patient's renal markers: eGFR and creatinine levels are key indicators of kidney function. CKD Stage 3 is defined as eGFR 30-59 mL/min. SGLT2 inhibitors like empagliflozin have demonstrated renoprotective effects. Ensure metformin dosing is appropriate for the current eGFR level — guidelines now allow continuation down to eGFR 30 with dose reduction.",
  },
  {
    keywords: ["medication", "drug", "prescription", "regimen", "treatment"],
    response:
      "This patient's current medication regimen is listed in their profile. Key considerations: check for drug interactions, verify dosing is appropriate for organ function (especially renal/hepatic), assess adherence history, and evaluate whether treatment targets are being met. Consider if any medications need adjustment based on the latest labs.",
  },
  {
    keywords: ["blood pressure", "hypertension", "bp", "lisinopril"],
    response:
      "For hypertensive patients with diabetes, the recommended blood pressure target is <130/80 mmHg per current ADA guidelines. ACE inhibitors like lisinopril are first-line due to their renal protective properties. Monitor for hyperkalemia, especially in patients with reduced eGFR. Assess medication adherence and lifestyle modifications (sodium restriction, exercise, weight management).",
  },
  {
    keywords: ["risk", "complication", "prognosis", "concern"],
    response:
      "Key risk factors to monitor for this patient include: cardiovascular risk (especially with diabetes and/or hypertension), renal function trajectory, medication side effects, and treatment adherence. Consider calculating the patient's 10-year ASCVD risk score. Ensure preventive screenings are up to date (retinal exam, foot exam, lipid panel).",
  },
  {
    keywords: ["lab", "labs", "test", "result", "blood work"],
    response:
      "The patient's recent lab work is documented in their history. Key values to review: metabolic panel (glucose, HbA1c, electrolytes, creatinine/eGFR), lipid panel (LDL, HDL, triglycerides), and any condition-specific markers (DAS28 for RA, liver enzymes for methotrexate monitoring). Flag any values outside reference ranges for clinical action.",
  },
  {
    keywords: ["adjust", "change", "increase", "decrease", "switch", "add"],
    response:
      "Before making medication adjustments, review: current lab values and trends, patient's adherence history, side effect profile, contraindications based on comorbidities, and treatment guidelines. Document the clinical rationale for any changes. Consider patient preferences and cost/insurance factors. Schedule follow-up labs 4-6 weeks after any dosage change.",
  },
  {
    keywords: ["history", "recent", "visit", "hospitalization", "event"],
    response:
      "This patient's recent clinical history is shown in the timeline above. Review for patterns such as recurring hospitalizations, medication changes, lab trends, and adherence issues. Recent events should inform current treatment decisions — for instance, a recent hyperglycemic episode may indicate the need for closer monitoring or regimen adjustment.",
  },
];

export const DOCTOR_FALLBACK_RESPONSE =
  "I can help you analyze this patient's data. Try asking about their summary, lab results, medications, risk factors, treatment adjustments, or specific conditions. You can also ask about kidney function, blood sugar control, blood pressure, or recent clinical history.";
