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
import { 
  User, 
  Calendar, 
  FileText, 
  UserCheck, 
  Stethoscope, 
  Tag 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  StepHeader, 
  StatusFieldCard 
} from "./components";
import { useFormValidation } from "@/hooks/use-form-validation";

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

interface CaseOverviewFormData {
  patientName: string;
  medicalRecordNumber?: string;
  patientAge: number;
  patientSex: string;
  medicalHistory?: string;
  caseTitle: string;
  chiefComplaint: string;
  specialty?: string;
}

export interface CaseOverviewStepProps<T extends FieldValues = CaseOverviewFormData> {
  className?: string;
}

export const CaseOverviewStep = memo(function CaseOverviewStep<
  T extends FieldValues = CaseOverviewFormData,
>({ className }: CaseOverviewStepProps<T>) {
  const { control } = useFormContext<T>();
  
  const { errors, watchedFields } = useFormValidation<T>({
    requiredFields: ["patientName", "patientAge", "patientSex", "caseTitle", "chiefComplaint"],
    watchFields: [
      "patientName", 
      "medicalRecordNumber", 
      "patientAge", 
      "patientSex", 
      "medicalHistory",
      "caseTitle",
      "chiefComplaint", 
      "specialty"
    ],
  });

  const watchedValues = watchedFields as Record<string, unknown>;
  const patientNameValue = watchedValues?.patientName;
  const medicalRecordNumberValue = watchedValues?.medicalRecordNumber;
  const patientAgeValue = watchedValues?.patientAge;
  const patientSexValue = watchedValues?.patientSex;
  const medicalHistoryValue = watchedValues?.medicalHistory;
  const caseTitleValue = watchedValues?.caseTitle;
  const chiefComplaintValue = watchedValues?.chiefComplaint;
  const specialtyValue = watchedValues?.specialty;

  return (
    <div className={cn("space-y-6", className)}>
      <StepHeader
        title="Case Overview"
        description="Provide essential patient information and case details to create a comprehensive clinical case study."
        icon={FileText}
      />

      {/* Bentogrid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-min">
        {/* Patient Name - Large prominent card */}
        <StatusFieldCard
          icon={User}
          title="Patient Name"
          tooltip="Enter the patient's full name as it appears in their medical records."
          isRequired
          fieldValue={patientNameValue}
          hasError={!!errors.patientName}
          className="md:col-span-2"
        >
          <FormField
            control={control}
            name={"patientName" as Path<T>}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="e.g., John Doe"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </StatusFieldCard>

        {/* Patient Age - Small card */}
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
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="e.g., 42"
                    {...field}
                    onChange={e => field.onChange(parseInt(e.target.value, 10) || undefined)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </StatusFieldCard>

        {/* Patient Sex - Small card */}
        <StatusFieldCard
          icon={UserCheck}
          title="Patient Sex"
          tooltip="Select the patient's sex as recorded in their medical records."
          isRequired
          fieldValue={patientSexValue}
          hasError={!!errors.patientSex}
        >
          <FormField
            control={control}
            name={"patientSex" as Path<T>}
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
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

        {/* Medical Record Number - Medium card */}
        <StatusFieldCard
          icon={FileText}
          title="Medical Record Number"
          tooltip="If available, enter the patient's unique medical record number for easy identification."
          fieldValue={medicalRecordNumberValue}
          hasError={!!errors.medicalRecordNumber}
        >
          <FormField
            control={control}
            name={"medicalRecordNumber" as Path<T>}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="e.g., 1234567"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </StatusFieldCard>

        {/* Case Title - Large prominent card */}
        <StatusFieldCard
          icon={FileText}
          title="Case Title"
          isRequired
          tooltip="A clear, descriptive title helps others quickly understand the case's focus. Include key details like condition, patient type, or unique aspects."
          hasError={!!errors.caseTitle}
          fieldValue={caseTitleValue}
          className="md:col-span-2"
        >
          <FormField
            control={control}
            name={"caseTitle" as Path<T>}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="e.g., Complex Hypertension Management in Elderly Patient with Comorbidities"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </StatusFieldCard>

        {/* Chief Complaint - Medium-large card */}
        <StatusFieldCard
          icon={Stethoscope}
          title="Chief Complaint"
          isRequired
          tooltip="The primary reason for the patient's visit or the main clinical problem being addressed."
          hasError={!!errors.chiefComplaint}
          fieldValue={chiefComplaintValue}
          className="lg:col-span-2"
        >
          <FormField
            control={control}
            name={"chiefComplaint" as Path<T>}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="e.g., Chest pain for 2 hours"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </StatusFieldCard>

        {/* Medical Specialty - Medium card */}
        <StatusFieldCard
          icon={Tag}
          title="Medical Specialty"
          tooltip="Select the primary medical specialty that best categorizes this case."
          hasError={!!errors.specialty} 
          fieldValue={specialtyValue}
        >
          <FormField
            control={control}
            name={"specialty" as Path<T>}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a specialty" />
                    </SelectTrigger>
                    <SelectContent>
                      {MEDICAL_SPECIALTIES.map((specialty) => (
                        <SelectItem
                          key={specialty}
                          value={specialty}
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

        {/* Medical History - Wide spanning card */}
        <StatusFieldCard
          icon={FileText}
          title="Medical History"
          tooltip="Summarize the patient's relevant past medical history, chronic conditions, and previous interventions."
          fieldValue={medicalHistoryValue}
          hasError={!!errors.medicalHistory}
          className="md:col-span-2 lg:col-span-3"
        >
          <FormField
            control={control}
            name={"medicalHistory" as Path<T>}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="e.g., Hypertension, Type 2 Diabetes, Previous appendectomy in 2010..."
                    rows={3}
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </StatusFieldCard>
      </div>
    </div>
  );
});

CaseOverviewStep.displayName = "CaseOverviewStep";
