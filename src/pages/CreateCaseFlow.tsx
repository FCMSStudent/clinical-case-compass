import React, {
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  ChevronLeft,
  ChevronRight,
  Save,
  FileText,
  User,
  Stethoscope,
  BookOpen,
  SkipForward,
  AlertCircle,
} from "lucide-react";
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
  learningPointsStepSchema,
} from "@/features/cases";
import { cn } from "@/lib/utils";
import { useAutoSave } from "@/hooks/use-autosave";
import { AutosaveIndicator } from "@/features/cases/AutosaveIndicator";
import { useCaseOperations } from "@/hooks/use-case-operations";
import { ErrorSummary } from "@/components/ui/ErrorSummary";

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
  const [isSaving, setIsSaving] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState<
    "idle" | "saving" | "saved" | "error"
  >("idle");
  const [showSkipNav, setShowSkipNav] = useState(false);

  // Accessibility refs
  const mainContentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const errorAnnouncementRef = useRef<HTMLDivElement>(null);

  const { createCase } = useCaseOperations();

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
      radiologyStudies: [],
      learningPoints: "",
      resourceLinks: [],
    },
  });

  const { handleSubmit, watch, formState, trigger, setFocus } = methods;
  const { errors, isValid, isDirty } = formState;

  // Get current step component
  const CurrentStepComponent = STEPS[currentStep].component;

  // Check if current step is valid
  const validateCurrentStep = useCallback(async () => {
    const currentStepSchema = STEPS[currentStep].schema;
    const result = await trigger(
      Object.keys(currentStepSchema.shape) as (keyof CreateCaseFormData)[],
    );
    return result;
  }, [currentStep, trigger]);

  // Handle next step
  const handleNext = useCallback(async () => {
    const isStepValid = await validateCurrentStep();

    if (isStepValid) {
      if (currentStep < STEPS.length - 1) {
        setCurrentStep((prev) => prev + 1);
        // Announce step change to screen readers
        setTimeout(() => {
          const stepLabel = STEPS[currentStep + 1].label;
          if (errorAnnouncementRef.current) {
            errorAnnouncementRef.current.textContent = `Moved to step ${currentStep + 2}: ${stepLabel}`;
          }
        }, 100);
      }
    } else {
      // Show error toast if validation fails
      toast.error("Please fix the errors before proceeding", {
        description: "There are validation errors in the current step.",
      });

      // Announce errors to screen readers
      if (errorAnnouncementRef.current) {
        const errorCount = Object.keys(errors).length;
        errorAnnouncementRef.current.textContent = `Form has ${errorCount} validation error${errorCount !== 1 ? "s" : ""}. Please review and correct the highlighted fields.`;
      }
    }
  }, [currentStep, validateCurrentStep, errors]);

  // Handle previous step
  const handlePrevious = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      // Announce step change to screen readers
      setTimeout(() => {
        const stepLabel = STEPS[currentStep - 1].label;
        if (errorAnnouncementRef.current) {
          errorAnnouncementRef.current.textContent = `Moved to step ${currentStep}: ${stepLabel}`;
        }
      }, 100);
    }
  }, [currentStep]);

  // Handle form submission using service layer
  const onSubmit = useCallback(
    async (data: CreateCaseFormData) => {
      setIsSaving(true);

      // Announce submission to screen readers
      if (errorAnnouncementRef.current) {
        errorAnnouncementRef.current.textContent =
          "Submitting case. Please wait...";
      }

      try {
        const result = await createCase(data);
        if (!result.success) {
          // Error handling is done in the service layer
          setIsSaving(false);

          // Announce error to screen readers
          if (errorAnnouncementRef.current) {
            errorAnnouncementRef.current.textContent = `Failed to create case: ${result.error}`;
          }
        }
      } catch (error) {
        console.error("Error in form submission:", error);
        setIsSaving(false);

        // Announce error to screen readers
        if (errorAnnouncementRef.current) {
          errorAnnouncementRef.current.textContent =
            "An unexpected error occurred while creating the case.";
        }
      }
    },
    [createCase],
  );

  // Auto-save form data
  const formData = watch();
  useAutoSave({
    data: formData,
    onSave: async () => {
      setAutoSaveStatus("saving");
      // Announce auto-save to screen readers
      if (errorAnnouncementRef.current) {
        errorAnnouncementRef.current.textContent = "Auto-saving draft...";
      }

      try {
        localStorage.setItem("case-form-draft", JSON.stringify(formData));
        setAutoSaveStatus("saved");

        // Announce success to screen readers
        setTimeout(() => {
          if (errorAnnouncementRef.current) {
            errorAnnouncementRef.current.textContent =
              "Draft saved successfully.";
          }
        }, 1000);
      } catch (error) {
        console.error("Auto-save error:", error);
        setAutoSaveStatus("error");

        // Announce error to screen readers
        if (errorAnnouncementRef.current) {
          errorAnnouncementRef.current.textContent = "Failed to save draft.";
        }
      }
    },
    debounceMs: 2000,
    enabled: isDirty,
  });

  // Handle keyboard shortcuts for accessibility
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Skip navigation (Alt + S)
      if (event.altKey && event.key === "s") {
        event.preventDefault();
        setShowSkipNav(true);
        setTimeout(() => setShowSkipNav(false), 3000);
      }

      // Focus first error (Alt + E)
      if (event.altKey && event.key === "e" && Object.keys(errors).length > 0) {
        event.preventDefault();
        const firstErrorField = Object.keys(errors)[0];
        setFocus(firstErrorField as any);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [errors, setFocus]);

  // Announce validation errors to screen readers
  useEffect(() => {
    if (Object.keys(errors).length > 0 && errorAnnouncementRef.current) {
      const errorCount = Object.keys(errors).length;
      errorAnnouncementRef.current.textContent = `Form has ${errorCount} validation error${errorCount !== 1 ? "s" : ""}. Please review and correct the highlighted fields.`;
    }
  }, [errors]);

  // Create step metadata for progress indicator
  const stepMeta = useMemo<StepMeta[]>(() => {
    return STEPS.map((step, index) => {
      // Check if previous steps are completed to determine if this step is navigable
      const previousStepsCompleted =
        index === 0
          ? true
          : Array.from({ length: index }, (_, i) => i).every((i) => {
              const stepSchema = STEPS[i].schema;
              const stepFields = Object.keys(stepSchema.shape);
              return stepFields.every(
                (field) => !errors[field as keyof typeof errors],
              );
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
    const stepIndex = STEPS.findIndex((step) => step.id === stepId);
    if (stepIndex !== -1) {
      setCurrentStep(stepIndex);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 dark:from-blue-900 dark:via-blue-800 dark:to-blue-900 relative">
      {/* Glassy background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/3 rounded-full blur-3xl"></div>
      </div>
      {/* Skip Navigation for Accessibility */}
      {showSkipNav && (
        <div className="fixed top-4 left-4 z-50 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-2">
          <div className="text-white text-sm">
            <p>Keyboard shortcuts:</p>
            <p>Alt + S: Skip navigation</p>
            <p>Alt + E: Focus first error</p>
            <p>Alt + ←/→: Navigate steps</p>
          </div>
        </div>
      )}

      {/* Screen Reader Announcements */}
      <div
        ref={errorAnnouncementRef}
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      />

      {/* Skip to Main Content Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-white/10 focus:backdrop-blur-md focus:border focus:border-white/20 focus:rounded-lg focus:px-4 focus:py-2 focus:text-white focus:text-sm"
      >
        Skip to main content
      </a>

      <div
        ref={mainContentRef}
        id="main-content"
        className="relative z-10 w-full max-w-6xl mx-auto space-y-6 p-4 md:p-6"
        role="main"
        aria-labelledby="form-title"
      >
        <header role="banner">
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={() => navigate("/dashboard")}
              className="gap-2 text-white/70 hover:text-white"
              aria-label="Return to dashboard"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </div>
        </header>

        <FormProvider {...methods}>
          <form
            ref={formRef}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
            aria-label="Create new clinical case form"
            noValidate
          >
            <FormHeader
              currentStep={currentStep + 1}
              totalSteps={STEPS.length}
              completionPercentage={Math.round(
                ((currentStep + 1) / STEPS.length) * 100,
              )}
              currentStepLabel={STEPS[currentStep].label}
              formTitle="Create New Clinical Case"
              isDraftSaving={autoSaveStatus === "saving"}
              onSaveDraft={() => {
                // Trigger auto-save manually
                localStorage.setItem(
                  "case-form-draft",
                  JSON.stringify(formData),
                );
                setAutoSaveStatus("saved");

                // Announce to screen readers
                if (errorAnnouncementRef.current) {
                  errorAnnouncementRef.current.textContent =
                    "Draft saved successfully.";
                }
              }}
            />

            {/* Error Summary for Accessibility */}
            {Object.keys(errors).length > 0 && (
              <ErrorSummary
                errors={errors}
                setFocus={setFocus as (name: string) => void}
                formId="create-case-form"
              />
            )}

            <FormContainer
              currentStepIndex={currentStep}
              steps={stepMeta}
              onStepChange={handleStepChange}
            >
              <div
                role="region"
                aria-labelledby={`step-${currentStep + 1}-title`}
              >
                <CurrentStepComponent />
              </div>

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
