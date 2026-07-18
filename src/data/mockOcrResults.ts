export const MOCK_OCR_TEXTS: string[] = [
  `PRESCRIPTION
─────────────────────────────────
Patient: John D.          DOB: 05/14/1968
Date: 07/10/2026          Prescriber: Dr. Sarah Mitchell, MD

Rx: Metformin HCl 500mg
    Take 1 tablet by mouth twice daily with meals
    Qty: 60 tablets    Refills: 5

Rx: Lisinopril 10mg
    Take 1 tablet by mouth once daily
    Qty: 30 tablets    Refills: 3

Pharmacy: CVS #4821, 123 Main St
─────────────────────────────────
Signature: Dr. S. Mitchell`,

  `LABORATORY REPORT
═══════════════════════════════════
Patient: John D.            MRN: 00284719
Collected: 07/05/2026       Reported: 07/06/2026

COMPREHENSIVE METABOLIC PANEL
  Glucose, Fasting:    142 mg/dL    (H)   Ref: 70-100
  HbA1c:               7.2%        (H)   Ref: <5.7%
  BUN:                 22 mg/dL           Ref: 7-20
  Creatinine:          1.4 mg/dL    (H)   Ref: 0.7-1.3
  eGFR:                52 mL/min          Ref: >60
  Potassium:           4.8 mEq/L          Ref: 3.5-5.0
  Sodium:              140 mEq/L          Ref: 136-145

LIPID PANEL
  Total Cholesterol:   210 mg/dL    (H)   Ref: <200
  LDL:                 138 mg/dL    (H)   Ref: <100
  HDL:                 42 mg/dL     (L)   Ref: >40
  Triglycerides:       155 mg/dL    (H)   Ref: <150

Ordering Physician: Dr. Sarah Mitchell, MD
═══════════════════════════════════`,

  `DISCHARGE SUMMARY
───────────────────────────────
Patient: John D.        Admission: 06/28/2026
MRN: 00284719           Discharge: 07/01/2026

Diagnosis: Acute hyperglycemic episode secondary to
medication non-compliance.

Hospital Course: Patient presented with blood glucose
of 385 mg/dL. Managed with IV insulin drip, transitioned
to subcutaneous insulin, then resumed oral metformin
upon stabilization. Lisinopril continued throughout.

Discharge Medications:
  1. Metformin 500mg PO BID with meals
  2. Lisinopril 10mg PO daily
  3. Atorvastatin 20mg PO daily (NEW)

Follow-up: PCP in 1 week, Endocrinology in 2 weeks.
───────────────────────────────`,
];
