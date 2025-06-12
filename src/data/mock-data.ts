// src/data/mock-data.ts

// Import unified types
import { MedicalCase, LabTest, RadiologyStudy } from "@/types/case";

// Define RadiologyReport interface for backward compatibility
export interface RadiologyReport {
  id: string;
  type: string; // e.g., "X-ray", "CT Scan", "MRI"
  findings: string;
  impression?: string; // Optional summary/conclusion
  date?: Date; // Optional date of the report
}

// Mock data for medical cases using unified types
const mockCases: MedicalCase[] = [
  {
    id: "case-001",
    title: "Essential Hypertension Management",
    priority: "medium",
    status: "active",
    patient: {
      id: "patient-001",
      name: "John Doe",
      age: 45,
      gender: "male",
      medicalRecordNumber: "MRN001"
    },
    createdAt: "2024-05-01T09:00:00Z",
    updatedAt: "2024-06-07T14:30:00Z",
    chiefComplaint: "Persistent headaches and dizziness for 3 weeks.",
    chiefComplaintAnalysis: "Patient reports daily frontal headaches, moderate intensity, not relieved by over-the-counter pain relievers. Dizziness occurs mainly when standing up quickly. No fever, no visual changes.",
    history: "Patient reports daily frontal headaches, moderate intensity, not relieved by over-the-counter pain relievers. Dizziness occurs mainly when standing up quickly. No fever, no visual changes.",
    physicalExam: "BP 160/100 mmHg (sitting), HR 78 bpm, regular. Cardiovascular: S1S2, no murmurs. Lungs: Clear to auscultation bilaterally. Abdomen: Soft, non-tender. Neurological: Alert and oriented, no focal deficits.",
    diagnoses: [
      {
        id: "dx-001",
        name: "Essential Hypertension",
        status: "confirmed",
        notes: "Primary diagnosis based on blood pressure readings and symptoms"
      }
    ],
    tags: [
      { id: "tag-001", name: "Hypertension", color: "#ef4444" },
      { id: "tag-002", name: "Cardiology", color: "#3b82f6" }
    ],
    resources: [
      {
        id: "res-001",
        title: "JNC 8 Guidelines",
        type: "guideline",
        url: "https://jamanetwork.com/journals/jama/fullarticle/1791497",
        notes: "Evidence-based guidelines for hypertension management"
      }
    ],
    learningPoints: "Importance of lifestyle modifications in hypertension management. Role of medication adherence and regular follow-up.",
    vitals: {
      "Blood Pressure": "160/100 mmHg",
      "Heart Rate": "78 bpm",
      "Temperature": "98.6°F",
      "Respiratory Rate": "16 breaths/min"
    },
    urinarySymptoms: [],
    symptoms: {
      "headache": true,
      "dizziness": true,
      "fatigue": false
    },
    systemSymptoms: {
      "Neurological": ["Headache", "Dizziness"],
      "Cardiovascular": []
    },
    labTests: [
      { 
        id: "lr-001", 
        name: "Sodium", 
        value: "138", 
        unit: "mmol/L", 
        normalRange: "135-145",
        interpretation: "Normal"
      },
      { 
        id: "lr-002", 
        name: "Potassium", 
        value: "4.1", 
        unit: "mmol/L", 
        normalRange: "3.5-5.0",
        interpretation: "Normal"
      },
      { 
        id: "lr-003", 
        name: "Creatinine", 
        value: "1.3", 
        unit: "mg/dL", 
        normalRange: "0.6-1.2",
        interpretation: "High"
      },
      { 
        id: "lr-004", 
        name: "HbA1c", 
        value: "7.5", 
        unit: "%", 
        normalRange: "<7.0",
        interpretation: "High"
      }
    ],
    radiologyStudies: [
      { 
        id: "rr-001", 
        name: "Chest X-ray", 
        type: "X-Ray", 
        findings: "Normal cardiac silhouette. No acute pulmonary findings.", 
        date: "2024-05-10T00:00:00Z",
        impression: "Normal chest radiograph"
      },
      { 
        id: "rr-002", 
        name: "Renal Ultrasound", 
        type: "Ultrasound", 
        findings: "Mild bilateral renal atrophy, no hydronephrosis.", 
        date: "2024-05-25T00:00:00Z",
        impression: "Suggestive of chronic kidney changes."
      }
    ],
    radiologyExams: [], // Keep for backward compatibility
    pastMedicalHistory: ["Type 2 Diabetes Mellitus (diagnosed 5 years ago)", "Hyperlipidemia"],
    medications: ["Metformin 1000mg BID", "Atorvastatin 40mg daily"],
    allergies: ["Penicillin (rash)"],
    socialHistory: "Smokes 1 pack per day for 20 years. Occasional alcohol use. Works as an accountant.",
    familyHistory: "Father died of myocardial infarction at 55. Mother has hypertension.",
    differentialDiagnosis: ["Essential Hypertension", "Secondary Hypertension (renal artery stenosis)", "Anxiety Disorder", "Migraine"],
    managementPlan: "Initiate Lisinopril 10mg daily, increase Metformin to 1500mg BID if blood glucose not controlled. Advise smoking cessation and dietary modifications (low sodium). Follow-up in 2 weeks.",
    notes: "Patient educated on importance of medication adherence and lifestyle changes. Provided resources for smoking cessation program."
  },
  {
    id: "case-002",
    title: "Acute Bronchitis Management",
    priority: "low",
    status: "completed",
    patient: {
      id: "patient-002",
      name: "Jane Smith",
      age: 28,
      gender: "female",
      medicalRecordNumber: "MRN002"
    },
    createdAt: "2024-06-02T11:15:00Z",
    updatedAt: "2024-06-07T16:00:00Z",
    chiefComplaint: "Productive cough and shortness of breath for 5 days.",
    chiefComplaintAnalysis: "Cough started dry, now productive with clear sputum. Worsens at night. Associated with mild exertional dyspnea. No fever, no chest pain. Denies recent travel or sick contacts.",
    history: "Cough started dry, now productive with clear sputum. Worsens at night. Associated with mild exertional dyspnea. No fever, no chest pain. Denies recent travel or sick contacts.",
    physicalExam: "Temp 98.6°F, HR 72 bpm, RR 18 breaths/min, SpO2 98% on room air. Lungs: Scattered rhonchi in both lung fields, no crackles or wheezes. Throat: Mild erythema. No lymphadenopathy.",
    diagnoses: [
      {
        id: "dx-002",
        name: "Acute Bronchitis",
        status: "confirmed",
        notes: "Viral etiology suspected based on clinical presentation"
      }
    ],
    tags: [
      { id: "tag-003", name: "Respiratory", color: "#10b981" },
      { id: "tag-004", name: "Primary Care", color: "#f59e0b" }
    ],
    resources: [
      {
        id: "res-002",
        title: "Bronchitis Treatment Guidelines",
        type: "guideline",
        url: "https://www.cdc.gov/antibiotic-use/bronchitis.html",
        notes: "CDC guidelines for bronchitis management"
      }
    ],
    learningPoints: "Importance of avoiding unnecessary antibiotics in viral respiratory infections. Symptomatic management and patient education.",
    vitals: {
      "Temperature": "98.6°F",
      "Heart Rate": "72 bpm",
      "Respiratory Rate": "18 breaths/min",
      "SpO2": "98%"
    },
    urinarySymptoms: [],
    symptoms: {
      "cough": true,
      "shortness_of_breath": true,
      "fatigue": true
    },
    systemSymptoms: {
      "Respiratory": ["Cough", "Shortness of breath"],
      "Constitutional": ["Fatigue"]
    },
    labTests: [
      { 
        id: "lr-005", 
        name: "CBC with Differential", 
        value: "Within normal limits", 
        unit: "N/A",
        normalRange: "N/A",
        interpretation: "Normal"
      }
    ],
    radiologyStudies: [
      { 
        id: "rr-003", 
        name: "Chest X-ray", 
        type: "X-Ray", 
        findings: "No infiltrate or consolidation. Mild peribronchial thickening.", 
        date: "2024-06-05T00:00:00Z",
        impression: "Consistent with viral bronchitis."
      }
    ],
    radiologyExams: [], // Keep for backward compatibility
    pastMedicalHistory: ["Seasonal Allergies"],
    medications: ["Loratadine 10mg daily (as needed)"],
    allergies: [],
    socialHistory: "Non-smoker. Works as a teacher. Lives with husband and two young children.",
    familyHistory: "No significant family history.",
    differentialDiagnosis: ["Acute Bronchitis", "Asthma exacerbation", "Pneumonia", "Allergic reaction"],
    managementPlan: "Symptomatic treatment with cough suppressants (Dextromethorphan), bronchodilator (Albuterol inhaler PRN for dyspnea). Advise rest and hydration. Return if symptoms worsen or develop fever.",
    notes: "Patient advised on humidifier use and avoiding irritants. Counseling on hand hygiene."
  }
];

/**
 * Retrieves a medical case by its unique ID.
 * @param id The ID of the case to retrieve.
 * @returns The MedicalCase object if found, otherwise undefined.
 */
export function getCaseById(id: string): MedicalCase | undefined {
  console.log(`Attempting to retrieve case with ID: ${id}`);
  const foundCase = mockCases.find(c => c.id === id);
  if (foundCase) {
    console.log(`Case found: ${foundCase.patient.name}`);
  } else {
    console.log(`Case with ID ${id} not found.`);
  }
  return foundCase;
}

// Export mock cases for use in other parts of the application
export { mockCases };
