import { z } from "zod";
import {
  User as UserIcon,
  Brain as BrainIcon,
  TestTube as TestTubeIcon,
} from "lucide-react";

export const clinicalDetailStepSchema = z.object({
  patientHistory: z.string()
    .min(1, "Patient history is required")
    .min(10, "Patient history must be at least 10 characters")
    .max(2000, "Patient history must be less than 2000 characters"),
  selectedBodyParts: z.array(z.string())
    .min(1, "At least one body part must be selected")
    .default([]),
  systemSymptoms: z.record(z.array(z.string()))
    .refine((val) => Object.values(val).some(arr => arr.length > 0), {
      message: "At least one system must have symptoms selected"
    })
    .default({}),
  vitals: z.record(z.string())
    .refine((val) => Object.keys(val).length > 0, {
      message: "At least one vital sign must be recorded"
    })
    .default({}),
  physicalExam: z.string()
    .min(1, "Physical exam findings are required")
    .min(10, "Physical exam findings must be at least 10 characters")
    .max(2000, "Physical exam findings must be less than 2000 characters"),
  labResults: z
    .array(
      z.object({
        id: z.string(),
        name: z.string().min(1, "Lab test name is required"),
        value: z.string().min(1, "Lab test value is required"),
        unit: z.string().min(1, "Lab test unit is required"),
      }),
    )
    .default([]),
  radiologyExams: z
    .array(
      z.object({
        id: z.string(),
        modality: z.string().min(1, "Radiology modality is required"),
        findings: z.string()
          .min(1, "Radiology findings are required")
          .min(10, "Radiology findings must be at least 10 characters")
          .max(1000, "Radiology findings must be less than 1000 characters"),
      }),
    )
    .default([]),
});
export type ClinicalDetailFormData = z.infer<typeof clinicalDetailStepSchema>;

export const TAB_ITEMS = [
  {
    value: "history",
    label: "History & Exam",
    icon: UserIcon,
  },
  {
    value: "systems",
    label: "Systems Review",
    icon: BrainIcon,
  },
  {
    value: "diagnostics",
    label: "Diagnostics",
    icon: TestTubeIcon,
  },
] as const;
export type TabValue = (typeof TAB_ITEMS)[number]["value"];

