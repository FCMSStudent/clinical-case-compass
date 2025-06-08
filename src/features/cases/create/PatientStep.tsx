import React, { memo, useMemo } from "react";
import { useFormContext, FieldValues, Path, useWatch } from "react-hook-form";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
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
  Clock,
  AlertCircle,
  CheckCircle2,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

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
  tooltip,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
  className?: string;
  gradient?: string;
  iconColor?: string;
  tooltip?: string;
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
  className?: string;
}

/**
 * ────────────────────────────────────────────────────────────────────────────────
 * COMPONENT
 * ────────────────────────────────────────────────────────────────────────────────
 */
export const PatientStep = memo(function PatientStep<
  T extends FieldValues = PatientStepFormData,
>({ className }: PatientStepProps<T>) {
  const { control, formState } = useFormContext<T>();
  const [completedFields, setCompletedFields] = React.useState(0);
  const totalFields = 5; // patientName, medicalRecordNumber, patientAge, patientSex, medicalHistory

  // Watch only the specific fields we want to track
  const watchedFields = useWatch({
    control,
    name: ["patientName", "medicalRecordNumber", "patientAge", "patientSex", "medicalHistory"] as const,
  });
  
  React.useEffect(() => {
    const completed = watchedFields.filter(value => {
      if (typeof value === 'string') {
        return value.trim().length > 0;
      }
      if (typeof value === 'number') {
        return value >= 0;
      }
      return !!value;
    }).length;
    
    setCompletedFields(completed);
  }, [watchedFields]);

  return (
    <section className={cn("space-y-8", className)}>
      {/* Enhanced Header with medical theme and animation */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-700 p-8 text-white shadow-2xl"
      >
        <div className="absolute inset-0 bg-black/10"></div>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="absolute -top-4 -right-4 opacity-10"
        >
          <Heart className="h-24 w-24" />
        </motion.div>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="absolute top-8 right-8 opacity-20"
        >
          <UserCheck className="h-8 w-8" />
        </motion.div>
        <div className="relative space-y-3">
          <h3 className="flex items-center text-2xl font-bold">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mr-4 rounded-xl bg-white/20 p-3 backdrop-blur-sm"
            >
              <UserIcon className="h-7 w-7" />
            </motion.div>
            Patient Demographics
          </h3>
          <p className="text-cyan-100 text-lg max-w-2xl leading-relaxed">
            Document essential patient information and demographic details for comprehensive case documentation.
          </p>
        </div>
      </motion.header>

      <StepProgress completedFields={completedFields} totalFields={totalFields} />

      {/* Add validation summary alert if there are errors */}
      {Object.keys(formState.errors).length > 0 && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Validation Errors</AlertTitle>
          <AlertDescription>
            Please review and correct the highlighted fields below.
          </AlertDescription>
        </Alert>
      )}

      {/* Name & MRN Row */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Patient Name */}
        <FieldCard 
          icon={UserIcon} 
          title="Patient Name" 
          gradient="from-emerald-50 to-green-50"
          iconColor="text-emerald-600"
          tooltip="Enter the patient's full name. For privacy, you can use initials or a pseudonym."
        >
          <FormField
            control={control}
            name={"patientName" as Path<T>}
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="e.g., John A. Doe"
                    className={cn(
                      "text-base border-2 focus:ring-emerald-100 rounded-xl py-3 px-4 transition-all duration-200",
                      fieldState.error 
                        ? "border-red-300 focus:border-red-400 bg-red-50/50" 
                        : "border-gray-200 focus:border-emerald-400"
                    )}
                    {...field}
                  />
                </FormControl>
                <ValidationFeedback
                  isValid={!fieldState.error}
                  message={fieldState.error?.message || "Name looks good!"}
                />
                <FormDescription className="text-gray-600 mt-3 flex items-start gap-2">
                  <div className={cn(
                    "w-2 h-2 rounded-full mt-2 flex-shrink-0",
                    fieldState.error ? "bg-red-400" : "bg-emerald-400"
                  )}></div>
                  Patient's full name (can be anonymized for privacy)
                </FormDescription>
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
          tooltip="Enter the patient's unique hospital identifier. This field is optional but helps with record keeping."
        >
          <FormField
            control={control}
            name={"medicalRecordNumber" as Path<T>}
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControl>
                  <Input 
                    placeholder="e.g., MRN-2024-001234" 
                    className={cn(
                      "text-base border-2 focus:ring-blue-100 rounded-xl py-3 px-4 transition-all duration-200 font-mono",
                      fieldState.error 
                        ? "border-red-300 focus:border-red-400 bg-red-50/50" 
                        : "border-gray-200 focus:border-blue-400"
                    )}
                    {...field} 
                  />
                </FormControl>
                <ValidationFeedback
                  isValid={!fieldState.error}
                  message={fieldState.error?.message}
                />
                <FormDescription className="text-gray-600 mt-3 flex items-start gap-2">
                  <div className={cn(
                    "w-2 h-2 rounded-full mt-2 flex-shrink-0",
                    fieldState.error ? "bg-red-400" : "bg-blue-400"
                  )}></div>
                  Unique hospital identifier (optional)
                </FormDescription>
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
          tooltip="Enter the patient's age in years. Must be between 0 and 150 years."
        >
          <FormField
            control={control}
            name={"patientAge" as Path<T>}
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input
                      type="number"
                      placeholder="e.g., 45"
                      min={0}
                      max={150}
                      className={cn(
                        "text-base border-2 focus:ring-orange-100 rounded-xl py-3 px-4 pr-16 transition-all duration-200",
                        fieldState.error 
                          ? "border-red-300 focus:border-red-400 bg-red-50/50" 
                          : "border-gray-200 focus:border-orange-400"
                      )}
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
                <ValidationFeedback
                  isValid={!fieldState.error}
                  message={fieldState.error?.message || "Age looks good!"}
                />
                <FormDescription className="text-gray-600 mt-3 flex items-start gap-2">
                  <div className={cn(
                    "w-2 h-2 rounded-full mt-2 flex-shrink-0",
                    fieldState.error ? "bg-red-400" : "bg-orange-400"
                  )}></div>
                  Patient's age in years (0–150)
                </FormDescription>
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
          tooltip="Select the patient's gender identity. This information helps provide appropriate care and documentation."
        >
          <FormField
            control={control}
            name={"patientSex" as Path<T>}
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="mt-2 flex flex-col space-y-3"
                  >
                    {SEX_OPTIONS.map((option) => (
                      <motion.div
                        key={option}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: option === "Male" ? 0.1 : option === "Female" ? 0.2 : 0.3 }}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-purple-50/50 transition-colors"
                      >
                        <RadioGroupItem
                          value={option}
                          id={`sex-${option}`}
                          className={cn(
                            "border-2",
                            fieldState.error 
                              ? "border-red-300 text-red-600" 
                              : "border-purple-300 text-purple-600"
                          )}
                        />
                        <Label
                          htmlFor={`sex-${option}`}
                          className="cursor-pointer text-base font-medium text-gray-700 flex-1"
                        >
                          {option}
                        </Label>
                      </motion.div>
                    ))}
                  </RadioGroup>
                </FormControl>
                <ValidationFeedback
                  isValid={!fieldState.error}
                  message={fieldState.error?.message}
                />
                <FormDescription className="text-gray-600 mt-3 flex items-start gap-2">
                  <div className={cn(
                    "w-2 h-2 rounded-full mt-2 flex-shrink-0",
                    fieldState.error ? "bg-red-400" : "bg-purple-400"
                  )}></div>
                  Patient's gender identity (optional)
                </FormDescription>
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
        tooltip="Document the patient's relevant medical history, including chronic conditions, previous surgeries, medications, and allergies."
      >
        <FormField
          control={control}
          name={"medicalHistory" as Path<T>}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold text-gray-700">
                Relevant Medical History
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="e.g., Hypertension (diagnosed 2018, well-controlled on ACE inhibitors)&#10;Type 2 Diabetes Mellitus (2020, managed with metformin)&#10;Previous myocardial infarction (2019, treated with PCI)&#10;No known drug allergies&#10;Current medications: Lisinopril 10mg daily, Metformin 500mg BID..."
                  className={cn(
                    "min-h-[160px] text-base border-2 focus:ring-rose-100 rounded-xl p-4 leading-6 transition-all duration-200 resize-none",
                    fieldState.error 
                      ? "border-red-300 focus:border-red-400 bg-red-50/50" 
                      : "border-gray-200 focus:border-rose-400"
                  )}
                  {...field}
                />
              </FormControl>
              <ValidationFeedback
                isValid={!fieldState.error}
                message={fieldState.error?.message}
              />
              <FormDescription className="text-gray-600 mt-3 flex items-start gap-2">
                <div className={cn(
                  "w-2 h-2 rounded-full mt-2 flex-shrink-0",
                  fieldState.error ? "bg-red-400" : "bg-rose-400"
                )}></div>
                Include chronic conditions, previous surgeries, medications, allergies, and family history
              </FormDescription>
            </FormItem>
          )}
        />
      </FieldCard>
    </section>
  );
});

PatientStep.displayName = "PatientStep";

/**
 * Progress tracking component
 */
const StepProgress = memo(({ completedFields, totalFields }: { completedFields: number; totalFields: number }) => {
  const percentage = Math.round((completedFields / totalFields) * 100);
  
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-gray-700">Form Progress</span>
        <span className="text-gray-500">{percentage}% Complete</span>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  );
});
StepProgress.displayName = "StepProgress";

/**
 * Validation feedback component
 */
const ValidationFeedback = memo(({ isValid, message }: { isValid: boolean; message?: string }) => (
  <AnimatePresence mode="wait">
    {message && (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className={cn(
          "flex items-center gap-2 mt-2 text-sm",
          isValid ? "text-emerald-600" : "text-red-600"
        )}
      >
        {isValid ? (
          <CheckCircle2 className="h-4 w-4" />
        ) : (
          <AlertCircle className="h-4 w-4" />
        )}
        <span>{message}</span>
      </motion.div>
    )}
  </AnimatePresence>
));
ValidationFeedback.displayName = "ValidationFeedback";
