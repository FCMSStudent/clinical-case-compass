import { z } from "zod";

export const patientStepSchema = z.object({
  patientName: z.string()
    .min(1, "Patient name is required")
    .min(3, "Patient name must be at least 3 characters")
    .max(200, "Patient name must be less than 200 characters"),
  medicalRecordNumber: z.string().optional(),
  patientAge: z.coerce.number()
    .min(0, "Age must be a positive number")
    .max(120, "Age must be less than 120"),
  patientSex: z.enum(["male", "female", "other"]),
  medicalHistory: z.string().optional(),
});

export type PatientFormData = z.infer<typeof patientStepSchema>; 