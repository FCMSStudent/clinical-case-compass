import { z } from 'zod';

// ────────────────────────────────────────────────────────────────────────────────
// VALIDATION SCHEMAS FOR UNIFIED TYPE SYSTEM
// ────────────────────────────────────────────────────────────────────────────────

// Patient validation schema
export const patientSchema = z.object({
  id: z.string().min(1, 'Patient ID is required'),
  name: z.string()
    .min(1, 'Patient name is required')
    .min(2, 'Patient name must be at least 2 characters')
    .max(100, 'Patient name must be less than 100 characters'),
  age: z.number()
    .min(0, 'Age must be 0 or greater')
    .max(150, 'Age must be 150 or less'),
  gender: z.enum(["male", "female", "other"]),
  medicalRecordNumber: z.string().optional(),
});

export type PatientFormData = z.infer<typeof patientSchema>;

// Medical case validation schema
export const medicalCaseSchema = z.object({
  title: z.string().optional(),
  chiefComplaint: z.string().optional(),
  chiefComplaintAnalysis: z.string().optional(),
  history: z.string().optional(),
  physicalExam: z.string().optional(),
  learningPoints: z.string().optional(),
});

export type MedicalCaseFormData = z.infer<typeof medicalCaseSchema>;

// Diagnosis validation schema
export const diagnosisSchema = z.object({
  id: z.string().min(1, 'Diagnosis ID is required'),
  name: z.string()
    .min(1, 'Diagnosis name is required')
    .max(200, 'Diagnosis name must be less than 200 characters'),
  status: z.enum(["confirmed", "differential", "ruled_out"]),
  notes: z.string()
    .max(500, 'Diagnosis notes must be less than 500 characters')
    .optional(),
});

export type DiagnosisFormData = z.infer<typeof diagnosisSchema>;

// Resource validation schema
export const resourceSchema = z.object({
  id: z.string().min(1, 'Resource ID is required'),
  title: z.string()
    .min(1, 'Resource title is required')
    .max(200, 'Resource title must be less than 200 characters'),
  type: z.enum(["textbook", "article", "guideline", "video", "other"]),
  url: z.string().url('Resource URL must be valid').optional(),
  notes: z.string()
    .max(500, 'Resource notes must be less than 500 characters')
    .optional(),
});

export type ResourceFormData = z.infer<typeof resourceSchema>;

// Lab test validation schema - updated to match unified LabTest interface
export const labTestSchema = z.object({
  id: z.string().min(1, 'Lab test ID is required'),
  name: z.string()
    .min(1, 'Lab test name is required')
    .max(100, 'Lab test name must be less than 100 characters'),
  value: z.string()
    .min(1, 'Lab test value is required')
    .max(50, 'Lab test value must be less than 50 characters'),
  unit: z.string()
    .min(1, 'Lab test unit is required')
    .max(20, 'Lab test unit must be less than 20 characters'),
  normalRange: z.string()
    .max(50, 'Normal range must be less than 50 characters')
    .optional(),
  interpretation: z.string()
    .max(100, 'Interpretation must be less than 100 characters')
    .optional(),
});

export type LabTestFormData = z.infer<typeof labTestSchema>;

// Radiology study validation schema - updated to match unified RadiologyStudy interface
export const radiologyStudySchema = z.object({
  id: z.string().min(1, 'Radiology study ID is required'),
  name: z.string()
    .min(1, 'Study name is required')
    .max(100, 'Study name must be less than 100 characters'),
  type: z.string()
    .min(1, 'Study type is required')
    .max(50, 'Study type must be less than 50 characters'),
  findings: z.string()
    .min(1, 'Radiology findings are required')
    .max(1000, 'Radiology findings must be less than 1000 characters'),
  date: z.string().min(1, 'Study date is required'),
  impression: z.string()
    .max(500, 'Impression must be less than 500 characters')
    .optional(),
});

export type RadiologyStudyFormData = z.infer<typeof radiologyStudySchema>;

// Combined case form schema
export const caseFormSchema = z.object({
  patient: patientSchema.optional(),
  case: medicalCaseSchema.optional(),
  diagnoses: z.array(diagnosisSchema).optional(),
  resources: z.array(resourceSchema).optional(),
  labTests: z.array(labTestSchema).optional(),
  radiologyStudies: z.array(radiologyStudySchema).optional(),
});

export type CaseFormData = z.infer<typeof caseFormSchema>;
