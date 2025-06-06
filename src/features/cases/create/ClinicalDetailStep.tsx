
import React, {
  memo,
  useCallback,
  useMemo,
} from "react";
import {
  Control,
  FieldValues,
  Path,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
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
import {
  InteractiveBodyDiagram,
  BodyPartSelection,
} from "@/features/cases/InteractiveBodyDiagram";
import { SystemReviewChecklist } from "@/features/cases/SystemReviewChecklist";
import { VitalsCard } from "@/features/cases/VitalsCard";
import { LabResultsCard } from "@/features/cases/LabResultsCard";
import { RadiologyCard } from "@/features/cases/RadiologyCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText as FileTextIcon,
  Stethoscope as StethoscopeIcon,
  Activity as ActivityIcon,
  TestTube as TestTubeIcon,
  Scan as ScanIcon,
  User as UserIcon,
  Heart as HeartIcon,
  Brain as BrainIcon,
  ClipboardList as ClipboardIcon,
  Microscope as MicroscopeIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * ────────────────────────────────────────────────────────────────────────────────
 * SCHEMA
 * ────────────────────────────────────────────────────────────────────────────────
 */
export const clinicalDetailStepSchema = z.object({
  patientHistory: z.string().optional(),
  selectedBodyParts: z.array(z.string()).default([]),
  systemSymptoms: z.record(z.array(z.string())).default({}),
  vitals: z.record(z.string()).default({}),
  physicalExam: z.string().optional(),
  labResults: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        value: z.string(),
        unit: z.string(),
      }),
    )
    .default([]),
  radiologyExams: z
    .array(
      z.object({
        id: z.string(),
        modality: z.string(),
        findings: z.string(),
      }),
    )
    .default([]),
});
export type ClinicalDetailFormData = z.infer<typeof clinicalDetailStepSchema>;

/**
 * ────────────────────────────────────────────────────────────────────────────────
 * CONSTANTS & TYPES
 * ────────────────────────────────────────────────────────────────────────────────
 */
const TAB_ITEMS = [
  {
    value: "history",
    label: "History & Exam",
    icon: UserIcon,
  },
  {
    value: "systems",
    label: "Systems Review",
    icon: BrainIcon,
  },
  {
    value: "diagnostics",
    label: "Diagnostics",
    icon: TestTubeIcon,
  },
] as const;
export type TabValue = (typeof TAB_ITEMS)[number]["value"];

interface ClinicalDetailStepProps<T extends FieldValues = ClinicalDetailFormData> {
  control: Control<T>;
  setValue: UseFormSetValue<T>;
  watch: UseFormWatch<T>;
  className?: string;
}

/**
 * Reusable wrapper to render a card with gradient header + icon.
 */
