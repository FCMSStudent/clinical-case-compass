
import { Control, UseFormSetValue, UseFormWatch } from "react-hook-form";
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
import { InteractiveBodyDiagram } from "@/components/body-diagram/InteractiveBodyDiagram";
import { SystemReviewChecklist } from "@/components/cases/SystemReviewChecklist";
import { VitalsCard } from "@/components/cases/VitalsCard";
import { LabResultsCard } from "@/components/cases/LabResultsCard";
import { RadiologyCard } from "@/components/cases/RadiologyCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// 1. Updated Zod Schema Definition
export const clinicalDetailStepSchema = z.object({
  patientHistory: z.string().optional(),
  selectedBodyParts: z.array(z.string()).optional().default([]),
  systemSymptoms: z.record(z.array(z.string())).optional().default({}),
  vitals: z.record(z.string()).optional().default({}),
  physicalExam: z.string().optional(),
  labResults: z.array(z.object({
    id: z.string(),
    name: z.string(),
    value: z.string(),
    unit: z.string(),
  })).optional().default([]),
  radiologyExams: z.array(z.object({
    id: z.string(),
    modality: z.string(),
    findings: z.string(),
  })).optional().default([]),
  relatedSystemsNotes: z.string().optional(),
  vitalsNotes: z.string().optional(),
  labResultsNotes: z.string().optional(),
  radiologyNotes: z.string().optional(),
});

// Optional: Define a type for the form data based on the schema
export type ClinicalDetailFormData = z.infer<typeof clinicalDetailStepSchema>;

// 2. Component Props
interface ClinicalDetailStepProps {
  control: Control<any>;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
}

// 3. Component Definition
export const ClinicalDetailStep: React.FC<ClinicalDetailStepProps> = ({ control, setValue, watch }) => {
  const currentSelectedBodyParts = watch("selectedBodyParts", []);

  const handleBodyPartSelected = (part: string) => {
    const updatedSelectedParts = currentSelectedBodyParts.includes(part)
      ? currentSelectedBodyParts.filter((p: string) => p !== part)
      : [...currentSelectedBodyParts, part];
    setValue("selectedBodyParts", updatedSelectedParts, { shouldValidate: true });
  };

  const handleSystemSymptomsChange = (systemSymptoms: Record<string, string[]>) => {
    setValue("systemSymptoms", systemSymptoms, { shouldValidate: true });
  };

  const handleVitalsChange = (vitals: Record<string, string>) => {
    setValue("vitals", vitals, { shouldValidate: true });
  };

  const handleLabResultsChange = (labResults: any[]) => {
    setValue("labResults", labResults, { shouldValidate: true });
  };

  const handleRadiologyChange = (radiologyExams: any[]) => {
    setValue("radiologyExams", radiologyExams, { shouldValidate: true });
  };

  return (
    <div className="space-y-6 py-2">
      {/* Patient History */}
      <Card>
        <CardHeader>
          <CardTitle>Patient History</CardTitle>
        </CardHeader>
        <CardContent>
          <FormField
            control={control}
            name="patientHistory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>History of Present Illness</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe the patient's current illness, timeline, associated symptoms, and relevant history..."
                    className="min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Document the chronological development of the patient's current condition.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      {/* System Review & Body Diagram */}
      <div className="grid md:grid-cols-2 gap-6">
        <SystemReviewChecklist onSystemSymptomsChange={handleSystemSymptomsChange} />
        
        <Card>
          <CardHeader>
            <CardTitle>Affected Body Parts</CardTitle>
          </CardHeader>
          <CardContent>
            <InteractiveBodyDiagram
              onBodyPartSelected={handleBodyPartSelected}
              highlightedSystems={currentSelectedBodyParts}
            />
            <FormDescription className="mt-2">
              Click on body parts to select/deselect. Selected: {currentSelectedBodyParts.join(", ") || "None"}
            </FormDescription>
            <FormField
              control={control}
              name="selectedBodyParts"
              render={() => (
                <FormItem>
                  <FormMessage className="mt-2" />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
      </div>

      {/* Vital Signs */}
      <VitalsCard onVitalsChange={handleVitalsChange} />

      {/* Physical Examination */}
      <Card>
        <CardHeader>
          <CardTitle>Physical Examination</CardTitle>
        </CardHeader>
        <CardContent>
          <FormField
            control={control}
            name="physicalExam"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Physical Examination Findings</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Document physical examination findings including general appearance, vital signs interpretation, and system-specific findings..."
                    className="min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Record objective findings from the physical examination.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      {/* Laboratory Results */}
      <div className="grid md:grid-cols-2 gap-6">
        <LabResultsCard onLabResultsChange={handleLabResultsChange} />
        <RadiologyCard onRadiologyChange={handleRadiologyChange} />
      </div>

      {/* Additional Clinical Notes */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Clinical Notes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <FormField
            control={control}
            name="relatedSystemsNotes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Related Systems & Initial Observations</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe any related physiological systems, initial observations, or differential diagnoses considerations..."
                    className="min-h-[80px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="vitalsNotes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vitals Interpretation Notes</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Interpret vital signs and note any abnormal findings or trends..."
                    className="min-h-[80px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="labResultsNotes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Laboratory Results Interpretation</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Interpret laboratory results and note significant findings..."
                    className="min-h-[80px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="radiologyNotes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Radiology Interpretation</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Interpret imaging results and note key findings..."
                    className="min-h-[80px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ClinicalDetailStep;
