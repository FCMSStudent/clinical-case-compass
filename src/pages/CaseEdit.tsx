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
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 dark:from-blue-900 dark:via-blue-800 dark:to-blue-900">
      {/* Glassy background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/3 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto space-y-6 p-4 md:p-6">
        <div className="mb-4">
          <Link
            to={`/cases/${id}`}
            className="inline-flex items-center text-sm text-white/70 hover:text-white transition-colors"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to case
          </Link>
        </div>

        <PageHeader
          title="Edit Case"
          description="Update an existing medical case"
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
            <div className="relative">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl"></div>
              <div className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6">
                <h3 className="text-lg font-semibold text-white mb-6">
                  Basic Information
                </h3>
                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Case Title</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"></div>
                            <Input
                              {...field}
                              className="relative bg-transparent border-0 text-white placeholder:text-white/60 focus-visible:ring-0 focus-visible:ring-offset-0"
                            />
                          </div>
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
                          <div className="relative">
                            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"></div>
                            <Input
                              {...field}
                              className="relative bg-transparent border-0 text-white placeholder:text-white/60 focus-visible:ring-0 focus-visible:ring-offset-0"
                            />
                          </div>
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
                          <div className="relative">
                            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"></div>
                            <Input
                              {...field}
                              className="relative bg-transparent border-0 text-white placeholder:text-white/60 focus-visible:ring-0 focus-visible:ring-offset-0"
                            />
                          </div>
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
                            <div className="relative">
                              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"></div>
                              <Input
                                {...field}
                                type="number"
                                min={0}
                                max={120}
                                className="relative bg-transparent border-0 text-white placeholder:text-white/60 focus-visible:ring-0 focus-visible:ring-offset-0"
                              />
                            </div>
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
                              <SelectTrigger className="bg-white/10 backdrop-blur-sm border border-white/20 text-white">
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
                          <div className="relative">
                            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"></div>
                            <Input
                              {...field}
                              className="relative bg-transparent border-0 text-white placeholder:text-white/60 focus-visible:ring-0 focus-visible:ring-offset-0"
                            />
                          </div>
                        </FormControl>
                        <FormDescription className="text-white/70">
                          If applicable
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Vital Signs Section */}
            <div className="relative">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl"></div>
              <div className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6">
                <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
                  <HeartPulse className="mr-2 h-6 w-6" />
                  Vital Signs & Symptoms
                </h3>
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
                  <div className="relative">
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"></div>
                    <div className="relative bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-4">
                      <h3 className="font-medium text-sm mb-2 text-white">
                        Other Symptoms
                      </h3>
                      <SystemReviewChecklist
                        onSystemSymptomsChange={handleSymptomSelectionChange}
                        initialSystemSymptoms={systemSymptoms}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* History & Physical Exam Section */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="relative">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl"></div>
                <div className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6">
                  <FormField
                    control={form.control}
                    name="history"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">History</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"></div>
                            <Textarea
                              placeholder="Relevant medical history"
                              className="relative bg-transparent border-0 text-white placeholder:text-white/60 focus-visible:ring-0 focus-visible:ring-offset-0 min-h-32"
                              {...field}
                              value={field.value || ""}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl"></div>
                <div className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6">
                  <FormField
                    control={form.control}
                    name="physicalExam"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">
                          Physical Examination
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"></div>
                            <Textarea
                              placeholder="Physical examination findings"
                              className="relative bg-transparent border-0 text-white placeholder:text-white/60 focus-visible:ring-0 focus-visible:ring-offset-0 min-h-32"
                              {...field}
                              value={field.value || ""}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Lab Results & Radiology Section */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="relative">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl"></div>
                <div className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6">
                  <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
                    <TestTube className="mr-2 h-6 w-6" />
                    Laboratory Results
                  </h3>
                  <LabResultsCard
                    onLabResultsChange={setLabResults}
                    initialResults={labResults}
                  />
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl"></div>
                <div className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6">
                  <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
                    <Scan className="mr-2 h-6 w-6" />
                    Radiology Exams
                  </h3>
                  <RadiologyCard
                    onRadiologyChange={setRadiologyStudies}
                    initialStudies={radiologyStudies}
                  />
                </div>
              </div>
            </div>

            {/* Learning Points Section */}
            <div className="relative">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl"></div>
              <div className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6">
                <FormField
                  control={form.control}
                  name="learningPoints"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">
                        Learning Points
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"></div>
                          <Textarea
                            placeholder="Key learning points for this case"
                            className="relative bg-transparent border-0 text-white placeholder:text-white/60 focus-visible:ring-0 focus-visible:ring-offset-0 min-h-32"
                            {...field}
                            value={field.value || ""}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isSaving}
                className="bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 hover:bg-blue-500/30 text-white"
              >
                <Save className="mr-2 h-4 w-4" />
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CaseEdit;
