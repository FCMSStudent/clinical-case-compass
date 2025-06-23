
import React, {
  useState,
  useCallback,
  useRef,
} from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { FormContainer } from "@/features/cases/create/FormContainer";
import { FormHeader } from "@/features/cases/create/FormHeader";
import { FormNavigation } from "@/features/cases/create/FormNavigation";
import { CaseOverviewStep } from "@/features/cases/create/CaseOverviewStep";
import { ClinicalDetailStep } from "@/features/cases/create/ClinicalDetailStep";
import { LearningPointsStep } from "@/features/cases/create/LearningPointsStep";
import { useErrorHandler } from "@/shared/hooks/use-error-handler";
import { useToast } from "@/shared/hooks/use-toast";
import { useSupabaseCases } from "@/shared/hooks/use-supabase-cases";
import { useAuth } from "@/app/providers/AuthContext";
import { FileText, Heart, TestTube } from "lucide-react";
import { z } from "zod";

// Define form data types
interface FormData {
  patientName: string;
  medicalRecordNumber: string;
  patientAge: number;
  patientSex: string;
  medicalHistory: string;
  caseTitle: string;
  chiefComplaint: string;
  specialty: string;
  clinicalDetails: Record<string, unknown>;
  learningPoints: string;
  generalNotes: string;
  resourceLinks: Array<{ url: string; description: string }>;
}

// Define the structure for each step in the form
interface StepMeta {
  id: string;
  label: string;
  icon: React.ReactNode;
  isCompleted: boolean;
  isNavigable: boolean;
}

// Combined schema for all steps
const combinedSchema = z.object({
  // Merged case overview step
  patientName: z.string().optional(),
  medicalRecordNumber: z.string().optional(),
  patientAge: z.number().optional(),
  patientSex: z.string().optional(),
  medicalHistory: z.string().optional(),
  caseTitle: z.string().optional(),
  chiefComplaint: z.string().optional(),
  specialty: z.string().optional(),
  // Clinical details step
  clinicalDetails: z.record(z.unknown()).optional(),
  // Learning points step
  learningPoints: z.string().optional(),
  generalNotes: z.string().optional(),
  resourceLinks: z.array(z.object({
    url: z.string(),
    description: z.string(),
  })).optional(),
});

// Define the updated steps for the form (reduced from 4 to 3)
const STEPS: StepMeta[] = [
  { 
    id: "caseOverview", 
    label: "Case Overview", 
    icon: <Heart className="h-5 w-5" />,
    isCompleted: false,
    isNavigable: true
  },
  { 
    id: "clinicalDetails", 
    label: "Clinical Details", 
    icon: <TestTube className="h-5 w-5" />,
    isCompleted: false,
    isNavigable: true
  },
  { 
    id: "learningPoints", 
    label: "Learning Points", 
    icon: <FileText className="h-5 w-5" />,
    isCompleted: false,
    isNavigable: true
  },
];

