import { z } from 'zod';

// Patient validation schema
export const patientSchema = z.object({
  name: z.string()
    .min(1, 'Patient name is required')
    .min(2, 'Patient name must be at least 2 characters')
    .max(100, 'Patient name must be less than 100 characters'),
  age: z.number()
    .min(0, 'Age must be 0 or greater')
    .max(150, 'Age must be 150 or less')
    .int('Age must be a whole number'),
  gender: z.enum(['male', 'female', 'other'], {
    required_error: 'Gender is required'
  }),
  medicalRecordNumber: z.string()
    .optional()
    .refine((val) => !val || val.length >= 3, {
      message: 'Medical record number must be at least 3 characters if provided'
    })
});

// Medical case validation schema
export const medicalCaseSchema = z.object({
  title: z.string()
    .min(1, 'Case title is required')
    .min(5, 'Case title must be at least 5 characters')
    .max(200, 'Case title must be less than 200 characters'),
  chiefComplaint: z.string()
    .min(1, 'Chief complaint is required')
    .min(10, 'Chief complaint must be at least 10 characters')
    .max(500, 'Chief complaint must be less than 500 characters'),
  chiefComplaintAnalysis: z.string()
    .max(1000, 'Chief complaint analysis must be less than 1000 characters')
    .optional(),
  history: z.string()
    .max(2000, 'History must be less than 2000 characters')
    .optional(),
  physicalExam: z.string()
    .max(2000, 'Physical exam must be less than 2000 characters')
    .optional(),
  learningPoints: z.string()
    .max(1000, 'Learning points must be less than 1000 characters')
    .optional()
});

// Diagnosis validation schema
export const diagnosisSchema = z.object({
  name: z.string()
    .min(1, 'Diagnosis name is required')
    .min(3, 'Diagnosis name must be at least 3 characters')
    .max(200, 'Diagnosis name must be less than 200 characters'),
  status: z.enum(['confirmed', 'differential', 'ruled_out'], {
    required_error: 'Diagnosis status is required'
  }),
  notes: z.string()
    .max(500, 'Diagnosis notes must be less than 500 characters')
    .optional()
});

// Resource validation schema
export const resourceSchema = z.object({
  title: z.string()
    .min(1, 'Resource title is required')
    .min(3, 'Resource title must be at least 3 characters')
    .max(200, 'Resource title must be less than 200 characters'),
  type: z.enum(['guideline', 'textbook', 'article', 'video', 'other'], {
    required_error: 'Resource type is required'
  }),
  url: z.string()
    .url('Must be a valid URL')
    .optional()
    .or(z.literal('')),
  notes: z.string()
    .max(500, 'Resource notes must be less than 500 characters')
    .optional()
});

// Lab test validation schema
export const labTestSchema = z.object({
  name: z.string()
    .min(1, 'Lab test name is required')
    .max(100, 'Lab test name must be less than 100 characters'),
  value: z.string()
    .min(1, 'Lab test value is required')
    .max(50, 'Lab test value must be less than 50 characters'),
  unit: z.string()
    .min(1, 'Lab test unit is required')
    .max(20, 'Lab test unit must be less than 20 characters')
});

// Update radiology schema to match RadiologyStudy
export const radiologyStudySchema = z.object({
  id: z.string().optional(),
  name: z.string()
    .min(1, 'Study name is required')
    .max(100, 'Study name must be less than 100 characters'),
  type: z.string()
    .min(1, 'Study type is required')
    .max(50, 'Study type must be less than 50 characters'),
  findings: z.string()
    .min(1, 'Radiology findings are required')
    .max(1000, 'Radiology findings must be less than 1000 characters'),
  date: z.string().optional(),
  impression: z.string().optional(),
});

export type RadiologyStudyFormData = z.infer<typeof radiologyStudySchema>;

// Keep old schema for backward compatibility
export const radiologyExamSchema = z.object({
  modality: z.string()
    .min(1, 'Radiology modality is required')
    .max(50, 'Radiology modality must be less than 50 characters'),
  findings: z.string()
    .min(1, 'Radiology findings are required')
    .max(1000, 'Radiology findings must be less than 1000 characters')
});

export type RadiologyExamFormData = z.infer<typeof radiologyExamSchema>;

// Combined case form schema
export const caseFormSchema = z.object({
  patient: patientSchema,
  case: medicalCaseSchema,
  diagnoses: z.array(diagnosisSchema).optional(),
  resources: z.array(resourceSchema).optional(),
  labTests: z.array(labTestSchema).optional(),
  radiologyExams: z.array(radiologyExamSchema).optional()
});

export type PatientFormData = z.infer<typeof patientSchema>;
export type MedicalCaseFormData = z.infer<typeof medicalCaseSchema>;
export type DiagnosisFormData = z.infer<typeof diagnosisSchema>;
export type ResourceFormData = z.infer<typeof resourceSchema>;
export type LabTestFormData = z.infer<typeof labTestSchema>;
export type CaseFormData = z.infer<typeof caseFormSchema>;
