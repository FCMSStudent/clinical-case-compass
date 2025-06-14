import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from "react";
import { PageHeader } from "@/components/ui/page-header";
import { FormContainer } from "@/features/cases/create/FormContainer";
import { FormHeader } from "@/features/cases/create/FormHeader";
import { FormNavigation } from "@/features/cases/create/FormNavigation";
import { PatientStep } from "@/features/cases/create/PatientStep";
import { CaseInfoStep } from "@/features/cases/create/CaseInfoStep";
import { ClinicalDetailStep } from "@/features/cases/create/ClinicalDetailStep";
import { LearningPointsStep } from "@/features/cases/create/LearningPointsStep";
import { ErrorSummary } from "@/components/ui/ErrorSummary";
import { useErrorHandler } from "@/hooks/use-error-handler";
import { useToast } from "@/hooks/use-toast";
import { FileText, Heart } from "lucide-react";
import {
  patientSchema,
  type PatientFormData,
} from "@/features/cases/create/schemas/patient-schema";
import {
  caseInfoSchema,
  type CaseInfoFormData,
} from "@/features/cases/create/schemas/case-info-schema";
import {
  learningPointsSchema,
  type LearningPointsFormData,
} from "@/features/cases/create/schemas/learning-points-schema";
import { z } from "zod";

// Define form data types
interface FormData {
  patient: PatientFormData;
  caseInfo: CaseInfoFormData;
  clinicalDetails: any; // Replace 'any' with a more specific type if possible
  learningPoints: LearningPointsFormData;
}

// Define error types for each step
interface FormErrors {
  patient?: z.ZodError<PatientFormData>["formErrors"];
  caseInfo?: z.ZodError<CaseInfoFormData>["formErrors"];
  clinicalDetails?: any; // Replace 'any' with a more specific type if possible
  learningPoints?: z.ZodError<LearningPointsFormData>["formErrors"];
}

// Define the structure for each step in the form
interface Step {
  id: string;
  label: string;
  icon: React.ReactNode;
}

// Define the steps for the form
const STEPS: Step[] = [
  { id: "patient", label: "Patient Info", icon: <Heart className="h-5 w-5" /> },
  { id: "caseInfo", label: "Case Info", icon: <FileText className="h-5 w-5" /> },
  { id: "clinicalDetails", label: "Clinical Details", icon: null },
  { id: "learningPoints", label: "Learning Points", icon: null },
];

const CreateCaseFlow = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    patient: {
      firstName: "",
      lastName: "",
      age: "",
      gender: "male",
    },
    caseInfo: {
      title: "",
      chiefComplaint: "",
    },
    clinicalDetails: {},
    learningPoints: {
      summary: "",
      keyTakeaways: [""],
    },
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] =
    useState<"idle" | "saving" | "saved" | "error">("idle");
  const errorAnnouncementRef = useRef(null);
  const { handleError } = useErrorHandler();
  const { toast } = useToast();

  // Validation Schemas
  const validationSchemas = useMemo(
    () => ({
      patient: patientSchema,
      caseInfo: caseInfoSchema,
      learningPoints: learningPointsSchema,
    }),
    [],
  );

  // Function to validate a specific step
  const validateStep = useCallback(
    (stepId: string, data: any) => {
      try {
        validationSchemas[stepId].parse(data);
        return null;
      } catch (error) {
        return error.format();
      }
    },
    [validationSchemas],
  );

  // Function to handle changes in form data for each step
  const handleStepDataChange = useCallback(
    (stepId: string, data: any) => {
      setFormData((prev) => ({ ...prev, [stepId]: data }));
      // Clear errors for the current step when data changes
      setErrors((prevErrors) => ({ ...prevErrors, [stepId]: null }));
    },
    [],
  );

  // Function to handle moving to the next step
  const handleNext = useCallback(() => {
    const stepId = STEPS[currentStep].id;
    const stepData = formData[stepId];
    const validationError = validateStep(stepId, stepData);

    if (validationError) {
      setErrors((prevErrors) => ({ ...prevErrors, [stepId]: validationError }));
      // Announce the error
      if (errorAnnouncementRef.current) {
        errorAnnouncementRef.current.innerText = "Please correct the errors.";
      }
      return;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [stepId]: null }));
      if (errorAnnouncementRef.current) {
        errorAnnouncementRef.current.innerText = "";
      }
    }

    setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
  }, [currentStep, formData, validateStep]);

  // Function to handle moving to the previous step
  const handlePrevious = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, []);

  // Function to handle form submission
  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    try {
      // Validate all steps
      let hasErrors = false;
      const newErrors: FormErrors = {};

      for (const step of STEPS) {
        const stepId = step.id;
        const stepData = formData[stepId];
        const validationError = validateStep(stepId, stepData);

        if (validationError) {
          newErrors[stepId] = validationError;
          hasErrors = true;
        }
      }

      if (hasErrors) {
        setErrors(newErrors);
        // Announce the errors
        if (errorAnnouncementRef.current) {
          errorAnnouncementRef.current.innerText = "Please correct the errors.";
        }
        return;
      } else {
        setErrors({});
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
  }, [formData, validateStep, handleError, toast]);

  // Function to determine if the user can proceed to the next step
  const canProceed = useMemo(() => {
    const stepId = STEPS[currentStep].id;
    const stepData = formData[stepId];
    const validationError = validateStep(stepId, stepData);
    return !validationError;
  }, [currentStep, formData, validateStep]);

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
              isDraftSaving={autoSaveStatus === "saving"}
              hideDraftButton={true}
            />

            <div className="space-y-6">
              {currentStep === 0 && (
                <PatientStep
                  data={formData.patient}
                  onChange={(data) => handleStepDataChange("patient", data)}
                  errors={errors.patient || {}}
                />
              )}
              {currentStep === 1 && (
                <CaseInfoStep
                  data={formData.caseInfo}
                  onChange={(data) => handleStepDataChange("caseInfo", data)}
                  errors={errors.caseInfo || {}}
                />
              )}
              {currentStep === 2 && (
                <ClinicalDetailStep
                  data={formData.clinicalDetails}
                  onChange={(data) =>
                    handleStepDataChange("clinicalDetails", data)
                  }
                />
              )}
              {currentStep === 3 && (
                <LearningPointsStep
                  data={formData.learningPoints}
                  onChange={(data) =>
                    handleStepDataChange("learningPoints", data)
                  }
                  errors={errors.learningPoints || {}}
                />
              )}
            </div>

            <FormNavigation
              currentStep={currentStep}
              totalSteps={STEPS.length}
              onPrevious={handlePrevious}
              onNext={handleNext}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              canProceed={canProceed}
            />
          </div>
        </FormContainer>
      </div>

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
