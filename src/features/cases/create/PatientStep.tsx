
import React, { memo } from "react";
import { useFormContext, FieldValues, Path } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormControl,
  // FormDescription removed if not used after FieldGroup removal
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
  StatusFieldCard, // FieldGroup removed from here
  ValidationFeedback // Keeping ValidationFeedback if used by StatusFieldCard or directly
} from "./components"; // Adjusted imports
import { useFormValidation } from "@/hooks/use-form-validation";
import { PatientFormData } from "./schemas/patient-schema"; // PatientFormData for type T

export interface PatientStepProps<T extends FieldValues = PatientFormData> {
  className?: string;
}

export const PatientStep = memo(function PatientStep<
  T extends FieldValues = PatientFormData,
>({ className }: PatientStepProps<T>) {
  const { control, watch } = useFormContext<T>();
  
  const formValues = watch();
  
  const { errors } = useFormValidation<T>({
    requiredFields: ["patientName", "patientAge", "patientSex"],
    watchFields: ["patientName", "medicalRecordNumber", "patientAge", "patientSex", "medicalHistory"],
  });

  // Demographics status calculation can be simplified or its display rethought
  // const demographicsStatus = React.useMemo(() => { ... });
  // const medicalHistoryStatus = React.useMemo(() => { ... });

  return (
    <div className={cn("space-y-8", className)}>
      <StepHeader
        title="Patient Information"
        description="Provide essential patient demographics and medical background information for this clinical case study."
        icon={User}
      />

      {/* Patient Demographics Group - Simplified Structure */}
      <div className="space-y-4 p-4 border border-white/10 rounded-lg">
        <div className="flex items-center gap-3 mb-4"> {/* Increased mb for spacing */}
            <div className="p-2 rounded-lg bg-white/15 text-white border border-white/20">
                <UserCheck className="h-5 w-5" />
            </div>
            <div>
                <h3 className="text-lg font-semibold text-white">Patient Demographics</h3>
                <p className="text-sm text-white/70">Basic patient identification and demographic information.</p>
                {/* TODO: Add status/completion indicators if needed */}
            </div>
        </div>
        <div className="space-y-6">
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
                        onChange={e => field.onChange(parseInt(e.target.value,10) || undefined)} // Ensure number or undefined
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
      </div>

      {/* Medical History Group - Simplified Structure */}
      <div className="space-y-4 p-4 border border-white/10 rounded-lg">
        <div className="flex items-center gap-3 mb-4"> {/* Increased mb for spacing */}
            <div className="p-2 rounded-lg bg-white/15 text-white border border-white/20">
                <FileText className="h-5 w-5" />
            </div>
            <div>
                <h3 className="text-lg font-semibold text-white">Medical Background</h3>
                <p className="text-sm text-white/70">Relevant medical history and chronic conditions.</p>
            </div>
        </div>
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
      </div>
    </div>
  );
});

PatientStep.displayName = "PatientStep";
