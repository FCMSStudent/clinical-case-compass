import React, { memo } from "react";
import { Control, FieldValues, Path } from "react-hook-form";
import { z } from "zod";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Stethoscope, User, Thermometer, Brain, Microscope, Scan } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * ────────────────────────────────────────────────────────────────────────────────
 * SCHEMA
 * ────────────────────────────────────────────────────────────────────────────────
 */
export const clinicalDetailSchema = z.object({
  patientHistory: z.string().min(10, "Patient history must be at least 10 characters.").optional(),
  physicalExam: z.string().min(10, "Physical exam must be at least 10 characters.").optional(),
  selectedBodyParts: z.array(z.string()).optional(),
  systemSymptoms: z.record(z.array(z.string())).optional(),
  vitals: z.record(z.string()).optional(),
  labResults: z.array(z.string()).optional(),
  radiologyExams: z.array(z.string()).optional(),
});

export type ClinicalDetailFormData = z.infer<typeof clinicalDetailSchema>;

/**
 * Constants
 */
const FORM_FIELDS = {
  PATIENT_HISTORY: "patientHistory",
  PHYSICAL_EXAM: "physicalExam",
  SELECTED_BODY_PARTS: "selectedBodyParts",
  SYSTEM_SYMPTOMS: "systemSymptoms",
  VITALS: "vitals",
  LAB_RESULTS: "labResults",
  RADIOLOGY_EXAMS: "radiologyExams",
} as const;

/**
 * Enhanced utility wrapper for consistent card styling with gradients and animations
 */
function FieldCard({
  icon: Icon,
  title,
  children,
  className,
  gradient,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
  className?: string;
  gradient?: string;
}) {
  return (
    <Card className={cn(
      "group shadow-lg border-0 bg-gradient-to-br from-white to-gray-50/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1",
      className
    )}>
      <CardHeader className={cn(
        "pb-4 bg-gradient-to-r rounded-t-lg",
        gradient || "from-blue-50 to-indigo-50"
      )}>
        <CardTitle className="flex items-center gap-3 text-lg font-semibold">
          <div className="p-2 rounded-lg bg-white/80 shadow-sm group-hover:shadow-md transition-shadow">
            <Icon className="h-5 w-5 text-blue-600" />
          </div>
          <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            {title}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">{children}</CardContent>
    </Card>
  );
}

/**
 * ────────────────────────────────────────────────────────────────────────────────
 * PROPS
 * ────────────────────────────────────────────────────────────────────────────────
 */
export interface ClinicalDetailStepProps<T extends FieldValues = ClinicalDetailFormData> {
  control: Control<T>;
  className?: string;
}

/**
 * ────────────────────────────────────────────────────────────────────────────────
 * COMPONENT
 * ────────────────────────────────────────────────────────────────────────────────
 */
