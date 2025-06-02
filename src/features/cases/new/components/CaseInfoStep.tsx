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
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { FileText, Stethoscope, Tag } from "lucide-react";
import { cn } from "@/shared/utils";

/**
 * ────────────────────────────────────────────────────────────────────────────────
 * SCHEMA
 * ────────────────────────────────────────────────────────────────────────────────
 */
export const caseInfoSchema = z.object({
  caseTitle: z.string().min(3, "Case title must be at least 3 characters."),
  chiefComplaint: z.string().min(5, "Chief complaint must be at least 5 characters."),
  specialty: z.string().min(1, "Please select a medical specialty."),
});

export type CaseInfoFormData = z.infer<typeof caseInfoSchema>;

/**
 * Constants
 */
const MEDICAL_SPECIALTIES = [
  "Internal Medicine",
  "Cardiology",
  "Dermatology",
  "Emergency Medicine",
  "Family Medicine",
  "Gastroenterology",
  "Neurology",
  "Oncology",
  "Orthopedics",
  "Pediatrics",
  "Psychiatry",
  "Radiology",
  "Surgery",
  "Urology",
  "Other",
] as const;

/**
 * Utility wrapper for consistent card styling
 */
function FieldCard({
  icon: Icon,
  title,
  children,
  className,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Card className={cn("shadow-sm border-border", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base text-foreground">
          <Icon className="h-4 w-4 text-primary" /> {title}
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

/**
 * ────────────────────────────────────────────────────────────────────────────────
 * PROPS
 * ────────────────────────────────────────────────────────────────────────────────
 */
export interface CaseInfoStepProps<T extends FieldValues = CaseInfoFormData> {
  control: Control<T>;
  className?: string;
}

/**
 * ────────────────────────────────────────────────────────────────────────────────
 * COMPONENT
 * ────────────────────────────────────────────────────────────────────────────────
 */
export const CaseInfoStep = memo(function CaseInfoStep<
  T extends FieldValues = CaseInfoFormData,
>({ control, className }: CaseInfoStepProps<T>) {
  return (
    <section className={cn("space-y-6", className)}>
      {/* Header */}
      <header className="mb-6 space-y-1">
        <h3 className="flex items-center text-lg font-semibold text-primary">
          <FileText className="mr-2 h-5 w-5" /> Case Information
        </h3>
        <p className="text-sm text-muted-foreground">
          Enter the basic information about this clinical case.
        </p>
      </header>

      {/* Case Title */}
      <FieldCard icon={FileText} title="Case Title *">
        <FormField
          control={control}
          name={"caseTitle" as Path<T>}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="e.g., Complex Hypertension Management in Elderly Patient"
                  className="text-sm"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                A descriptive title that summarizes the main focus of this case.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </FieldCard>

      {/* Chief Complaint */}
      <FieldCard icon={Stethoscope} title="Chief Complaint *">
        <FormField
          control={control}
          name={"chiefComplaint" as Path<T>}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="e.g., 65-year-old patient presents with chest pain and shortness of breath..."
                  className="min-h-[120px] text-sm"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                The primary reason for the patient's visit, including presenting symptoms and relevant context.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </FieldCard>

      {/* Medical Specialty */}
      <FieldCard icon={Tag} title="Medical Specialty *">
        <FormField
          control={control}
          name={"specialty" as Path<T>}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="text-sm">
                    <SelectValue placeholder="Select the relevant medical specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    {MEDICAL_SPECIALTIES.map((specialty) => (
                      <SelectItem key={specialty} value={specialty}>
                        {specialty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>
                The primary medical specialty or department most relevant to this case.
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
