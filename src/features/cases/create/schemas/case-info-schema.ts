import { z } from "zod";

export const caseInfoSchema = z.object({
  caseTitle: z.string().min(1, "Case title is required").min(10, "Title must be at least 10 characters"),
  chiefComplaint: z.string().min(1, "Chief complaint is required").min(20, "Chief complaint must be at least 20 characters"),
  specialty: z.string().optional(),
});

export type CaseInfoFormData = z.infer<typeof caseInfoSchema>; 