export const ClinicalDetailStep = memo(function ClinicalDetailStep<
  T extends FieldValues = ClinicalDetailFormData,
>({ control, className }: ClinicalDetailStepProps<T>) {
  return (
    <section className={cn("space-y-8", className)}>
      {/* Enhanced Header with gradient background */}
      <header className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-8 text-white shadow-2xl">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-4 right-4 opacity-20">
          <Brain className="h-12 w-12" />
        </div>
        <div className="relative space-y-3">
          <h3 className="flex items-center text-2xl font-bold">
            <div className="mr-4 rounded-xl bg-white/20 p-3 backdrop-blur-sm">
              <FileText className="h-7 w-7" />
            </div>
            Clinical Details
          </h3>
          <p className="text-blue-100 text-lg max-w-2xl leading-relaxed">
            Provide detailed clinical information including patient history, physical examination, and diagnostic findings.
          </p>
        </div>
      </header>

      {/* Patient History */}
      <FieldCard 
        icon={FileText} 
        title="Patient History" 
        gradient="from-emerald-50 to-teal-50"
      >
        <FormField
          control={control}
          name={FORM_FIELDS.PATIENT_HISTORY as Path<T>}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="e.g., 65-year-old patient presents with acute onset chest pain radiating to left arm, accompanied by shortness of breath and diaphoresis. Symptoms began 2 hours ago during mild physical activity..."
                  className="min-h-[140px] text-base border-2 border-gray-200 focus:border-emerald-400 focus:ring-emerald-100 rounded-xl p-4 leading-6 transition-all duration-200 resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-gray-600 mt-3 flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></div>
                Describe the patient's medical history, presenting complaints, and relevant background.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </FieldCard>

      {/* Physical Examination */}
      <FieldCard 
        icon={Stethoscope} 
        title="Physical Examination" 
        gradient="from-rose-50 to-pink-50"
      >
        <FormField
          control={control}
          name={FORM_FIELDS.PHYSICAL_EXAM as Path<T>}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="e.g., Systematic physical examination findings including cardiovascular, respiratory, and neurological systems..."
                  className="min-h-[140px] text-base border-2 border-gray-200 focus:border-rose-400 focus:ring-rose-100 rounded-xl p-4 leading-6 transition-all duration-200 resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-gray-600 mt-3 flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                Record comprehensive physical examination findings.
              </FormDescription>
              <FormMessage />
            </FormFormMessage>
            </FormItem>
          )}
        />
      </FieldCard>

      {/* Review of Systems */}
      <FieldCard 
        icon={Brain} 
        title="Review of Systems" 
        gradient="from-violet-50 to-purple-50"
      >
        <FormField
          control={control}
          name={FORM_FIELDS.SYSTEM_SYMPTOMS as Path<T>}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="e.g., Cardiovascular: Chest pain, Respiratory: Shortness of breath, Neurological: Dizziness..."
                  className="min-h-[140px] text-base border-2 border-gray-200 focus:border-violet-400 focus:ring-violet-100 rounded-xl p-4 leading-6 transition-all duration-200 resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-gray-600 mt-3 flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-violet-400 mt-2 flex-shrink-0"></div>
                Document the patient's review of systems and associated symptoms.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </FieldCard>

      {/* Vital Signs */}
      <FieldCard 
        icon={Thermometer} 
        title="Vital Signs" 
        gradient="from-blue-50 to-indigo-50"
      >
        <FormField
          control={control}
          name={FORM_FIELDS.VITALS as Path<T>}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="e.g., Blood Pressure: 120/80 mmHg, Heart Rate: 72 bpm, Respiratory Rate: 16 breaths/min..."
                  className="min-h-[140px] text-base border-2 border-gray-200 focus:border-blue-400 focus:ring-blue-100 rounded-xl p-4 leading-6 transition-all duration-200 resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-gray-600 mt-3 flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                Record the patient's vital signs and physiological parameters.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </FieldCard>

      {/* Lab Results */}
      <FieldCard 
        icon={Microscope} 
        title="Lab Results" 
        gradient="from-green-50 to-teal-50"
      >
        <FormField
          control={control}
          name={FORM_FIELDS.LAB_RESULTS as Path<T>}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="e.g., CBC: WBC 10,000/mm³, Hgb 14 g/dL, Platelets 250,000/mm³..."
                  className="min-h-[140px] text-base border-2 border-gray-200 focus:border-green-400 focus:ring-green-100 rounded-xl p-4 leading-6 transition-all duration-200 resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-gray-600 mt-3 flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                Document laboratory test results and findings.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </FieldCard>

      {/* Radiology Exams */}
      <FieldCard 
        icon={Scan} 
        title="Radiology Exams" 
        gradient="from-purple-50 to-pink-50"
      >
        <FormField
          control={control}
          name={FORM_FIELDS.RADIOLOGY_EXAMS as Path<T>}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="e.g., Chest X-ray: Normal, CT Scan: Evidence of pulmonary embolism..."
                  className="min-h-[140px] text-base border-2 border-gray-200 focus:border-purple-400 focus:ring-purple-100 rounded-xl p-4 leading-6 transition-all duration-200 resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-gray-600 mt-3 flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                Record imaging study results and findings.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </FieldCard>
    </section>
  );
});

ClinicalDetailStep.displayName = "ClinicalDetailStep";
