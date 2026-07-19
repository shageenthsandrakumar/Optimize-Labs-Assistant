import type { ResearchResponse, ScannedDocument } from "../types";

// Everything in this file is REAL data captured from the actual live backend
// (PubMed E-utilities + OpenRouter/gpt-4o-mini) during and after the hackathon.
// This deployment is a permanent, static replay of verified real responses,
// not fabricated content and not a live backend. See README "Why static" for why.

export const RESEARCH_RESPONSES: Record<string, ResearchResponse> = {
  p1: {
    query_terms: ["Type 2 Diabetes", "Hypertension", "Metformin", "Lisinopril"],
    matches: [
      {
        source: "pubmed",
        external_id: "PMID38568468",
        title: "Metformin: Past, Present, and Future.",
        url: "https://pubmed.ncbi.nlm.nih.gov/38568468/",
        published_date: "2024-Jun",
        relevance_score: 1.0,
        relevance_reasoning:
          "This paper reviews the efficacy and mechanisms of metformin, the patient's current medication for Type 2 Diabetes.",
      },
      {
        source: "pubmed",
        external_id: "PMID38816269",
        title: "Increased hepatic gluconeogenesis and type 2 diabetes mellitus.",
        url: "https://pubmed.ncbi.nlm.nih.gov/38816269/",
        published_date: "2024-Dec",
        relevance_score: 1.0,
        relevance_reasoning:
          "This paper discusses the role of increased hepatic gluconeogenesis in Type 2 Diabetes and how metformin works to mitigate this, directly relevant to the patient's condition.",
      },
      {
        source: "pubmed",
        external_id: "PMID38034222",
        title: "Metformin-Induced Vitamin B12 Deficiency in Patients With Type-2 Diabetes Mellitus.",
        url: "https://pubmed.ncbi.nlm.nih.gov/38034222/",
        published_date: "2023-Oct",
        relevance_score: 1.0,
        relevance_reasoning:
          "The study highlights the risk of Vitamin B12 deficiency from metformin, which is pertinent for managing this patient's long-term treatment.",
      },
      {
        source: "pubmed",
        external_id: "PMID39227192",
        title: "The direct targets of metformin in diabetes and beyond.",
        url: "https://pubmed.ncbi.nlm.nih.gov/39227192/",
        published_date: "2025-Apr",
        relevance_score: 1.0,
        relevance_reasoning:
          "This paper explores the direct actions of metformin, providing insights relevant for optimizing treatment in this Type 2 diabetic patient.",
      },
    ],
  },
  p2: {
    query_terms: ["Rheumatoid Arthritis", "Methotrexate"],
    matches: [
      {
        source: "pubmed",
        external_id: "PMID40388166",
        title: "Tocilizumab Monotherapy or Combined With Methotrexate for Rheumatoid Arthritis: A Randomized Clinical Trial.",
        url: "https://pubmed.ncbi.nlm.nih.gov/40388166/",
        published_date: "2025-May-01",
        relevance_score: 1.0,
        relevance_reasoning:
          "This trial evaluates the efficacy and safety of methotrexate in combination with tocilizumab for rheumatoid arthritis, providing relevant treatment options for the patient currently on methotrexate.",
      },
      {
        source: "pubmed",
        external_id: "PMID37668490",
        title: "Treating rheumatoid arthritis.",
        url: "https://pubmed.ncbi.nlm.nih.gov/37668490/",
        published_date: "2023-Sep-01",
        relevance_score: 0.9,
        relevance_reasoning:
          "This paper outlines best practices for treating rheumatoid arthritis with methotrexate, directly impacting the patient's management plan.",
      },
      {
        source: "pubmed",
        external_id: "PMID40199468",
        title: "[Rheumatoid Arthritis].",
        url: "https://pubmed.ncbi.nlm.nih.gov/40199468/",
        published_date: "2025-Apr",
        relevance_score: 0.9,
        relevance_reasoning:
          "This review emphasizes the initiation of methotrexate as a first-line treatment for rheumatoid arthritis, aligning with the patient's current treatment.",
      },
      {
        source: "pubmed",
        external_id: "PMID40725854",
        title: "Immunosuppressants/Immunomodulators and Malignancy.",
        url: "https://pubmed.ncbi.nlm.nih.gov/40725854/",
        published_date: "2025-Jul-21",
        relevance_score: 0.8,
        relevance_reasoning:
          "This paper highlights the increased malignancy risk associated with long-term immunosuppressive treatments like methotrexate in rheumatoid arthritis patients, which is critical for the patient's ongoing care.",
      },
    ],
  },
  p3: {
    query_terms: ["Chronic Kidney Disease, Stage 3", "Type 2 Diabetes", "Metformin", "Empagliflozin"],
    matches: [
      {
        source: "pubmed",
        external_id: "PMID40470996",
        title: "Finerenone with Empagliflozin in Chronic Kidney Disease and Type 2 Diabetes.",
        url: "https://pubmed.ncbi.nlm.nih.gov/40470996/",
        published_date: "2025-Aug-07",
        relevance_score: 1.0,
        relevance_reasoning:
          "This study directly investigates the combination of finerenone with empagliflozin in patients with chronic kidney disease and type 2 diabetes, which is relevant to this patient taking empagliflozin and having CKD stage 3.",
      },
      {
        source: "pubmed",
        external_id: "PMID39916475",
        title:
          "COmbinatioN effect of FInerenone anD EmpaglifloziN in participants with chronic kidney disease and type 2 diabetes using a UACR Endpoint (CONFIDENCE) trial: baseline clinical characteristics.",
        url: "https://pubmed.ncbi.nlm.nih.gov/39916475/",
        published_date: "2025-Aug-01",
        relevance_score: 1.0,
        relevance_reasoning:
          "Similar to PMID 40470996, this trial examines the effects of combining finerenone and empagliflozin in patients with chronic kidney disease and type 2 diabetes, which relates directly to this patient's condition.",
      },
      {
        source: "pubmed",
        external_id: "PMID38816269",
        title: "Increased hepatic gluconeogenesis and type 2 diabetes mellitus.",
        url: "https://pubmed.ncbi.nlm.nih.gov/38816269/",
        published_date: "2024-Dec",
        relevance_score: 0.9,
        relevance_reasoning:
          "This article outlines how metformin impacts hepatic gluconeogenesis, which could be essential for understanding glucose control alongside the patient's type 2 diabetes treatment.",
      },
      {
        source: "pubmed",
        external_id: "PMID39836391",
        title: "Effectiveness of Empagliflozin vs Dapagliflozin for Kidney Outcomes in Type 2 Diabetes.",
        url: "https://pubmed.ncbi.nlm.nih.gov/39836391/",
        published_date: "2025-Mar-01",
        relevance_score: 0.9,
        relevance_reasoning:
          "This paper compares the kidney outcomes of empagliflozin to dapagliflozin in type 2 diabetes, directly related to the patient's chronic kidney disease management.",
      },
      {
        source: "pubmed",
        external_id: "PMID38904963",
        title:
          "A 5:2 Intermittent Fasting Meal Replacement Diet and Glycemic Control for Adults With Diabetes: The EARLY Randomized Clinical Trial.",
        url: "https://pubmed.ncbi.nlm.nih.gov/38904963/",
        published_date: "2024-Jun-03",
        relevance_score: 0.8,
        relevance_reasoning:
          "This trial compares a meal replacement diet to metformin and empagliflozin, offering insights that could be beneficial for this patient managing type 2 diabetes.",
      },
      {
        source: "pubmed",
        external_id: "PMID38771475",
        title: "Safety of Empagliflozin: An Individual Participant-Level Data Meta-Analysis from Four Large Trials.",
        url: "https://pubmed.ncbi.nlm.nih.gov/38771475/",
        published_date: "2024-Jul",
        relevance_score: 0.8,
        relevance_reasoning:
          "This meta-analysis on the safety of empagliflozin is relevant because it discusses important safety aspects of medication that the patient is taking for diabetes and CKD.",
      },
    ],
  },
};

