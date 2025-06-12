import { z } from "zod";

export const patientStepSchema = z.object({
  patientName: z.string().optional(),
  medicalRecordNumber: z.string().optional(),
  patientAge: z.number().optional(),
  patientSex: z.string().optional(),
  medicalHistory: z.string().optional(),
});

export type PatientFormData = z.infer<typeof patientStepSchema>; 