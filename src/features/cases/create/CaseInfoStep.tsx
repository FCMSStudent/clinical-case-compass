import React, { memo } from "react";
import { useFormContext, Path, FieldValues } from "react-hook-form";
import { FileText, Stethoscope, Tag, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { StepHeader } from "./components/StepHeader";
import { FormFieldCard } from "./components/FormFieldCard";
import { ValidationFeedback } from "./components/ValidationFeedback";
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
  const { control, formState } = useFormContext<T>();
  
  // Use shared validation utilities
  const { completedFields, totalFields, completionPercentage, errors } = useFormValidation<T>({
    requiredFields: ["caseTitle", "chiefComplaint"],
    watchFields: ["caseTitle", "chiefComplaint", "specialty"],
  });

  return (
    <section 
      className={cn("space-y-8", className)}
      role="region"
      aria-labelledby="case-info-step-title"
      aria-describedby="case-info-step-description"
    >
      <StepHeader
        title="Case Information"
        description="Create a comprehensive clinical case by providing essential information about the patient presentation and medical context."
        icon={FileText}
        gradient="blue"
      />

      {/* Validation summary alert */}
      {Object.keys(errors).length > 0 && (
        <div 
          className="relative" 
          role="alert" 
          aria-live="polite"
          aria-labelledby="validation-errors-heading"
        >
          <div className="absolute inset-0 bg-red-400/10 backdrop-blur-xl rounded-xl border border-red-400/20 shadow-xl"></div>
          <div className="relative bg-red-400/10 backdrop-blur-md rounded-xl border border-red-400/20 p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-400 mt-0.5" aria-hidden="true" />
              <div>
                <h3 id="validation-errors-heading" className="font-semibold text-red-400">
                  Validation Errors
                </h3>
                <p className="text-red-300 text-sm mt-1">
                  Please review and correct the highlighted fields below.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <FormFieldCard 
        icon={FileText} 
        title="Case Title" 
        gradient="emerald"
        tooltip="A clear, descriptive title helps others quickly understand the case's focus. Include key details like condition, patient type, or unique aspects."
        isRequired
      >
        <FormField
          control={control}
          name={"caseTitle" as Path<T>}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel 
                htmlFor="case-title-input"
                className="sr-only"
              >
                Case Title
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"></div>
                  <Input
                    id="case-title-input"
                    placeholder="e.g., Complex Hypertension Management in Elderly Patient with Comorbidities"
                    className={cn(
                      "relative bg-transparent border-0 text-white placeholder:text-white/50 focus-visible:ring-0 focus-visible:ring-offset-0 text-base rounded-xl py-3 px-4 transition-all duration-200",
                      fieldState.error && "text-red-300 placeholder:text-red-300/50"
                    )}
                    aria-describedby={fieldState.error ? "case-title-error" : "case-title-help"}
                    aria-invalid={fieldState.error ? "true" : "false"}
                    aria-required="true"
                    {...field}
                  />
                </div>
              </FormControl>
              <ValidationFeedback
                isValid={!fieldState.error}
                message={fieldState.error?.message || "Title looks good!"}
                id={fieldState.error ? "case-title-error" : "case-title-help"}
              />
              <FormDescription 
                className="text-white/70 mt-3 flex items-start gap-2"
                id="case-title-help"
              >
                <div className={cn(
                  "w-2 h-2 rounded-full mt-2 flex-shrink-0",
                  fieldState.error ? "bg-red-400" : "bg-emerald-400"
                )} aria-hidden="true"></div>
                Create a descriptive and engaging title that captures the essence of this clinical case
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </FormFieldCard>

      <FormFieldCard 
        icon={Stethoscope} 
        title="Chief Complaint" 
        gradient="rose"
        tooltip="Describe the patient's primary symptoms and concerns in detail. Include onset, duration, and any relevant context."
        isRequired
      >
        <FormField
          control={control}
          name={"chiefComplaint" as Path<T>}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel 
                htmlFor="chief-complaint-textarea"
                className="sr-only"
              >
                Chief Complaint
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"></div>
                  <Textarea
                    id="chief-complaint-textarea"
                    placeholder="e.g., 65-year-old patient presents with acute onset chest pain radiating to left arm, accompanied by shortness of breath and diaphoresis. Symptoms began 2 hours ago during mild physical activity..."
                    className={cn(
                      "relative bg-transparent border-0 text-white placeholder:text-white/50 focus-visible:ring-0 focus-visible:ring-offset-0 min-h-[140px] text-base rounded-xl p-4 leading-6 transition-all duration-200 resize-none",
                      fieldState.error && "text-red-300 placeholder:text-red-300/50"
                    )}
                    aria-describedby={fieldState.error ? "chief-complaint-error" : "chief-complaint-help"}
                    aria-invalid={fieldState.error ? "true" : "false"}
                    aria-required="true"
                    {...field}
                  />
                </div>
              </FormControl>
              <ValidationFeedback
                isValid={!fieldState.error}
                message={fieldState.error?.message}
                id={fieldState.error ? "chief-complaint-error" : "chief-complaint-help"}
              />
              <FormDescription 
                className="text-white/70 mt-3 flex items-start gap-2"
                id="chief-complaint-help"
              >
                <div className={cn(
                  "w-2 h-2 rounded-full mt-2 flex-shrink-0",
                  fieldState.error ? "bg-red-400" : "bg-rose-400"
                )} aria-hidden="true"></div>
                Describe the patient's primary symptoms, timeline, and presenting concerns in detail
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </FormFieldCard>

      <FormFieldCard 
        icon={Tag} 
        title="Medical Specialty" 
        gradient="violet"
        tooltip="Select the primary medical specialty most relevant to this clinical presentation."
      >
        <FormField
          control={control}
          name={"specialty" as Path<T>}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel 
                htmlFor="specialty-select"
                className="sr-only"
              >
                Medical Specialty
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"></div>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                    aria-describedby="specialty-help"
                  >
                    <SelectTrigger 
                      id="specialty-select"
                      className="relative bg-transparent border-0 text-white placeholder:text-white/50 focus-visible:ring-0 focus-visible:ring-offset-0 text-base rounded-xl py-3 px-4 h-auto transition-all duration-200"
                      aria-invalid={fieldState.error ? "true" : "false"}
                    >
                      <SelectValue placeholder="Select the most relevant medical specialty" />
                    </SelectTrigger>
                    <SelectContent 
                      className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-xl"
                      aria-label="Medical specialty options"
                    >
                      {MEDICAL_SPECIALTIES.map((specialty) => (
                        <SelectItem 
                          key={specialty} 
                          value={specialty}
                          className="py-3 px-4 text-base text-white hover:bg-white/20 focus:bg-white/20 rounded-lg mx-1"
                        >
                          {specialty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </FormControl>
              <ValidationFeedback
                isValid={!fieldState.error}
                message={fieldState.error?.message}
                id={fieldState.error ? "specialty-error" : "specialty-help"}
              />
              <FormDescription 
                className="text-white/70 mt-3 flex items-start gap-2"
                id="specialty-help"
              >
                <div className="w-2 h-2 rounded-full bg-violet-400 mt-2 flex-shrink-0" aria-hidden="true"></div>
                Choose the primary medical specialty most relevant to this clinical presentation
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </FormFieldCard>
    </section>
  );
});

CaseInfoStep.displayName = "CaseInfoStep";
