import React, { memo } from "react";
import { useFormContext, FieldValues, Path } from "react-hook-form";
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
import { User, Calendar, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { StepHeader, FormFieldCard, ValidationFeedback } from "./components";
import { useFormValidation } from "@/hooks/use-form-validation";
import { patientStepSchema, PatientFormData } from "./schemas/patient-schema";

/**
 * ────────────────────────────────────────────────────────────────────────────────
 * PROPS
 * ────────────────────────────────────────────────────────────────────────────────
 */
export interface PatientStepProps<T extends FieldValues = PatientFormData> {
  className?: string;
}

/**
 * ────────────────────────────────────────────────────────────────────────────────
 * COMPONENT
 * ────────────────────────────────────────────────────────────────────────────────
 */
export const PatientStep = memo(function PatientStep<
  T extends FieldValues = PatientFormData,
>({ className }: PatientStepProps<T>) {
  const { control } = useFormContext<T>();
  // Use shared validation utilities
  const { completedFields, totalFields, completionPercentage, errors } = useFormValidation<T>({
    requiredFields: ["patientName", "patientAge", "patientSex"],
    watchFields: ["patientName", "medicalRecordNumber", "patientAge", "patientSex", "medicalHistory"],
  });

  return (
    <section className={cn("space-y-8", className)}>
      <StepHeader
        title="Patient Information"
        description="Provide essential patient demographics and medical background information."
        icon={User}
      />

      {/* Patient Name */}
      <FormFieldCard
        icon={User}
        title="Patient Name"
        tooltip="Enter the patient's full name as it appears in their medical records."
        isRequired
      >
        <FormField
          control={control}
          name={"patientName" as Path<T>}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="e.g., John Doe"
                  className={cn(
                    undefined,
                    fieldState.error && "border-red-400/50 focus-visible:ring-red-400/30"
                  )}
                  {...field}
                />
              </FormControl>
              <ValidationFeedback
                isValid={!fieldState.error}
                message={fieldState.error?.message || "Patient name looks good!"}
              />
              <FormDescription className="text-white/70 mt-3 flex items-start gap-2">
                <div className={cn(
                  "w-2 h-2 rounded-full mt-2 flex-shrink-0",
                  fieldState.error ? "bg-red-400" : "bg-emerald-400"
                )}></div>
                Enter the patient's full name as it appears in their medical records
              </FormDescription>
            </FormItem>
          )}
        />
      </FormFieldCard>

      {/* Medical Record Number */}
      <FormFieldCard
        icon={FileText}
        title="Medical Record Number (MRN)"
        tooltip="If available, enter the patient's unique medical record number for easy identification."
      >
        <FormField
          control={control}
          name={"medicalRecordNumber" as Path<T>}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="e.g., 1234567"
                  className={cn(
                    undefined,
                    fieldState.error && "border-red-400/50 focus-visible:ring-red-400/30"
                  )}
                  {...field}
                />
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
                Enter the patient's unique medical record number for easy identification (if available)
              </FormDescription>
            </FormItem>
          )}
        />
      </FormFieldCard>

      {/* Age and Sex */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormFieldCard
          icon={Calendar}
          title="Patient Age"
          tooltip="Enter the patient's age in years."
          isRequired
        >
          <FormField
            control={control}
            name={"patientAge" as Path<T>}
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="e.g., 42"
                    className={cn(
                      undefined,
                      fieldState.error && "border-red-400/50 focus-visible:ring-red-400/30"
                    )}
                    {...field}
                  />
                </FormControl>
                <ValidationFeedback
                  isValid={!fieldState.error}
                  message={fieldState.error?.message}
                />
                <FormDescription className="text-white/70 mt-3 flex items-start gap-2">
                  <div className={cn(
                    "w-2 h-2 rounded-full mt-2 flex-shrink-0",
                    fieldState.error ? "bg-red-400" : "bg-violet-400"
                  )}></div>
                  Enter the patient's age in years
                </FormDescription>
              </FormItem>
            )}
          />
        </FormFieldCard>

        <FormFieldCard
          icon={User}
          title="Patient Sex"
          tooltip="Select the patient's sex as recorded in their medical records."
          isRequired
        >
          <FormField
            control={control}
            name={"patientSex" as Path<T>}
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className={cn(
                      "relative z-10 bg-transparent border-0 text-white placeholder:text-white/50 focus-visible:ring-0 focus-visible:ring-offset-0 text-base rounded-xl py-3 px-4 h-auto transition-all duration-200",
                      fieldState.error && "border-red-400/50 focus-visible:ring-red-400/30"
                    )}>
                      <SelectValue placeholder="Select sex" />
                    </SelectTrigger>
                    <SelectContent className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-xl">
                      <SelectItem value="male" className="py-3 px-4 text-base text-white hover:bg-white/20 focus:bg-white/20 rounded-lg mx-1">Male</SelectItem>
                      <SelectItem value="female" className="py-3 px-4 text-base text-white hover:bg-white/20 focus:bg-white/20 rounded-lg mx-1">Female</SelectItem>
                      <SelectItem value="other" className="py-3 px-4 text-base text-white hover:bg-white/20 focus:bg-white/20 rounded-lg mx-1">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <ValidationFeedback
                  isValid={!fieldState.error}
                  message={fieldState.error?.message}
                />
                <FormDescription className="text-white/70 mt-3 flex items-start gap-2">
                  <div className={cn(
                    "w-2 h-2 rounded-full mt-2 flex-shrink-0",
                    fieldState.error ? "bg-red-400" : "bg-blue-400"
                  )}></div>
                  Select the patient's sex as recorded in their medical records
                </FormDescription>
              </FormItem>
            )}
          />
        </FormFieldCard>
      </div>

      {/* Medical History */}
      <FormFieldCard
        icon={FileText}
        title="Medical History"
        tooltip="Summarize the patient's relevant past medical history, chronic conditions, and previous interventions."
      >
        <FormField
          control={control}
          name={"medicalHistory" as Path<T>}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="e.g., Hypertension, Type 2 Diabetes, Previous appendectomy in 2010..."
                  className={cn(
                    undefined,
                    fieldState.error && "border-red-400/50 focus-visible:ring-red-400/30"
                  )}
                  {...field}
                />
              </FormControl>
              <ValidationFeedback
                isValid={!fieldState.error}
                message={fieldState.error?.message}
              />
              <FormDescription className="text-white/70 mt-3 flex items-start gap-2">
                <div className={cn(
                  "w-2 h-2 rounded-full mt-2 flex-shrink-0",
                  fieldState.error ? "bg-red-400" : "bg-amber-400"
                )}></div>
                Summarize the patient's relevant past medical history, chronic conditions, and previous interventions
              </FormDescription>
            </FormItem>
          )}
        />
      </FormFieldCard>
    </section>
  );
});

PatientStep.displayName = "PatientStep";
