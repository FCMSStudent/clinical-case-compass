
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
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  FileText, 
  Stethoscope, 
  Activity, 
  TestTube, 
  Scan,
  User,
  Heart,
  Brain
} from "lucide-react";

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
    <div className="space-y-8 py-2">
      {/* Section 1: Patient History & Initial Assessment */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 mb-4">
          <div className="h-8 w-8 rounded-full bg-medical-100 flex items-center justify-center">
            <User className="h-4 w-4 text-medical-600" />
          </div>
          <h3 className="text-lg font-semibold text-medical-800">Patient History & Initial Assessment</h3>
        </div>

        <Card className="border-medical-200 shadow-sm">
          <CardHeader className="pb-4 bg-gradient-to-r from-medical-50 to-blue-50">
            <CardTitle className="flex items-center space-x-2 text-medical-800">
              <FileText className="h-5 w-5" />
              <span>History of Present Illness</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <FormField
              control={control}
              name="patientHistory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-medical-700">Clinical History</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the patient's current illness, timeline of symptoms, associated factors, and relevant medical history. Include onset, duration, character, radiation, alleviating/aggravating factors..."
                      className="min-h-[140px] border-medical-200 focus:ring-medical-500 focus:border-medical-500"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-medical-600">
                    Provide a detailed chronological account of the patient's current condition and relevant background.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
      </div>

      <Separator className="my-6" />

      {/* Section 2: System Review & Physical Assessment */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 mb-4">
          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
            <Brain className="h-4 w-4 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-blue-800">System Review & Physical Assessment</h3>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <SystemReviewChecklist onSystemSymptomsChange={handleSystemSymptomsChange} />
          </div>
          
          <Card className="border-blue-200 shadow-sm">
            <CardHeader className="pb-4 bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="flex items-center space-x-2 text-blue-800">
                <Stethoscope className="h-5 w-5" />
                <span>Body Systems & Affected Areas</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <InteractiveBodyDiagram
                onBodyPartSelected={handleBodyPartSelected}
                highlightedSystems={currentSelectedBodyParts}
              />
              <div className="mt-3 flex items-center justify-between">
                <FormDescription className="text-blue-600">
                  Click on body parts to mark affected areas
                </FormDescription>
                {currentSelectedBodyParts.length > 0 && (
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {currentSelectedBodyParts.length} selected
                  </Badge>
                )}
              </div>
              {currentSelectedBodyParts.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {currentSelectedBodyParts.map((part: string) => (
                    <Badge key={part} variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                      {part}
                    </Badge>
                  ))}
                </div>
              )}
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

        {/* Physical Examination */}
        <Card className="border-blue-200 shadow-sm">
          <CardHeader className="pb-4 bg-gradient-to-r from-blue-50 to-purple-50">
            <CardTitle className="flex items-center space-x-2 text-blue-800">
              <Stethoscope className="h-5 w-5" />
              <span>Physical Examination Findings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <FormField
              control={control}
              name="physicalExam"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-700">Examination Results</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Document comprehensive physical examination findings including:
• General appearance and mental status
• Vital signs interpretation
• Head, eyes, ears, nose, throat (HEENT)
• Cardiovascular examination
• Respiratory examination
• Abdominal examination
• Neurological assessment
• Musculoskeletal examination
• Skin and extremities"
                      className="min-h-[140px] border-blue-200 focus:ring-blue-500 focus:border-blue-500"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-blue-600">
                    Record objective findings from systematic physical examination of all relevant body systems.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
      </div>

      <Separator className="my-6" />

      {/* Section 3: Vital Signs & Measurements */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 mb-4">
          <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
            <Heart className="h-4 w-4 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-green-800">Vital Signs & Physiological Measurements</h3>
        </div>

        <VitalsCard onVitalsChange={handleVitalsChange} />
      </div>

      <Separator className="my-6" />

      {/* Section 4: Diagnostic Studies */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 mb-4">
          <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
            <TestTube className="h-4 w-4 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-purple-800">Laboratory & Imaging Studies</h3>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-2">
              <TestTube className="h-4 w-4 text-purple-600" />
              <h4 className="font-medium text-purple-700">Laboratory Results</h4>
            </div>
            <LabResultsCard onLabResultsChange={handleLabResultsChange} />
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-2">
              <Scan className="h-4 w-4 text-purple-600" />
              <h4 className="font-medium text-purple-700">Imaging Studies</h4>
            </div>
            <RadiologyCard onRadiologyChange={handleRadiologyChange} />
          </div>
        </div>
      </div>

      <Separator className="my-6" />

      {/* Section 5: Clinical Analysis & Notes */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 mb-4">
          <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
            <Activity className="h-4 w-4 text-amber-600" />
          </div>
          <h3 className="text-lg font-semibold text-amber-800">Clinical Analysis & Interpretation</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-amber-200 shadow-sm">
            <CardHeader className="pb-3 bg-gradient-to-r from-amber-50 to-orange-50">
              <CardTitle className="text-sm font-medium text-amber-800">System Analysis</CardTitle>
            </CardHeader>
            <CardContent className="pt-3 space-y-4">
              <FormField
                control={control}
                name="relatedSystemsNotes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-medium text-amber-700">Related Systems & Differential Considerations</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Analyze related physiological systems, initial diagnostic impressions, and differential diagnosis considerations..."
                        className="min-h-[80px] text-sm border-amber-200 focus:ring-amber-500"
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
                    <FormLabel className="text-xs font-medium text-amber-700">Vital Signs Interpretation</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Interpret vital signs, note trends, and identify abnormal findings or patterns..."
                        className="min-h-[80px] text-sm border-amber-200 focus:ring-amber-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card className="border-amber-200 shadow-sm">
            <CardHeader className="pb-3 bg-gradient-to-r from-amber-50 to-yellow-50">
              <CardTitle className="text-sm font-medium text-amber-800">Diagnostic Interpretation</CardTitle>
            </CardHeader>
            <CardContent className="pt-3 space-y-4">
              <FormField
                control={control}
                name="labResultsNotes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-medium text-amber-700">Laboratory Analysis</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Interpret laboratory results, highlight significant findings, and note correlations with clinical presentation..."
                        className="min-h-[80px] text-sm border-amber-200 focus:ring-amber-500"
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
                    <FormLabel className="text-xs font-medium text-amber-700">Imaging Interpretation</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Interpret imaging results, describe key findings, and correlate with clinical symptoms..."
                        className="min-h-[80px] text-sm border-amber-200 focus:ring-amber-500"
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
      </div>
    </div>
  );
};

export default ClinicalDetailStep;
