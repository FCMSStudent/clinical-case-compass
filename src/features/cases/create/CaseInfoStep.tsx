import React, { memo } from "react";
import { Control, FieldValues, Path } from "react-hook-form";
import { z } from "zod";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FileText as FileTextIcon,
  MessageSquare as MessageSquareIcon,
  Stethoscope as StethoscopeIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * ────────────────────────────────────────────────────────────────────────────────
 * SCHEMA
 * ────────────────────────────────────────────────────────────────────────────────
 */
export const caseInfoSchema = z.object({
  caseTitle: z
    .string()
    .min(5, { message: "Title must be at least 5 characters long" }),
  chiefComplaint: z
    .string()
    .min(10, { message: "Chief complaint must be at least 10 characters long" }),
  specialty: z.string().min(1, { message: "Medical specialty is required" }),
});

export type CaseInfoFormData = z.infer<typeof caseInfoSchema>;

/**
 * Specialty options – update here to surface everywhere.
 */
export const SPECIALTIES = [
  "Cardiology",
  "Neurology",
  "Pediatrics",
  "Orthopedics",
  "General Medicine",
  "Oncology",
  "Dermatology",
  "Endocrinology",
  "Gastroenterology",
  "Pulmonology",
  "Emergency Medicine",
  "General Surgery",
  "Psychiatry",
  "Radiology",
  "Anesthesiology",
  "Pathology",
  "Ophthalmology",
  "ENT (Otolaryngology)",
  "Urology",
  "Obstetrics & Gynecology",
] as const;

/**
 * ────────────────────────────────────────────────────────────────────────────────
 * PROPS
 * ────────────────────────────────────────────────────────────────────────────────
 */
export interface CaseInfoStepProps<T extends FieldValues = CaseInfoFormData> {
  /**
   * `react‑hook‑form` control for the parent form.
   */
  control: Control<T>;
  /**
   * Extra class names for the wrapper.
   */
  className?: string;
}

/**
 * Utility to wrap a `<Card>` with common header aesthetics.
 */
function FieldCard({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="border-medical-200">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-base text-medical-700">
          <Icon className="mr-2 h-4 w-4" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

/**
 * ────────────────────────────────────────────────────────────────────────────────
 * COMPONENT
 * ────────────────────────────────────────────────────────────────────────────────
 */
export const CaseInfoStep = memo(function CaseInfoStep<
  T extends FieldValues = CaseInfoFormData,
>({ control, className }: CaseInfoStepProps<T>) {
  /* ------------------------------------------------------------------------- */
  return (
    <section className={cn("space-y-6", className)}>
      <header className="mb-6 space-y-1">
        <h3 className="flex items-center text-lg font-semibold text-medical-800">
          <FileTextIcon className="mr-2 h-5 w-5" />
          Case Overview
        </h3>
        <p className="text-sm text-muted-foreground">
          Provide the basic information about this clinical case.
        </p>
      </header>

      {/* — Case Title — */}
      <FieldCard icon={FileTextIcon} title="Case Title">
        <FormField
          control={control}
          name={"caseTitle" as Path<T>}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="e.g., Acute Myocardial Infarction in a 65‑year‑old Male"
                  className="text-base focus:border-medical-500"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                A concise and descriptive title that summarises the case. Include
                key details like condition, patient demographics, or unique
                aspects.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </FieldCard>

      {/* — Chief Complaint — */}
      <FieldCard icon={MessageSquareIcon} title="Chief Complaint">
        <FormField
          control={control}
          name={"chiefComplaint" as Path<T>}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="e.g., Patient presents with severe chest pain that started 2 hours ago, described as crushing and radiating to the left arm…"
                  className="min-h-[120px] resize-y focus:border-medical-500"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                The primary reason the patient sought medical attention, ideally
                in the patient’s own words. Include onset, duration, and key
                characteristics.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </FieldCard>

      {/* — Specialty — */}
      <FieldCard icon={StethoscopeIcon} title="Medical Specialty">
        <FormField
          control={control}
          name={"specialty" as Path<T>}
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="focus:border-medical-500">
                    <SelectValue placeholder="Select the primary medical specialty" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="max-h-60">
                  {SPECIALTIES.map((spec) => (
                    <SelectItem key={spec} value={spec}>
                      {spec}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                The primary medical specialty most relevant to this case. This
                helps categorise and route the case appropriately.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </FieldCard>
    </section>
  );
});

CaseInfoStep.displayName = "CaseInfoStep";
