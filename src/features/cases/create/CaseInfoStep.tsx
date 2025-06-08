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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Stethoscope, Tag, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * ────────────────────────────────────────────────────────────────────────────────
 * SCHEMA
 * ────────────────────────────────────────────────────────────────────────────────
 */
export const caseInfoSchema = z.object({
  caseTitle: z.string().min(3, "Case title must be at least 3 characters."),
  chiefComplaint: z.string().min(5, "Chief complaint must be at least 5 characters."),
  specialty: z.string().min(1, "Please select a medical specialty."),
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
export interface CaseInfoStepProps<T extends FieldValues = CaseInfoFormData> {
  control: Control<T>;
  className?: string;
}

/**
 * ────────────────────────────────────────────────────────────────────────────────
 * COMPONENT
 * ────────────────────────────────────────────────────────────────────────────────
 */
export const CaseInfoStep = memo(function CaseInfoStep<
  T extends FieldValues = CaseInfoFormData,
>({ control, className }: CaseInfoStepProps<T>) {
  return (
    <section className={cn("space-y-8", className)}>
      {/* Enhanced Header with gradient background */}
      <header className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-8 text-white shadow-2xl">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-4 right-4 opacity-20">
          <Sparkles className="h-12 w-12" />
        </div>
        <div className="relative space-y-3">
          <h3 className="flex items-center text-2xl font-bold">
            <div className="mr-4 rounded-xl bg-white/20 p-3 backdrop-blur-sm">
              <FileText className="h-7 w-7" />
            </div>
            Case Information
          </h3>
          <p className="text-blue-100 text-lg max-w-2xl leading-relaxed">
            Create a comprehensive clinical case by providing essential information about the patient presentation and medical context.
          </p>
        </div>
      </header>

      {/* Case Title */}
      <FieldCard 
        icon={FileText} 
        title="Case Title" 
        gradient="from-emerald-50 to-teal-50"
      >
        <FormField
          control={control}
          name={"caseTitle" as Path<T>}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="e.g., Complex Hypertension Management in Elderly Patient with Comorbidities"
                  className="text-base border-2 border-gray-200 focus:border-emerald-400 focus:ring-emerald-100 rounded-xl py-3 px-4 transition-all duration-200"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-gray-600 mt-3 flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></div>
                Create a descriptive and engaging title that captures the essence of this clinical case
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </FieldCard>

      {/* Chief Complaint */}
      <FieldCard 
        icon={Stethoscope} 
        title="Chief Complaint" 
        gradient="from-rose-50 to-pink-50"
      >
        <FormField
          control={control}
          name={"chiefComplaint" as Path<T>}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="e.g., 65-year-old patient presents with acute onset chest pain radiating to left arm, accompanied by shortness of breath and diaphoresis. Symptoms began 2 hours ago during mild physical activity..."
                  className="min-h-[140px] text-base border-2 border-gray-200 focus:border-rose-400 focus:ring-rose-100 rounded-xl p-4 leading-6 transition-all duration-200 resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-gray-600 mt-3 flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                Describe the patient's primary symptoms, timeline, and presenting concerns in detail
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </FieldCard>

      {/* Medical Specialty */}
      <FieldCard 
        icon={Tag} 
        title="Medical Specialty" 
        gradient="from-violet-50 to-purple-50"
      >
        <FormField
          control={control}
          name={"specialty" as Path<T>}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="text-base border-2 border-gray-200 focus:border-violet-400 focus:ring-violet-100 rounded-xl py-3 px-4 h-auto transition-all duration-200">
                    <SelectValue placeholder="Select the most relevant medical specialty" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-2 shadow-xl">
                    {MEDICAL_SPECIALTIES.map((specialty) => (
                      <SelectItem 
                        key={specialty} 
                        value={specialty}
                        className="py-3 px-4 text-base hover:bg-violet-50 focus:bg-violet-100 rounded-lg mx-1"
                      >
                        {specialty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription className="text-gray-600 mt-3 flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-violet-400 mt-2 flex-shrink-0"></div>
                Choose the primary medical specialty most relevant to this clinical presentation
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </FieldCard>
    </section>
  );
});

CaseInfoStep.displayName = "CaseInfoStep";
