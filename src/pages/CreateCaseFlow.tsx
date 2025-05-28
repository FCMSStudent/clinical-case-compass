
import { useState, useEffect } from "react";
import { useForm, SubmitHandler, FieldValues, Path, PathValue } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { FormProgressIndicator } from "@/components/cases/FormProgressIndicator";
import { PageHeader } from "@/components/ui/page-header";
import { FileText, User, Stethoscope, Lightbulb, AlertTriangle, Save } from "lucide-react";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";

// Step Components and Schemas
import CaseInfoStep, { caseInfoSchema, CaseInfoFormData } from "@/components/cases/create/CaseInfoStep";
import PatientStep, { patientStepSchema, PatientStepFormData } from "@/components/cases/create/PatientStep";
import ClinicalDetailStep, { clinicalDetailStepSchema, ClinicalDetailFormData } from "@/components/cases/create/ClinicalDetailStep";
import LearningPointsStep, { learningPointsStepSchema, LearningPointsFormData } from "@/components/cases/create/LearningPointsStep";
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
      relatedSystemsNotes: "",
      vitalsNotes: "",
      labResultsNotes: "",
      radiologyNotes: "",
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
        toast.success("Draft loaded successfully");
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
      }, 2000);

      return () => clearTimeout(timeoutId);
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  const saveDraft = async (data: any) => {
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
      toast.success("Draft saved successfully");
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
    const fieldsToValidate = STEPS[currentStepIndex].fields;
    if (fieldsToValidate.length > 0) {
        const isValid = await trigger(fieldsToValidate);
        if (!isValid) {
        console.error("Validation failed for step:", STEPS[currentStepIndex].label, form.formState.errors);
        return;
        }
    }
    
    setHighestValidatedStep(Math.max(highestValidatedStep, currentStepIndex));

    if (currentStepIndex < STEPS.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStepIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleStepClick = async (stepId: string) => {
    const targetStepIndex = STEPS.findIndex(step => step.id === stepId);
    if (targetStepIndex < 0 || targetStepIndex === currentStepIndex) return;

    if (targetStepIndex < currentStepIndex || targetStepIndex <= highestValidatedStep + 1) {
        if (targetStepIndex > currentStepIndex && targetStepIndex > highestValidatedStep) {
            for (let i = currentStepIndex; i < targetStepIndex; i++) {
                const fieldsToValidate = STEPS[i].fields;
                if (fieldsToValidate.length > 0) {
                    const isValid = await trigger(fieldsToValidate);
                    if (!isValid) {
                        setCurrentStepIndex(i);
                        console.error("Validation failed when trying to jump to step:", STEPS[i].label, form.formState.errors);
                        return;
                    }
                    setHighestValidatedStep(Math.max(highestValidatedStep, i));
                }
            }
        }
        setCurrentStepIndex(targetStepIndex);
    } else {
        console.log("Please complete the current step before moving to a future unvalidated step.");
    }
  };
  
  const onSubmit: SubmitHandler<CombinedCaseFormData> = (data) => {
    console.log("Form Submitted Successfully!");
    console.log("Data:", data);
    clearDraft(); // Clear draft after successful submission
    toast.success("Case submitted successfully!");
  };

  const currentStepData = STEPS[currentStepIndex];
  const isLastStep = currentStepIndex === STEPS.length - 1;

  const renderStepContent = () => {
    switch (STEPS[currentStepIndex].id) {
      case "caseInfo":
        return <CaseInfoStep control={control} />;
      case "patient":
        return <PatientStep control={control} />;
      case "clinical":
        return <ClinicalDetailStep control={control} setValue={setValue as UseFormSetValue<FieldValues>} watch={watch} />;
      case "learning":
        return <LearningPointsStep control={control} />;
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
    <div className="container mx-auto py-8 space-y-8 px-4 md:px-0">
      <div className="flex justify-between items-center">
        <PageHeader 
          title="Create New Clinical Case"
          description={`Step ${currentStepIndex + 1} of ${STEPS.length}: ${currentStepData.label}`}
        />
        <Button
          onClick={saveDraftManually}
          disabled={isDraftSaving}
          variant="outline"
          size="sm"
        >
          <Save className="h-4 w-4 mr-2" />
          {isDraftSaving ? "Saving..." : "Save Draft"}
        </Button>
      </div>

      <FormProgressIndicator
        currentStep={currentStepIndex + 1}
        totalSteps={STEPS.length}
        steps={STEPS.map((step, index) => ({ 
            id: step.id, 
            label: step.label, 
            icon: step.icon,
            isCompleted: index <= highestValidatedStep,
            isNavigable: index <= highestValidatedStep + 1 || index < currentStepIndex,
        }))}
        onStepClick={handleStepClick}
      />
      
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="p-6 border border-border rounded-lg min-h-[350px] bg-card shadow-sm">
            {renderStepContent()}
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-border">
            <Button
              type="button"
              onClick={handlePrevious}
              disabled={currentStepIndex === 0}
              variant="outline"
            >
              Previous
            </Button>
            <div className="text-sm text-muted-foreground">
              Step {currentStepIndex + 1} of {STEPS.length}
            </div>
            <Button type={isLastStep ? "submit" : "button"} onClick={!isLastStep ? handleNext : undefined} variant="default">
              {isLastStep ? "Submit Case" : "Next"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateCaseFlow;
