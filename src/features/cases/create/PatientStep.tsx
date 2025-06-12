import React, { memo } from "react";
import { useFormContext, FieldValues, Path } from "react-hook-form";
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
import { User, Calendar, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { StepHeader, FormFieldCard, ValidationFeedback } from "./components";

/**
 * ────────────────────────────────────────────────────────────────────────────────
 * SCHEMA
 * ────────────────────────────────────────────────────────────────────────────────
 */
export const patientStepSchema = z.object({
  patientName: z.string()
    .min(1, "Patient name is required")
    .min(3, "Patient name must be at least 3 characters")
    .max(200, "Patient name must be less than 200 characters"),
  medicalRecordNumber: z.string().optional(),
  patientAge: z.coerce.number()
    .min(0, "Age must be a positive number")
    .max(120, "Age must be less than 120"),
  patientSex: z.enum(["male", "female", "other"]),
  medicalHistory: z.string().optional(),
});

export type PatientFormData = z.infer<typeof patientStepSchema>;

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
  const { control, formState, watch } = useFormContext<T>();
  const [completedFields, setCompletedFields] = React.useState(0);
  const totalFields = 5;

  // Watch fields individually to avoid type issues
  const patientName = watch("patientName" as Path<T>);
  const medicalRecordNumber = watch("medicalRecordNumber" as Path<T>);
  const patientAge = watch("patientAge" as Path<T>);
  const patientSex = watch("patientSex" as Path<T>);
  const medicalHistory = watch("medicalHistory" as Path<T>);
  
  React.useEffect(() => {
    const fields = [patientName, medicalRecordNumber, patientAge, patientSex, medicalHistory];
    const completed = fields.filter(value => {
      if (typeof value === 'string') {
        return value.trim().length > 0;
      }
      return !!value;
    }).length;
    
    setCompletedFields(completed);
  }, [patientName, medicalRecordNumber, patientAge, patientSex, medicalHistory]);

  return (
    <section className={cn("space-y-8", className)}>
      <StepHeader
        title="Patient Information"
        description="Provide essential patient demographics and medical background information."
        icon={User}
        gradient="blue"
      />

      {/* Patient Name */}
      <FormFieldCard
        icon={User}
        title="Patient Name"
        gradient="emerald"
        tooltip="Enter the patient's full name as it appears in their medical records."
        isRequired
      >
        <FormField
          control={control}
          name={"patientName" as Path<T>}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"></div>
                  <Input
                    placeholder="e.g., John Doe"
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
        gradient="rose"
        tooltip="If available, enter the patient's unique medical record number for easy identification."
      >
        <FormField
          control={control}
          name={"medicalRecordNumber" as Path<T>}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"></div>
                  <Input
                    placeholder="e.g., 1234567"
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
          gradient="violet"
          tooltip="Enter the patient's age in years."
          isRequired
        >
          <FormField
            control={control}
            name={"patientAge" as Path<T>}
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"></div>
                    <Input
                      type="number"
                      placeholder="e.g., 42"
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
          gradient="blue"
          tooltip="Select the patient's sex."
          isRequired
        >
          <FormField
            control={control}
            name={"patientSex" as Path<T>}
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"></div>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="relative bg-transparent border-0 text-white placeholder:text-white/50 focus-visible:ring-0 focus-visible:ring-offset-0 text-base rounded-xl py-3 px-4 h-auto transition-all duration-200">
                        <SelectValue placeholder="Select patient sex" />
                      </SelectTrigger>
                      <SelectContent className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-xl">
                        <SelectItem
                          value="male"
                          className="py-3 px-4 text-base text-white hover:bg-white/20 focus:bg-white/20 rounded-lg mx-1"
                        >
                          Male
                        </SelectItem>
                        <SelectItem
                          value="female"
                          className="py-3 px-4 text-base text-white hover:bg-white/20 focus:bg-white/20 rounded-lg mx-1"
                        >
                          Female
                        </SelectItem>
                        <SelectItem
                          value="other"
                          className="py-3 px-4 text-base text-white hover:bg-white/20 focus:bg-white/20 rounded-lg mx-1"
                        >
                          Other
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </FormControl>
                <ValidationFeedback
                  isValid={!fieldState.error}
                  message={fieldState.error?.message}
                />
                <FormDescription className="text-white/70 mt-3 flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                  Select the patient's sex
                </FormDescription>
              </FormItem>
            )}
          />
        </FormFieldCard>
      </div>

      {/* Medical History */}
      <FormFieldCard
        icon={FileText}
        title="Relevant Medical History"
        gradient="amber"
        tooltip="Include any pre-existing conditions, past surgeries, allergies, and current medications."
      >
        <FormField
          control={control}
          name={"medicalHistory" as Path<T>}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"></div>
                  <Textarea
                    placeholder="e.g., Hypertension, Type 2 Diabetes, Allergic to Penicillin"
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
                <div className="w-2 h-2 rounded-full bg-amber-400 mt-2 flex-shrink-0"></div>
                Include any pre-existing conditions, past surgeries, allergies, and current medications
              </FormDescription>
            </FormItem>
          )}
        />
      </FormFieldCard>
    </section>
  );
});

PatientStep.displayName = "PatientStep";
