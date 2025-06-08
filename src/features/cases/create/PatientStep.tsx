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
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Calendar, 
  Hash, 
  User as UserIcon, 
  Users, 
  Heart,
  FileUser,
  UserCheck,
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * ────────────────────────────────────────────────────────────────────────────────
 * SCHEMA
 * ────────────────────────────────────────────────────────────────────────────────
 */
export const patientStepSchema = z.object({
  patientName: z.string().min(2, "Patient name must be at least 2 characters.").optional(),
  medicalRecordNumber: z.string().optional(),
  patientAge: z
    .union([z.string().length(0), z.number().int().min(0).max(150)])
    .transform((val) => (val === "" ? undefined : Number(val)))
    .optional(),
  patientSex: z.enum(["Male", "Female", "Other"]).optional(),
  medicalHistory: z.string().optional(),
});
export type PatientStepFormData = z.infer<typeof patientStepSchema>;

/**
 * Constants
 */
const SEX_OPTIONS = ["Male", "Female", "Other"] as const;

/**
 * Enhanced utility wrapper with beautiful gradients and animations
 */
function FieldCard({
  icon: Icon,
  title,
  children,
  className,
  gradient,
  iconColor,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
  className?: string;
  gradient?: string;
  iconColor?: string;
}) {
  return (
    <Card className={cn(
      "group shadow-lg border-0 bg-gradient-to-br from-white to-gray-50/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden",
      className
    )}>
      <CardHeader className={cn(
        "pb-4 bg-gradient-to-r relative overflow-hidden",
        gradient || "from-blue-50 to-indigo-50"
      )}>
        <div className="absolute inset-0 bg-gradient-to-r from-white/40 to-transparent"></div>
        <CardTitle className="flex items-center gap-3 text-lg font-semibold relative z-10">
          <div className={cn(
            "p-2.5 rounded-xl bg-white/90 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110",
            iconColor || "text-blue-600"
          )}>
            <Icon className="h-5 w-5" />
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
export interface PatientStepProps<T extends FieldValues = PatientStepFormData> {
  control: Control<T>;
  className?: string;
}

/**
 * ────────────────────────────────────────────────────────────────────────────────
 * COMPONENT
 * ────────────────────────────────────────────────────────────────────────────────
 */
export const PatientStep = memo(function PatientStep<
  T extends FieldValues = PatientStepFormData,
>({ control, className }: PatientStepProps<T>) {
  return (
    <section className={cn("space-y-8", className)}>
      {/* Enhanced Header with medical theme */}
      <header className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-700 p-8 text-white shadow-2xl">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute -top-4 -right-4 opacity-10">
          <Heart className="h-24 w-24" />
        </div>
        <div className="absolute top-8 right-8 opacity-20">
          <UserCheck className="h-8 w-8" />
        </div>
        <div className="relative space-y-3">
          <h3 className="flex items-center text-2xl font-bold">
            <div className="mr-4 rounded-xl bg-white/20 p-3 backdrop-blur-sm">
              <UserIcon className="h-7 w-7" />
            </div>
            Patient Demographics
          </h3>
          <p className="text-cyan-100 text-lg max-w-2xl leading-relaxed">
            Document essential patient information and demographic details for comprehensive case documentation.
          </p>
        </div>
      </header>

      {/* Name & MRN Row */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Patient Name */}
        <FieldCard 
          icon={UserIcon} 
          title="Patient Name" 
          gradient="from-emerald-50 to-green-50"
          iconColor="text-emerald-600"
        >
          <FormField
            control={control}
            name={"patientName" as Path<T>}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="e.g., John A. Doe"
                    className="text-base border-2 border-gray-200 focus:border-emerald-400 focus:ring-emerald-100 rounded-xl py-3 px-4 transition-all duration-200"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-gray-600 mt-3 flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></div>
                  Patient's full name (can be anonymized for privacy)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </FieldCard>

        {/* Medical Record Number */}
        <FieldCard 
          icon={Hash} 
          title="Medical Record Number" 
          gradient="from-blue-50 to-indigo-50"
          iconColor="text-blue-600"
        >
          <FormField
            control={control}
            name={"medicalRecordNumber" as Path<T>}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input 
                    placeholder="e.g., MRN-2024-001234" 
                    className="text-base border-2 border-gray-200 focus:border-blue-400 focus:ring-blue-100 rounded-xl py-3 px-4 transition-all duration-200 font-mono"
                    {...field} 
                  />
                </FormControl>
                <FormDescription className="text-gray-600 mt-3 flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                  Unique hospital identifier (optional)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </FieldCard>
      </div>

      {/* Age & Gender Row */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Age */}
        <FieldCard 
          icon={Clock} 
          title="Patient Age" 
          gradient="from-orange-50 to-amber-50"
          iconColor="text-orange-600"
        >
          <FormField
            control={control}
            name={"patientAge" as Path<T>}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input
                      type="number"
                      placeholder="e.g., 45"
                      min={0}
                      max={150}
                      className="text-base border-2 border-gray-200 focus:border-orange-400 focus:ring-orange-100 rounded-xl py-3 px-4 pr-16 transition-all duration-200"
                      value={field.value ?? ""}
                      onChange={(e) =>
                        field.onChange(e.target.value === "" ? "" : Number(e.target.value))
                      }
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">
                      years
                    </span>
                  </div>
                </FormControl>
                <FormDescription className="text-gray-600 mt-3 flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-orange-400 mt-2 flex-shrink-0"></div>
                  Patient's age in years (0–150)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </FieldCard>

        {/* Gender */}
        <FieldCard 
          icon={Users} 
          title="Gender Identity" 
          gradient="from-purple-50 to-pink-50"
          iconColor="text-purple-600"
        >
          <FormField
            control={control}
            name={"patientSex" as Path<T>}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="mt-2 flex flex-col space-y-3"
                  >
                    {SEX_OPTIONS.map((option) => (
                      <div key={option} className="flex items-center gap-3 p-3 rounded-lg hover:bg-purple-50/50 transition-colors">
                        <RadioGroupItem
                          value={option}
                          id={`sex-${option}`}
                          className="border-2 border-purple-300 text-purple-600"
                        />
                        <Label
                          htmlFor={`sex-${option}`}
                          className="cursor-pointer text-base font-medium text-gray-700 flex-1"
                        >
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormDescription className="text-gray-600 mt-3 flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                  Patient's gender identity (optional)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </FieldCard>
      </div>

      {/* Medical History - Full Width */}
      <FieldCard 
        icon={FileUser} 
        title="Past Medical History" 
        gradient="from-rose-50 to-red-50"
        iconColor="text-rose-600"
      >
        <FormField
          control={control}
          name={"medicalHistory" as Path<T>}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold text-gray-700">
                Relevant Medical History
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="e.g., Hypertension (diagnosed 2018, well-controlled on ACE inhibitors)&#10;Type 2 Diabetes Mellitus (2020, managed with metformin)&#10;Previous myocardial infarction (2019, treated with PCI)&#10;No known drug allergies&#10;Current medications: Lisinopril 10mg daily, Metformin 500mg BID..."
                  className="min-h-[160px] text-base border-2 border-gray-200 focus:border-rose-400 focus:ring-rose-100 rounded-xl p-4 leading-6 transition-all duration-200 resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-gray-600 mt-3 flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0"></div>
                Include chronic conditions, previous surgeries, medications, allergies, and family history
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </FieldCard>
    </section>
  );
});

PatientStep.displayName = "PatientStep";
