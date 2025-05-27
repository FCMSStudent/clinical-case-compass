
import { MedicalCase, CaseTag } from "@/types/case";

// Generate a random ID
const generateId = () => Math.random().toString(36).substring(2, 10);

// Available case tags
export const caseTags: CaseTag[] = [
  { id: "tag1", name: "Cardiology", color: "#f87171" },
  { id: "tag2", name: "Neurology", color: "#60a5fa" },
  { id: "tag3", name: "Respiratory", color: "#34d399" },
  { id: "tag4", name: "Gastroenterology", color: "#fbbf24" },
  { id: "tag5", name: "Endocrinology", color: "#a78bfa" },
  { id: "tag6", name: "Orthopedics", color: "#fb923c" },
  { id: "tag7", name: "Dermatology", color: "#e879f9" },
  { id: "tag8", name: "Infectious Disease", color: "#4ade80" },
];

// Mock medical cases
export const mockCases: MedicalCase[] = [
  {
    id: "case1",
    title: "Acute Chest Pain with ECG Changes",
    priority: "high",
    patient: {
      id: "p1",
      name: "John Doe",
      age: 58,
      gender: "male",
      medicalRecordNumber: "MRN-123456",
    },
    createdAt: new Date(2023, 4, 15).toISOString(),
    updatedAt: new Date(2023, 4, 17).toISOString(),
    chiefComplaint: "Sudden onset chest pain radiating to left arm",
    history: "Patient presented with 3 hours of crushing substernal chest pain radiating to the left arm. Reports nausea, diaphoresis, and shortness of breath. History of hypertension and hyperlipidemia. Family history positive for CAD.",
    physicalExam: "BP 165/95, HR 96, RR 22, O2 Sat 94% on RA. Diaphoretic, in visible discomfort. Lung exam with clear breath sounds. Regular rhythm with S4 gallop.",
    diagnoses: [
      {
        id: "d1",
        name: "Acute Myocardial Infarction",
        status: "confirmed",
        notes: "Confirmed by elevated troponins and ST elevation in anterior leads",
      },
    ],
    tags: [caseTags[0]],
    resources: [
      {
        id: "r1",
        title: "AHA Guidelines for Management of STEMI",
        type: "guideline",
        url: "https://example.com/aha-stemi",
      },
      {
        id: "r2",
        title: "Braunwald's Heart Disease",
        type: "textbook",
        notes: "Chapter 53 - STEMI management",
      },
    ],
    learningPoints: "Early recognition of STEMI is critical. ECG changes may be subtle initially. Remember to check reciprocal changes. Review the AHA guidelines for primary PCI timing and thrombolysis indications.",
  },
  {
    id: "case2",
    title: "Acute Onset Hemiparesis",
    priority: "high",
    patient: {
      id: "p2",
      name: "Jane Smith",
      age: 72,
      gender: "female",
      medicalRecordNumber: "MRN-789012",
    },
    createdAt: new Date(2023, 3, 10).toISOString(),
    updatedAt: new Date(2023, 3, 10).toISOString(),
    chiefComplaint: "Sudden left-sided weakness and facial drooping",
    history: "Patient developed sudden onset of left-sided weakness and facial droop while gardening. Symptoms began approximately 1.5 hours prior to arrival. History of atrial fibrillation, hypertension.",
    physicalExam: "BP 178/96, HR 88 irregular, RR 18. Alert but with dysarthria. Left facial droop, left arm drift, and 3/5 strength in left leg. NIHSS score 8.",
    diagnoses: [
      {
        id: "d2",
        name: "Acute Ischemic Stroke",
        status: "confirmed",
        notes: "MCA territory on imaging",
      },
    ],
    tags: [caseTags[1]],
    resources: [
      {
        id: "r3",
        title: "Current Stroke Guidelines",
        type: "guideline",
        url: "https://example.com/stroke-guidelines",
      },
    ],
    learningPoints: "Remember to calculate the NIHSS score accurately. Time is brain - know the window for tPA and thrombectomy. This case illustrated the importance of recognizing atrial fibrillation as a stroke risk factor.",
  },
  {
    id: "case3",
    title: "Progressive Dyspnea with Cough",
    priority: "medium",
    patient: {
      id: "p3",
      name: "Robert Johnson",
      age: 64,
      gender: "male",
      medicalRecordNumber: "MRN-345678",
    },
    createdAt: new Date(2023, 2, 5).toISOString(),
    updatedAt: new Date(2023, 2, 7).toISOString(),
    chiefComplaint: "Increasing shortness of breath and productive cough",
    history: "Two-week history of progressively worsening dyspnea and productive cough with yellow sputum. 40 pack-year smoking history. Previously diagnosed with COPD 5 years ago.",
    physicalExam: "BP 145/85, HR 92, RR 24, O2 Sat 88% on RA. Diminished breath sounds with prolonged expiratory phase and scattered wheezes. Barrel chest deformity noted.",
    diagnoses: [
      {
        id: "d3",
        name: "COPD Exacerbation",
        status: "confirmed",
      },
      {
        id: "d4",
        name: "Community-acquired Pneumonia",
        status: "differential",
      },
    ],
    tags: [caseTags[2]],
    resources: [
      {
        id: "r4",
        title: "GOLD Guidelines for COPD",
        type: "guideline",
        url: "https://example.com/gold-copd",
      },
    ],
    learningPoints: "Important to distinguish between COPD exacerbation and pneumonia. Procalcitonin can be useful. Remember the GOLD criteria for severity assessment.",
  },
];

// Function to get all cases
export const getAllCases = (): MedicalCase[] => {
  // In a real app, this would fetch from an API
  return mockCases;
};

// Function to get a case by ID
export const getCaseById = (id: string): MedicalCase | undefined => {
  return mockCases.find(c => c.id === id);
};

// Function to get recent cases
export const getRecentCases = (limit: number = 5): MedicalCase[] => {
  return [...mockCases]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, limit);
};

// Function to get all tags
export const getAllTags = (): CaseTag[] => {
  return caseTags;
};
