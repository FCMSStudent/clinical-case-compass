import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { v4 as uuidv4 } from "uuid";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { MedicalCase, Patient, CaseTag, Diagnosis, SPECIALTIES, SaveStatus } from "@/types/case";
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
  HelpCircle,
  Save,
  AlertCircle
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
import {
  Alert,
  AlertDescription,
} from "@/components/ui/alert";
import { getAllTags } from "@/data/mock-data";
import { FormProgressIndicator } from "@/components/cases/FormProgressIndicator";
import { AutosaveIndicator } from "@/components/cases/AutosaveIndicator";
import { SymptomChecklist } from "@/components/cases/SymptomChecklist";
import { LabResultsCard, LabTest } from "@/components/cases/LabResultsCard";
import { RadiologyCard, RadiologyExam } from "@/components/cases/RadiologyCard";
import { InteractiveBodyDiagram } from "@/components/cases/InteractiveBodyDiagram";
import { VitalsCard } from "@/components/cases/VitalsCard";

// Enhanced form schema with better validation
const formSchema = z.object({
  title: z.string()
    .min(3, { message: "Title must be at least 3 characters" })
    .max(200, { message: "Title must be less than 200 characters" }),
  patientName: z.string()
    .min(2, { message: "Patient name is required" })
    .max(100, { message: "Patient name must be less than 100 characters" }),
  patientAge: z.string()
    .min(1, { message: "Age is required" })
    .refine((val) => {
      const age = parseInt(val);
      return age > 0 && age <= 150;
    }, { message: "Age must be between 1 and 150" }),
  patientGender: z.enum(["male", "female", "other"], {
    required_error: "Gender is required",
  }),
  patientMRN: z.string().optional(),
  chiefComplaint: z.string()
    .min(3, { message: "Chief complaint is required" })
    .max(500, { message: "Chief complaint must be less than 500 characters" }),
  chiefComplaintAnalysis: z.string().max(2000).optional(),
  tags: z.string().min(1, { message: "Please select at least one specialty" }),
  history: z.string().max(5000).optional(),
  physicalExam: z.string().max(5000).optional(),
  learningPoints: z.string().max(3000).optional(),
  systemSymptoms: z.record(z.string(), z.array(z.string())).optional(),
  vitals: z.record(z.string(), z.string()).optional(),
  labTests: z.array(z.object({
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

// Constants
const DRAFT_STORAGE_KEY = "caseFormDraft";
const AUTOSAVE_DELAY = 1500; // Increased from 1000ms for better performance
const STATUS_RESET_DELAY = 3000;

// Tab configuration
const TAB_CONFIG = [
  {
    id: "case-info",
    label: "Case Info",
    icon: FileText,
    description: "Basic case information and chief complaint"
  },
  {
    id: "patient-info",
    label: "Patient",
    icon: UserCircle,
    description: "Patient demographics and identifiers"
  },
  {
    id: "clinical-details",
    label: "Clinical",
    icon: Stethoscope,
    description: "Clinical findings, vitals, and test results"
  },
  {
    id: "learning",
    label: "Learning",
    icon: Clipboard,
    description: "Key learning points and insights"
  },
] as const;

type TabId = typeof TAB_CONFIG[number]['id'];

const CaseNew = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [storedCases, setStoredCases] = useLocalStorage<MedicalCase[]>("medical-cases", []);

  // Form state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>("case-info");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Clinical data state
  const [systemSymptoms, setSystemSymptoms] = useState<Record<string, string[]>>({});
  const [highlightedSymptoms, setHighlightedSymptoms] = useState<Record<string, string[]>>({});
  const [vitals, setVitals] = useState<Record<string, string>>({});
  const [labResults, setLabResults] = useState<LabTest[]>([]);
  const [radiologyExams, setRadiologyExams] = useState<RadiologyExam[]>([]);

  // Save state
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      patientName: "",
      patientAge: "",
      patientGender: "male",
      patientMRN: "",
      chiefComplaint: "",
      chiefComplaintAnalysis: "",
      tags: "",
      history: "",
      physicalExam: "",
      learningPoints: "",
      systemSymptoms: {},
      vitals: {},
      labTests: [],
      radiologyExams: [],
    },
    mode: "onChange", // Enable real-time validation
  });

  // Auto-focus on tab change
  useEffect(() => {
    // Adding a timeout to ensure the field is rendered before focusing
    const timer = setTimeout(() => {
      if (activeTab === "case-info") {
        form.setFocus("chiefComplaintAnalysis");
      } else if (activeTab === "patient-info") {
        form.setFocus("patientName");
      } else if (activeTab === "clinical-details") {
        form.setFocus("history");
      } else if (activeTab === "learning") {
        form.setFocus("learningPoints");
      }
    }, 100); // 100ms delay, adjust if needed
    return () => clearTimeout(timer);
  }, [activeTab, form]);

  // Memoized form steps for progress indicator
  const formSteps = useMemo(() =>
    TAB_CONFIG.map(({ id, label }) => ({
      id,
      label,
    })),
    []
  );

  // Enhanced autosave with debouncing and error handling
  const saveFormData = useCallback(async () => {
    try {
      setSaveStatus("saving");
      const formData = form.getValues();
      const draftData = {
        formData,
        systemSymptoms,
        vitals,
        labResults,
        radiologyExams,
        timestamp: new Date().toISOString()
      };

      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draftData));
      setSaveStatus("saved");
      setLastSaved(new Date());
      setHasUnsavedChanges(false);

      // Reset status after delay
      const resetTimer = setTimeout(() => {
        setSaveStatus("idle");
      }, STATUS_RESET_DELAY);

      return () => clearTimeout(resetTimer);
    } catch (error) {
      console.error("Error saving draft:", error);
      setSaveStatus("error");
      toast.error("Failed to save draft");
    }
  }, [form, systemSymptoms, vitals, labResults, radiologyExams]);

  // Debounced autosave effect
  useEffect(() => {
    if (!hasUnsavedChanges) return;
    const saveTimer = setTimeout(saveFormData, AUTOSAVE_DELAY);
    return () => clearTimeout(saveTimer);
  }, [hasUnsavedChanges, saveFormData]);

  // Watch for form changes
  useEffect(() => {
    const subscription = form.watch(() => {
      setHasUnsavedChanges(true);
    });
    return () => subscription.unsubscribe();
  }, [form]);

  // Watch for clinical data changes
  useEffect(() => {
    setHasUnsavedChanges(true);
  }, [systemSymptoms, vitals, labResults, radiologyExams]);

  // Load draft data on mount
  useEffect(() => {
    const loadDraftData = () => {
      try {
        const savedDraft = localStorage.getItem(DRAFT_STORAGE_KEY);
        if (!savedDraft) return;
        const draft = JSON.parse(savedDraft);

        // Check if draft is not too old (24 hours)
        const draftAge = new Date().getTime() - new Date(draft.timestamp || 0).getTime();
        const maxAge = 24 * 60 * 60 * 1000; // 24 hours

        if (draftAge > maxAge) {
          localStorage.removeItem(DRAFT_STORAGE_KEY);
          return;
        }

        form.reset(draft.formData);
        if (draft.systemSymptoms) setSystemSymptoms(draft.systemSymptoms);
        if (draft.vitals) setVitals(draft.vitals);
        if (draft.labResults) setLabResults(draft.labResults);
        if (draft.radiologyExams) setRadiologyExams(draft.radiologyExams);
        setLastSaved(new Date(draft.timestamp));

        toast.success("Draft loaded successfully");
      } catch (error) {
        console.error("Error loading draft:", error);
        localStorage.removeItem(DRAFT_STORAGE_KEY);
        toast.error("Failed to load draft");
      }
    };
    loadDraftData();
  }, [form]);

  // Enhanced form submission with better error handling
  const handleSubmit = async (values: FormValues) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      // Validate clinical data
      const clinicalData = {
        systemSymptoms,
        vitals,
        labResults,
        radiologyExams
      };

      const newCase: MedicalCase = {
        id: uuidv4(),
        title: values.title.trim(),
        patient: {
          id: uuidv4(),
          name: values.patientName.trim(),
          age: parseInt(values.patientAge),
          gender: values.patientGender,
          medicalRecordNumber: values.patientMRN?.trim() || undefined
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        chiefComplaint: values.chiefComplaint.trim(),
        chiefComplaintAnalysis: values.chiefComplaintAnalysis?.trim() || undefined,
        history: values.history?.trim() || undefined,
        physicalExam: values.physicalExam?.trim() || undefined,
        diagnoses: [],
        tags: [
          getAllTags().find(tag => tag.id === values.tags) ||
          { id: values.tags, name: values.tags, color: "#4F46E5" }
        ],
        resources: [],
        learningPoints: values.learningPoints?.trim() || undefined,
        // Include clinical data - using correct property names
        systemSymptoms: Object.keys(clinicalData.systemSymptoms).length > 0 ? clinicalData.systemSymptoms : undefined,
        vitals: Object.keys(clinicalData.vitals).length > 0 ? clinicalData.vitals : undefined,
        labTests: clinicalData.labResults.length > 0 ? clinicalData.labResults : undefined,
        radiologyExams: clinicalData.radiologyExams.length > 0 ? clinicalData.radiologyExams : undefined,
      };

      const updatedCases = [...storedCases, newCase];
      setStoredCases(updatedCases);

      // Clear draft after successful submission
      localStorage.removeItem(DRAFT_STORAGE_KEY);

      toast.success("Case created successfully!");
      navigate("/cases");
    } catch (error) {
      console.error("Error creating case:", error);
      toast.error("Failed to create case. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Tab navigation with validation
  const canNavigateToTab = useCallback((targetTab: TabId): boolean => {
    const currentIndex = TAB_CONFIG.findIndex(tab => tab.id === activeTab);
    const targetIndex = TAB_CONFIG.findIndex(tab => tab.id === targetTab);
    // Allow backward navigation
    if (targetIndex <= currentIndex) return true;

    // For forward navigation, check if current tab is valid
    switch (activeTab) {
      case "case-info":
        return form.formState.isValid || (!form.formState.errors.title && !form.formState.errors.chiefComplaint && !form.formState.errors.tags);
      case "patient-info":
        return !form.formState.errors.patientName && !form.formState.errors.patientAge && !form.formState.errors.patientGender;
      default:
        return true;
    }
  }, [activeTab, form.formState.errors.chiefComplaint, form.formState.errors.patientAge, form.formState.errors.patientGender, form.formState.errors.patientName, form.formState.errors.tags, form.formState.errors.title, form.formState.isValid]);

  const handleTabChange = useCallback((value: string) => {
    const targetTab = value as TabId;
    const currentIndex = TAB_CONFIG.findIndex(tab => tab.id === activeTab);
    const targetIndex = TAB_CONFIG.findIndex(tab => tab.id === targetTab);

    if (canNavigateToTab(targetTab)) {
      setActiveTab(targetTab);
    } else {
      toast.error("Please complete required fields before proceeding");
      // If it's a forward navigation attempt that failed
      if (targetIndex > currentIndex) {
        let fieldsForFocus: (keyof FormValues)[] = [];
        if (activeTab === 'case-info') {
          fieldsForFocus = ['title', 'chiefComplaint', 'tags'];
        } else if (activeTab === 'patient-info') {
          fieldsForFocus = ['patientName', 'patientAge', 'patientGender'];
        }
        
        const currentErrors = form.formState.errors;
        for (const field of fieldsForFocus) {
          if (currentErrors[field]) {
            form.setFocus(field as keyof FormValues);
            return; 
          }
        }
      }
    }
  }, [activeTab, canNavigateToTab, form, setActiveTab]);

  const goToNextTab = useCallback(async () => {
    const currentIndex = TAB_CONFIG.findIndex(tab => tab.id === activeTab);
    if (currentIndex < TAB_CONFIG.length - 1) {
      const nextTabId = TAB_CONFIG[currentIndex + 1].id;
      
      // `canNavigateToTab` checks if the *current* tab (activeTab) is valid to proceed FROM to the nextTabId.
      if (!canNavigateToTab(nextTabId)) { 
        toast.error("Please complete required fields before proceeding");
        
        let fieldsForFocus: (keyof FormValues)[] = [];
        if (activeTab === 'case-info') {
          fieldsForFocus = ['title', 'chiefComplaint', 'tags'];
        } else if (activeTab === 'patient-info') {
          fieldsForFocus = ['patientName', 'patientAge', 'patientGender'];
        }

        // No need to call form.trigger here if mode: 'onChange' is sufficient
        // and canNavigateToTab relies on the latest form.formState.errors
        const currentErrors = form.formState.errors;
        for (const field of fieldsForFocus) {
          if (currentErrors[field]) {
            form.setFocus(field as keyof FormValues);
            return; 
          }
        }
        return; 
      }
      setActiveTab(nextTabId); 
    }
  }, [activeTab, form, canNavigateToTab, setActiveTab]);

  const goToPreviousTab = useCallback(() => {
    const currentIndex = TAB_CONFIG.findIndex(tab => tab.id === activeTab);
    if (currentIndex > 0) {
      const prevTab = TAB_CONFIG[currentIndex - 1].id;
      setActiveTab(prevTab);
    }
  }, [activeTab]);

  const getStepNumber = useCallback(() => {
    return TAB_CONFIG.findIndex(tab => tab.id === activeTab) + 1;
  }, [activeTab]);

  // Clinical data handlers
  const handleBodyPartSelected = useCallback((selection: {
    relatedSystems: string[],
    relatedSymptoms: Record<string, string[]>
  }) => {
    setHighlightedSymptoms(selection.relatedSymptoms);
  }, []);

  const handleSymptomChange = useCallback((selections: Record<string, string[]>) => {
    setSystemSymptoms(selections);
  }, []);

  const handleVitalsChange = useCallback((vitalSigns: Record<string, string>) => {
    setVitals(vitalSigns);
  }, []);

  const handleLabResultsChange = useCallback((results: LabTest[]) => {
    setLabResults(results);
  }, []);

  const handleRadiologyExamsChange = useCallback((exams: RadiologyExam[]) => {
    setRadiologyExams(exams);
  }, []);

  // Manual save handler
  const handleManualSave = useCallback(async () => {
    await saveFormData();
    toast.success("Draft saved successfully");
  }, [saveFormData]);

  // Current tab config
  const currentTabConfig = TAB_CONFIG.find(tab => tab.id === activeTab);

  // Validation status for tabs
  const { formState: { errors } } = form;

  const isCaseInfoTabValid = useMemo(() => {
    return !errors.title && !errors.chiefComplaint && !errors.tags;
  }, [errors.title, errors.chiefComplaint, errors.tags]);

  const isPatientInfoTabValid = useMemo(() => {
    return !errors.patientName && !errors.patientAge && !errors.patientGender;
  }, [errors.patientName, errors.patientAge, errors.patientGender]);

  return (
    <>
      {/* Header with navigation and save status */}
      <div className="flex justify-between items-center mb-6">
        <Button
          onClick={() => navigate("/cases")}
          variant="ghost"
          className="flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="mr-1 h-4 w-4" /> Back to all cases
        </Button>
        <div className="flex items-center gap-2">
          <Button
            onClick={handleManualSave}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
            disabled={saveStatus === "saving"}
          >
            <Save className="h-4 w-4" />
            Save Draft
          </Button>
          <AutosaveIndicator
            status={saveStatus}
            lastSaved={lastSaved}
            className="mr-2"
          />
        </div>
      </div>

      <PageHeader
        title="New Clinical Case"
        description="Document a new clinical case for learning and reference"
      />

      {/* Unsaved changes warning */}
      {hasUnsavedChanges && saveStatus !== "saving" && (
        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            You have unsaved changes. They will be automatically saved as a draft.
          </AlertDescription>
        </Alert>
      )}

      <div className="max-w-5xl mx-auto w-full px-4"> {/* New wrapper starts here */}
        
        {/* Quick overview card */}
        <Card className="border-medical-200 shadow-md mb-6 bg-gradient-to-r from-medical-50/50 to-blue-50/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-medical-600" />
            Case Overview
          </CardTitle>
          <CardDescription>
            Essential case information visible across all tabs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md font-medium">Case Title<span className="text-red-500 ml-1">*</span></FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Acute Appendicitis..."
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
                name="chiefComplaint"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md font-medium">Chief Complaint<span className="text-red-500 ml-1">*</span></FormLabel>
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
                  <FormItem className="md:col-span-2">
                    <FormLabel className="text-md font-medium">Specialty<span className="text-red-500 ml-1">*</span></FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="border-medical-200 focus-visible:ring-medical-500">
                          <SelectValue placeholder="Select specialty" />
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
          </Form>
        </CardContent>
      </Card>

      {/* Enhanced progress indicator */}
      <div className="mb-6 sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 pt-2 pb-2">
        <FormProgressIndicator
          currentStep={getStepNumber()}
          totalSteps={formSteps.length}
          steps={formSteps}
          onStepClick={handleTabChange}
          className="bg-white p-4 rounded-lg shadow-sm border border-medical-100"
        />
        {currentTabConfig && (
          <p className="text-sm text-muted-foreground text-center mt-2">
            {currentTabConfig.description}
          </p>
        )}
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
                  {TAB_CONFIG.map(({ id, label, icon: Icon }) => (
                    <TabsTrigger
                      key={id}
                      value={id}
                      className="data-[state=active]:bg-white"
                      disabled={!canNavigateToTab(id)}
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      <span className={isMobile ? "text-xs" : "hidden sm:inline"}>{label}</span>
                    </TabsTrigger>
                  ))}
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
                          Chief Complaint Analysis (optional)
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
                    disabled={!isCaseInfoTabValid}
                  >
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </TabsContent>

              {/* Patient Information Tab */}
              <TabsContent value="patient-info" className="p-0 m-0">
                <CardContent className="space-y-6 pt-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900">Patient Identification</h3>
                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="patientName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-md font-medium">Patient Name *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Patient name"
                              {...field}
                              className="border-medical-200 focus-visible:ring-medical-500"
                            />
                          </FormControl>
                          <FormDescription>
                            Provide details about past medical history, relevant family history, social history, and current medications.
                          </FormDescription>
                          <FormDescription>
                            Document general appearance, system-specific examination findings (e.g., cardiovascular, respiratory, abdominal), and any relevant measurements.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="patientMRN"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-md font-medium">Medical Record Number (optional)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="MRN (optional)"
                              {...field}
                              className="border-medical-200 focus-visible:ring-medical-500"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Separator className="my-6" />
                  <h3 className="text-lg font-semibold mb-4 text-gray-900">Patient Demographics</h3>
                  
                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="patientAge"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-md font-medium">Age *</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Age"
                              min="1"
                              max="150"
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
                          <FormLabel className="text-md font-medium">Gender *</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
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
                    disabled={!isPatientInfoTabValid}
                  >
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </TabsContent>

              {/* Clinical Details Tab */}
              <TabsContent value="clinical-details" className="p-0 m-0">
                <CardContent className="space-y-6 pt-6">
                  {/* Top Navigation Buttons */}
                  <div className="flex justify-between items-center mb-6">
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
                      // No disabled attribute based on validation for clinical-details for now
                      // as its fields are optional and do not block progression.
                    >
                      Next <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>

                  {/* History Section */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-medical-600" />
                      <h3 className="text-lg font-medium text-medical-700">Patient History (optional)</h3>
                    </div>
                    <FormField
                      control={form.control}
                      name="history"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Textarea
                              placeholder="Describe the patient's medical history, present illness, review of systems..."
                              className="min-h-[120px] resize-none border-medical-200 focus-visible:ring-medical-500"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Provide details about past medical history, relevant family history, social history, and current medications.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Separator className="my-6" />

                  {/* System Review & Body Diagram Section */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2">
                      <CheckCheck className="h-5 w-5 text-medical-600" />
                      <h3 className="text-lg font-medium text-medical-700">System Review & Body Diagram</h3>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <h4 className="text-sm font-medium text-muted-foreground">
                          Select areas of interest on the body diagram or use the checklist below
                        </h4>
                        <InteractiveBodyDiagram onBodyPartSelected={handleBodyPartSelected} />
                      </div>
                      <div>
                        <SymptomChecklist
                          highlightedSymptoms={highlightedSymptoms}
                          onSelectionChange={handleSymptomChange}
                        />
                      </div>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  {/* Vitals Section */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2">
                      <Stethoscope className="h-5 w-5 text-medical-600" />
                      <h3 className="text-lg font-medium text-medical-700">Vital Signs</h3>
                    </div>
                    <VitalsCard
                      onVitalsChange={handleVitalsChange}
                      initialVitals={vitals}
                    />
                  </div>

                  <Separator className="my-6" />

                  {/* Physical Exam Section */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <UserCircle className="h-5 w-5 text-medical-600" />
                      <h3 className="text-lg font-medium text-medical-700">Physical Examination (optional)</h3>
                    </div>
                    <FormField
                      control={form.control}
                      name="physicalExam"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Textarea
                              placeholder="Document physical examination findings..."
                              className="min-h-[120px] resize-none border-medical-200 focus-visible:ring-medical-500"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Document general appearance, system-specific examination findings (e.g., cardiovascular, respiratory, abdominal), and any relevant measurements.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Separator className="my-6" />

                  {/* Lab Results Section */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-medical-600" />
                      <h3 className="text-lg font-medium text-medical-700">Laboratory Results</h3>
                    </div>
                    <LabResultsCard
                      onLabResultsChange={handleLabResultsChange}
                      initialResults={labResults}
                    />
                  </div>

                  <Separator className="my-6" />

                  {/* Radiology Section */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-medical-600" />
                      <h3 className="text-lg font-medium text-medical-700">Radiology Exams</h3>
                    </div>
                    <RadiologyCard
                      onRadiologyChange={handleRadiologyExamsChange}
                      initialResults={radiologyExams}
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

              {/* Learning Tab */}
              <TabsContent value="learning" className="p-0 m-0">
                <CardContent className="space-y-6 pt-6">
                  <FormField
                    control={form.control}
                    name="learningPoints"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-md font-medium flex items-center">
                          Key Learning Points (optional)
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0 ml-1">
                                  <HelpCircle className="h-3 w-3" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Document important learning points, clinical pearls, and key takeaways from this case</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="What are the key takeaways or learning points from this case?"
                            className="min-h-[150px] resize-none border-medical-200 focus-visible:ring-medical-500"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Summarize important insights, differential diagnoses, management strategies, or follow-up considerations.
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
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white flex items-center"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin mr-2">
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                        </span>
                        Saving Case...
                      </>
                    ) : (
                      <>
                        <CheckCheck className="mr-2 h-4 w-4" /> Save Case
                      </>
                    )}
                  </Button>
                </CardFooter>
              </TabsContent>
            </Tabs>
          </Card>
        </form>
      </Form>

      </div> {/* New wrapper ends here */}
    </>
  );
};

export default CaseNew;
