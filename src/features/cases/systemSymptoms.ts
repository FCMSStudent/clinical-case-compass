export interface SystemSymptoms {
  system: string;
  symptoms: string[];
}

export const systemSymptoms: SystemSymptoms[] = [
  {
    system: "Cardiovascular",
    symptoms: [
      "Chest pain",
      "Palpitations",
      "Shortness of breath",
      "Edema",
      "Orthopnea",
      "Syncope",
      "Claudication",
      "Cyanosis",
      "Hypertension",
      "Hypotension",
    ],
  },
  {
    system: "Gastrointestinal",
    symptoms: [
      "Abdominal pain",
      "Nausea",
      "Vomiting",
      "Diarrhea",
      "Constipation",
      "Heartburn",
      "Dysphagia",
      "Hematemesis",
      "Melena",
      "Jaundice",
    ],
  },
  {
    system: "Musculoskeletal",
    symptoms: [
      "Joint pain",
      "Muscle pain",
      "Swelling",
      "Stiffness",
      "Limited range of motion",
      "Weakness",
      "Back pain",
      "Fractures",
      "Redness",
      "Deformity",
    ],
  },
  {
    system: "Neurological",
    symptoms: [
      "Headache",
      "Dizziness",
      "Seizures",
      "Paresthesia",
      "Weakness",
      "Vision changes",
      "Speech changes",
      "Altered mental status",
      "Tremor",
      "Ataxia",
    ],
  },
  {
    system: "Respiratory",
    symptoms: [
      "Cough",
      "Dyspnea",
      "Wheezing",
      "Hemoptysis",
      "Sputum production",
      "Pleuritic pain",
      "Orthopnea",
      "Stridor",
      "Apnea",
      "Tachypnea",
    ],
  },
  {
    system: "Urinary",
    symptoms: [
      "Dysuria",
      "Frequency",
      "Urgency",
      "Hesitancy",
      "Nocturia",
      "Hematuria",
      "Incontinence",
      "Polyuria",
      "Oliguria",
      "Flank pain",
      "Suprapubic pain",
      "Urinary retention"
    ],
  }
];
