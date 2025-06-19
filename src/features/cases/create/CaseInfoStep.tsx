import React, { memo } from "react";
import { useFormContext, Path, FieldValues } from "react-hook-form";
import { FileText, Stethoscope, Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import { StepHeader, StatusFieldCard } from "./components"; // Changed FormFieldCard to StatusFieldCard
import { CaseInfoFormData } from "./schemas/case-info-schema";
import { useFormValidation } from "@/hooks/use-form-validation"; // Added import for useFormValidation
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form"; // Added imports for form components
import { Input } from "@/components/ui/input"; // Added import for Input
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Added imports for select components

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
  const { control, watch } = useFormContext<T>(); // Removed formState as errors come from useFormValidation
  
  const { errors: validationErrors, watchedFields: localWatchedValues } = useFormValidation<T>({ // Renamed to avoid conflict, and using localWatchedValues
    requiredFields: ["caseTitle", "chiefComplaint"],
    watchFields: ["caseTitle", "chiefComplaint", "specialty"],
  });

  // Use watch from useFormContext directly if needed for other purposes,
  // or rely on watchedFields from useFormValidation if that's sufficient.
  // For fieldValue prop, it's better to use the values from useFormValidation 
  // as they are synchronized with the validation logic.
  const watchedValues = localWatchedValues as Record<string, unknown>;
  const caseTitleValue = watchedValues?.caseTitle;
  const chiefComplaintValue = watchedValues?.chiefComplaint;
  const specialtyValue = watchedValues?.specialty;

  return (
    <div className={cn("space-y-6", className)}>
      <StepHeader
        title="Case Information"
        description="Provide essential details about the clinical case, including a descriptive title, chief complaint, and medical specialty to help categorize and organize the case effectively."
        icon={FileText}
      />

      {/* Case Title */}
      <StatusFieldCard // Changed from FormFieldCard
        icon={FileText}
        title="Case Title"
        isRequired
        tooltip="A clear, descriptive title helps others quickly understand the case's focus. Include key details like condition, patient type, or unique aspects."
        hasError={!!validationErrors.caseTitle}
        fieldValue={caseTitleValue}
      >
        <FormField
          control={control}
          name={"caseTitle" as Path<T>}
          render={({ field }) => ( // Removed fieldState as it's not used
            <FormItem>
              <FormControl>
                <Input
                  placeholder="e.g., Complex Hypertension Management in Elderly Patient with Comorbidities"
                  // Removed custom classes as they should be handled by the Input component itself or base styles
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </StatusFieldCard>

      {/* Chief Complaint */}
      <StatusFieldCard // Changed from FormFieldCard
        icon={Stethoscope}
        title="Chief Complaint"
        isRequired
        tooltip="The primary reason for the patient's visit or the main clinical problem being addressed."
        hasError={!!validationErrors.chiefComplaint}
        fieldValue={chiefComplaintValue}
      >
        <FormField
          control={control}
          name={"chiefComplaint" as Path<T>}
          render={({ field }) => ( // Removed fieldState as it's not used
            <FormItem>
              <FormControl>
                <Input
                  placeholder="e.g., Chest pain for 2 hours"
                  // Removed custom classes
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </StatusFieldCard>

      {/* Medical Specialty */}
      <StatusFieldCard // Changed from FormFieldCard
        icon={Tag}
        title="Medical Specialty"
        tooltip="Select the primary medical specialty that best categorizes this case."
        hasError={!!validationErrors.specialty} 
        fieldValue={specialtyValue}
      >
        <FormField
          control={control}
          name={"specialty" as Path<T>}
          render={({ field }) => ( // Removed fieldState as it's not used
            <FormItem>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                  <SelectTrigger 
                    // Removed custom classes
                  >
                    <SelectValue 
                      placeholder="Select a specialty" 
                      // Removed custom classes
                    />
                  </SelectTrigger>
                  <SelectContent 
                    // Removed custom classes
                  >
                    {MEDICAL_SPECIALTIES.map((specialty) => (
                      <SelectItem
                        key={specialty}
                        value={specialty}
                        // Removed custom classes
                      >
                        {specialty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </StatusFieldCard>
    </div>
  );
});

CaseInfoStep.displayName = "CaseInfoStep";

