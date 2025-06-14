
import { z } from "zod";
import {
  User as UserIcon,
  Brain as BrainIcon,
  TestTube as TestTubeIcon,
} from "lucide-react";

export const clinicalDetailStepSchema = z.object({
  patientHistory: z.string().optional(),
  systemSymptoms: z.record(z.array(z.string())).optional(),
  vitals: z.record(z.string()).optional(),
  physicalExam: z.string().optional(),
  labResults: z.array(z.object({
    id: z.string(),
    name: z.string(),
    value: z.string(),
    unit: z.string(),
  })).optional(),
  radiologyStudies: z.array(z.object({
    id: z.string(),
    type: z.string(),
    findings: z.string(),
  })).optional(),
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
