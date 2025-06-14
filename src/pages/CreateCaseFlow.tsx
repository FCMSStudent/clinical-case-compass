import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PageHeader } from "@/components/ui/page-header";
import { FormContainer } from "@/features/cases/create/FormContainer";
import { FormHeader } from "@/features/cases/create/FormHeader";
import { FormNavigation } from "@/features/cases/create/FormNavigation";
import { CaseOverviewStep } from "@/features/cases/create/CaseOverviewStep";
import { ClinicalDetailStep } from "@/features/cases/create/ClinicalDetailStep";
import { LearningPointsStep } from "@/features/cases/create/LearningPointsStep";
import { useErrorHandler } from "@/hooks/use-error-handler";
import { useToast } from "@/hooks/use-toast";
import { FileText, Heart, TestTube } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";

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
  clinicalDetails: any;
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
  clinicalDetails: z.any().optional(),
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
  const [autoSaveStatus, setAutoSaveStatus] =
    useState<"idle" | "saving" | "saved" | "error">("idle");
  const errorAnnouncementRef = useRef(null);
  const { handleError } = useErrorHandler();
  const { toast } = useToast();

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
    },
    mode: "onChange",
  });

  const { watch, trigger } = form;
  const watchedValues = watch();

  // Calculate completion percentage
  const completionPercentage = useMemo(() => {
    const totalSteps = STEPS.length;
    const completedSteps = currentStep + 1;
    return Math.round((completedSteps / totalSteps) * 100);
  }, [currentStep]);

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
    const stepId = STEPS[currentStep].id;
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

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Case Created",
        description: "Your case has been successfully created.",
      });
    } catch (error) {
      handleError(error, "creating case");
    } finally {
      setIsSubmitting(false);
    }
  }, [trigger, handleError, toast]);

  // Function to determine if the user can proceed to the next step
  const canProceed = useMemo(() => {
    // For now, always allow proceeding - validation happens on next/submit
    return true;
  }, []);

  // Function to handle step change
  const handleStepChange = (stepId: string) => {
    const stepIndex = STEPS.findIndex((step) => step.id === stepId);
    if (stepIndex !== -1) {
      setCurrentStep(stepIndex);
    }
  };

  return (
    <main className="space-y-6 max-w-6xl mx-auto">
      <PageHeader
        title="Create Clinical Case"
        description="Create a new clinical case for educational purposes"
        icon={<FileText className="h-6 w-6" />}
      />

      {/* If you want to forcefully show a call-to-action at the top, use this block (ensure you remove any other similar blocks elsewhere): */}
      <div className="mb-4 flex justify-end">
        <Button variant="primary" size="lg">
          + Create New Case
        </Button>
      </div>

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
                currentStepLabel={STEPS[currentStep].label}
                formTitle="Create New Clinical Case"
                completionPercentage={completionPercentage}
                isDraftSaving={autoSaveStatus === "saving"}
                hideDraftButton={true}
              />
              <div className="space-y-6">
                {/* Conditional rendering for "Create First Case" CTA if there are no cases */}
                {/* Replace any previous raw <button> logic with: */}
                {watchedValues && watchedValues.patientName === "" && (
                  <div className="flex flex-col items-center py-6">
                    <p className="text-white/80 text-lg mb-4">
                      No cases yet! Get started by creating your first case:
                    </p>
                    <Button variant="primary" size="lg">
                      Create First Case
                    </Button>
                  </div>
                )}
                {/* ...or just keep the normal flow... */}
                {currentStep === 0 && <CaseOverviewStep />}
                {currentStep === 1 && <ClinicalDetailStep />}
                {currentStep === 2 && <LearningPointsStep />}
              </div>
              {/* BUTTONS ARE CONTROLLED BY FormNavigation */}
              <FormNavigation
                currentStep={currentStep + 1}
                totalSteps={STEPS.length}
                currentStepLabel={STEPS[currentStep].label}
                onPrevious={currentStep > 0 ? handlePrevious : undefined}
                onNext={handleNext}
                isSubmitting={isSubmitting}
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
