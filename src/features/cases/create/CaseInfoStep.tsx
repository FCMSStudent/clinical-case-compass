import React, { memo } from "react";
import { useFormContext, Path, FieldValues } from "react-hook-form";
import { FileText, Stethoscope, Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import { FormFieldCard, StepHeader } from "./components";
import { CaseInfoFormData } from "./schemas/case-info-schema";

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
  
  const { errors } = useFormValidation<T>({
    requiredFields: ["caseTitle", "chiefComplaint"],
    watchFields: ["caseTitle", "chiefComplaint", "specialty"],
  });

  const watchedValues = watch();

  return (
    <div className={cn("space-y-6", className)}>
      <StepHeader
        title="Case Information"
        description="Provide essential details about the clinical case, including a descriptive title, chief complaint, and medical specialty to help categorize and organize the case effectively."
        icon={FileText}
      />

      {/* Case Title */}
      <FormFieldCard
        icon={FileText}
        title="Case Title"
        isRequired
        tooltip="A clear, descriptive title helps others quickly understand the case's focus. Include key details like condition, patient type, or unique aspects."
        hasError={!!errors.caseTitle}
        fieldValue={watchedValues.caseTitle}
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
              <FormMessage />
            </FormItem>
          )}
        />
      </FormFieldCard>

      {/* Chief Complaint */}
      <FormFieldCard
        icon={Stethoscope}
        title="Chief Complaint"
        isRequired
        tooltip="The primary reason for the patient's visit or the main clinical problem being addressed."
        hasError={!!errors.chiefComplaint}
        fieldValue={watchedValues.chiefComplaint}
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
              <FormMessage />
            </FormItem>
          )}
        />
      </FormFieldCard>

      {/* Medical Specialty */}
      <FormFieldCard
        icon={Tag}
        title="Medical Specialty"
        tooltip="Select the primary medical specialty that best categorizes this case."
        hasError={!!errors.specialty} // Assuming specialty can have errors
        fieldValue={watchedValues.specialty}
      >
        <FormField
          control={control}
          name={"specialty" as Path<T>}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-200">
                    <SelectValue 
                      placeholder="Select a specialty" 
                      className="text-white placeholder:text-white/50"
                    />
                  </SelectTrigger>
                  <SelectContent className="bg-white/90 backdrop-blur-xl border border-white/20 rounded-xl max-h-60 overflow-y-auto">
                    {MEDICAL_SPECIALTIES.map((specialty) => (
                      <SelectItem
                        key={specialty}
                        value={specialty}
                        className="text-gray-900 hover:bg-white/20 focus:bg-white/20 cursor-pointer"
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
      </FormFieldCard>
    </div>
  );
});

CaseInfoStep.displayName = "CaseInfoStep";