export const SCAN_RESPONSE: ScannedDocument = {
  id: "9dc36f05-b408-4c7f-9f7c-972b5fda1bec",
  fileName: "prescription.png",
  uploadedAt: "2026-07-18T19:08:42.602375+00:00",
  extractedText:
    "Rx: Metformin HCl 500 mg\n\nTake 1 tablet by mouth twice daily\n\nPatient: Jane Doe  Qty: 60",
  status: "done",
};

interface KeywordResponse {
  keywords: string[];
  response: string;
}

export const CHAT_RESPONSES: KeywordResponse[] = [
  {
    keywords: ["metformin", "side effect"],
    response:
      "Metformin is a medication commonly prescribed for managing type 2 diabetes. While it is generally well-tolerated, some common side effects may include:\n\n1. **Gastrointestinal Issues**: This can include nausea, vomiting, diarrhea, stomach upset, and gas. These symptoms may occur when starting the medication or increasing the dose.\n\n2. **Lactic Acidosis**: Although rare, metformin can lead to a serious condition called lactic acidosis, particularly in people with kidney problems or other contraindications.\n\n3. **Vitamin B12 Deficiency**: Long-term use of metformin may affect the absorption of vitamin B12, potentially leading to a deficiency.\n\n4. **Metallic Taste**: Some people may experience a metallic taste in their mouth.\n\nIt's important for patients to monitor their reactions to the medication and communicate any side effects to their healthcare provider. Always consult your doctor before making any changes to your medication or if you have concerns about side effects.",
  },
  {
    keywords: ["empagliflozin"],
    response:
      "Empagliflozin is a medication primarily used to manage type 2 diabetes. It belongs to a class of drugs known as SGLT2 inhibitors, which work by helping the kidneys remove glucose from the bloodstream through urine. This can help lower blood sugar levels and improve glycemic control.\n\nAdditionally, empagliflozin has been found to have cardiovascular benefits and may be prescribed to reduce the risk of cardiovascular events in patients with type 2 diabetes who also have established cardiovascular disease.\n\nIt's important to consult with your doctor about the use of empagliflozin and to ensure it's the right medication for your specific health needs.",
  },
];

