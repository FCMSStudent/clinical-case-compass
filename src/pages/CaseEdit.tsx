
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PageHeader } from "@/components/ui/page-header";
import { ChevronLeft, Save, HeartPulse, TestTube, Scan } from "lucide-react";
import { toast } from "sonner";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { InteractiveVitalsCard } from "@/features/cases/InteractiveVitalsCard";
import { SimpleLabs } from "@/features/cases/create/SimpleLabs";
import { SimpleImaging } from "@/features/cases/create/SimpleImaging";
import { getCaseById } from "@/data/mock-data";
import { MedicalCase } from "@/types/case";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSupabaseCases } from "@/hooks/use-supabase-cases";

// Define the form schema with optional fields to remove validation restrictions
const formSchema = z.object({
  title: z.string().optional(),
  patientName: z.string().optional(),
  patientAge: z.coerce.number().min(0).max(120).optional(),
  patientGender: z.enum(["male", "female", "other"]).optional(),
  patientMRN: z.string().optional(),
  chiefComplaint: z.string().optional(),
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

  // Use Supabase hook to fetch case data
  const { useGetCaseQuery } = useSupabaseCases();
  const { data: supabaseCase, isLoading, error } = useGetCaseQuery(id || "");
  
  // Determine which case to use (Supabase first, then localStorage, then mock data)
  const medicalCase = supabaseCase || 
    storedCases?.find(c => c.id === id) || 
    (id ? getCaseById(id) : undefined);

  // State for specialized inputs
  const [vitals, setVitals] = useState<Record<string, string>>({});
  const [labResults, setLabResults] = useState<any[]>([]);
  const [radiologyStudies, setRadiologyStudies] = useState<any[]>([]);

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
    mode: "onChange",
  });

  // Load case data when available
  useEffect(() => {
    if (!id) {
      navigate("/cases");
      return;
    }

    if (!medicalCase) {
      if (!isLoading && !error) {
        toast.error("Case not found");
        navigate("/cases");
      }
      return;
    }

    // Populate form with case data
    form.reset({
      title: medicalCase.title || "",
      patientName: medicalCase.patient.name || "",
      patientAge: medicalCase.patient.age || 0,
      patientGender: medicalCase.patient.gender || "male",
      patientMRN: medicalCase.patient.medicalRecordNumber || "",
      chiefComplaint: medicalCase.chiefComplaint || "",
      history: medicalCase.history || "",
      physicalExam: medicalCase.physicalExam || "",
      learningPoints: medicalCase.learningPoints || "",
    });

    // Load specialized inputs if they exist
    if (medicalCase.vitals) {
      setVitals(medicalCase.vitals);
    }

    if (medicalCase.labTests) {
      setLabResults(medicalCase.labTests);
    }

    if (medicalCase.radiologyStudies) {
      setRadiologyStudies(medicalCase.radiologyStudies);
    } else if (medicalCase.radiologyExams) {
      // Handle backward compatibility
      setRadiologyStudies(medicalCase.radiologyExams.map(exam => ({
        id: exam.id,
        type: exam.modality,
        findings: exam.findings,
        impression: ""
      })));
    }
  }, [medicalCase, id, navigate, form, isLoading, error]);

  const onSubmit = (values: FormValues) => {
    if (!medicalCase) return;

    setIsSaving(true);

    try {
      // Create updated case object
      const updatedCase: MedicalCase = {
        ...medicalCase,
        title: values.title || medicalCase.title,
        updatedAt: new Date().toISOString(),
        chiefComplaint: values.chiefComplaint || medicalCase.chiefComplaint,
        history: values.history || undefined,
        physicalExam: values.physicalExam || undefined,
        learningPoints: values.learningPoints || undefined,
        patient: {
          ...medicalCase.patient,
          name: values.patientName || medicalCase.patient.name,
          age: values.patientAge || medicalCase.patient.age,
          gender: values.patientGender || medicalCase.patient.gender,
          medicalRecordNumber: values.patientMRN || undefined,
        },
        vitals: vitals,
        labTests: labResults,
        radiologyStudies: radiologyStudies,
      };

      // Update case in localStorage if it exists there
      if (storedCases && storedCases.find(c => c.id === id)) {
        const updatedCases = storedCases.map((c) => (c.id === id ? updatedCase : c));
        setStoredCases(updatedCases);
      }

      toast.success("Case updated successfully");
      navigate(`/cases/${id}`);
    } catch (error) {
      console.error("Error updating case:", error);
      toast.error("Failed to update case");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <h2 className="text-2xl font-semibold mb-4 text-white">Loading case...</h2>
      </div>
    );
  }

  if (error || !medicalCase) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <h2 className="text-2xl font-semibold mb-4 text-white">Case not found</h2>
        <Button asChild className="bg-white/10 border border-white/20 text-white hover:bg-white/20">
          <Link to="/cases">Return to all cases</Link>
        </Button>
      </div>
    );
  }

  // Extract initial vitals from the medical case
  const initialVitals = medicalCase.vitals ? {
    temperature: medicalCase.vitals.temperature?.toString() || "37",
    heartRate: medicalCase.vitals.heartRate?.toString() || "80",
    systolicBP: medicalCase.vitals.systolicBP?.toString() || "120",
    diastolicBP: medicalCase.vitals.diastolicBP?.toString() || "80",
    respiratoryRate: medicalCase.vitals.respiratoryRate?.toString() || "16",
    oxygenSaturation: medicalCase.vitals.oxygenSaturation?.toString() || "98"
  } : undefined;

  return (
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
                            value={field.value}
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
                Vital Signs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <InteractiveVitalsCard
                onVitalsChange={setVitals}
                initialVitals={initialVitals}
                patientAge={form.watch("patientAge")}
              />
            </CardContent>
          </Card>

          {/* History Section */}
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
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Physical Examination Section */}
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
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Laboratory Results Section */}
          <Card className="bg-white/10 border-white/20 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-white flex items-center">
                <TestTube className="mr-2 h-6 w-6" />
                Laboratory Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SimpleLabs onLabChange={setLabResults} />
            </CardContent>
          </Card>

          {/* Radiology Studies Section */}
          <Card className="bg-white/10 border-white/20 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-white flex items-center">
                <Scan className="mr-2 h-6 w-6" />
                Radiology Studies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SimpleImaging onImagingChange={setRadiologyStudies} />
            </CardContent>
          </Card>

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
  );
};

export default CaseEdit;
