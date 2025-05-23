import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { v4 as uuidv4 } from "uuid";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { MedicalCase, Patient, CaseTag, Diagnosis, SPECIALTIES } from "@/types/case";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PageHeader } from "@/components/ui/page-header";
import { 
  ChevronLeft, 
  FileText, 
  Clipboard, 
  UserCircle, 
  Stethoscope,
  ArrowRight,
  ArrowLeft,
  CheckCheck,
  HelpCircle
} from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getAllTags } from "@/data/mock-data";
import { FormProgressIndicator } from "@/components/cases/FormProgressIndicator";
import { AutosaveIndicator } from "@/components/cases/AutosaveIndicator";
import { SymptomChecklist } from "@/components/cases/SymptomChecklist";
import { LabResultsCard, LabTest } from "@/components/cases/LabResultsCard";
import { RadiologyCard, RadiologyExam } from "@/components/cases/RadiologyCard";
import { InteractiveBodyDiagram } from "@/components/cases/InteractiveBodyDiagram";
import { InteractiveVitalsCard } from "@/components/cases/InteractiveVitalsCard";

const formSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  patientName: z.string().min(2, { message: "Patient name is required" }),
  patientAge: z.string().min(1, { message: "Age is required" }),
  patientGender: z.string().min(1, { message: "Gender is required" }),
  patientMRN: z.string().optional(),
  chiefComplaint: z.string().min(3, { message: "Chief complaint is required" }),
  chiefComplaintAnalysis: z.string().optional(),
  tags: z.string().min(1, { message: "Please select at least one specialty" }),
  history: z.string().optional(),
  physicalExam: z.string().optional(),
  learningPoints: z.string().optional(),
  systemSymptoms: z.record(z.string(), z.array(z.string())).optional(),
  vitals: z.record(z.string(), z.string()).optional(),
  labResults: z.array(z.object({
    id: z.string(),
    name: z.string(),
    value: z.string(),
    unit: z.string()
  })).optional(),
  radiologyExams: z.array(z.object({
    id: z.string(),
    modality: z.string(),
    findings: z.string()
  })).optional(),
});

type FormValues = z.infer<typeof formSchema>;

