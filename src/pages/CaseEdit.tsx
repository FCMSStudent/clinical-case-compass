
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PageHeader } from "@/components/ui/page-header";
import { ChevronLeft, Save, HeartPulse, TestTube, Scan } from "lucide-react";
import { toast } from "sonner";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { InteractiveVitalsCard } from "@/features/cases/InteractiveVitalsCard";
import { UrinaryReviewCard } from "@/features/cases/UrinaryReviewCard";
import { SystemReviewChecklist } from "@/features/cases/SystemReviewChecklist";
import { LabResultsCard } from "@/features/cases/LabResultsCard";
import { RadiologyCard } from "@/features/cases/RadiologyCard";
import { getCaseById } from "@/data/mock-data";
import {
  MedicalCase,
  Patient,
  Diagnosis,
  CaseTag,
  Resource,
  RadiologyStudy,
  LabTest,
} from "@/types/case";
import { ErrorSummary } from "@/components/ui/ErrorSummary";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EnhancedAppLayout } from "@/features/navigation";

// Define the form schema
const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  patientName: z.string().min(1, { message: "Patient name is required" }),
  patientAge: z.coerce.number().min(0).max(120),
  patientGender: z.enum(["male", "female", "other"]),
  patientMRN: z.string().optional(),
  chiefComplaint: z.string().min(1, { message: "Chief complaint is required" }),
  history: z.string().optional(),
  physicalExam: z.string().optional(),
  learningPoints: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const CaseEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [storedCases, setStoredCases] = useLocalStorage<MedicalCase[]>(
    "medical-cases",
    [],
  );
  const [medicalCase, setMedicalCase] = useState<MedicalCase | undefined>(
    undefined,
  );

  // State for specialized inputs
  const [vitals, setVitals] = useState<Record<string, string>>({});
  const [urinarySymptoms, setUrinarySymptoms] = useState<string[]>([]);
  const [symptoms, setSymptoms] = useState<Record<string, boolean>>({});
  const [systemSymptoms, setSystemSymptoms] = useState<
    Record<string, string[]>
  >({});
  const [labResults, setLabResults] = useState<LabTest[]>([]);
  const [radiologyStudies, setRadiologyStudies] = useState<RadiologyStudy[]>(
    [],
  );

  // Set up form with existing case data
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      patientName: "",
      patientAge: 0,
      patientGender: "male" as const,
      patientMRN: "",
      chiefComplaint: "",
      history: "",
      physicalExam: "",
      learningPoints: "",
    },
    mode: "onChange", // Enable real-time validation
  });

  // Load case data
  useEffect(() => {
    if (!id) {
      navigate("/cases");
      return;
    }

    // First check localStorage
    let foundCase = storedCases?.find((c) => c.id === id);

    // If not found in localStorage, check mock data
    if (!foundCase) {
      foundCase = getCaseById(id);
    }

    // Case not found in either source
    if (!foundCase) {
      toast.error("Case not found");
      navigate("/cases");
      return;
    }

    setMedicalCase(foundCase);

    // Populate form with case data
    form.reset({
      title: foundCase.title || "",
      patientName: foundCase.patient.name || "",
      patientAge: foundCase.patient.age || 0,
      patientGender: foundCase.patient.gender || "male",
      patientMRN: foundCase.patient.medicalRecordNumber || "",
      chiefComplaint: foundCase.chiefComplaint || "",
      history: foundCase.history || "",
      physicalExam: foundCase.physicalExam || "",
      learningPoints: foundCase.learningPoints || "",
    });

    // Load specialized inputs if they exist
    if (foundCase.vitals) {
      setVitals(foundCase.vitals);
    }

    if (foundCase.urinarySymptoms) {
      setUrinarySymptoms(foundCase.urinarySymptoms);
    }

    if (foundCase.symptoms) {
      setSymptoms(foundCase.symptoms);
    }

    if (foundCase.systemSymptoms) {
      setSystemSymptoms(foundCase.systemSymptoms);
    }

    if (foundCase.labTests) {
      setLabResults(foundCase.labTests);
    }

    if (foundCase.radiologyStudies) {
      setRadiologyStudies(foundCase.radiologyStudies);
    }
  }, [id, storedCases, navigate, form]);

  const onSubmit = (values: FormValues) => {
    if (!medicalCase) return;

    setIsSaving(true);

    try {
      // Create updated case object
      const updatedCase: MedicalCase = {
        ...medicalCase,
        title: values.title,
        updatedAt: new Date().toISOString(),
        chiefComplaint: values.chiefComplaint,
        history: values.history || undefined,
        physicalExam: values.physicalExam || undefined,
        learningPoints: values.learningPoints || undefined,
        patient: {
          ...medicalCase.patient,
          name: values.patientName,
          age: values.patientAge,
          gender: values.patientGender,
          medicalRecordNumber: values.patientMRN || undefined,
        },
        vitals: vitals,
        urinarySymptoms: urinarySymptoms,
        symptoms: symptoms,
        labTests: labResults,
        radiologyStudies: radiologyStudies,
      };

      // Update case in localStorage
      const updatedCases = storedCases
        ? storedCases.map((c) => (c.id === id ? updatedCase : c))
        : [updatedCase];

      setStoredCases(updatedCases);

      toast.success("Case updated successfully");
      navigate(`/cases/${id}`);
    } catch (error) {
      console.error("Error updating case:", error);
      toast.error("Failed to update case");
    } finally {
      setIsSaving(false);
    }
  };

  // Convert boolean record format to system-based string arrays
  const handleSymptomSelectionChange = (
    selections: Record<string, string[]>,
  ) => {
    setSystemSymptoms(selections);

    // Also update the old format for backward compatibility
    const booleanFormat: Record<string, boolean> = {};
    Object.entries(selections).forEach(([system, symptoms]) => {
      symptoms.forEach((symptom) => {
        booleanFormat[`${system}-${symptom}`] = true;
      });
    });
    setSymptoms(booleanFormat);
  };

  return (
    <EnhancedAppLayout>
      <div className="w-full max-w-6xl mx-auto space-y-6">
        <div className="mb-6">
          <Link
            to={`/cases/${id}`}
            className="inline-flex items-center text-sm text-white/70 hover:text-white"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to case
          </Link>
        </div>

        <PageHeader
          title="Edit Case"
          description="Update an existing medical case"
          className="text-white"
        />

        {/* Error Summary */}
        {form.formState.isSubmitted &&
          !form.formState.isValid &&
          Object.keys(form.formState.errors).length > 0 && (
            <ErrorSummary
              errors={form.formState.errors}
              setFocus={form.setFocus as (name: string) => void}
              formId="case-edit-form"
            />
          )}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            id="case-edit-form"
            className="space-y-8"
          >
            {/* Basic Information Section */}
            <Card className="bg-white/10 border-white/20 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-white">
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Case Title</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="chiefComplaint"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">
                          Chief Complaint
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="patientName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">
                          Patient Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="patientAge"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Age</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="number"
                              min={0}
                              max={120}
                              className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="patientGender"
                      render={({ field }) => (
                        <FormItem className="col-span-2">
                          <FormLabel className="text-white">Gender</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                                <SelectValue placeholder="Select gender" />
                              </SelectTrigger>
                              <SelectContent className="bg-white/10 backdrop-blur-md border border-white/20">
                                <SelectItem
                                  value="male"
                                  className="text-white hover:bg-white/20"
                                >
                                  Male
                                </SelectItem>
                                <SelectItem
                                  value="female"
                                  className="text-white hover:bg-white/20"
                                >
                                  Female
                                </SelectItem>
                                <SelectItem
                                  value="other"
                                  className="text-white hover:bg-white/20"
                                >
                                  Other
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="patientMRN"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">
                          Medical Record Number (Optional)
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                          />
                        </FormControl>
                        <FormDescription className="text-white/70">
                          If applicable
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Vital Signs Section */}
            <Card className="bg-white/10 border-white/20 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-white flex items-center">
                  <HeartPulse className="mr-2 h-6 w-6" />
                  Vital Signs & Symptoms
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <InteractiveVitalsCard
                    onVitalsChange={setVitals}
                    initialVitals={vitals}
                    patientAge={form.watch("patientAge")}
                  />
                  <UrinaryReviewCard
                    onSelectionChange={setUrinarySymptoms}
                    initialSelections={urinarySymptoms}
                  />
                  <div className="bg-white/10 border-white/20 backdrop-blur-xl rounded-xl p-4">
                    <h3 className="font-medium text-sm mb-2 text-white">
                      Other Symptoms
                    </h3>
                    <SystemReviewChecklist
                      onSystemSymptomsChange={handleSymptomSelectionChange}
                      initialSystemSymptoms={systemSymptoms}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* History & Physical Exam Section */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="bg-white/10 border-white/20 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-white">History</CardTitle>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="history"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            placeholder="Relevant medical history"
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/60 min-h-32"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card className="bg-white/10 border-white/20 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-white">Physical Examination</CardTitle>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="physicalExam"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            placeholder="Physical examination findings"
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/60 min-h-32"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Lab Results & Radiology Section */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="bg-white/10 border-white/20 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-white flex items-center">
                    <TestTube className="mr-2 h-6 w-6" />
                    Laboratory Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <LabResultsCard
                    onLabResultsChange={setLabResults}
                    initialResults={labResults}
                  />
                </CardContent>
              </Card>

              <Card className="bg-white/10 border-white/20 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-white flex items-center">
                    <Scan className="mr-2 h-6 w-6" />
                    Radiology Exams
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadiologyCard
                    onRadiologyChange={setRadiologyStudies}
                    initialStudies={radiologyStudies}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Learning Points Section */}
            <Card className="bg-white/10 border-white/20 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-white">Learning Points</CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="learningPoints"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Key learning points for this case"
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/60 min-h-32"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isSaving}
                className="bg-white/10 border border-white/20 text-white hover:bg-white/20"
              >
                <Save className="mr-2 h-4 w-4" />
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </EnhancedAppLayout>
  );
};

export default CaseEdit;
