import React, { memo, useCallback, useMemo } from "react";
import { useFormContext, Controller, Path } from "react-hook-form";
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
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Brain as BrainIcon,
  FileText as FileTextIcon,
  Heart as HeartIcon,
  Microscope as MicroscopeIcon,
  Scan as ScanIcon,
  Stethoscope as StethoscopeIcon,
  User as UserIcon,
  AlertCircle,
  CheckCircle2,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { LabTest, RadiologyStudy } from "@/types/case";
import { clinicalDetailStepSchema, type ClinicalDetailFormData, TAB_ITEMS } from "./ClinicalDetailConfig";
import { InteractiveBodyDiagram, BodyPartSelection } from "@/features/cases/InteractiveBodyDiagram";
import { SystemReviewChecklist } from "@/features/cases/SystemReviewChecklist";
import { VitalsCard } from "@/features/cases/VitalsCard";
import { LabResultsCard } from "@/features/cases/LabResultsCard";
import { RadiologyCard } from "@/features/cases/RadiologyCard";
import { useFormValidation } from "@/hooks/use-form-validation";

// 1. CENTRALIZED CONFIGURATION: All form field names are now in one place.
// This prevents typos and makes refactoring easier.
const FORM_FIELDS = {
  PATIENT_HISTORY: "patientHistory",
  PHYSICAL_EXAM: "physicalExam",
  SELECTED_BODY_PARTS: "selectedBodyParts",
  SYSTEM_SYMPTOMS: "systemSymptoms",
  VITALS: "vitals",
  LAB_RESULTS: "labResults",
  RADIOLOGY_STUDIES: "radiologyStudies",
} as const;

// 2. REUSABLE & DECOUPLED FIELD COMPONENT
// This component encapsulates the boilerplate for a controlled textarea field.
// It uses `useFormContext` so it doesn't need `control` passed as a prop.
interface FormTextAreaFieldProps {
  name: Path<ClinicalDetailFormData>;
  label: string;
  placeholder: string;
  description: string;
  tooltip?: string;
  isRequired?: boolean;
}

