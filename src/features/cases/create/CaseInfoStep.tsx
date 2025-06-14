
import React, { memo } from "react";
import { useFormContext, Path, FieldValues } from "react-hook-form";
import { FileText, Stethoscope, Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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
  const { control, formState, watch } = useFormContext<T>();
  
  // Use shared validation utilities
  const { completedFields, totalFields, completionPercentage, errors } = useFormValidation<T>({
    requiredFields: ["caseTitle", "chiefComplaint"],
    watchFields: ["caseTitle", "chiefComplaint", "specialty"],
  });

  const watchedValues = watch();

  return (
    <div className={cn("space-y-6", className)}>
      {/* Step Header */}
      <div className="mb-8">
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 text-white border border-white/20 p-3 rounded-xl">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white mb-2">Case Information</h2>
              <p className="text-white/70 leading-relaxed">
                Provide essential details about the clinical case, including a descriptive title, chief complaint, and medical specialty to help categorize and organize the case effectively.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Case Title */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20 shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 text-white border border-white/20 p-2 rounded-lg">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-white flex items-center gap-2">
                Case Title
                <span className="text-red-300 text-sm">*</span>
              </h3>
              <p className="text-sm text-white/70 mt-1">
                A clear, descriptive title helps others quickly understand the case's focus. Include key details like condition, patient type, or unique aspects.
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
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
        </CardContent>
      </Card>

      {/* Chief Complaint */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20 shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 text-white border border-white/20 p-2 rounded-lg">
              <Stethoscope className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-white flex items-center gap-2">
                Chief Complaint
                <span className="text-red-300 text-sm">*</span>
              </h3>
              <p className="text-sm text-white/70 mt-1">
                The primary reason for the patient's visit or the main clinical problem being addressed.
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
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
        </CardContent>
      </Card>

      {/* Medical Specialty */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20 shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 text-white border border-white/20 p-2 rounded-lg">
              <Tag className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Medical Specialty</h3>
              <p className="text-sm text-white/70 mt-1">
                Select the primary medical specialty that best categorizes this case.
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
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
        </CardContent>
      </Card>
    </div>
  );
});

CaseInfoStep.displayName = "CaseInfoStep";
