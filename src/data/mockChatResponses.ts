interface MockResponse {
  keywords: string[];
  response: string;
}

export const MOCK_CHAT_RESPONSES: MockResponse[] = [
  {
    keywords: ["metformin"],
    response:
      "Metformin is a first-line medication for Type 2 Diabetes. It works by reducing glucose production in the liver and improving your body's sensitivity to insulin. Common side effects include nausea, diarrhea, and stomach upset — these often improve after a few weeks. Take it with meals to minimize GI side effects. Do not skip doses, and avoid excessive alcohol while on this medication.",
  },
  {
    keywords: ["lisinopril"],
    response:
      "Lisinopril is an ACE inhibitor used to treat high blood pressure and protect your kidneys, especially important for diabetic patients. Take it at the same time each day. Common side effects include a dry cough, dizziness, and elevated potassium levels. Contact your doctor if you experience swelling of the face, lips, or throat, as this may indicate a rare but serious allergic reaction.",
  },
  {
    keywords: ["methotrexate"],
    response:
      "Methotrexate is a disease-modifying antirheumatic drug (DMARD) used for Rheumatoid Arthritis. It's typically taken once a week — not daily. You should take folic acid supplements as directed to reduce side effects like mouth sores and nausea. Avoid alcohol, as methotrexate can affect your liver. Regular blood tests are needed to monitor liver function and blood counts.",
  },
  {
    keywords: ["empagliflozin", "jardiance"],
    response:
      "Empagliflozin (brand name Jardiance) is an SGLT2 inhibitor that helps lower blood sugar by causing the kidneys to remove sugar through urine. It also has significant benefits for kidney protection and heart health. Stay well hydrated while taking it. Watch for signs of urinary tract infections. It may cause low blood pressure — rise slowly from sitting or lying positions.",
  },
  {
    keywords: ["diabetes", "blood sugar", "glucose"],
    response:
      "Type 2 Diabetes is a chronic condition where your body doesn't use insulin properly. Key management strategies include: taking medications as prescribed, monitoring blood sugar regularly, eating a balanced diet low in refined sugars, exercising at least 150 minutes per week, and attending regular check-ups. Your target HbA1c is typically below 7%, though your doctor may personalize this goal.",
  },
  {
    keywords: ["hypertension", "blood pressure", "bp"],
    response:
      "Hypertension (high blood pressure) increases your risk for heart disease and stroke. For diabetic patients, the recommended target is typically below 130/80 mmHg. Lifestyle measures that help include: reducing salt intake to <2,300mg/day, regular exercise, maintaining a healthy weight, limiting alcohol, and managing stress. Always take your blood pressure medications as prescribed, even if you feel fine.",
  },
  {
    keywords: ["arthritis", "joint", "joints", "rheumatoid"],
    response:
      "Rheumatoid Arthritis is an autoimmune condition where your immune system attacks joint tissues, causing pain, swelling, and stiffness. Early and consistent treatment with DMARDs like methotrexate can slow joint damage. Gentle exercise, physical therapy, and maintaining a healthy weight all help manage symptoms. Report any new or worsening joint symptoms to your doctor promptly.",
  },
  {
    keywords: ["kidney", "ckd", "renal", "egfr"],
    response:
      "Chronic Kidney Disease means your kidneys aren't filtering blood as effectively. Your eGFR number indicates how well they're working. Key steps: stay hydrated, limit salt and protein intake as advised, avoid NSAIDs (like ibuprofen), take your medications as prescribed, and attend regular lab work. SGLT2 inhibitors like empagliflozin have been shown to slow CKD progression significantly.",
  },
  {
    keywords: ["side effect", "side effects", "symptoms"],
    response:
      "If you're experiencing side effects from your medications, it's important to document them — what symptoms, when they occur, and how severe they are. Don't stop taking prescribed medications without consulting your doctor first, as this can be dangerous. Many side effects improve over time or can be managed with dosage adjustments. Seek immediate care for severe reactions like difficulty breathing, swelling, or chest pain.",
  },
  {
    keywords: ["appointment", "schedule", "visit", "doctor"],
    response:
      "To schedule an appointment, please contact your primary care provider's office directly. For routine follow-ups, try to book 1-2 weeks in advance. If you're experiencing urgent symptoms (severe pain, high fever, difficulty breathing), don't wait for an appointment — go to urgent care or call 911. Remember to bring your current medication list and any recent lab results to every visit.",
  },
  {
    keywords: ["dosage", "dose", "how much", "how often"],
    response:
      "Always follow the dosage instructions provided by your prescribing physician. If you've missed a dose, take it as soon as you remember — unless it's close to your next scheduled dose, in which case skip the missed one. Never double up. If you're unsure about your dosage, check your prescription label or call your pharmacy. Your uploaded prescriptions can also be referenced here.",
  },
];

export const FALLBACK_RESPONSE =
  "I can help with questions about your medications, conditions, lab results, and uploaded documents. Could you try asking about a specific medication (like Metformin or Lisinopril), a condition (like diabetes or hypertension), or a general topic (like side effects or appointments)?";
