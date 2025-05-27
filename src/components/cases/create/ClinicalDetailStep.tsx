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
import { SymptomChecklist } from "@/components/symptoms/SymptomChecklist";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// 1. Zod Schema Definition
export const clinicalDetailStepSchema = z.object({
  selectedBodyParts: z.array(z.string()).optional().default([]),
  symptoms: z.array(z.string()).optional().default([]),
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

  const handleSymptomsSelected = (symptoms: string[]) => {
    setValue("symptoms", symptoms, { shouldValidate: true });
  };

  return (
    <div className="space-y-6 py-2">
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Affected Body Parts</CardTitle>
          </CardHeader>
          <CardContent>
            <InteractiveBodyDiagram
              onBodyPartSelected={handleBodyPartSelected}
              highlightedSystems={currentSelectedBodyParts} // Use current selection to highlight
            />
            <FormDescription className="mt-2">
              Click on body parts to select/deselect. Selected: {currentSelectedBodyParts.join(", ") || "None"}
            </FormDescription>
             {/* Hidden FormField to register 'selectedBodyParts' with RHF and show validation errors */}
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

        <Card>
          <CardHeader>
            <CardTitle>Reported Symptoms</CardTitle>
          </CardHeader>
          <CardContent>
            <SymptomChecklist onSymptomsSelected={handleSymptomsSelected} />
             {/* Hidden FormField to register 'symptoms' with RHF and show validation errors */}
             <FormField
              control={control}
              name="symptoms"
              render={() => (
                <FormItem>
                  <FormMessage className="mt-2" />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Clinical Notes</CardTitle>
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
                    placeholder="Describe any related physiological systems, initial observations, or differential diagnoses considerations based on body parts and symptoms..."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Note down observations about systems potentially involved (e.g., Cardiovascular, Respiratory).
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="vitalsNotes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vitals & Physical Examination Notes</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Record key vital signs (e.g., BP, HR, Temp, RR, SpO2) and physical examination findings..."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Include any relevant measurements and observations from the physical exam.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="labResultsNotes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Laboratory Results Notes</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Summarize significant lab findings (e.g., CBC, BMP, specific markers)..."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Note abnormal values or results that influence the case.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="radiologyNotes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Radiology & Imaging Notes</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe findings from X-rays, CT scans, MRIs, ultrasounds, etc..."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Summarize key imaging results and their interpretations.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
    </div>
  );
};

// 4. Export the component and schema
export default ClinicalDetailStep;
