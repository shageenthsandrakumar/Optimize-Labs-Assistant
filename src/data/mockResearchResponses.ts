import type { ResearchResponse } from "../types";

export const MOCK_RESEARCH_RESPONSES: Record<string, ResearchResponse> = {
  p1: {
    query_terms: ["type 2 diabetes", "metformin", "hypertension", "lisinopril"],
    matches: [
      {
        source: "pubmed",
        external_id: "PMID39284751",
        title: "Cardiovascular Outcomes of Metformin in Patients with Comorbid Hypertension: A Prospective Cohort Study",
        url: "https://pubmed.ncbi.nlm.nih.gov/39284751",
        published_date: "2026-05-01",
        relevance_score: 0.95,
        relevance_reasoning:
          "This 2026 prospective study directly evaluates metformin's cardiovascular risk profile in patients with comorbid hypertension — matching this patient's exact medication and condition combination. The study reports a 23% reduction in major adverse cardiac events over 3 years.",
      },
      {
        source: "pubmed",
        external_id: "PMID39102844",
        title: "Lisinopril–Metformin Interaction: Renal Protective Effects in Diabetic Hypertensive Patients",
        url: "https://pubmed.ncbi.nlm.nih.gov/39102844",
        published_date: "2026-03-15",
        relevance_score: 0.92,
        relevance_reasoning:
          "Directly relevant to this patient's drug combination. The study demonstrates that concurrent use of lisinopril and metformin provides synergistic renal protection, reducing albuminuria progression by 31% compared to either drug alone.",
      },
      {
        source: "pubmed",
        external_id: "PMID38976120",
        title: "Updated ADA Guidelines for Blood Pressure Management in Type 2 Diabetes",
        url: "https://pubmed.ncbi.nlm.nih.gov/38976120",
        published_date: "2026-01-10",
        relevance_score: 0.88,
        relevance_reasoning:
          "The 2026 ADA guidelines update blood pressure targets for diabetic patients, recommending <130/80 mmHg with ACE inhibitors as first-line — directly supporting this patient's current lisinopril regimen.",
      },
      {
        source: "pubmed",
        external_id: "PMID38841995",
        title: "Metformin and Gut Microbiome: Implications for Glycemic Control and Cardiovascular Risk",
        url: "https://pubmed.ncbi.nlm.nih.gov/38841995",
        published_date: "2025-11-22",
        relevance_score: 0.79,
        relevance_reasoning:
          "While not specific to hypertension, this study reveals a novel mechanism by which metformin modulates gut microbiota to improve glycemic control — relevant for understanding this patient's diabetes management.",
      },
      {
        source: "pubmed",
        external_id: "PMID38710483",
        title: "Long-term Safety Profile of ACE Inhibitors in Elderly Diabetic Populations",
        url: "https://pubmed.ncbi.nlm.nih.gov/38710483",
        published_date: "2025-09-08",
        relevance_score: 0.74,
        relevance_reasoning:
          "This patient is 58 and approaching the age range studied (60+). The paper confirms lisinopril's favorable safety profile in older diabetic patients, with monitoring recommendations for hyperkalemia that may be relevant as this patient ages.",
      },
    ],
  },
  p2: {
    query_terms: ["rheumatoid arthritis", "methotrexate"],
    matches: [
      {
        source: "pubmed",
        external_id: "PMID39301122",
        title: "Methotrexate Dose Optimization in Early Rheumatoid Arthritis: A Randomized Controlled Trial",
        url: "https://pubmed.ncbi.nlm.nih.gov/39301122",
        published_date: "2026-04-18",
        relevance_score: 0.93,
        relevance_reasoning:
          "Directly evaluates methotrexate dosing strategies for RA patients. The trial found that subcutaneous administration at 15mg/week achieved remission in 48% of patients vs. 31% with oral — relevant if this patient hasn't reached treatment targets.",
      },
      {
        source: "pubmed",
        external_id: "PMID39188743",
        title: "Hepatotoxicity Monitoring in Long-term Methotrexate Therapy: Updated Consensus Recommendations",
        url: "https://pubmed.ncbi.nlm.nih.gov/39188743",
        published_date: "2026-02-25",
        relevance_score: 0.90,
        relevance_reasoning:
          "Critical for this patient's ongoing methotrexate therapy. New consensus reduces mandatory liver biopsy frequency, recommending FibroScan as a less invasive alternative for monitoring hepatic fibrosis.",
      },
      {
        source: "pubmed",
        external_id: "PMID39045621",
        title: "JAK Inhibitors vs Methotrexate Monotherapy: 2-Year Comparative Effectiveness in Women with RA",
        url: "https://pubmed.ncbi.nlm.nih.gov/39045621",
        published_date: "2025-12-10",
        relevance_score: 0.85,
        relevance_reasoning:
          "Highly relevant as a female RA patient on methotrexate. This study compares her current treatment to newer JAK inhibitors, showing comparable efficacy but different side-effect profiles — useful if considering treatment escalation.",
      },
      {
        source: "pubmed",
        external_id: "PMID38899100",
        title: "Folic Acid Supplementation and Methotrexate Tolerability: Systematic Review and Meta-Analysis",
        url: "https://pubmed.ncbi.nlm.nih.gov/38899100",
        published_date: "2025-10-05",
        relevance_score: 0.82,
        relevance_reasoning:
          "Meta-analysis confirms folic acid 5mg/week reduces methotrexate side effects (nausea, mouth ulcers) by 40% without reducing efficacy — practical guidance for managing this patient's tolerability.",
      },
    ],
  },
  p3: {
    query_terms: ["chronic kidney disease", "type 2 diabetes", "metformin", "empagliflozin"],
    matches: [
      {
        source: "pubmed",
        external_id: "PMID39312987",
        title: "Empagliflozin in CKD Stage 3 with Type 2 Diabetes: EMPA-KIDNEY Extended Follow-up Results",
        url: "https://pubmed.ncbi.nlm.nih.gov/39312987",
        published_date: "2026-06-01",
        relevance_score: 0.96,
        relevance_reasoning:
          "Directly matches this patient's exact condition profile. Extended follow-up of the EMPA-KIDNEY trial shows empagliflozin slowed eGFR decline by 39% in CKD stage 3 diabetic patients over 4 years, supporting continuation of this patient's current regimen.",
      },
      {
        source: "pubmed",
        external_id: "PMID39201558",
        title: "Metformin Safety in Moderate CKD: Updated eGFR Thresholds and Dosing Recommendations",
        url: "https://pubmed.ncbi.nlm.nih.gov/39201558",
        published_date: "2026-03-20",
        relevance_score: 0.93,
        relevance_reasoning:
          "Critical for this patient — addresses metformin use in CKD stage 3 specifically. Updated guidelines now permit metformin continuation down to eGFR 30 mL/min with dose reduction, expanding the safe treatment window for this patient.",
      },
      {
        source: "pubmed",
        external_id: "PMID39088432",
        title: "SGLT2 Inhibitors and Metformin Combination Therapy: Renal and Glycemic Outcomes in CKD",
        url: "https://pubmed.ncbi.nlm.nih.gov/39088432",
        published_date: "2026-01-28",
        relevance_score: 0.91,
        relevance_reasoning:
          "Evaluates the exact drug combination this patient is on. The study demonstrates additive renoprotective effects when empagliflozin is combined with metformin, with a 27% reduction in composite renal endpoints.",
      },
      {
        source: "pubmed",
        external_id: "PMID38955217",
        title: "Hyperkalemia Risk with SGLT2 Inhibitors in Elderly CKD Patients: A Population-Based Study",
        url: "https://pubmed.ncbi.nlm.nih.gov/38955217",
        published_date: "2025-11-14",
        relevance_score: 0.84,
        relevance_reasoning:
          "Relevant safety consideration for this 67-year-old CKD patient on empagliflozin. The study finds SGLT2 inhibitors actually reduce hyperkalemia risk by 15% in this population, providing reassurance for continuing therapy.",
      },
      {
        source: "pubmed",
        external_id: "PMID38820149",
        title: "Dietary Protein Restriction Combined with SGLT2 Inhibition in Diabetic Nephropathy",
        url: "https://pubmed.ncbi.nlm.nih.gov/38820149",
        published_date: "2025-08-30",
        relevance_score: 0.76,
        relevance_reasoning:
          "Suggests that moderate protein restriction (0.8g/kg/day) combined with empagliflozin provides additional renal benefit over medication alone — a practical lifestyle recommendation for this patient.",
      },
    ],
  },
};
