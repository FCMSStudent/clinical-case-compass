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
import { Calendar, Hash, User as UserIcon, Users } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * ────────────────────────────────────────────────────────────────────────────────
 * SCHEMA
 * ────────────────────────────────────────────────────────────────────────────────
 */
export const patientStepSchema = z.object({
  patientName: z.string().min(2, "Patient name must be at least 2 characters."),
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
 * Utility wrapper that standardises card header & icon usage.
 */
function FieldCard({
  icon: Icon,
  title,
  children,
  className,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Card className={cn("shadow-sm", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base text-foreground">
          <Icon className="h-4 w-4" /> {title}
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
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
    <section className={cn("space-y-6", className)}>
      {/* Header */}
      <header className="mb-6 space-y-1">
        <h3 className="flex items-center text-lg font-semibold text-primary">
          <UserIcon className="mr-2 h-5 w-5 text-primary" /> Patient Information
        </h3>
        <p className="text-sm text-muted-foreground">
          Enter the patient’s basic demographic and identification information.
        </p>
      </header>

      {/* Name & MRN */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Name */}
        <FieldCard icon={UserIcon} title="Patient Name *">
          <FormField
            control={control}
            name={"patientName" as Path<T>}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="e.g., John Doe"
                    className="text-sm"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Full name of the patient (may be anonymised).
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </FieldCard>

        {/* MRN */}
        <FieldCard icon={Hash} title="Medical Record Number">
          <FormField
            control={control}
            name={"medicalRecordNumber" as Path<T>}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="e.g., MRN123456" className="text-sm" {...field} />
                </FormControl>
                <FormDescription>
                  Patient’s medical record number or hospital ID (optional).
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </FieldCard>
      </div>

      {/* Age & Sex */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Age */}
        <FieldCard icon={Calendar} title="Age">
          <FormField
            control={control}
            name={"patientAge" as Path<T>}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="e.g., 35"
                    min={0}
                    max={150}
                    className="text-sm"
                    value={field.value ?? ""}
                    onChange={(e) =>
                      field.onChange(e.target.value === "" ? "" : Number(e.target.value))
                    }
                  />
                </FormControl>
                <FormDescription>Patient age in years (0–150).</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </FieldCard>

        {/* Sex */}
        <FieldCard icon={Users} title="Gender">
          <FormField
            control={control}
            name={"patientSex" as Path<T>}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="mt-2 flex flex-row gap-6"
                  >
                    {SEX_OPTIONS.map((option) => (
                      <div key={option} className="flex items-center gap-2">
                        <RadioGroupItem
                          value={option}
                          id={`sex-${option}`}
                          className="border"
                        />
                        <Label
                          htmlFor={`sex-${option}`}
                          className="cursor-pointer text-sm font-normal"
                        >
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormDescription>Patient gender identity (optional).</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </FieldCard>
      </div>

      {/* Medical history */}
      <FieldCard icon={UserIcon} title="Medical History">
        <FormField
          control={control}
          name={"medicalHistory" as Path<T>}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Relevant Past Medical History</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="e.g., Hypertension (2018), Type 2 Diabetes (2020)…"
                  className="min-h-[120px] text-sm"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Brief summary of relevant conditions, surgeries, allergies, and
                medications.
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
