import { Control, UseFormSetValue, UseFormWatch, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2 } from "lucide-react";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { InteractiveBodyDiagram } from "@/components/body-diagram/InteractiveBodyDiagram";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Helper constant for System Review
const SYSTEM_SYMPTOMS = {
  cardiovascular: ["Chest pain", "Palpitations", "Dyspnea on exertion", "Orthopnea", "Peripheral edema", "Syncope"],
  respiratory: ["Cough", "Shortness of breath", "Wheezing", "Hemoptysis", "Pleuritic chest pain"],
  gastrointestinal: ["Nausea", "Vomiting", "Diarrhea", "Constipation", "Abdominal pain", "Hematemesis", "Melena", "Jaundice"],
  neurological: ["Headache", "Dizziness", "Seizures", "Weakness", "Numbness/Tingling", "Altered mental status", "Tremors"],
  musculoskeletal: ["Joint pain", "Muscle pain", "Swelling", "Limited range of motion", "Back pain"],
  urinary: ["Dysuria", "Frequency", "Urgency", "Hematuria", "Nocturia", "Incontinence"],
  // Add other systems as needed, e.g., skin, endocrine, etc.
};
type SystemName = keyof typeof SYSTEM_SYMPTOMS;


// 1. Zod Schema Definition
export const clinicalDetailStepSchema = z.object({
  selectedBodyParts: z.array(z.string()).optional().default([]),
  patientHistory: z.string().optional(),
  physicalExamination: z.string().optional(),
  vitalSigns: z.object({
    temperature: z.string().optional(), // e.g., "37.5 °C"
    heartRate: z.string().optional(), // e.g., "80 bpm"
    bloodPressure: z.string().optional(), // e.g., "120/80 mmHg"
    respiratoryRate: z.string().optional(), // e.g., "16 bpm"
    spo2: z.string().optional() // e.g., "98%"
  }).optional(),
  laboratoryResults: z.array(z.object({
    testName: z.string().min(1, "Test name is required."),
    value: z.string().min(1, "Value is required."),
    normalRange: z.string().optional()
  })).optional().default([]),
  radiologyExams: z.array(z.object({
    examType: z.string().min(1, "Exam type is required."),
    date: z.string().optional(), // Consider a more specific date validation if necessary
    findings: z.string().min(1, "Findings are required.")
  })).optional().default([]),
  systemReview: z.object({
    cardiovascular: z.array(z.string()).optional().default([]),
    respiratory: z.array(z.string()).optional().default([]),
    gastrointestinal: z.array(z.string()).optional().default([]),
    neurological: z.array(z.string()).optional().default([]),
    musculoskeletal: z.array(z.string()).optional().default([]),
    urinary: z.array(z.string()).optional().default([])
  }).optional(),
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

  const { fields: labFields, append: appendLab, remove: removeLab } = useFieldArray({
    control,
    name: "laboratoryResults",
  });

  const { fields: radioFields, append: appendRadio, remove: removeRadio } = useFieldArray({
    control,
    name: "radiologyExams",
  });

  return (
    <div className="space-y-6 py-2">
      {/* Patient History Card */}
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
                <FormLabel>Patient History</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., Past illnesses, surgeries, medications, allergies..."
                    className="min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Detailed medical history of the patient.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      {/* Vital Signs Card */}
      <Card>
        <CardHeader>
          <CardTitle>Vital Signs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <FormField
              control={control}
              name="vitalSigns.temperature"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Temperature</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 37.5" {...field} />
                  </FormControl>
                  <FormDescription>°C</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="vitalSigns.heartRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Heart Rate</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 80" {...field} />
                  </FormControl>
                  <FormDescription>bpm</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="vitalSigns.bloodPressure"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blood Pressure</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 120/80" {...field} />
                  </FormControl>
                  <FormDescription>mmHg</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="vitalSigns.respiratoryRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Respiratory Rate</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 16" {...field} />
                  </FormControl>
                  <FormDescription>bpm</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="vitalSigns.spo2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SpO₂</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 98" {...field} />
                  </FormControl>
                  <FormDescription>%</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>

      {/* Physical Examination Card */}
      <Card>
        <CardHeader>
          <CardTitle>Physical Examination</CardTitle>
        </CardHeader>
        <CardContent>
          <FormField
            control={control}
            name="physicalExamination"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Physical Examination Findings</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., General appearance, specific system examinations..."
                    className="min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Detailed findings from the physical examination.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      {/* Laboratory Results Card */}
      <Card>
        <CardHeader>
          <CardTitle>Laboratory Results</CardTitle>
          <FormDescription>Add relevant laboratory findings.</FormDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {labFields.map((item, index) => (
            <Card key={item.id} className="p-4 bg-muted/30 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <FormField
                  control={control}
                  name={`laboratoryResults.${index}.testName`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Test Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Hemoglobin" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`laboratoryResults.${index}.value`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Value</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 14.5" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`laboratoryResults.${index}.normalRange`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Normal Range (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 13.5-17.5 g/dL" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => removeLab(index)}
              >
                <Trash2 className="mr-2 h-4 w-4" /> Remove Lab Result
              </Button>
            </Card>
          ))}
          <FormField
            control={control}
            name="laboratoryResults"
            render={() => ( <FormItem><FormMessage /></FormItem>)}
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => appendLab({ testName: "", value: "", normalRange: "" })}
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Add Lab Result
          </Button>
        </CardContent>
      </Card>

      {/* Radiology Exams Card */}
      <Card>
        <CardHeader>
          <CardTitle>Radiology Exams</CardTitle>
          <FormDescription>Add relevant radiology exam findings.</FormDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {radioFields.map((item, index) => (
            <Card key={item.id} className="p-4 bg-muted/30 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <FormField
                  control={control}
                  name={`radiologyExams.${index}.examType`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Exam Type</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Chest X-Ray" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`radiologyExams.${index}.date`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date (Optional)</FormLabel>
                      <FormControl>
                        <Input type="date" placeholder="YYYY-MM-DD" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={control}
                name={`radiologyExams.${index}.findings`}
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Findings</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the findings..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => removeRadio(index)}
              >
                <Trash2 className="mr-2 h-4 w-4" /> Remove Radiology Exam
              </Button>
            </Card>
          ))}
          <FormField
            control={control}
            name="radiologyExams"
            render={() => ( <FormItem><FormMessage /></FormItem>)}
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => appendRadio({ examType: "", date: "", findings: "" })}
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Add Radiology Exam
          </Button>
        </CardContent>
      </Card>
      
      {/* Affected Body Parts Card - Kept from original */}
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

      {/* System Review Card */}
      <Card>
        <CardHeader>
          <CardTitle>System Review</CardTitle>
          <FormDescription>
            Select relevant symptoms for each physiological system.
          </FormDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="multiple" className="w-full">
            {Object.keys(SYSTEM_SYMPTOMS).map((systemKey) => {
              const systemName = systemKey as SystemName;
              const symptoms = SYSTEM_SYMPTOMS[systemName];
              const fieldName = `systemReview.${systemName}` as const;

              return (
                <AccordionItem value={systemName} key={systemName}>
                  <AccordionTrigger className="capitalize text-base">
                    {systemName.replace(/([A-Z])/g, ' $1')} System
                  </AccordionTrigger>
                  <AccordionContent>
                    <FormField
                      control={control}
                      name={fieldName}
                      render={({ field }) => (
                        <FormItem>
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-2">
                            {symptoms.map((symptom) => (
                              <FormField
                                key={symptom}
                                control={control}
                                name={fieldName}
                                render={({ field: currentField }) => {
                                  const currentValues = currentField.value || [];
                                  return (
                                    <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                                      <FormControl>
                                        <Checkbox
                                          checked={currentValues.includes(symptom)}
                                          onCheckedChange={(checked) => {
                                            const newValue = checked
                                              ? [...currentValues, symptom]
                                              : currentValues.filter((s) => s !== symptom);
                                            currentField.onChange(newValue);
                                          }}
                                          id={`symptom-${systemName}-${symptom.replace(/\s+/g, '-')}`}
                                        />
                                      </FormControl>
                                      <FormLabel htmlFor={`symptom-${systemName}-${symptom.replace(/\s+/g, '-')}`} className="font-normal text-sm">
                                        {symptom}
                                      </FormLabel>
                                    </FormItem>
                                  );
                                }}
                              />
                            ))}
                          </div>
                          <FormMessage className="mt-2" />
                        </FormItem>
                      )}
                    />
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

// 4. Export the component and schema
export default ClinicalDetailStep;
