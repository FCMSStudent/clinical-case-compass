
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
import { User, Calendar, FileText, UserCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  StepHeader, 
  FieldGroup, 
  StatusFieldCard, 
  ValidationFeedback,
  StatusType 
} from "./components";
import { useFormValidation } from "@/hooks/use-form-validation";
import { patientStepSchema, PatientFormData } from "./schemas/patient-schema";

export interface PatientStepProps<T extends FieldValues = PatientFormData> {
  className?: string;
}

export const PatientStep = memo(function PatientStep<
  T extends FieldValues = PatientFormData,
>({ className }: PatientStepProps<T>) {
  const { control, watch } = useFormContext<T>();
  
  // Watch form values for status determination
  const formValues = watch();
  
  // Use shared validation utilities
  const { completedFields, totalFields, completionPercentage, errors } = useFormValidation<T>({
    requiredFields: ["patientName", "patientAge", "patientSex"],
    watchFields: ["patientName", "medicalRecordNumber", "patientAge", "patientSex", "medicalHistory"],
  });

  // Calculate demographics group status
  const demographicsStatus: StatusType = React.useMemo(() => {
    const requiredDemoFields = ["patientName", "patientAge", "patientSex"];
    const hasErrors = requiredDemoFields.some(field => errors[field as keyof typeof errors]);
    const isComplete = requiredDemoFields.every(field => {
      const value = formValues[field as keyof typeof formValues];
      return value !== undefined && value !== null && value !== "";
    });
    
    if (hasErrors) return "error";
    if (isComplete) return "success";
    return "default";
  }, [formValues, errors]);

  // Calculate medical history status
  const medicalHistoryStatus: StatusType = React.useMemo(() => {
    const hasHistory = formValues.medicalHistory && formValues.medicalHistory.trim().length > 0;
    return hasHistory ? "success" : "default";
  }, [formValues.medicalHistory]);

  return (
    <section className={cn("space-y-8", className)}>
      <StepHeader
        title="Patient Information"
        description="Provide essential patient demographics and medical background information."
        icon={User}
      />

      {/* Patient Demographics Group */}
      <FieldGroup
        title="Patient Demographics"
        description="Basic patient identification and demographic information"
        icon={UserCheck}
        status={demographicsStatus}
        completedFields={3} // This would be calculated dynamically
        totalFields={4}
      >
        {/* Patient Name */}
        <StatusFieldCard
          icon={User}
          title="Patient Name"
          tooltip="Enter the patient's full name as it appears in their medical records."
          isRequired
          fieldValue={formValues.patientName}
          hasError={!!errors.patientName}
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
                      "bg-white/10 border-white/20 text-white placeholder:text-white/60",
                      fieldState.error && "border-red-400/50 focus-visible:ring-red-400/30"
                    )}
                    {...field}
                  />
                </FormControl>
                <ValidationFeedback
                  isValid={!fieldState.error}
                  message={fieldState.error?.message || "Patient name looks good!"}
                />
                <FormDescription className="mt-3 flex items-start gap-2 text-white/70">
                  <div className={cn(
                    "w-2 h-2 rounded-full mt-2 flex-shrink-0",
                    fieldState.error ? "bg-red-400" : "bg-emerald-400"
                  )}></div>
                  Enter the patient's full name as it appears in their medical records
                </FormDescription>
              </FormItem>
            )}
          />
        </StatusFieldCard>

        {/* Medical Record Number */}
        <StatusFieldCard
          icon={FileText}
          title="Medical Record Number (MRN)"
          tooltip="If available, enter the patient's unique medical record number for easy identification."
          fieldValue={formValues.medicalRecordNumber}
          hasError={!!errors.medicalRecordNumber}
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
                      "bg-white/10 border-white/20 text-white placeholder:text-white/60",
                      fieldState.error && "border-red-400/50 focus-visible:ring-red-400/30"
                    )}
                    {...field}
                  />
                </FormControl>
                <ValidationFeedback
                  isValid={!fieldState.error}
                  message={fieldState.error?.message}
                />
                <FormDescription className="mt-3 flex items-start gap-2 text-white/70">
                  <div className={cn(
                    "w-2 h-2 rounded-full mt-2 flex-shrink-0",
                    fieldState.error ? "bg-red-400" : "bg-rose-400"
                  )}></div>
                  Enter the patient's unique medical record number for easy identification (if available)
                </FormDescription>
              </FormItem>
            )}
          />
        </StatusFieldCard>

        {/* Age and Sex Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StatusFieldCard
            icon={Calendar}
            title="Patient Age"
            tooltip="Enter the patient's age in years."
            isRequired
            fieldValue={formValues.patientAge}
            hasError={!!errors.patientAge}
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
                        "bg-white/10 border-white/20 text-white placeholder:text-white/60",
                        fieldState.error && "border-red-400/50 focus-visible:ring-red-400/30"
                      )}
                      {...field}
                    />
                  </FormControl>
                  <ValidationFeedback
                    isValid={!fieldState.error}
                    message={fieldState.error?.message}
                  />
                  <FormDescription className="mt-3 flex items-start gap-2 text-white/70">
                    <div className={cn(
                      "w-2 h-2 rounded-full mt-2 flex-shrink-0",
                      fieldState.error ? "bg-red-400" : "bg-violet-400"
                    )}></div>
                    Enter the patient's age in years
                  </FormDescription>
                </FormItem>
              )}
            />
          </StatusFieldCard>

          <StatusFieldCard
            icon={User}
            title="Patient Sex"
            tooltip="Select the patient's sex as recorded in their medical records."
            isRequired
            fieldValue={formValues.patientSex}
            hasError={!!errors.patientSex}
          >
            <FormField
              control={control}
              name={"patientSex" as Path<T>}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger
                        className={cn(
                          "bg-white/10 border-white/20 text-white placeholder:text-white/60",
                          fieldState.error && "border-red-400/50 focus-visible:ring-red-400/30"
                        )}
                      >
                        <SelectValue placeholder="Select sex" />
                      </SelectTrigger>
                      <SelectContent className="bg-white/90 backdrop-blur-md rounded-xl border border-white/20 shadow-xl">
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <ValidationFeedback
                    isValid={!fieldState.error}
                    message={fieldState.error?.message}
                  />
                  <FormDescription className="mt-3 flex items-start gap-2 text-white/70">
                    <div className={cn(
                      "w-2 h-2 rounded-full mt-2 flex-shrink-0",
                      fieldState.error ? "bg-red-400" : "bg-blue-400"
                    )}></div>
                    Select the patient's sex as recorded in their medical records
                  </FormDescription>
                </FormItem>
              )}
            />
          </StatusFieldCard>
        </div>
      </FieldGroup>

      {/* Medical History Group */}
      <FieldGroup
        title="Medical Background"
        description="Relevant medical history and chronic conditions"
        icon={FileText}
        status={medicalHistoryStatus}
        completedFields={medicalHistoryStatus === "success" ? 1 : 0}
        totalFields={1}
      >
        <StatusFieldCard
          icon={FileText}
          title="Medical History"
          tooltip="Summarize the patient's relevant past medical history, chronic conditions, and previous interventions."
          fieldValue={formValues.medicalHistory}
          hasError={!!errors.medicalHistory}
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
                      "bg-white/10 border-white/20 text-white placeholder:text-white/60",
                      fieldState.error && "border-red-400/50 focus-visible:ring-red-400/30"
                    )}
                    {...field}
                  />
                </FormControl>
                <ValidationFeedback
                  isValid={!fieldState.error}
                  message={fieldState.error?.message}
                />
                <FormDescription className="mt-3 flex items-start gap-2 text-white/70">
                  <div className={cn(
                    "w-2 h-2 rounded-full mt-2 flex-shrink-0",
                    fieldState.error ? "bg-red-400" : "bg-amber-400"
                  )}></div>
                  Summarize the patient's relevant past medical history, chronic conditions, and previous interventions
                </FormDescription>
              </FormItem>
            )}
          />
        </StatusFieldCard>
      </FieldGroup>
    </section>
  );
});

PatientStep.displayName = "PatientStep";
