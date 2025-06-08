// src/data/mock-data.ts

// Define interfaces for better type safety and clarity
export interface LabResult {
  id: string;
  testName: string;
  value: string;
  normalRange: string;
  unit?: string; // Optional unit for the value
  interpretation?: string; // Optional interpretation (e.g., "High", "Normal")
}

export interface RadiologyReport {
  id: string;
  type: string; // e.g., "X-ray", "CT Scan", "MRI"
  findings: string;
  impression?: string; // Optional summary/conclusion
  date?: Date; // Optional date of the report
}

export interface ClinicalCase {
  id: string;
  patientName: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other' | 'Unknown';
  diagnosis: string;
  presentingComplaint: string;
  historyOfPresentingComplaint: string;
  pastMedicalHistory: string[];
  medications: string[];
  allergies: string[];
  socialHistory: string;
  familyHistory: string;
  physicalExamination: string;
  labResults: LabResult[];
  radiologyReports: RadiologyReport[];
  differentialDiagnosis: string[];
  managementPlan: string;
  notes?: string; // Optional additional notes
  createdDate: Date;
  lastModifiedDate: Date;
}

// Mock data for clinical cases
const mockCases: ClinicalCase[] = [
  {
    id: "case-001",
    patientName: "John Doe",
    age: 45,
    gender: "Male",
    diagnosis: "Essential Hypertension",
    presentingComplaint: "Persistent headaches and dizziness for 3 weeks.",
    historyOfPresentingComplaint: "Patient reports daily frontal headaches, moderate intensity, not relieved by over-the-counter pain relievers. Dizziness occurs mainly when standing up quickly. No fever, no visual changes.",
    pastMedicalHistory: ["Type 2 Diabetes Mellitus (diagnosed 5 years ago)", "Hyperlipidemia"],
    medications: ["Metformin 1000mg BID", "Atorvastatin 40mg daily"],
    allergies: ["Penicillin (rash)"],
    socialHistory: "Smokes 1 pack per day for 20 years. Occasional alcohol use. Works as an accountant.",
    familyHistory: "Father died of myocardial infarction at 55. Mother has hypertension.",
    physicalExamination: "BP 160/100 mmHg (sitting), HR 78 bpm, regular. Cardiovascular: S1S2, no murmurs. Lungs: Clear to auscultation bilaterally. Abdomen: Soft, non-tender. Neurological: Alert and oriented, no focal deficits.",
    labResults: [
      { id: "lr-001", testName: "Sodium", value: "138", unit: "mmol/L", normalRange: "135-145" },
      { id: "lr-002", testName: "Potassium", value: "4.1", unit: "mmol/L", normalRange: "3.5-5.0" },
      { id: "lr-003", testName: "Creatinine", value: "1.3", unit: "mg/dL", normalRange: "0.6-1.2", interpretation: "High" },
      { id: "lr-004", testName: "HbA1c", value: "7.5", unit: "%", normalRange: "<7.0", interpretation: "High" },
    ],
    radiologyReports: [
      { id: "rr-001", type: "Chest X-ray", findings: "Normal cardiac silhouette. No acute pulmonary findings.", date: new Date('2024-05-10') },
      { id: "rr-002", type: "Renal Ultrasound", findings: "Mild bilateral renal atrophy, no hydronephrosis.", impression: "Suggestive of chronic kidney changes.", date: new Date('2024-05-25') },
    ],
    differentialDiagnosis: ["Essential Hypertension", "Secondary Hypertension (renal artery stenosis)", "Anxiety Disorder", "Migraine"],
    managementPlan: "Initiate Lisinopril 10mg daily, increase Metformin to 1500mg BID if blood glucose not controlled. Advise smoking cessation and dietary modifications (low sodium). Follow-up in 2 weeks.",
    notes: "Patient educated on importance of medication adherence and lifestyle changes. Provided resources for smoking cessation program.",
    createdDate: new Date("2024-05-01T09:00:00Z"),
    lastModifiedDate: new Date("2024-06-07T14:30:00Z"),
  },
  {
    id: "case-002",
    patientName: "Jane Smith",
    age: 28,
    gender: "Female",
    diagnosis: "Acute Bronchitis",
    presentingComplaint: "Productive cough and shortness of breath for 5 days.",
    historyOfPresentingComplaint: "Cough started dry, now productive with clear sputum. Worsens at night. Associated with mild exertional dyspnea. No fever, no chest pain. Denies recent travel or sick contacts.",
    pastMedicalHistory: ["Seasonal Allergies"],
    medications: ["Loratadine 10mg daily (as needed)"],
    allergies: [],
    socialHistory: "Non-smoker. Works as a teacher. Lives with husband and two young children.",
    familyHistory: "No significant family history.",
    physicalExamination: "Temp 98.6°F, HR 72 bpm, RR 18 breaths/min, SpO2 98% on room air. Lungs: Scattered rhonchi in both lung fields, no crackles or wheezes. Throat: Mild erythema. No lymphadenopathy.",
    labResults: [
      { id: "lr-005", testName: "CBC with Differential", value: "Within normal limits", normalRange: "N/A" }
    ],
    radiologyReports: [
      { id: "rr-003", type: "Chest X-ray", findings: "No infiltrate or consolidation. Mild peribronchial thickening.", impression: "Consistent with viral bronchitis.", date: new Date('2024-06-05') }
    ],
    differentialDiagnosis: ["Acute Bronchitis", "Asthma exacerbation", "Pneumonia", "Allergic reaction"],
    managementPlan: "Symptomatic treatment with cough suppressants (Dextromethorphan), bronchodilator (Albuterol inhaler PRN for dyspnea). Advise rest and hydration. Return if symptoms worsen or develop fever.",
    notes: "Patient advised on humidifier use and avoiding irritants. Counseling on hand hygiene.",
    createdDate: new Date("2024-06-02T11:15:00Z"),
    lastModifiedDate: new Date("2024-06-07T16:00:00Z"),
  },
  // Add more mock cases here if needed
];

/**
 * Retrieves a clinical case by its unique ID.
 * @param id The ID of the case to retrieve.
 * @returns The ClinicalCase object if found, otherwise undefined.
 */
export function getCaseById(id: string): ClinicalCase | undefined {
  console.log(`Attempting to retrieve case with ID: ${id}`);
  const foundCase = mockCases.find(c => c.id === id);
  if (foundCase) {
    console.log(`Case found: ${foundCase.patientName}`);
  } else {
    console.log(`Case with ID ${id} not found.`);
  }
  return foundCase;
}

/**
 * Retrieves all mock clinical cases.
 * @returns An array of all ClinicalCase objects.
 */
export function getAllCases(): ClinicalCase[] {
  return mockCases;
}

// You can add more functions here for mock CRUD operations, e.g.:
// export function createCase(newCase: ClinicalCase): ClinicalCase {
//   const newId = `case-${mockCases.length + 1}`;
//   const caseWithId = { ...newCase, id: newId, createdDate: new Date(), lastModifiedDate: new Date() };
//   mockCases.push(caseWithId);
//   return caseWithId;
// }

// export function updateCase(updatedCase: ClinicalCase): ClinicalCase | undefined {
//   const index = mockCases.findIndex(c => c.id === updatedCase.id);
//   if (index !== -1) {
//     mockCases[index] = { ...updatedCase, lastModifiedDate: new Date() };
//     return mockCases[index];
//   }
//   return undefined;
// }

// export function deleteCase(id: string): boolean {
//   const initialLength = mockCases.length;
//   mockCases = mockCases.filter(c => c.id !== id);
//   return mockCases.length < initialLength;
// }