export const CHAT_FALLBACK =
  "That's a great question for your care team. This demo replays real responses from a small set of tested questions. Try asking about metformin's side effects or what empagliflozin is used for.";

interface DoctorKeywordResponse extends KeywordResponse {
  patientIds?: string[];
}

export const DOCTOR_CHAT_RESPONSES: DoctorKeywordResponse[] = [
  {
    patientIds: ["p3"],
    keywords: ["watch", "monitor"],
    response:
      "Monitor for progression of chronic kidney disease, particularly renal function (eGFR) and electrolyte imbalances. Assess for worsening glycemic control due to kidney impairment. Watch for possible side effects of Metformin, including lactic acidosis, especially with deteriorating renal function. Evaluate for urinary and genital infections associated with Empagliflozin, as SGLT2 inhibitors can increase the risk. Additionally, monitor for signs of cardiovascular complications, as both diabetes and CKD are associated with increased cardiovascular risk. Regularly assess patient adherence to medication and optimize management for comorbid conditions.",
  },
  {
    patientIds: ["p1"],
    keywords: ["risk factor"],
    response:
      "Key risk factors to monitor for this patient include:\n\n1. **Glycemic Control**: Monitor HbA1c levels to assess diabetes management.\n2. **Blood Pressure**: Regular monitoring to ensure hypertension is adequately controlled.\n3. **Renal Function**: Evaluate kidney function (e.g., serum creatinine, eGFR) as both diabetes and Lisinopril can impact renal health.\n4. **Cardiovascular Risk**: Assess lipid profiles and consider additional risk factors such as age, smoking status, and family history.\n5. **Weight Management**: Monitor weight as fluctuations can affect diabetes control and hypertension.\n6. **Medication Adherence**: Ensure compliance with prescribed medications to maintain control of both conditions.",
  },
  {
    patientIds: ["p2"],
    keywords: ["alternative", "treatment option"],
    response:
      "Yes, alternative treatment options for Rheumatoid Arthritis (RA) include:\n\n1. **Biologic DMARDs**: Agents such as Tumor Necrosis Factor (TNF) inhibitors (e.g., Etanercept, Infliximab), Interleukin inhibitors (e.g., Tocilizumab), and other biologics (e.g., Abatacept).\n\n2. **Non-biologic DMARDs**: Options like Leflunomide or Sulfasalazine, which may be considered if methotrexate is insufficient or not tolerated.\n\n3. **JAK inhibitors**: Such as Tofacitinib or Baricitinib, approved for moderate to severe RA.\n\n4. **Corticosteroids**: For short-term management of exacerbations or to bridge therapy while DMARDs take effect.\n\n5. **Symptomatic relief**: NSAIDs for pain and inflammation control.\n\nThe choice of alternative therapy should be based on disease severity, patient comorbidities, and previous treatment responses.",
  },
];

export const DOCTOR_CHAT_FALLBACK =
  "This demo replays real responses from a small set of tested questions for each patient. Try asking what to watch for, key risk factors, or alternative treatment options.";
