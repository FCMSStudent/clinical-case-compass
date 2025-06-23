
export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: "male" | "female" | "other" | "unknown";
  medicalRecordNumber?: string | undefined;
}

export interface CaseTag {
  id: string;
  name: string;
  color: string;
}

export type DiagnosisStatus = "confirmed" | "differential" | "ruled_out";

export interface Diagnosis {
  id: string;
  name: string;
  status: DiagnosisStatus;
  notes?: string;
}

export interface Resource {
  id: string;
  title: string;
  type: "textbook" | "article" | "guideline" | "video" | "other";
  url?: string;
  notes?: string;
}

export interface LabTest {
  id: string;
  name: string;
  value: string;
  unit: string;
  normalRange?: string;
  interpretation?: string;
}

export interface RadiologyStudy {
  id: string;
  name: string;
  type: string;
  findings: string;
  date: string; // Required field - always provide a date string
  impression?: string;
}

export interface MedicalCase {
  id: string;
  title: string;
  priority: "low" | "medium" | "high";
  status: "draft" | "active" | "completed" | "archived";
  patient: Patient;
  createdAt: string;
  updatedAt: string;
  chiefComplaint: string;
  chiefComplaintAnalysis?: string;
  history?: string; // Keep optional as it's used this way
  physicalExam?: string; // Keep optional as it's used this way
  diagnoses: Diagnosis[];
  tags: CaseTag[];
  resources: Resource[];
  learningPoints?: string; // Keep optional as it's used this way
  vitals?: Record<string, string>;
  urinarySymptoms?: string[];
  symptoms?: Record<string, string[]>; // Corrected type for review of systems
  labTests?: LabTest[];
  radiologyStudies?: RadiologyStudy[];
  pastMedicalHistory?: string[];
  medications?: string[];
  allergies?: string[];
  socialHistory?: string;
  familyHistory?: string;
  differentialDiagnosis?: string[];
  managementPlan?: string;
  notes?: string;
  rating?: number;
  specialty?: string;
}

// Medical specialties list for use throughout the app
export const SPECIALTIES = [
  { id: "allergy", name: "Allergy & Immunology" },
  { id: "anesthesiology", name: "Anesthesiology" },
  { id: "cardiology", name: "Cardiology" },
  { id: "dermatology", name: "Dermatology" },
  { id: "emergency", name: "Emergency Medicine" },
  { id: "endocrinology", name: "Endocrinology" },
  { id: "family", name: "Family Medicine" },
  { id: "gastroenterology", name: "Gastroenterology" },
  { id: "geriatrics", name: "Geriatrics" },
  { id: "hematology", name: "Hematology" },
  { id: "infectious", name: "Infectious Disease" },
  { id: "internal", name: "Internal Medicine" },
  { id: "nephrology", name: "Nephrology" },
  { id: "neurology", name: "Neurology" },
  { id: "neurosurgery", name: "Neurosurgery" },
  { id: "obgyn", name: "Obstetrics & Gynecology" },
  { id: "oncology", name: "Oncology" },
  { id: "ophthalmology", name: "Ophthalmology" },
  { id: "orthopedics", name: "Orthopedics" },
  { id: "otolaryngology", name: "Otolaryngology (ENT)" },
  { id: "pathology", name: "Pathology" },
  { id: "pediatrics", name: "Pediatrics" },
  { id: "psychiatry", name: "Psychiatry" },
  { id: "pulmonology", name: "Pulmonology" },
  { id: "radiology", name: "Radiology" },
  { id: "rheumatology", name: "Rheumatology" },
  { id: "surgery", name: "Surgery" },
  { id: "urology", name: "Urology" },
  { id: "vascular", name: "Vascular Medicine" }
];

// API Error types
export interface ApiError {
  message: string;
  code?: string;
  details?: unknown;
}

// Form state types
export interface FormErrors {
  [key: string]: string | undefined;
}

export interface LoadingState {
  isLoading: boolean;
  isSubmitting: boolean;
  isDeleting: boolean;
}

// Save status type for autosave functionality - updated to include error
export type SaveStatus = "saving" | "saved" | "idle" | "error";

export type BodyPart = "Head" | "Neck" | "Chest" | "Abdomen" | "Arms" | "Legs";
