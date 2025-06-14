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
  ValidationFeedback
} from "./components/EnhancedFormComponents";
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
  const demographicsStatus = React.useMemo(() => {
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
  const medicalHistoryStatus = React.useMemo(() => {
    const hasHistory = formValues.medicalHistory && formValues.medicalHistory.trim().length > 0;
    return hasHistory ? "success" : "default";
  }, [formValues.medicalHistory]);

  return (
    <div className={cn("space-y-8", className)}>
      <StepHeader
        title="Patient Information"
        description="Provide essential patient demographics and medical background information for this clinical case study."
        icon={User}
      />

      {/* Patient Demographics Group */}
      <FieldGroup
        title="Patient Demographics"
        description="Basic patient identification and demographic information"
        icon={UserCheck}
        status={demographicsStatus}
        completedFields={3}
        totalFields={4}
      >
        <div className="space-y-6">
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
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-200"
                      {...field}
                    />
                  </FormControl>
                  <ValidationFeedback
                    isValid={!fieldState.error}
                    message={fieldState.error?.message || "Patient name looks good!"}
                  />
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
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-200"
                      {...field}
                    />
                  </FormControl>
                  <ValidationFeedback
                    isValid={!fieldState.error}
                    message={fieldState.error?.message || "MRN looks good!"}
                  />
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
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-200"
                        {...field}
                      />
                    </FormControl>
                    <ValidationFeedback
                      isValid={!fieldState.error}
                      message={fieldState.error?.message || "Age looks good!"}
                    />
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
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-200">
                          <SelectValue placeholder="Select sex" />
                        </SelectTrigger>
                        <SelectContent className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl">
                          <SelectItem value="male" className="text-white hover:bg-white/20 focus:bg-white/20">
                            Male
                          </SelectItem>
                          <SelectItem value="female" className="text-white hover:bg-white/20 focus:bg-white/20">
                            Female
                          </SelectItem>
                          <SelectItem value="other" className="text-white hover:bg-white/20 focus:bg-white/20">
                            Other
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <ValidationFeedback
                      isValid={!fieldState.error}
                      message={fieldState.error?.message || "Sex selected!"}
                    />
                  </FormItem>
                )}
              />
            </StatusFieldCard>
          </div>
        </div>
      </FieldGroup>

      {/* Medical History Group */}
      <FieldGroup
        title="Medical Background"
        description="Relevant medical history and chronic conditions"
        icon={FileText}
        status={medicalHistoryStatus}
        completedFields={formValues.medicalHistory ? 1 : 0}
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
                    rows={4}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-200 resize-none"
                    {...field}
                  />
                </FormControl>
                <ValidationFeedback
                  isValid={!fieldState.error}
                  message={fieldState.error?.message || "Medical history looks good!"}
                />
              </FormItem>
            )}
          />
        </StatusFieldCard>
      </FieldGroup>
    </div>
  );
});

PatientStep.displayName = "PatientStep";