const FormTextAreaField = memo(({ 
  name, 
  label, 
  placeholder, 
  description, 
  tooltip,
  isRequired 
}: FormTextAreaFieldProps) => {
  const { formState } = useFormContext<ClinicalDetailFormData>();
  const error = formState.errors[name];

  return (
    <FormField
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          <div className="flex items-center justify-between">
            <FormLabel className="text-base font-semibold text-gray-700">
              {label}
              {isRequired && <span className="text-red-500 ml-1">*</span>}
            </FormLabel>
            {tooltip && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          <FormControl>
            <Textarea
              placeholder={placeholder}
              className={cn(
                "min-h-[160px] text-sm border-2 transition-all duration-200",
                fieldState.error
                  ? "border-red-300 focus:border-red-400 bg-red-50/50"
                  : "border-gray-200 focus:border-blue-400"
              )}
              {...field}
            />
          </FormControl>
          <div className="mt-2 flex items-center gap-2">
            {fieldState.error ? (
              <AlertCircle className="h-4 w-4 text-red-500" />
            ) : field.value ? (
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            ) : null}
            <FormDescription className={cn(
              "text-sm",
              fieldState.error ? "text-red-500" : "text-gray-600"
            )}>
              {fieldState.error?.message || description}
            </FormDescription>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
});
FormTextAreaField.displayName = "FormTextAreaField";

// --- Reusable Section Card (Unchanged, it's already good!) ---
interface SectionCardProps {
  icon: React.ElementType;
  title: string;
  headerClass?: string;
  children: React.ReactNode;
  tooltip?: string;
}

const SectionCard = memo(({ 
  icon: Icon, 
  title, 
  headerClass, 
  children,
  tooltip 
}: SectionCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <Card className="border-2 overflow-hidden">
      <CardHeader className={cn("border-b", headerClass)}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-white/20 p-2 backdrop-blur-sm">
              <Icon className="h-5 w-5" />
            </div>
            <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          </div>
          {tooltip && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{tooltip}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-6">{children}</CardContent>
    </Card>
  </motion.div>
));
SectionCard.displayName = "SectionCard";

// 3. COMPOSITION: Break down tabs into smaller, focused components.
// Each component is responsible for its own content and state.

const HistoryAndExamTab = memo(() => (
  <TabsContent value="history" className="space-y-6">
    <SectionCard icon={FileTextIcon} title="History of Present Illness" headerClass="bg-gradient-to-r from-medical-50 to-blue-50 text-medical-800">
      <FormTextAreaField
        name={FORM_FIELDS.PATIENT_HISTORY}
        label="Clinical History"
        placeholder="Document the patient's presenting complaint, timeline, associated factors, and relevant history…"
        description="Provide a detailed chronological account of the patient's condition and relevant background."
      />
    </SectionCard>
    <SectionCard icon={StethoscopeIcon} title="Physical Examination" headerClass="bg-gradient-to-r from-blue-50 to-purple-50 text-blue-800">
      <FormTextAreaField
        name={FORM_FIELDS.PHYSICAL_EXAM}
        label="Examination Findings"
        placeholder="Systematic physical examination findings…"
        description="Record objective findings from systematic examination of all relevant body systems."
      />
    </SectionCard>
  </TabsContent>
));
HistoryAndExamTab.displayName = "HistoryAndExamTab";


const SystemsReviewTab = memo(() => {
  const { setValue, watch } = useFormContext<ClinicalDetailFormData>();
  const selectedBodyParts = watch(FORM_FIELDS.SELECTED_BODY_PARTS) || [];
  const [systemSymptoms, setSystemSymptoms] = React.useState<Record<string, string[]>>({});
  const [vitals, setVitals] = React.useState<Record<string, string>>({});

  // Memoize selectedBodyParts to prevent unnecessary re-renders
  const memoizedSelectedBodyParts = useMemo(() => selectedBodyParts, [selectedBodyParts]);

  const handleBodyPartSelected = useCallback((selection: BodyPartSelection) => {
    const partName = selection.name || selection.id;
    if (!partName) return;
    
    const updatedParts = memoizedSelectedBodyParts.includes(partName)
      ? memoizedSelectedBodyParts.filter((p) => p !== partName)
      : [...memoizedSelectedBodyParts, partName];
    setValue(FORM_FIELDS.SELECTED_BODY_PARTS, updatedParts, { shouldValidate: true });
  }, [memoizedSelectedBodyParts, setValue]);

  const PartBadges = useMemo(() => (
    memoizedSelectedBodyParts.length > 0 && (
      <div className="mt-3 flex flex-wrap gap-1">
        {memoizedSelectedBodyParts.map((p) => (
          <Badge key={p} variant="secondary" className="text-xs bg-blue-100 text-blue-800">{p}</Badge>
        ))}
      </div>
    )
  ), [memoizedSelectedBodyParts]);

  return (
    <TabsContent value="systems" className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard icon={BrainIcon} title="Review of Systems" headerClass="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-800">
          <SystemReviewChecklist onSystemSymptomsChange={setSystemSymptoms} />
        </SectionCard>
        <SectionCard icon={UserIcon} title="Affected Body Areas" headerClass="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-800">
          <InteractiveBodyDiagram onBodyPartSelected={handleBodyPartSelected} />
          <FormDescription className="mt-3 text-blue-600">Click on body parts to mark affected areas</FormDescription>
          {PartBadges}
          <Controller name={FORM_FIELDS.SELECTED_BODY_PARTS} render={({ fieldState }) => fieldState.error ? <FormMessage className="mt-2">{fieldState.error.message}</FormMessage> : null} />
        </SectionCard>
      </div>
      <SectionCard icon={HeartIcon} title="Vital Signs & Physiological Parameters" headerClass="bg-gradient-to-r from-green-50 to-teal-50 text-green-800">
        <VitalsCard onVitalsChange={setVitals} />
      </SectionCard>
    </TabsContent>
  );
});
SystemsReviewTab.displayName = "SystemsReviewTab";


const DiagnosticsTab = memo(() => {
  const { setValue } = useFormContext<ClinicalDetailFormData>();

  const setLabResults = useCallback((labs: LabTest[]) =>
    setValue(FORM_FIELDS.LAB_RESULTS, labs, { shouldValidate: true }), [setValue]);

  const setRadiology = useCallback((studies: RadiologyStudy[]) =>
    setValue(FORM_FIELDS.RADIOLOGY_STUDIES, studies, { shouldValidate: true }), [setValue]);

  return (
    <TabsContent value="diagnostics" className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard icon={MicroscopeIcon} title="Laboratory Studies" headerClass="bg-gradient-to-r from-purple-50 to-pink-50 text-purple-800">
          <LabResultsCard onLabResultsChange={setLabResults} />
        </SectionCard>
        <SectionCard icon={ScanIcon} title="Imaging Studies" headerClass="bg-gradient-to-r from-pink-50 to-red-50 text-red-800">
          <RadiologyCard onRadiologyChange={setRadiology} />
        </SectionCard>
      </div>
    </TabsContent>
  );
});
DiagnosticsTab.displayName = "DiagnosticsTab";

// 5. SIMPLIFIED & CLEANER MAIN COMPONENT
export const ClinicalDetailStep = memo(({ className }: { className?: string }) => {
  const { setValue, control, formState } = useFormContext<ClinicalDetailFormData>();
  const [currentTab, setCurrentTab] = React.useState("history");

  // Use shared validation utilities
  const { completedFields, totalFields, completionPercentage, errors } = useFormValidation<ClinicalDetailFormData>({
    requiredFields: [
      "patientHistory",
      "physicalExam",
      "selectedBodyParts",
      "systemSymptoms",
      "vitals",
      "labResults",
      "radiologyStudies",
    ],
    watchFields: [
      "patientHistory",
      "physicalExam",
      "selectedBodyParts",
      "systemSymptoms",
      "vitals",
      "labResults",
      "radiologyStudies",
    ],
  });

  return (
    <section className={cn("space-y-6", className)}>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-8 text-white shadow-2xl"
      >
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute -top-4 -right-4 opacity-10">
          <StethoscopeIcon className="h-24 w-24" />
        </div>
        <div className="relative space-y-3">
          <h3 className="flex items-center text-2xl font-bold">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mr-4 rounded-xl bg-white/20 p-3 backdrop-blur-sm"
            >
              <StethoscopeIcon className="h-7 w-7" />
            </motion.div>
            Clinical Assessment & Documentation
          </h3>
          <p className="text-blue-100 text-lg max-w-2xl leading-relaxed">
            Comprehensive clinical evaluation and diagnostic work-up
          </p>
        </div>
      </motion.header>

      {/* Validation summary alert */}
      {Object.keys(errors).length > 0 && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Validation Errors</AlertTitle>
          <AlertDescription>
            Please review and correct the highlighted fields below.
          </AlertDescription>
        </Alert>
      )}

      <Tabs 
        defaultValue="history" 
        className="w-full"
        onValueChange={setCurrentTab}
      >
        <TabsList className="grid w-full grid-cols-3 mb-6">
          {TAB_ITEMS.map(({ value, label, icon: Icon }) => (
            <TabsTrigger
              key={value}
              value={value}
              className="flex items-center gap-2 relative"
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
              {value === currentTab && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </TabsTrigger>
          ))}
        </TabsList>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <HistoryAndExamTab />
            <SystemsReviewTab />
            <DiagnosticsTab />
          </motion.div>
        </AnimatePresence>
      </Tabs>
    </section>
  );
});
ClinicalDetailStep.displayName = "ClinicalDetailStep";
