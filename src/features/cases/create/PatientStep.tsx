import React, { memo } from "react";
import { useFormContext, FieldValues, Path } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormControl,
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
import { User, Calendar, FileText as FileTextIcon, UserCheck } from "lucide-react"; // Renamed FileText to FileTextIcon to avoid conflict
import { cn } from "@/lib/utils";
import { 
  StepHeader, 
  StatusFieldCard,
  // ValidationFeedback removed
} from "./components";
import { useFormValidation } from "@/hooks/use-form-validation";
import { PatientFormData } from "./schemas/patient-schema";

export interface PatientStepProps<T extends FieldValues = PatientFormData> {
  className?: string;
}

// Simple component for section titles
const SectionTitle: React.FC<{ title: string; description: string; icon: React.ElementType }> = ({ title, description, icon: Icon }) => (
  <div className="flex items-center gap-3 mb-4 pt-4">
    <div className="p-2 rounded-lg bg-blue-500/20 text-white border border-blue-400/30">
      <Icon className="h-5 w-5" />
    </div>
    <div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="text-sm text-white/70">{description}</p>
    </div>
  </div>
);

export const PatientStep = memo(function PatientStep<
  T extends FieldValues = PatientFormData,
>({ className }: PatientStepProps<T>) {
  const { control, watch } = useFormContext<T>();
  
  // localWatchedValues to avoid conflict if 'watchedFields' is returned by useFormValidation
  const { errors, watchedFields: localWatchedValues } = useFormValidation<T>({
    requiredFields: ["patientName", "patientAge", "patientSex"],
    watchFields: ["patientName", "medicalRecordNumber", "patientAge", "patientSex", "medicalHistory"],
  });

  const patientNameValue = (localWatchedValues as any)?.patientName;
  const medicalRecordNumberValue = (localWatchedValues as any)?.medicalRecordNumber;
  const patientAgeValue = (localWatchedValues as any)?.patientAge;
  const patientSexValue = (localWatchedValues as any)?.patientSex;
  const medicalHistoryValue = (localWatchedValues as any)?.medicalHistory;

  return (
    <div className={cn("space-y-6", className)}> {/* Reduced space-y from 8 to 6 for consistency */}
      <StepHeader
        title="Patient Information"
        description="Provide essential patient demographics and medical background information for this clinical case study."
        icon={User}
      />

      {/* Patient Demographics Section */}
      <SectionTitle 
        title="Patient Demographics"
        description="Basic patient identification and demographic information."
        icon={UserCheck}
      />
      <div className="space-y-6">
        <StatusFieldCard
          icon={User}
          title="Patient Name"
          tooltip="Enter the patient's full name as it appears in their medical records."
          isRequired
          fieldValue={patientNameValue}
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
                    variant="medical"
                    leftIcon={<User className="h-4 w-4" />}
                    error={!!fieldState.error}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </StatusFieldCard>

        <StatusFieldCard
          icon={FileTextIcon}
          title="Medical Record Number (MRN)"
          tooltip="If available, enter the patient's unique medical record number for easy identification."
          fieldValue={medicalRecordNumberValue}
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
                    variant="medical"
                    leftIcon={<FileTextIcon className="h-4 w-4" />}
                    error={!!fieldState.error}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
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
            fieldValue={patientAgeValue}
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
                      variant="medical"
                      leftIcon={<Calendar className="h-4 w-4" />}
                      error={!!fieldState.error}
                      {...field}
                      onChange={e => field.onChange(parseInt(e.target.value,10) || undefined)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </StatusFieldCard>

          <StatusFieldCard
            icon={User}
            title="Patient Sex"
            tooltip="Select the patient's sex as recorded in their medical records."
            isRequired
            fieldValue={patientSexValue}
            hasError={!!errors.patientSex}
          >
            <FormField
              control={control}
              name={"patientSex" as Path<T>}
              render={({ field, fieldState }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className={fieldState.error ? "border-red-400/30 bg-red-500/10" : ""}>
                        <SelectValue placeholder="Select sex" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </StatusFieldCard>
        </div>
      </div>

      {/* Medical History Section */}
      <SectionTitle 
        title="Medical Background"
        description="Relevant medical history and chronic conditions."
        icon={FileTextIcon}
      />
      <StatusFieldCard
        icon={FileTextIcon}
        title="Medical History"
        tooltip="Summarize the patient's relevant past medical history, chronic conditions, and previous interventions."
        fieldValue={medicalHistoryValue}
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
                  variant="medical"
                  size="lg"
                  error={!!fieldState.error}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </StatusFieldCard>
    </div>
  );
});

PatientStep.displayName = "PatientStep";