const CreateCaseFlow = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [_autoSaveStatus, _setAutoSaveStatus] = 
    useState<"idle" | "saving" | "saved" | "error">("idle");
  const errorAnnouncementRef = useRef<HTMLDivElement>(null);
  const { handleError } = useErrorHandler();
  const { toast } = useToast();
  const { createCase, isCreating } = useSupabaseCases();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Initialize form with react-hook-form
  const form = useForm<FormData>({
    resolver: zodResolver(combinedSchema),
    defaultValues: {
      patientName: "",
      medicalRecordNumber: "",
      patientAge: undefined,
      patientSex: "",
      medicalHistory: "",
      caseTitle: "",
      chiefComplaint: "",
      specialty: "",
      clinicalDetails: {},
      learningPoints: "",
      generalNotes: "",
      resourceLinks: [],
    } as unknown as FormData,
    mode: "onChange",
  });

  const { trigger } = form;

  // Function to validate a specific step
  const validateStep = useCallback(
    async (stepId: string) => {
      switch (stepId) {
        case "caseOverview":
          return await trigger(["patientName", "patientAge", "patientSex", "caseTitle", "chiefComplaint"]);
        case "clinicalDetails":
          return true; // No validation for clinical details step
        case "learningPoints":
          return await trigger(["learningPoints"]);
        default:
          return true;
      }
    },
    [trigger],
  );

  // Function to handle moving to the next step
  const handleNext = useCallback(async () => {
    const currentStepData = STEPS[currentStep];
    if (!currentStepData) return;
    
    const stepId = currentStepData.id;
    const isValid = await validateStep(stepId);

    if (!isValid) {
      // Announce the error
      if (errorAnnouncementRef.current) {
        errorAnnouncementRef.current.innerText = "Please correct the errors.";
      }
      return;
    } else {
      if (errorAnnouncementRef.current) {
        errorAnnouncementRef.current.innerText = "";
      }
    }

    if (currentStep === STEPS.length - 1) {
      // Final step - submit the form
      await handleSubmit();
    } else {
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
    }
  }, [currentStep, validateStep]);

  // Function to handle moving to the previous step
  const handlePrevious = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, []);

  // Function to handle form submission
  const handleSubmit = useCallback(async () => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Authentication Required",
        description: "You must be logged in to create a case.",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Validate all steps
      const isValid = await trigger();

      if (!isValid) {
        // Announce the errors
        if (errorAnnouncementRef.current) {
          errorAnnouncementRef.current.innerText = "Please correct the errors.";
        }
        return;
      } else {
        if (errorAnnouncementRef.current) {
          errorAnnouncementRef.current.innerText = "";
        }
      }

      const formData = form.getValues();

      // Extract clinicalDetails fields if present
      const clinical = formData.clinicalDetails || {};

      // Prepare case data for Supabase with proper type handling
      const caseData = {
        patient: {
          name: formData.patientName || "Unknown Patient",
          age: formData.patientAge || 0,
          gender: (formData.patientSex as "male" | "female" | "other") || "other",
          medicalRecordNumber: formData.medicalRecordNumber || "",
        },
        case: {
          title: formData.caseTitle || "Untitled Case",
          priority: "medium" as const,
          status: "draft" as const,
          chiefComplaint: formData.chiefComplaint || "",
          chiefComplaintAnalysis: undefined,
          history: (clinical.patientHistory as string) || formData.medicalHistory || "",
          physicalExam: (clinical.physicalExam as string) || "",
          symptoms: (clinical.systemSymptoms as Record<string, string[]>) || {} as Record<string, string[]>,
          vitals: (clinical.vitals as Record<string, string>) || {} as Record<string, string>,
          labTests: clinical.labResults || [],
          radiologyStudies: clinical.radiologyStudies || [],
          learningPoints: formData.learningPoints || "",
          urinarySymptoms: [],
        },
        resources: formData.resourceLinks?.map(link => ({
          title: link.description || "Resource",
          type: "other" as const,
          url: link.url || "",
          notes: link.description || "",
        })) || [],
      };

      await new Promise((resolve, reject) => {
        createCase(caseData, {
          onSuccess: (caseId) => {
            toast({
              title: "Case Created",
              description: "Your case has been successfully created.",
            });
            // Navigate to the created case or cases list
            navigate(`/cases`);
            resolve(caseId);
          },
          onError: (error) => {
            handleError(error, "creating case");
            reject(error);
          },
        });
      });
    } catch (error) {
      handleError(error, "creating case");
    } finally {
      setIsSubmitting(false);
    }
  }, [trigger, handleError, toast, createCase, user, navigate, form]);

  // Function to handle step change
  const handleStepChange = (stepId: string) => {
    const stepIndex = STEPS.findIndex((step) => step.id === stepId);
    if (stepIndex !== -1) {
      setCurrentStep(stepIndex);
    }
  };

  return (
    <main className="space-y-6 max-w-6xl mx-auto py-8">
      <FormProvider {...form}>
        <div className="space-y-6">
          <FormContainer
            currentStepIndex={currentStep}
            steps={STEPS}
            onStepChange={handleStepChange}
          >
            <div className="space-y-6">
              <FormHeader
                currentStep={currentStep + 1}
                totalSteps={STEPS.length}
                currentStepLabel={STEPS[currentStep]?.label || ""}
                formTitle="Create New Clinical Case"
                isDraftSaving={_autoSaveStatus === "saving"}
                hideDraftButton={true}
              />
              <div className="space-y-6">
                {currentStep === 0 && <CaseOverviewStep />}
                {currentStep === 1 && <ClinicalDetailStep />}
                {currentStep === 2 && <LearningPointsStep />}
              </div>
              {/* BUTTONS ARE CONTROLLED BY FormNavigation */}
              <FormNavigation
                currentStep={currentStep + 1}
                totalSteps={STEPS.length}
                currentStepLabel={STEPS[currentStep]?.label || ""}
                onPrevious={currentStep > 0 ? handlePrevious : undefined}
                onNext={handleNext}
                isSubmitting={isSubmitting || isCreating}
              />
            </div>
          </FormContainer>
        </div>
      </FormProvider>

      {/* Accessibility announcements */}
      <div
        ref={errorAnnouncementRef}
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
      />
    </main>
  );
};

export default CreateCaseFlow;
