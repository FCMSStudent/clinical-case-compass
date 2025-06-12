import React, { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Save, FileText, User, Stethoscope, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormContainer, StepMeta } from "@/features/cases/create/FormContainer";
import { FormHeader } from "@/features/cases/create/FormHeader";
import { FormNavigation } from "@/features/cases/create/FormNavigation";
import { 
  CaseInfoStep, 
  caseInfoSchema,
  PatientStep,
  patientStepSchema,
  ClinicalDetailStep,
  clinicalDetailStepSchema,
  LearningPointsStep,
  learningPointsStepSchema
} from "@/features/cases";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { MedicalCase } from "@/types/case";
import { cn } from "@/lib/utils";
import { useAutoSave } from "@/hooks/use-autosave";
import { AutosaveIndicator } from "@/features/cases/AutosaveIndicator";

// Combine all schemas into one
const createCaseSchema = z.object({
  ...caseInfoSchema.shape,
  ...patientStepSchema.shape,
  ...clinicalDetailStepSchema.shape,
  ...learningPointsStepSchema.shape,
});

type CreateCaseFormData = z.infer<typeof createCaseSchema>;

// Step definitions
const STEPS = [
  {
    id: "case-info",
    label: "Case Information",
    icon: <FileText className="h-4 w-4" />,
    component: CaseInfoStep,
    schema: caseInfoSchema,
  },
  {
    id: "patient",
    label: "Patient Details",
    icon: <User className="h-4 w-4" />,
    component: PatientStep,
    schema: patientStepSchema,
  },
  {
    id: "clinical-details",
    label: "Clinical Details",
    icon: <Stethoscope className="h-4 w-4" />,
    component: ClinicalDetailStep,
    schema: clinicalDetailStepSchema,
  },
  {
    id: "learning-points",
    label: "Learning Points",
    icon: <BookOpen className="h-4 w-4" />,
    component: LearningPointsStep,
    schema: learningPointsStepSchema,
  },
];

const CreateCaseFlow = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [storedCases, setStoredCases] = useLocalStorage<MedicalCase[]>("medical-cases", []);
  const [isSaving, setIsSaving] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  
  // Create form with all schemas combined
  const methods = useForm<CreateCaseFormData>({
    resolver: zodResolver(createCaseSchema),
    mode: "onChange",
    defaultValues: {
      caseTitle: "",
      chiefComplaint: "",
      specialty: "",
      patientName: "",
      patientAge: undefined,
      patientSex: undefined,
      medicalRecordNumber: "",
      medicalHistory: "",
      vitals: {},
      selectedBodyParts: [],
      systemSymptoms: {},
      physicalExam: "",
      labResults: [],
      radiologyExams: [],
      learningPoints: "",
      resourceLinks: [],
    },
  });

  const { handleSubmit, watch, formState, trigger } = methods;
  const { errors, isValid, isDirty } = formState;
  
  // Get current step component
  const CurrentStepComponent = STEPS[currentStep].component;
  
  // Check if current step is valid
  const validateCurrentStep = useCallback(async () => {
    const currentStepSchema = STEPS[currentStep].schema;
    const result = await trigger(Object.keys(currentStepSchema.shape) as any);
    return result;
  }, [currentStep, trigger]);
  
  // Handle next step
  const handleNext = useCallback(async () => {
    const isStepValid = await validateCurrentStep();
    
    if (isStepValid) {
      if (currentStep < STEPS.length - 1) {
        setCurrentStep(prev => prev + 1);
      }
    } else {
      // Show error toast if validation fails
      toast.error("Please fix the errors before proceeding", {
        description: "There are validation errors in the current step.",
      });
    }
  }, [currentStep, validateCurrentStep]);
  
  // Handle previous step
  const handlePrevious = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);
  
  // Handle form submission
  const onSubmit = useCallback((data: CreateCaseFormData) => {
    setIsSaving(true);
    
    try {
      // Create new case object
      const newCase: MedicalCase = {
        id: uuidv4(),
        title: data.caseTitle,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        priority: "medium",
        chiefComplaint: data.chiefComplaint,
        patient: {
          name: data.patientName,
          age: data.patientAge || 0,
          gender: data.patientSex === "unknown" ? "male" : data.patientSex || "male",
          medicalRecordNumber: data.medicalRecordNumber,
        },
        vitals: data.vitals,
        history: data.medicalHistory,
        physicalExam: data.physicalExam,
        learningPoints: data.learningPoints,
        labTests: data.labResults,
        radiologyExams: data.radiologyExams,
      };
      
      // Add to stored cases
      const updatedCases = storedCases ? [...storedCases, newCase] : [newCase];
      setStoredCases(updatedCases);
      
      toast.success("Case created successfully", {
        description: "Your new clinical case has been saved.",
      });
      
      // Navigate to case detail page
      navigate(`/cases/${newCase.id}`);
    } catch (error) {
      console.error("Error creating case:", error);
      toast.error("Failed to create case", {
        description: "An error occurred while saving your case.",
      });
    } finally {
      setIsSaving(false);
    }
  }, [navigate, storedCases, setStoredCases]);
  
  // Auto-save form data
  const formData = watch();
  useAutoSave({
    data: formData,
    onSave: async () => {
      setAutoSaveStatus("saving");
      try {
        localStorage.setItem("case-form-draft", JSON.stringify(formData));
        setAutoSaveStatus("saved");
      } catch (error) {
        console.error("Auto-save error:", error);
        setAutoSaveStatus("error");
      }
    },
    debounceMs: 2000,
    enabled: isDirty,
  });
  
  // Create step metadata for progress indicator
  const stepMeta = useMemo<StepMeta[]>(() => {
    return STEPS.map((step, index) => {
      // Check if previous steps are completed to determine if this step is navigable
      const previousStepsCompleted = index === 0 ? true : 
        Array.from({ length: index }, (_, i) => i)
          .every(i => {
            const stepSchema = STEPS[i].schema;
            const stepFields = Object.keys(stepSchema.shape);
            return stepFields.every(field => !errors[field as keyof typeof errors]);
          });
      
      return {
        id: step.id,
        label: step.label,
        icon: step.icon,
        isCompleted: index < currentStep,
        isNavigable: previousStepsCompleted,
      };
    });
  }, [currentStep, errors]);

  const handleStepChange = useCallback((stepId: string) => {
    const stepIndex = STEPS.findIndex(step => step.id === stepId);
    if (stepIndex !== -1) {
      setCurrentStep(stepIndex);
    }
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 dark:from-blue-900 dark:via-blue-800 dark:to-blue-900">
      {/* Glassy background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/3 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 w-full max-w-6xl mx-auto space-y-6 p-4 md:p-6">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            className="text-white/70 hover:text-white hover:bg-white/10"
            onClick={() => navigate("/cases")}
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Cases
          </Button>
          
          <AutosaveIndicator status={autoSaveStatus} />
        </div>
        
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FormHeader 
              currentStep={currentStep + 1}
              totalSteps={STEPS.length}
              completionPercentage={Math.round(((currentStep + 1) / STEPS.length) * 100)}
              currentStepLabel={STEPS[currentStep].label}
              formTitle="Create New Clinical Case"
            />
            
            <FormContainer
              currentStepIndex={currentStep}
              steps={stepMeta}
              onStepChange={handleStepChange}
            >
              <CurrentStepComponent />
              
              <FormNavigation
                currentStep={currentStep + 1}
                totalSteps={STEPS.length}
                currentStepLabel={STEPS[currentStep].label}
                onNext={handleNext}
                onPrevious={handlePrevious}
                isSubmitting={isSaving}
              />
            </FormContainer>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default CreateCaseFlow;
