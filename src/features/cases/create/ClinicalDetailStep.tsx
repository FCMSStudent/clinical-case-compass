import React, { memo, useCallback, useMemo } from "react";
import { useFormContext, Controller, Path, FieldValues } from "react-hook-form";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { LabTest, RadiologyStudy } from "@/types/case";
import { clinicalDetailStepSchema, type ClinicalDetailFormData, TAB_ITEMS, type TabValue } from "./ClinicalDetailConfig";
import { InteractiveBodyDiagram, type BodyPartSelection } from "@/features/cases/InteractiveBodyDiagram";
import { SystemReviewChecklist } from "@/features/cases/SystemReviewChecklist";
import { VitalsCard } from "@/features/cases/VitalsCard";
import { LabResultsCard } from "@/features/cases/LabResultsCard";
import { RadiologyCard } from "@/features/cases/RadiologyCard";
import { StepHeader, StatusFieldCard } from "./components";

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
        <Tooltip>
          <TooltipTrigger asChild>
            <Info className="h-4 w-4 text-white/60 hover:text-white" />
          </TooltipTrigger>
          <TooltipContent>
            <p>{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      )}
    </div>
    {children}
  </div>
));
SimpleSection.displayName = "SimpleSection";


// Tab components using SimpleSection and StatusFieldCard or direct FormFields
const HistoryAndExamTab = memo(() => {
  const { control, formState, watch } = useFormContext<ClinicalDetailFormData>();
  const patientHistoryError = formState.errors?.patientHistory;
  const physicalExamError = formState.errors?.physicalExam;

  // Watch values for StatusFieldCard
  const patientHistoryValue = watch("patientHistory");
  const physicalExamValue = watch("physicalExam");

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
          render={({ field: { onChange, onBlur, value, name, ref } }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Document the patient's presenting complaint, timeline, associated factors, and relevant history…"
                  rows={6}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={typeof value === 'string' ? value : ""}
                  name={name}
                  ref={ref}
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
          render={({ field: { onChange, onBlur, value, name, ref } }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Systematic physical examination findings…"
                  rows={6}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={typeof value === 'string' ? value : ""}
                  name={name}
                  ref={ref}
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
  // selectedBodyParts is now an array of BodyPartSelection objects
  const selectedBodyParts: BodyPartSelection[] = watch(FORM_FIELDS.SELECTED_BODY_PARTS) || [];

  // Removed local state for systemSymptoms and vitals as they are handled by RHF setValue

  const handleBodyPartSelected = useCallback((newSelection: BodyPartSelection) => {
    // Get the current array of selected parts from the form state
    const currentSelectedParts: BodyPartSelection[] = watch(FORM_FIELDS.SELECTED_BODY_PARTS) || [];
    
    const existingIndex = currentSelectedParts.findIndex(p => p.id === newSelection.id && p.view === newSelection.view);
    
    let updatedPartsArray: BodyPartSelection[];
    if (existingIndex > -1) {
      // Part already exists, remove it
      updatedPartsArray = currentSelectedParts.filter((_, index) => index !== existingIndex);
    } else {
      // Part is new, add it
      updatedPartsArray = [...currentSelectedParts, newSelection];
    }
    setValue(FORM_FIELDS.SELECTED_BODY_PARTS, updatedPartsArray, { shouldValidate: true });
  }, [watch, setValue]);

  const PartBadges = useMemo(() => (
    selectedBodyParts.length > 0 && (
      <div className="mt-3 flex flex-wrap gap-1">
        {selectedBodyParts.map((part: BodyPartSelection) => ( // part is BodyPartSelection
          <Badge 
            key={`${part.id}-${part.view}`} // Use part.id and part.view for a unique key
            variant="secondary" 
            className="text-xs bg-blue-100 text-blue-800"
          >
            {part.name} <span className="text-blue-500/80 text-[10px]">({part.view.substring(0,3)})</span>
          </Badge>
        ))}
      </div>
    )
  ), [selectedBodyParts]);

  return (
    <TabsContent value="systems" className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <SimpleSection icon={BrainIcon} title="Review of Systems">
          <SystemReviewChecklist onSystemSymptomsChange={(symptoms) => setValue(FORM_FIELDS.SYSTEM_SYMPTOMS, symptoms, {shouldValidate: true})} />
           <Controller name={FORM_FIELDS.SYSTEM_SYMPTOMS as Path<ClinicalDetailFormData>} control={control} render={({ fieldState }) => fieldState.error ? <FormMessage className="mt-2">{fieldState.error.message}</FormMessage> : null} />
        </SimpleSection>
        <SimpleSection icon={UserIcon} title="Affected Body Areas">
          {/* Pass initialSelectedParts to InteractiveBodyDiagram */}
          <InteractiveBodyDiagram 
            onBodyPartSelected={handleBodyPartSelected}
            initialSelectedParts={selectedBodyParts} 
          />
          <p className="mt-3 text-sm text-white/70">Click on body parts to mark affected areas.</p>
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
  const { formState: { errors: RHFerrors } } = useFormContext<ClinicalDetailFormData>();
  const [currentTab, setCurrentTab] = React.useState<TabValue>(TAB_ITEMS[0].value); 
  const prevTabRef = React.useRef<TabValue>();

  React.useEffect(() => {
    // Store previous tab for animation direction
    prevTabRef.current = currentTab;
  }, [currentTab]);


  // Determine animation direction
  const prevTab = prevTabRef.current;
  let initialX = 0;
  let exitX = 0;

  if (prevTab && prevTab !== currentTab) {
    const currentTabIndex = TAB_ITEMS.findIndex(t => t.value === currentTab);
    const prevTabIndex = TAB_ITEMS.findIndex(t => t.value === prevTab);
    if (currentTabIndex > prevTabIndex) { // Moving right
      initialX = 20;
      exitX = -20;
    } else if (currentTabIndex < prevTabIndex) { // Moving left
      initialX = -20;
      exitX = 20;
    }
  }


  return (
    <TooltipProvider>
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
          value={currentTab} 
          className="w-full"
          onValueChange={(value) => setCurrentTab(value as TabValue)} 
        >
          <TabsList className="grid w-full grid-cols-3 mb-6 bg-transparent p-0">
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
              </TabsTrigger>
            ))}
          </TabsList>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentTab}
              initial={{ opacity: 0, x: initialX }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: exitX }}
              transition={{ duration: 0.2 }}
            >
              {currentTab === "history" && <HistoryAndExamTab />}
              {currentTab === "systems" && <SystemsReviewTab />}
              {currentTab === "diagnostics" && <DiagnosticsTab />}
            </motion.div>
          </AnimatePresence>
        </Tabs>
      </section>
    </TooltipProvider>
  );
});
ClinicalDetailStep.displayName = "ClinicalDetailStep";