const CaseNew = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("case-info");
  const [systemSymptoms, setSystemSymptoms] = useState<Record<string, string[]>>({});
  const [highlightedSymptoms, setHighlightedSymptoms] = useState<Record<string, string[]>>({});
  const [vitals, setVitals] = useState<Record<string, string>>({});
  const [labResults, setLabResults] = useState<LabTest[]>([]);
  const [radiologyExams, setRadiologyExams] = useState<RadiologyExam[]>([]);
  const [saveStatus, setSaveStatus] = useState<"saving" | "saved" | "idle">("idle");
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const isMobile = useIsMobile();
  const [storedCases, setStoredCases] = useLocalStorage<MedicalCase[]>("medical-cases", []);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      patientName: "",
      patientAge: "",
      patientGender: "",
      patientMRN: "",
      chiefComplaint: "",
      chiefComplaintAnalysis: "",
      tags: "",
      history: "",
      physicalExam: "",
      learningPoints: "",
      systemSymptoms: {},
      vitals: {},
      labResults: [],
      radiologyExams: [],
    },
  });

  // Autosave functionality
  useEffect(() => {
    const subscription = form.watch(() => {
      setSaveStatus("saving");
      const saveTimer = setTimeout(() => {
        // Simulate saving to server
        localStorage.setItem("caseFormDraft", JSON.stringify({
          formData: form.getValues(),
          systemSymptoms,
          vitals,
          labResults,
          radiologyExams
        }));
        setSaveStatus("saved");
        setLastSaved(new Date());
        
        // Reset status after some time
        const resetTimer = setTimeout(() => {
          setSaveStatus("idle");
        }, 3000);
        
        return () => clearTimeout(resetTimer);
      }, 1000);
      
      return () => subscription.unsubscribe();
    });
    
    return () => subscription.unsubscribe();
  }, [form, systemSymptoms, vitals, labResults, radiologyExams]);

  // Load draft data if available
  useEffect(() => {
    const savedDraft = localStorage.getItem("caseFormDraft");
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft);
        form.reset(draft.formData);
        if (draft.systemSymptoms) setSystemSymptoms(draft.systemSymptoms);
        if (draft.vitals) setVitals(draft.vitals);
        if (draft.labResults) setLabResults(draft.labResults);
        if (draft.radiologyExams) setRadiologyExams(draft.radiologyExams);
        setLastSaved(new Date());
      } catch (e) {
        console.error("Error loading draft:", e);
      }
    }
  }, [form]);

  const handleSubmit = async (values: FormValues) => {
    // Include system symptoms and vitals in the form data
    values.systemSymptoms = systemSymptoms;
    values.vitals = vitals;
    values.labResults = labResults;
    values.radiologyExams = radiologyExams;
    
    setIsSubmitting(true);
    try {
      // Create a new medical case object
      const newCase: MedicalCase = {
        id: uuidv4(),
        title: values.title,
        patient: {
          id: uuidv4(),
          name: values.patientName,
          age: parseInt(values.patientAge),
          gender: values.patientGender as "male" | "female" | "other",
          medicalRecordNumber: values.patientMRN
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        chiefComplaint: values.chiefComplaint,
        chiefComplaintAnalysis: values.chiefComplaintAnalysis || undefined,
        history: values.history || undefined,
        physicalExam: values.physicalExam || undefined,
        diagnoses: [],
        tags: [getAllTags().find(tag => tag.id === values.tags) || { id: values.tags, name: values.tags, color: "#4F46E5" }],
        resources: [],
        learningPoints: values.learningPoints || undefined
      };
      
      // Add the new case to the stored cases
      const updatedCases = [...storedCases, newCase];
      setStoredCases(updatedCases);
      
      // Clear the draft after successful submission
      localStorage.removeItem("caseFormDraft");
      
      toast.success("Case created successfully!");
      navigate("/cases");
    } catch (error) {
      console.error("Error creating case:", error);
      toast.error("Failed to create case. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const goToNextTab = () => {
    if (activeTab === "case-info") setActiveTab("patient-info");
    else if (activeTab === "patient-info") setActiveTab("clinical-details");
    else if (activeTab === "clinical-details") setActiveTab("learning");
  };

  const goToPreviousTab = () => {
    if (activeTab === "learning") setActiveTab("clinical-details");
    else if (activeTab === "clinical-details") setActiveTab("patient-info");
    else if (activeTab === "patient-info") setActiveTab("case-info");
  };

  const getStepNumber = () => {
    switch (activeTab) {
      case "case-info": return 1;
      case "patient-info": return 2;
      case "clinical-details": return 3;
      case "learning": return 4;
      default: return 1;
    }
  };

  const handleBodyPartSelected = (selection: { relatedSystems: string[], relatedSymptoms: Record<string, string[]> }) => {
    // Highlight symptoms related to the selected body part
    setHighlightedSymptoms(selection.relatedSymptoms);
  };

  const handleSymptomChange = (selections: Record<string, string[]>) => {
    setSystemSymptoms(selections);
  };

  const handleVitalsChange = (vitalSigns: Record<string, string>) => {
    setVitals(vitalSigns);
  };

  const handleLabResultsChange = (results: LabTest[]) => {
    setLabResults(results);
  };

  const handleRadiologyExamsChange = (exams: RadiologyExam[]) => {
    setRadiologyExams(exams);
  };

  // Define steps for the progress indicator
  const formSteps = [
    { id: "case-info", label: "Case Info", icon: <FileText className="h-4 w-4" /> },
    { id: "patient-info", label: "Patient", icon: <UserCircle className="h-4 w-4" /> },
    { id: "clinical-details", label: "Clinical", icon: <Stethoscope className="h-4 w-4" /> },
    { id: "learning", label: "Learning", icon: <Clipboard className="h-4 w-4" /> },
  ];

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="flex items-center justify-between mb-6">
        <Button
          onClick={() => navigate("/cases")}
          variant="ghost"
          className="flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to all cases
        </Button>
        
        <AutosaveIndicator 
          status={saveStatus}
          lastSaved={lastSaved}
          className="mr-2"
        />
      </div>

      <PageHeader 
        title="New Clinical Case" 
        description="Document a new clinical case for learning and reference"
      />

      {/* Overview Card - Always visible fields */}
      <Card className="border-medical-200 shadow-md mb-6 mt-6 bg-medical-50/30">
        <CardContent className="pt-6">
          <Form {...form}>
            <form className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md font-medium flex items-center">
                      Case Title
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 ml-1">
                              <HelpCircle className="h-3 w-3" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>A descriptive title for this clinical case</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g., Acute Appendicitis in a 25-Year-Old Male" 
                        {...field}
                        className="border-medical-200 focus-visible:ring-medical-500" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="chiefComplaint"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-md font-medium">Chief Complaint</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g., Severe abdominal pain" 
                          {...field} 
                          className="border-medical-200 focus-visible:ring-medical-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-md font-medium">Clinical Specialty</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="border-medical-200 focus-visible:ring-medical-500">
                            <SelectValue placeholder="Select a specialty" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {SPECIALTIES.map((specialty) => (
                            <SelectItem key={specialty.id} value={specialty.id}>
                              {specialty.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Progress indicator */}
      <div className="mb-6 sticky top-0 z-10 bg-background pt-2 pb-2">
        <FormProgressIndicator
          currentStep={getStepNumber()}
          totalSteps={formSteps.length}
          steps={formSteps}
          onStepClick={handleTabChange}
          className="bg-white p-4 rounded-lg shadow-sm border border-medical-100"
        />
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <Card className="border-medical-200 shadow-md">
            <Tabs 
              value={activeTab} 
              onValueChange={handleTabChange} 
              className="w-full"
            >
              <div className="bg-gradient-to-r from-medical-50 to-medical-100 p-4 rounded-t-lg">
                <TabsList className={`grid w-full ${isMobile ? 'grid-cols-2' : 'grid-cols-4'}`}>
                  <TabsTrigger value="case-info" className="data-[state=active]:bg-white">
                    <FileText className="h-4 w-4 mr-2" />
                    <span className={isMobile ? "text-xs" : "hidden sm:inline"}>Case Info</span>
                  </TabsTrigger>
                  <TabsTrigger value="patient-info" className="data-[state=active]:bg-white">
                    <UserCircle className="h-4 w-4 mr-2" />
                    <span className={isMobile ? "text-xs" : "hidden sm:inline"}>Patient</span>
                  </TabsTrigger>
                  {isMobile && <div className="col-span-2 h-2" />} {/* Spacer for mobile grid */}
                  <TabsTrigger value="clinical-details" className="data-[state=active]:bg-white">
                    <Stethoscope className="h-4 w-4 mr-2" />
                    <span className={isMobile ? "text-xs" : "hidden sm:inline"}>Clinical</span>
                  </TabsTrigger>
                  <TabsTrigger value="learning" className="data-[state=active]:bg-white">
                    <Clipboard className="h-4 w-4 mr-2" />
                    <span className={isMobile ? "text-xs" : "hidden sm:inline"}>Learning</span>
                  </TabsTrigger>
                </TabsList>
              </div>
              
              {/* Case Information Tab */}
              <TabsContent value="case-info" className="p-0 m-0">
                <CardContent className="space-y-6 pt-6">
                  <FormField
                    control={form.control}
                    name="chiefComplaintAnalysis"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-md font-medium flex items-center">
                          Chief Complaint Analysis
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0 ml-1">
                                  <HelpCircle className="h-3 w-3" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Analyze the chief complaint - consider differential diagnoses, severity, duration, etc.</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Analyze the presenting chief complaint..."
                            className="min-h-[120px] resize-none border-medical-200 focus-visible:ring-medical-500"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Consider differential diagnoses, potential severity, duration, and other relevant factors
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter className="flex justify-end pb-6">
                  <Button 
                    type="button" 
                    onClick={goToNextTab}
                    className="bg-medical-600 hover:bg-medical-700 text-white"
                  >
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </TabsContent>
              
              {/* Patient Information Tab */}
              <TabsContent value="patient-info" className="p-0 m-0">
                <CardContent className="space-y-6 pt-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="patientName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-md font-medium">Patient Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Patient name" 
                              {...field} 
                              className="border-medical-200 focus-visible:ring-medical-500"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="patientMRN"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-md font-medium">Medical Record Number (Optional)</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="MRN" 
                              {...field} 
                              className="border-medical-200 focus-visible:ring-medical-500"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="patientAge"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-md font-medium">Age</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="Age" 
                              {...field} 
                              className="border-medical-200 focus-visible:ring-medical-500"
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
                        <FormItem>
                          <FormLabel className="text-md font-medium">Gender</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="border-medical-200 focus-visible:ring-medical-500">
                                <SelectValue placeholder="Select gender" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pb-6">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={goToPreviousTab}
                    className="border-medical-300 hover:bg-medical-50"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                  </Button>
                  <Button 
                    type="button" 
                    onClick={goToNextTab}
                    className="bg-medical-600 hover:bg-medical-700 text-white"
                  >
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </TabsContent>
              
              {/* Clinical Details Tab */}
              <TabsContent value="clinical-details" className="p-0 m-0">
                <CardContent className="space-y-6 pt-6">
                  <FormField
                    control={form.control}
                    name="history"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-md font-medium">History</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe the patient's history..."
                            className="min-h-[120px] resize-none border-medical-200 focus-visible:ring-medical-500"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InteractiveBodyDiagram 
                      onBodyPartSelected={handleBodyPartSelected}
                      className="bg-white p-4 rounded-lg"
                    />
                
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 mb-3">
                        <CheckCheck className="h-5 w-5 text-medical-600" />
                        <h3 className="font-medium">System Review</h3>
                      </div>
                      <SymptomChecklist 
                        onSelectionChange={handleSymptomChange} 
                        initialSelections={systemSymptoms}
                        highlightedSymptoms={highlightedSymptoms}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField
                      control={form.control}
                      name="physicalExam"
                      render={({ field }) => (
                        <FormItem className="md:col-span-1">
                          <FormLabel className="text-md font-medium">Physical Examination</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Document physical exam findings..."
                              className="min-h-[240px] resize-none border-medical-200 focus-visible:ring-medical-500"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="md:col-span-2 space-y-4">
                      <InteractiveVitalsCard 
                        onVitalsChange={handleVitalsChange}
                        initialVitals={vitals}
                        patientAge={form.watch("patientAge") ? parseInt(form.watch("patientAge")) : undefined}
                      />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <LabResultsCard 
                          onLabResultsChange={handleLabResultsChange}
                          initialResults={labResults}
                        />
                        <RadiologyCard 
                          onRadiologyChange={handleRadiologyExamsChange}
                          initialResults={radiologyExams}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pb-6">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={goToPreviousTab}
                    className="border-medical-300 hover:bg-medical-50"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                  </Button>
                  <Button 
                    type="button" 
                    onClick={goToNextTab}
                    className="bg-medical-600 hover:bg-medical-700 text-white"
                  >
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </TabsContent>
              
              {/* Learning Tab */}
              <TabsContent value="learning" className="p-0 m-0">
                <CardContent className="pt-6">
                  <FormField
                    control={form.control}
                    name="learningPoints"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-md font-medium">Learning Points</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Document key learning points from this case..."
                            className="min-h-[120px] resize-none border-medical-200 focus-visible:ring-medical-500"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Include important insights, literature references, or best practices
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter className="flex justify-between pb-6">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={goToPreviousTab}
                    className="border-medical-300 hover:bg-medical-50"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                  </Button>
                  <Button 
                    type="button" 
                    onClick={goToNextTab}
                    className="bg-medical-600 hover:bg-medical-700 text-white"
                  >
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </TabsContent>
            </Tabs>
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default CaseNew;
