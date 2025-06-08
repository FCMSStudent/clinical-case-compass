import React, { memo, useCallback, useMemo } from "react";
import { useFormContext, Controller, Path } from "react-hook-form";
import { z } from "zod";

// 1. CENTRALIZED CONFIGURATION: All form field names are now in one place.
// This prevents typos and makes refactoring easier.
const FORM_FIELDS = {
  PATIENT_HISTORY: "patientHistory",
  PHYSICAL_EXAM: "physicalExam",
  SELECTED_BODY_PARTS: "selectedBodyParts",
  SYSTEM_SYMPTOMS: "systemSymptoms",
  VITALS: "vitals",
  LAB_RESULTS: "labResults",
  RADIOLOGY_EXAMS: "radiologyExams",
} as const;

// --- Local Imports (assuming folder structure) ---
import { clinicalDetailStepSchema, type ClinicalDetailFormData, TAB_ITEMS } from "./ClinicalDetailConfig";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { InteractiveBodyDiagram, BodyPartSelection } from "@/features/cases/InteractiveBodyDiagram";
import { SystemReviewChecklist } from "@/features/cases/SystemReviewChecklist";
import { VitalsCard } from "@/features/cases/VitalsCard";
import { LabResultsCard } from "@/features/cases/LabResultsCard";
import { RadiologyCard } from "@/features/cases/RadiologyCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain as BrainIcon, FileText as FileTextIcon, Heart as HeartIcon, Microscope as MicroscopeIcon, Scan as ScanIcon, Stethoscope as StethoscopeIcon, User as UserIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LabTest, RadiologyExam } from "@/types/case";

// 2. REUSABLE & DECOUPLED FIELD COMPONENT
// This component encapsulates the boilerplate for a controlled textarea field.
// It uses `useFormContext` so it doesn't need `control` passed as a prop.
interface FormTextAreaFieldProps {
  name: Path<ClinicalDetailFormData>;
  label: string;
  placeholder: string;
  description: string;
}

const FormTextAreaField = ({ name, label, placeholder, description }: FormTextAreaFieldProps) => {
  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea placeholder={placeholder} className="min-h-[160px] text-sm" {...field} />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

// --- Reusable Section Card (Unchanged, it's already good!) ---
function SectionCard({ icon: Icon, title, headerClass, children }: { icon: React.ElementType; title: string; headerClass: string; children: React.ReactNode; }) {
  return (
    <Card className="shadow-sm">
      <CardHeader className={cn("pb-3", headerClass)}>
        <CardTitle className="flex items-center gap-2 text-base">
          <Icon className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">{children}</CardContent>
    </Card>
  );
}

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
  // 4. DECOUPLED STATE MANAGEMENT: Hooks from `useFormContext` are called here,
  // not passed down from the top-level component.
  const { setValue, watch } = useFormContext<ClinicalDetailFormData>();
  const selectedBodyParts = watch(FORM_FIELDS.SELECTED_BODY_PARTS) || [];

  const handleBodyPartSelected = useCallback((selection: BodyPartSelection) => {
    const partName = selection.name || selection.id;
    const updatedParts = selectedBodyParts.includes(partName)
      ? selectedBodyParts.filter((p) => p !== partName)
      : [...selectedBodyParts, partName];
    setValue(FORM_FIELDS.SELECTED_BODY_PARTS, updatedParts, { shouldValidate: true });
  }, [selectedBodyParts, setValue]);

  const setSystemSymptoms = useCallback((val: Record<string, string[]>) =>
    setValue(FORM_FIELDS.SYSTEM_SYMPTOMS, val, { shouldValidate: true }), [setValue]);

  const setVitals = useCallback((v: Record<string, string>) =>
    setValue(FORM_FIELDS.VITALS, v, { shouldValidate: true }), [setValue]);

  const PartBadges = useMemo(() => (
    selectedBodyParts.length > 0 && (
      <div className="mt-3 flex flex-wrap gap-1">
        {selectedBodyParts.map((p) => (
          <Badge key={p} variant="secondary" className="text-xs bg-blue-100 text-blue-800">{p}</Badge>
        ))}
      </div>
    )
  ), [selectedBodyParts]);

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

  const setRadiology = useCallback((imgs: RadiologyExam[]) =>
    setValue(FORM_FIELDS.RADIOLOGY_EXAMS, imgs, { shouldValidate: true }), [setValue]);

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
  return (
    <section className={cn("space-y-6", className)}>
      <header className="space-y-2 text-center">
        <h2 className="text-2xl font-bold text-medical-800">Clinical Assessment & Documentation</h2>
        <p className="text-medical-600">Comprehensive clinical evaluation and diagnostic work-up</p>
      </header>
      
      {/* The main component is now just a layout shell. The complexity is handled by child components. */}
      <Tabs defaultValue="history" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          {TAB_ITEMS.map(({ value, label, icon: Icon }) => (
            <TabsTrigger key={value} value={value} className="flex items-center gap-2">
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        <HistoryAndExamTab />
        <SystemsReviewTab />
        <DiagnosticsTab />

      </Tabs>
    </section>
  );
});
ClinicalDetailStep.displayName = "ClinicalDetailStep";
