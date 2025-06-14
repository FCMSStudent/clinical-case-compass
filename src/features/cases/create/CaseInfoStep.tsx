import React, { memo } from "react";
import { useFormContext, Path, FieldValues } from "react-hook-form";
import { FileText, Stethoscope, Tag, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  StepHeader,
  FormFieldCard,
  StatusFieldCard,
  FieldGroup,
  ValidationFeedback
} from "./components/EnhancedFormComponents";
import {
  FormField,
  FormItem,
  FormControl,
  FormDescription,
  FormMessage,
  FormLabel,
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
import { useFormValidation } from "@/hooks/use-form-validation";
import { caseInfoSchema, CaseInfoFormData } from "./schemas/case-info-schema";

/**
 * Constants
 */
const MEDICAL_SPECIALTIES = [
  "Cardiology",
  "Dermatology",
  "Emergency Medicine",
  "Endocrinology",
  "Family Medicine",
  "Gastroenterology",
  "General Surgery",
  "Geriatrics",
  "Hematology",
  "Infectious Disease",
  "Internal Medicine",
  "Nephrology",
  "Neurology",
  "Obstetrics & Gynecology",
  "Oncology",
  "Ophthalmology",
  "Orthopedics",
  "Otolaryngology",
  "Pathology",
  "Pediatrics",
  "Psychiatry",
  "Pulmonology",
  "Radiology",
  "Surgery",
  "Urology",
  "Other",
] as const;

/**
 * ────────────────────────────────────────────────────────────────────────────────
 * PROPS
 * ────────────────────────────────────────────────────────────────────────────────
 */
export interface CaseInfoStepProps<T extends FieldValues = CaseInfoFormData> {
  className?: string;
}

/**
 * ────────────────────────────────────────────────────────────────────────────────
 * COMPONENT
 * ────────────────────────────────────────────────────────────────────────────────
 */
export const CaseInfoStep = memo(function CaseInfoStep<
  T extends FieldValues = CaseInfoFormData,
>({ className }: CaseInfoStepProps<T>) {
  const { control, formState, watch } = useFormContext<T>();
  
  // Use shared validation utilities
  const { completedFields, totalFields, completionPercentage, errors } = useFormValidation<T>({
    requiredFields: ["caseTitle", "chiefComplaint"],
    watchFields: ["caseTitle", "chiefComplaint", "specialty"],
  });

  const watchedValues = watch();

  return (
    <div className={cn("space-y-8", className)}>
      <StepHeader
        title="Case Information"
        description="Provide essential details about the clinical case, including a descriptive title, chief complaint, and medical specialty to help categorize and organize the case effectively."
        icon={FileText}
      />

      <FieldGroup
        title="Case Details"
        description="Basic case identification and categorization"
        icon={FileText}
        status={completedFields === totalFields ? 'success' : 'default'}
        completedFields={completedFields}
        totalFields={totalFields}
      >
        <div className="space-y-6">
          <StatusFieldCard
            icon={FileText}
            title="Case Title"
            tooltip="A clear, descriptive title helps others quickly understand the case's focus. Include key details like condition, patient type, or unique aspects."
            isRequired
            fieldValue={watchedValues.caseTitle}
            hasError={!!errors.caseTitle}
          >
            <FormField
              control={control}
              name={"caseTitle" as Path<T>}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="e.g., Complex Hypertension Management in Elderly Patient with Comorbidities"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-200"
                      {...field}
                    />
                  </FormControl>
                  <ValidationFeedback
                    isValid={!fieldState.error}
                    message={fieldState.error?.message || "Title looks good!"}
                  />
                </FormItem>
              )}
            />
          </StatusFieldCard>

          <StatusFieldCard
            icon={Stethoscope}
            title="Chief Complaint"
            tooltip="The primary reason for the patient's visit or the main clinical problem being addressed."
            isRequired
            fieldValue={watchedValues.chiefComplaint}
            hasError={!!errors.chiefComplaint}
          >
            <FormField
              control={control}
              name={"chiefComplaint" as Path<T>}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="e.g., Chest pain for 2 hours"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-200"
                      {...field}
                    />
                  </FormControl>
                  <ValidationFeedback
                    isValid={!fieldState.error}
                    message={fieldState.error?.message || "Chief complaint looks good!"}
                  />
                </FormItem>
              )}
            />
          </StatusFieldCard>

          <StatusFieldCard
            icon={Tag}
            title="Medical Specialty"
            tooltip="Select the primary medical specialty that best categorizes this case."
            fieldValue={watchedValues.specialty}
            hasError={!!errors.specialty}
          >
            <FormField
              control={control}
              name={"specialty" as Path<T>}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-200">
                        <SelectValue placeholder="Select a specialty" />
                      </SelectTrigger>
                      <SelectContent className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl">
                        {MEDICAL_SPECIALTIES.map((specialty) => (
                          <SelectItem
                            key={specialty}
                            value={specialty}
                            className="text-white hover:bg-white/20 focus:bg-white/20"
                          >
                            {specialty}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <ValidationFeedback
                    isValid={!fieldState.error}
                    message={fieldState.error?.message || "Specialty selected!"}
                  />
                </FormItem>
              )}
            />
          </StatusFieldCard>
        </div>
      </FieldGroup>
    </div>
  );
});

CaseInfoStep.displayName = "CaseInfoStep";
