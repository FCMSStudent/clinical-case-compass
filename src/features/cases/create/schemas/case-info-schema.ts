import { z } from "zod";

export const caseInfoSchema = z.object({
  caseTitle: z.string().optional(),
  chiefComplaint: z.string().optional(),
  specialty: z.string().optional(),
});

export type CaseInfoFormData = z.infer<typeof caseInfoSchema>; 