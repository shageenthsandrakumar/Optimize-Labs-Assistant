import type { Patient } from "../types";

export const DEMO_PATIENTS: Patient[] = [
  {
    id: "p1",
    label: "Patient A — 58M",
    conditions: ["Type 2 Diabetes", "Hypertension"],
    medications: ["Metformin", "Lisinopril"],
  },
  {
    id: "p2",
    label: "Patient B — 45F",
    conditions: ["Rheumatoid Arthritis"],
    medications: ["Methotrexate"],
  },
  {
    id: "p3",
    label: "Patient C — 67M",
    conditions: ["Chronic Kidney Disease, Stage 3", "Type 2 Diabetes"],
    medications: ["Metformin", "Empagliflozin"],
  },
];
