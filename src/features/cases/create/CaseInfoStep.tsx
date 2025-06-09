import React, { memo } from "react";
import { useFormContext, FieldValues, Path, useWatch } from "react-hook-form";
import { z } from "zod";
import {
  FormField,
  FormItem,
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
import { FileText, Stethoscope, Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { StepHeader, FormFieldCard, StepProgress, ValidationFeedback } from "./components";

/**
 * ────────────────────────────────────────────────────────────────────────────────
 * SCHEMA
 * ────────────────────────────────────────────────────────────────────────────────
 */
export const caseInfoSchema = z.object({
  caseTitle: z.string()
    .min(1, "Case title is required")
    .min(3, "Case title must be at least 3 characters")
    .max(200, "Case title must be less than 200 characters"),
  chiefComplaint: z.string()
    .min(1, "Chief complaint is required")
    .min(5, "Chief complaint must be at least 5 characters")
    .max(500, "Chief complaint must be less than 500 characters"),
  specialty: z.string().optional(),
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
  const [completedFields, setCompletedFields] = React.useState(0);
  const totalFields = 3; // caseTitle, chiefComplaint, specialty

  // Watch only the specific fields we want to track
  const watchedFields = useWatch({
    control,
    name: ["caseTitle", "chiefComplaint", "specialty"] as const,
  });
  
  React.useEffect(() => {
    const completed = watchedFields.filter(value => {
      if (typeof value === 'string') {
        return value.trim().length > 0;
      }
      return !!value;
    }).length;
    
    setCompletedFields(completed);
  }, [watchedFields]);

  return (
    <section className={cn("space-y-8", className)}>
      <StepHeader
        title="Case Information"
        description="Create a comprehensive clinical case by providing essential information about the patient presentation and medical context."
        icon={FileText}
        gradient="blue"
      />

      {/* Validation summary alert */}
      {Object.keys(formState.errors).length > 0 && (
        <div className="relative">
          <div className="absolute inset-0 bg-red-400/10 backdrop-blur-xl rounded-xl border border-red-400/20 shadow-xl"></div>
          <div className="relative bg-red-400/10 backdrop-blur-md rounded-xl border border-red-400/20 p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-400 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-400">Validation Errors</h3>
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
              <FormControl>
                <div className="relative">
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"></div>
                  <Input
                    placeholder="e.g., Complex Hypertension Management in Elderly Patient with Comorbidities"
                    className={cn(
                      "relative bg-transparent border-0 text-white placeholder:text-white/50 focus-visible:ring-0 focus-visible:ring-offset-0 text-base rounded-xl py-3 px-4 transition-all duration-200",
                      fieldState.error && "text-red-300 placeholder:text-red-300/50"
                    )}
                    {...field}
                  />
                </div>
              </FormControl>
              <ValidationFeedback
                isValid={!fieldState.error}
                message={fieldState.error?.message || "Title looks good!"}
              />
              <FormDescription className="text-white/70 mt-3 flex items-start gap-2">
                <div className={cn(
                  "w-2 h-2 rounded-full mt-2 flex-shrink-0",
                  fieldState.error ? "bg-red-400" : "bg-emerald-400"
                )}></div>
                Create a descriptive and engaging title that captures the essence of this clinical case
              </FormDescription>
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
              <FormControl>
                <div className="relative">
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"></div>
                  <Textarea
                    placeholder="e.g., 65-year-old patient presents with acute onset chest pain radiating to left arm, accompanied by shortness of breath and diaphoresis. Symptoms began 2 hours ago during mild physical activity..."
                    className={cn(
                      "relative bg-transparent border-0 text-white placeholder:text-white/50 focus-visible:ring-0 focus-visible:ring-offset-0 min-h-[140px] text-base rounded-xl p-4 leading-6 transition-all duration-200 resize-none",
                      fieldState.error && "text-red-300 placeholder:text-red-300/50"
                    )}
                    {...field}
                  />
                </div>
              </FormControl>
              <ValidationFeedback
                isValid={!fieldState.error}
                message={fieldState.error?.message}
              />
              <FormDescription className="text-white/70 mt-3 flex items-start gap-2">
                <div className={cn(
                  "w-2 h-2 rounded-full mt-2 flex-shrink-0",
                  fieldState.error ? "bg-red-400" : "bg-rose-400"
                )}></div>
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
      >
        <FormField
          control={control}
          name={"specialty" as Path<T>}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"></div>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="relative bg-transparent border-0 text-white placeholder:text-white/50 focus-visible:ring-0 focus-visible:ring-offset-0 text-base rounded-xl py-3 px-4 h-auto transition-all duration-200">
                      <SelectValue placeholder="Select the most relevant medical specialty" />
                    </SelectTrigger>
                    <SelectContent className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-xl">
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
              <FormDescription className="text-white/70 mt-3 flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-violet-400 mt-2 flex-shrink-0"></div>
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
