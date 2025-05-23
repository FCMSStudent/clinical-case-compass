
export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: "male" | "female" | "other";
  medicalRecordNumber?: string;
}

export interface CaseTag {
  id: string;
  name: string;
  color: string;
}

export type DiagnosisStatus = "confirmed" | "provisional" | "differential";

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
}

export interface RadiologyExam {
  id: string;
  modality: string;
  findings: string;
}

export interface MedicalCase {
  id: string;
  title: string;
  patient: Patient;
  createdAt: string;
  updatedAt: string;
  chiefComplaint: string;
  chiefComplaintAnalysis?: string;
  history?: string;
  physicalExam?: string;
  diagnoses: Diagnosis[];
  tags: CaseTag[];
  resources: Resource[];
  learningPoints?: string;
  vitals?: Record<string, string>;
  urinarySymptoms?: string[];
  symptoms?: Record<string, boolean>;
  systemSymptoms?: Record<string, string[]>;
  labTests?: LabTest[];
  radiologyExams?: RadiologyExam[];
}
