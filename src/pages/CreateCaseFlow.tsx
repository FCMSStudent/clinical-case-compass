import { useState, useEffect } from "react";
import { useForm, SubmitHandler, FieldValues, Path, UseFormSetValue, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";

import { FileText, User, Stethoscope, Lightbulb, AlertTriangle } from "lucide-react";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";

// Step Components and Schemas - updated imports
import { 
  CaseInfoStep, 
  PatientStep, 
  ClinicalDetailStep, 
  LearningPointsStep,
  FormHeader,
  FormNavigation,
  FormContainer,
  caseInfoSchema,
  patientStepSchema,
  clinicalDetailStepSchema,
  learningPointsStepSchema
} from "@/features/cases";

import { Card, CardContent } from "@/components/ui/card";

// Combine Schemas
const combinedCaseSchema = caseInfoSchema
  .merge(patientStepSchema)
  .merge(clinicalDetailStepSchema)
  .merge(learningPointsStepSchema);

export type CombinedCaseFormData = z.infer<typeof combinedCaseSchema>;

type StepId = "caseInfo" | "patient" | "clinical" | "learning";

const STEPS: { id: StepId; label: string; icon: JSX.Element; fields: Path<CombinedCaseFormData>[]; }[] = [
  { id: "caseInfo", label: "Case Info", icon: <FileText className="h-5 w-5" />, fields: Object.keys(caseInfoSchema.shape) as Path<CombinedCaseFormData>[] },
  { id: "patient", label: "Patient", icon: <User className="h-5 w-5" />, fields: Object.keys(patientStepSchema.shape) as Path<CombinedCaseFormData>[] },
  { id: "clinical", label: "Clinical", icon: <Stethoscope className="h-5 w-5" />, fields: Object.keys(clinicalDetailStepSchema.shape) as Path<CombinedCaseFormData>[] },
  { id: "learning", label: "Learning", icon: <Lightbulb className="h-5 w-5" />, fields: Object.keys(learningPointsStepSchema.shape) as Path<CombinedCaseFormData>[] },
];

const DRAFT_STORAGE_KEY = "medical-case-draft";

const CreateCaseFlow = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [highestValidatedStep, setHighestValidatedStep] = useState(-1);
  const [isDraftSaving, setIsDraftSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const form = useForm<CombinedCaseFormData>({
    resolver: zodResolver(combinedCaseSchema),
    mode: "onChange",
    defaultValues: {
      // CaseInfoStep
      caseTitle: "",
      chiefComplaint: "",
      specialty: "",
      // PatientStep
      patientName: "",
      medicalRecordNumber: "",
      patientAge: undefined,
      patientSex: undefined,
      medicalHistory: "",
      // ClinicalDetailStep
      patientHistory: "",
      selectedBodyParts: [],
      systemSymptoms: {},
      vitals: {},
      physicalExam: "",
      labResults: [],
      radiologyExams: [],
      // LearningPointsStep
      learningPoints: "",
      generalNotes: "",
      resourceLinks: [],
    },
  });

  const { control, trigger, handleSubmit, setValue, watch, getValues } = form;

  // Load draft on component mount
  useEffect(() => {
    const savedDraft = localStorage.getItem(DRAFT_STORAGE_KEY);
    if (savedDraft) {
      try {
        const draftData = JSON.parse(savedDraft);
        Object.keys(draftData).forEach((key) => {
          setValue(key as Path<CombinedCaseFormData>, draftData[key]);
        });
        toast.success("Draft loaded successfully", {
          description: "Your previous work has been restored"
        });
      } catch (error) {
        console.error("Error loading draft:", error);
        localStorage.removeItem(DRAFT_STORAGE_KEY);
      }
    }
  }, [setValue]);

  // Auto-save draft functionality
  useEffect(() => {
    const subscription = watch((data) => {
      // Debounce the save operation
      const timeoutId = setTimeout(() => {
        saveDraft(data);
      }, 3000); // Increased to 3 seconds for better UX

      return () => clearTimeout(timeoutId);
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  const saveDraft = async (data: CombinedCaseFormData) => {
    try {
      setIsDraftSaving(true);
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(data));
      // Don't show toast for auto-save to avoid spam
    } catch (error) {
      console.error("Error saving draft:", error);
    } finally {
      setIsDraftSaving(false);
    }
  };

  const saveDraftManually = async () => {
    try {
      setIsDraftSaving(true);
      const currentData = getValues();
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(currentData));
      toast.success("Draft saved", {
        description: "Your progress has been saved"
      });
    } catch (error) {
      console.error("Error saving draft:", error);
      toast.error("Failed to save draft");
    } finally {
      setIsDraftSaving(false);
    }
  };

  const clearDraft = () => {
    localStorage.removeItem(DRAFT_STORAGE_KEY);
  };

  const handleNext = async () => {
    try {
      const fieldsToValidate = STEPS[currentStepIndex].fields;
      const currentValues = getValues();
      
      // Get the current step's schema
      const currentStepSchema = STEPS[currentStepIndex].id === "caseInfo" ? caseInfoSchema :
                              STEPS[currentStepIndex].id === "patient" ? patientStepSchema :
                              STEPS[currentStepIndex].id === "clinical" ? clinicalDetailStepSchema :
                              learningPointsStepSchema;

      // Only validate fields that have values and are required
      const fieldsWithValues = fieldsToValidate.filter(field => {
        const value = currentValues[field];
        // Check if the field is required in the schema
        const isRequired = !currentStepSchema.shape[field].isOptional();
        
        // If field is required, validate it
        if (isRequired) {
          if (Array.isArray(value)) return value.length > 0;
          if (typeof value === 'object' && value !== null) return Object.keys(value).length > 0;
          if (typeof value === 'string') return value.trim().length > 0;
          return !!value;
        }
        
        // For optional fields, only validate if they have a value
        if (Array.isArray(value)) return value.length > 0;
        if (typeof value === 'object' && value !== null) return Object.keys(value).length > 0;
        if (typeof value === 'string') return value.trim().length > 0;
        return !!value;
      });

      if (fieldsWithValues.length > 0) {
        const result = await trigger(fieldsWithValues);
        if (!result) {
          // Get the first error message
          const errors = form.formState.errors;
          const firstError = Object.values(errors)[0]?.message || "Please review the highlighted fields";
          
          toast.error("Validation Error", {
            description: firstError
          });
          return;
        }
      }
      
      setHighestValidatedStep(Math.max(highestValidatedStep, currentStepIndex));

      if (currentStepIndex < STEPS.length - 1) {
        setCurrentStepIndex((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error during step navigation:", error);
      toast.error("Something went wrong", {
        description: "Please try again or refresh the page"
      });
    }
  };

  const handlePrevious = () => {
    setCurrentStepIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleStepChange = (stepIndex: number) => {
    setCurrentStepIndex(stepIndex);
  };

  const onSubmit: SubmitHandler<CombinedCaseFormData> = async (data) => {
    try {
      setIsSubmitting(true);
      console.log("Form Submitted Successfully!");
      console.log("Data:", data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      clearDraft();
      toast.success("Case submitted successfully!", {
        description: "Your clinical case has been saved",
        action: {
          label: "View Cases",
          onClick: () => console.log("Navigate to cases")
        }
      });
    } catch (error) {
      toast.error("Failed to submit case", {
        description: "Please try again"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveAndExit = async () => {
    try {
      setIsDraftSaving(true);
      const currentData = getValues();
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(currentData));
      toast.success("Progress saved", {
        description: "You can continue editing this case later"
      });
      // Navigate back to cases list
      navigate("/cases");
    } catch (error) {
      console.error("Error saving draft:", error);
      toast.error("Failed to save progress");
    } finally {
      setIsDraftSaving(false);
    }
  };

  const currentStepData = STEPS[currentStepIndex];
  const completionPercentage = Math.round(((currentStepIndex + 1) / STEPS.length) * 100);

  const renderStepContent = () => {
    switch (STEPS[currentStepIndex].id) {
      case "caseInfo":
        return <CaseInfoStep />;
      case "patient":
        return <PatientStep />;
      case "clinical":
        return <ClinicalDetailStep />;
      case "learning":
        return <LearningPointsStep />;
      default:
        return (
          <Card className="border-destructive bg-destructive/10">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
              <h2 className="text-xl font-semibold text-destructive mb-2">Error</h2>
              <p className="text-destructive/80">Invalid step. Please refresh or contact support.</p>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      <FormHeader
        currentStep={currentStepIndex + 1}
        totalSteps={STEPS.length}
        completionPercentage={completionPercentage}
        isDraftSaving={isDraftSaving}
        onSaveDraft={saveDraftManually}
        currentStepLabel={currentStepData.label}
      />
        
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormContainer
            currentStepIndex={currentStepIndex}
            steps={STEPS.map((step, index) => ({
              id: step.id,
              label: step.label,
              icon: step.icon,
              isCompleted: index <= highestValidatedStep,
              isNavigable: true,
            }))}
            onStepChange={handleStepChange}
          >
            {renderStepContent()}
          </FormContainer>

          <FormNavigation
            currentStep={currentStepIndex + 1}
            totalSteps={STEPS.length}
            currentStepLabel={currentStepData.label}
            isSubmitting={isSubmitting}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onSaveAndExit={handleSaveAndExit}
          />
        </form>
      </FormProvider>
    </div>
  );
};

export default CreateCaseFlow;
