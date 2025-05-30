
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Stethoscope, 
  Activity, 
  TestTube, 
  Scan,
  User,
  Heart,
  Brain,
  ClipboardList,
  Microscope
} from "lucide-react";

// Updated Zod Schema Definition
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
  clinicalImpression: z.string().optional(),
  differentialDiagnosis: z.string().optional(),
});

export type ClinicalDetailFormData = z.infer<typeof clinicalDetailStepSchema>;

interface ClinicalDetailStepProps {
  control: Control<any>;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
}

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
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-medical-800">Clinical Assessment & Documentation</h2>
        <p className="text-medical-600">Comprehensive clinical evaluation and diagnostic workup</p>
      </div>

      <Tabs defaultValue="history" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="history" className="flex items-center space-x-2">
            <User className="h-4 w-4" />
            <span>History & Exam</span>
          </TabsTrigger>
          <TabsTrigger value="systems" className="flex items-center space-x-2">
            <Brain className="h-4 w-4" />
            <span>Systems Review</span>
          </TabsTrigger>
          <TabsTrigger value="diagnostics" className="flex items-center space-x-2">
            <TestTube className="h-4 w-4" />
            <span>Diagnostics</span>
          </TabsTrigger>
          <TabsTrigger value="assessment" className="flex items-center space-x-2">
            <ClipboardList className="h-4 w-4" />
            <span>Assessment</span>
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: History & Physical Examination */}
        <TabsContent value="history" className="space-y-6">
          <Card className="border-medical-200 shadow-sm">
            <CardHeader className="bg-gradient-to-r from-medical-50 to-blue-50">
              <CardTitle className="flex items-center space-x-2 text-medical-800">
                <FileText className="h-5 w-5" />
                <span>History of Present Illness</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <FormField
                control={control}
                name="patientHistory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-medical-700 text-base font-medium">Clinical History</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Document the patient's presenting complaint, timeline of symptoms, associated factors, and relevant medical history. Include:
• Onset and duration of symptoms
• Character and quality of symptoms
• Radiation and location
• Alleviating and aggravating factors
• Associated symptoms
• Previous similar episodes
• Relevant past medical history"
                        className="min-h-[160px] border-medical-200 focus:ring-medical-500 focus:border-medical-500 text-sm"
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

          <Card className="border-blue-200 shadow-sm">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
              <CardTitle className="flex items-center space-x-2 text-blue-800">
                <Stethoscope className="h-5 w-5" />
                <span>Physical Examination</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <FormField
                control={control}
                name="physicalExam"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-blue-700 text-base font-medium">Examination Findings</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Document systematic physical examination findings:

GENERAL APPEARANCE: Alert, oriented, appears comfortable/distressed
VITAL SIGNS: [Reference vitals section]
HEENT: Head, eyes, ears, nose, throat examination
CARDIOVASCULAR: Heart rate, rhythm, murmurs, peripheral pulses
RESPIRATORY: Breath sounds, respiratory effort, chest expansion
ABDOMINAL: Inspection, palpation, percussion, auscultation
NEUROLOGICAL: Mental status, cranial nerves, motor, sensory, reflexes
MUSCULOSKELETAL: Joint examination, range of motion, deformities
SKIN: Color, temperature, lesions, rashes"
                        className="min-h-[160px] border-blue-200 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-blue-600">
                      Record objective findings from systematic examination of all relevant body systems.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 2: Systems Review */}
        <TabsContent value="systems" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <Brain className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-blue-800">Review of Systems</h3>
              </div>
              <SystemReviewChecklist onSystemSymptomsChange={handleSystemSymptomsChange} />
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <User className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-blue-800">Affected Body Areas</h3>
              </div>
              <Card className="border-blue-200 shadow-sm">
                <CardHeader className="pb-4 bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="flex items-center justify-between">
                    <span className="text-blue-800 text-base">Body Systems Diagram</span>
                    {currentSelectedBodyParts.length > 0 && (
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {currentSelectedBodyParts.length} selected
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <InteractiveBodyDiagram
                    onBodyPartSelected={handleBodyPartSelected}
                    highlightedSystems={currentSelectedBodyParts}
                  />
                  <FormDescription className="text-blue-600 mt-3">
                    Click on body parts to mark affected areas
                  </FormDescription>
                  {currentSelectedBodyParts.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1">
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
          </div>

          {/* Vital Signs */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Heart className="h-5 w-5 text-green-600" />
              <h3 className="text-lg font-semibold text-green-800">Vital Signs & Physiological Parameters</h3>
            </div>
            <VitalsCard onVitalsChange={handleVitalsChange} />
          </div>
        </TabsContent>

        {/* Tab 3: Diagnostic Studies */}
        <TabsContent value="diagnostics" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Microscope className="h-5 w-5 text-purple-600" />
                <h3 className="text-lg font-semibold text-purple-800">Laboratory Studies</h3>
              </div>
              <LabResultsCard onLabResultsChange={handleLabResultsChange} />
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Scan className="h-5 w-5 text-purple-600" />
                <h3 className="text-lg font-semibold text-purple-800">Imaging Studies</h3>
              </div>
              <RadiologyCard onRadiologyChange={handleRadiologyChange} />
            </div>
          </div>
        </TabsContent>

        {/* Tab 4: Clinical Assessment */}
        <TabsContent value="assessment" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-amber-200 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50">
                <CardTitle className="flex items-center space-x-2 text-amber-800">
                  <Activity className="h-5 w-5" />
                  <span>Clinical Impression</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                <FormField
                  control={control}
                  name="clinicalImpression"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-amber-700 font-medium">Primary Clinical Impression</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Summarize your primary clinical impression based on history, examination, and initial findings. What is your leading diagnosis or working hypothesis?"
                          className="min-h-[100px] text-sm border-amber-200 focus:ring-amber-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="differentialDiagnosis"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-amber-700 font-medium">Differential Diagnosis</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="List and briefly discuss alternative diagnoses to consider:
1. Most likely alternative diagnosis
2. Less likely but important to rule out
3. Rare but serious conditions to consider

Include reasoning for each differential."
                          className="min-h-[120px] text-sm border-amber-200 focus:ring-amber-500"
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
              <CardHeader className="bg-gradient-to-r from-amber-50 to-yellow-50">
                <CardTitle className="flex items-center space-x-2 text-amber-800">
                  <ClipboardList className="h-5 w-5" />
                  <span>Clinical Notes & Analysis</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                <FormField
                  control={control}
                  name="vitalsNotes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-amber-700 font-medium">Vital Signs Analysis</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Interpret vital signs, identify abnormal patterns, and note clinical significance..."
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
                  name="labResultsNotes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-amber-700 font-medium">Laboratory Interpretation</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Analyze lab results, highlight significant findings, and correlate with clinical presentation..."
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
                      <FormLabel className="text-amber-700 font-medium">Imaging Analysis</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Interpret imaging findings, describe key abnormalities, and relate to clinical symptoms..."
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClinicalDetailStep;
