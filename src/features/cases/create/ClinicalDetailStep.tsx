import React, { memo, useCallback, useMemo } from "react";
import { useFormContext, Controller, Path, FieldValues } from "react-hook-form"; // Added FieldValues
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
// Card imports removed
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// Progress import removed as it's part of useFormValidation now
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
  CheckCircle2, // Keep for potential simple feedback icons if needed
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
import { StepHeader, StatusFieldCard } from "./components"; // Added StatusFieldCard

// FORM_FIELDS constant remains the same
const FORM_FIELDS = {
  PATIENT_HISTORY: "patientHistory",
  PHYSICAL_EXAM: "physicalExam",
  SELECTED_BODY_PARTS: "selectedBodyParts",
  SYSTEM_SYMPTOMS: "systemSymptoms",
  VITALS: "vitals",
  LAB_RESULTS: "labResults",
  RADIOLOGY_STUDIES: "radiologyStudies",
} as const;

// Simplified Section Wrapper
interface SimpleSectionProps {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  tooltip?: string;
  className?: string;
}
const SimpleSection = memo(({ title, icon: Icon, children, tooltip, className }: SimpleSectionProps) => (
  <div className={cn("p-4 border border-white/10 rounded-lg space-y-4", className)}>
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-blue-500/20 text-white border border-blue-400/30">
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
      {tooltip && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-4 w-4 text-white/60 hover:text-white" />
            </TooltipTrigger>
            <TooltipContent>
              <p>{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
    {children}
  </div>
));
SimpleSection.displayName = "SimpleSection";


// Tab components using SimpleSection and StatusFieldCard or direct FormFields
const HistoryAndExamTab = memo(() => {
  const { control, formState } = useFormContext<ClinicalDetailFormData>();
  const patientHistoryError = formState.errors?.patientHistory;
  const physicalExamError = formState.errors?.physicalExam;

  // Watch values for StatusFieldCard
  const patientHistoryValue = useFormContext<ClinicalDetailFormData>().watch("patientHistory");
  const physicalExamValue = useFormContext<ClinicalDetailFormData>().watch("physicalExam");


  return (
    <TabsContent value="history" className="space-y-6">
      <StatusFieldCard
        icon={FileTextIcon}
        title="Clinical History"
        tooltip="Provide a detailed chronological account of the patient's condition and relevant background."
        hasError={!!patientHistoryError}
        fieldValue={patientHistoryValue}
      >
        <FormField
          control={control}
          name={"patientHistory" as Path<ClinicalDetailFormData>}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Document the patient's presenting complaint, timeline, associated factors, and relevant history…"
                  rows={6}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </StatusFieldCard>
      
      <StatusFieldCard
        icon={StethoscopeIcon}
        title="Examination Findings"
        tooltip="Record objective findings from systematic examination of all relevant body systems."
        hasError={!!physicalExamError}
        fieldValue={physicalExamValue}
      >
        <FormField
          control={control}
          name={"physicalExam" as Path<ClinicalDetailFormData>}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Systematic physical examination findings…"
                  rows={6}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </StatusFieldCard>
    </TabsContent>
  );
});
HistoryAndExamTab.displayName = "HistoryAndExamTab";


const SystemsReviewTab = memo(() => {
  const { setValue, watch, control } = useFormContext<ClinicalDetailFormData>();
  const selectedBodyParts = watch(FORM_FIELDS.SELECTED_BODY_PARTS) || [];
  const [systemSymptoms, setSystemSymptoms] = React.useState<Record<string, string[]>>({}); // This state might need to be lifted or integrated with RHF
  const [vitals, setVitals] = React.useState<Record<string, string>>({}); // Same as above

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
        <SimpleSection icon={BrainIcon} title="Review of Systems">
          <SystemReviewChecklist onSystemSymptomsChange={(symptoms) => setValue(FORM_FIELDS.SYSTEM_SYMPTOMS, symptoms, {shouldValidate: true})} />
           <Controller name={FORM_FIELDS.SYSTEM_SYMPTOMS as Path<ClinicalDetailFormData>} control={control} render={({ fieldState }) => fieldState.error ? <FormMessage className="mt-2">{fieldState.error.message}</FormMessage> : null} />
        </SimpleSection>
        <SimpleSection icon={UserIcon} title="Affected Body Areas">
          <InteractiveBodyDiagram onBodyPartSelected={handleBodyPartSelected} />
          <FormDescription className="mt-3 text-white/70">Click on body parts to mark affected areas.</FormDescription>
          {PartBadges}
          <Controller name={FORM_FIELDS.SELECTED_BODY_PARTS as Path<ClinicalDetailFormData>} control={control} render={({ fieldState }) => fieldState.error ? <FormMessage className="mt-2">{fieldState.error.message}</FormMessage> : null} />
        </SimpleSection>
      </div>
      <SimpleSection icon={HeartIcon} title="Vital Signs & Physiological Parameters">
        <VitalsCard onVitalsChange={(v) => setValue(FORM_FIELDS.VITALS, v, {shouldValidate: true})} />
        <Controller name={FORM_FIELDS.VITALS as Path<ClinicalDetailFormData>} control={control} render={({ fieldState }) => fieldState.error ? <FormMessage className="mt-2">{fieldState.error.message}</FormMessage> : null} />
      </SimpleSection>
    </TabsContent>
  );
});
SystemsReviewTab.displayName = "SystemsReviewTab";


const DiagnosticsTab = memo(() => {
  const { setValue, control } = useFormContext<ClinicalDetailFormData>();

  const setLabResults = useCallback((labs: LabTest[]) =>
    setValue(FORM_FIELDS.LAB_RESULTS, labs, { shouldValidate: true }), [setValue]);

  const setRadiology = useCallback((studies: RadiologyStudy[]) =>
    setValue(FORM_FIELDS.RADIOLOGY_STUDIES, studies, { shouldValidate: true }), [setValue]);

  return (
    <TabsContent value="diagnostics" className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <SimpleSection icon={MicroscopeIcon} title="Laboratory Studies">
          <LabResultsCard onLabResultsChange={setLabResults} />
           <Controller name={FORM_FIELDS.LAB_RESULTS as Path<ClinicalDetailFormData>} control={control} render={({ fieldState }) => fieldState.error ? <FormMessage className="mt-2">{fieldState.error.message}</FormMessage> : null} />
        </SimpleSection>
        <SimpleSection icon={ScanIcon} title="Imaging Studies">
          <RadiologyCard onRadiologyChange={setRadiology} />
          <Controller name={FORM_FIELDS.RADIOLOGY_STUDIES as Path<ClinicalDetailFormData>} control={control} render={({ fieldState }) => fieldState.error ? <FormMessage className="mt-2">{fieldState.error.message}</FormMessage> : null} />
        </SimpleSection>
      </div>
    </TabsContent>
  );
});
DiagnosticsTab.displayName = "DiagnosticsTab";

// Main component
export const ClinicalDetailStep = memo(({ className }: { className?: string }) => {
  const { formState: { errors: RHFerrors } } = useFormContext<ClinicalDetailFormData>(); // Use RHF errors directly
  const [currentTab, setCurrentTab] = React.useState(TAB_ITEMS[0].value);

  // useFormValidation hook provides errors based on watched fields,
  // RHFerrors contains errors from Zod schema validation triggered by RHF.
  // We display a general alert based on RHFerrors.
  // Individual field errors will be shown by FormMessage.

  return (
    <section className={cn("space-y-6", className)}>
      <StepHeader
        title="Clinical Assessment & Documentation"
        description="Comprehensive clinical evaluation and diagnostic work-up"
        icon={StethoscopeIcon}
      />

      {Object.keys(RHFerrors).length > 0 && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Validation Errors</AlertTitle>
          <AlertDescription>
            Please review and correct the highlighted fields within the tabs.
          </AlertDescription>
        </Alert>
      )}

      <Tabs 
        value={currentTab} // Control the current tab
        className="w-full"
        onValueChange={setCurrentTab}
      >
        <TabsList className="grid w-full grid-cols-3 mb-6 bg-transparent p-0"> {/* Simplified TabsList */}
          {TAB_ITEMS.map(({ value, label, icon: Icon }) => (
            <TabsTrigger
              key={value}
              value={value}
              className={cn(
                "flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-md",
                "data-[state=active]:bg-blue-500/20 data-[state=active]:text-white data-[state=active]:shadow-sm",
                "text-white/70 hover:bg-white/10 hover:text-white" 
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
              {/* Animated underline removed for simplicity, active state handled by className */}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* AnimatePresence and motion.div for tab content transition can be kept if desired */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab}
            initial={{ opacity: 0, x: currentTab === TAB_ITEMS[0].value ? 0 : (TAB_ITEMS.findIndex(t => t.value === currentTab) > TAB_ITEMS.findIndex(t => t.value === (useFormContext<ClinicalDetailFormData>().watch("currentTab" as any) || TAB_ITEMS[0].value)) ? 20 : -20) }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: currentTab === TAB_ITEMS[0].value ? 0 : (TAB_ITEMS.findIndex(t => t.value === currentTab) > TAB_ITEMS.findIndex(t => t.value === (useFormContext<ClinicalDetailFormData>().watch("currentTab" as any) || TAB_ITEMS[0].value)) ? -20 : 20) }}
            transition={{ duration: 0.2 }}
          >
            {/* Render only the active tab's content for cleaner DOM and better performance */}
            {currentTab === "history" && <HistoryAndExamTab />}
            {currentTab === "systems" && <SystemsReviewTab />}
            {currentTab === "diagnostics" && <DiagnosticsTab />}
          </motion.div>
        </AnimatePresence>
      </Tabs>
    </section>
  );
});
ClinicalDetailStep.displayName = "ClinicalDetailStep";