function SectionCard({
  icon: Icon,
  title,
  headerClass,
  children,
}: {
  icon: React.ElementType;
  title: string;
  headerClass: string;
  children: React.ReactNode;
}) {
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

/**
 * ────────────────────────────────────────────────────────────────────────────────
 * COMPONENT
 * ────────────────────────────────────────────────────────────────────────────────
 */
export const ClinicalDetailStep = memo(function ClinicalDetailStep<
  T extends FieldValues = ClinicalDetailFormData,
>({ control, setValue, watch, className }: ClinicalDetailStepProps<T>) {
  /**
   * FORM STATE SELECTORS
   */
  const selectedBodyParts = (watch("selectedBodyParts" as Path<T>) as string[]) || [];

  /**
   * ─────────── Handlers ————————————————————————————————————————————————
   */
  const handleBodyPartSelected = useCallback(
    (selection: BodyPartSelection) => {
      const partName = selection.name || selection.id;
      setValue(
        "selectedBodyParts" as Path<T>,
        selectedBodyParts.includes(partName)
          ? (selectedBodyParts.filter((p) => p !== partName) as string[])
          : ([...selectedBodyParts, partName] as string[]),
        { shouldValidate: true },
      );
    },
    [selectedBodyParts, setValue],
  );

  const setSystemSymptoms = useCallback(
    (val: Record<string, string[]>) =>
      setValue("systemSymptoms" as Path<T>, val as Record<string, string[]>, {
        shouldValidate: true,
      }),
    [setValue],
  );

  const setVitals = useCallback(
    (v: Record<string, string>) =>
      setValue("vitals" as Path<T>, v as Record<string, string>, {
        shouldValidate: true,
      }),
    [setValue],
  );

  const setLabResults = useCallback(
    (labs: ComponentLabTest[]) =>
      setValue("labResults" as Path<T>, labs as ComponentLabTest[], {
        shouldValidate: true,
      }),
    [setValue],
  );

  const setRadiology = useCallback(
    (imgs: ComponentRadiologyExam[]) =>
      setValue(
        "radiologyExams" as Path<T>,
        imgs as ComponentRadiologyExam[],
        { shouldValidate: true },
      ),
    [setValue],
  );

  /**
   * Memoised badge list to avoid re-render churn on interactive diagram.
   */
  const PartBadges = useMemo(() => (
    selectedBodyParts.length ? (
      <div className="mt-3 flex flex-wrap gap-1">
        {selectedBodyParts.map((p) => (
          <Badge key={p} variant="secondary" className="text-xs bg-blue-100 text-blue-800">
            {p}
          </Badge>
        ))}
      </div>
    ) : null
  ), [selectedBodyParts]);

  /**
   * ————————————————————————————————————————————————————————————————————
   * RENDER
   * ————————————————————————————————————————————————————————————————————
   */
  return (
    <section className={cn("space-y-6", className)}>
      {/* ——————————————————— Header ——————————————————— */}
      <header className="space-y-2 text-center">
        <h2 className="text-2xl font-bold text-medical-800">Clinical Assessment & Documentation</h2>
        <p className="text-medical-600">Comprehensive clinical evaluation and diagnostic work-up</p>
      </header>

      {/* ——————————————————— Tabs ——————————————————— */}
      <Tabs defaultValue="history" className="w-full">
        {/* Tab list */}
        <TabsList className="grid w-full grid-cols-4 mb-6">
          {TAB_ITEMS.map(({ value, label, icon: Icon }) => (
            <TabsTrigger key={value} value={value} className="flex items-center gap-2">
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {/* ——————————— Tab: History & Exam ——————————— */}
        <TabsContent value="history" className="space-y-6">
          {/* History of Present Illness */}
          <SectionCard
            icon={FileTextIcon}
            title="History of Present Illness"
            headerClass="bg-gradient-to-r from-medical-50 to-blue-50 text-medical-800"
          >
            <FormField
              control={control}
              name={"patientHistory" as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Clinical History</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Document the patient's presenting complaint, timeline, associated factors, and relevant history…"
                      className="min-h-[160px] text-sm"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide a detailed chronological account of the patient's
                    condition and relevant background.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </SectionCard>

          {/* Physical Examination */}
          <SectionCard
            icon={StethoscopeIcon}
            title="Physical Examination"
            headerClass="bg-gradient-to-r from-blue-50 to-purple-50 text-blue-800"
          >
            <FormField
              control={control}
              name={"physicalExam" as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Examination Findings</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Systematic physical examination findings…"
                      className="min-h-[160px] text-sm"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Record objective findings from systematic examination of all
                    relevant body systems.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </SectionCard>
        </TabsContent>

        {/* ——————————— Tab: Systems Review ——————————— */}
        <TabsContent value="systems" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* ROS Checklist */}
            <div className="space-y-4">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-blue-800">
                <BrainIcon className="h-5 w-5 text-blue-600" /> Review of Systems
              </h3>
              <SystemReviewChecklist onSystemSymptomsChange={setSystemSymptoms} />
            </div>

            {/* Body Diagram */}
            <div className="space-y-4">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-blue-800">
                <UserIcon className="h-5 w-5 text-blue-600" /> Affected Body Areas
              </h3>
              <SectionCard
                icon={BrainIcon}
                title="Body Systems Diagram"
                headerClass="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-800"
              >
                <InteractiveBodyDiagram
                  onBodyPartSelected={handleBodyPartSelected}
                />
                <FormDescription className="mt-3 text-blue-600">
                  Click on body parts to mark affected areas
                </FormDescription>
                {PartBadges}
                {/* Hidden field to surface RHF validation state */}
                <FormField
                  control={control}
                  name={"selectedBodyParts" as Path<T>}
                  render={() => (
                    <FormItem>
                      <FormMessage className="mt-2" />
                    </FormItem>
                  )}
                />
              </SectionCard>
            </div>
          </div>

          {/* Vital Signs */}
          <div className="space-y-4">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-green-800">
              <HeartIcon className="h-5 w-5 text-green-600" /> Vital Signs & Physiological Parameters
            </h3>
            <VitalsCard onVitalsChange={setVitals} />
          </div>
        </TabsContent>

        {/* ——————————— Tab: Diagnostics ——————————— */}
        <TabsContent value="diagnostics" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-purple-800">
                <MicroscopeIcon className="h-5 w-5 text-purple-600" /> Laboratory Studies
              </h3>
              <LabResultsCard onLabResultsChange={setLabResults} />
            </div>
            <div className="space-y-4">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-purple-800">
                <ScanIcon className="h-5 w-5 text-purple-600" /> Imaging Studies
              </h3>
              <RadiologyCard onRadiologyChange={setRadiology} />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
});

ClinicalDetailStep.displayName = "ClinicalDetailStep";
