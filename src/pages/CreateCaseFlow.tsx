import { useState, useEffect } from "react"; // Added useEffect
import { useForm, SubmitHandler, FieldValues, Path, PathValue } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast"; // Added useToast
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { FormProgressIndicator } from "@/components/cases/FormProgressIndicator";
import { PageHeader } from "@/components/ui/page-header";
import { FileText, User, Stethoscope, Lightbulb, AlertTriangle } from "lucide-react";
import { Form } from "@/components/ui/form"; // Import the RHF-compatible Form component

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

const DRAFT_STORAGE_KEY = "clinicalCaseDraft"; // Added Local Storage Key

type StepId = "caseInfo" | "patient" | "clinical" | "learning";

const STEPS: { id: StepId; label: string; icon: JSX.Element; fields: Path<CombinedCaseFormData>[]; }[] = [
  { id: "caseInfo", label: "Case Info", icon: <FileText className="h-5 w-5" />, fields: Object.keys(caseInfoSchema.shape) as Path<CombinedCaseFormData>[] },
  { id: "patient", label: "Patient", icon: <User className="h-5 w-5" />, fields: Object.keys(patientStepSchema.shape) as Path<CombinedCaseFormData>[] },
  { id: "clinical", label: "Clinical", icon: <Stethoscope className="h-5 w-5" />, fields: Object.keys(clinicalDetailStepSchema.shape) as Path<CombinedCaseFormData>[] },
  { id: "learning", label: "Learning", icon: <Lightbulb className="h-5 w-5" />, fields: Object.keys(learningPointsStepSchema.shape) as Path<CombinedCaseFormData>[] },
];

const CreateCaseFlow = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [highestValidatedStep, setHighestValidatedStep] = useState(-1);
  const { toast } = useToast(); // Added toast hook

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
      age: undefined, 
      gender: undefined, 
      // ClinicalDetailStep
      selectedBodyParts: [],
      patientHistory: "",
      physicalExamination: "",
      vitalSigns: { 
        temperature: "", 
        heartRate: "", 
        bloodPressure: "", 
        respiratoryRate: "", 
        spo2: "" 
      },
      laboratoryResults: [],
      radiologyExams: [],
      systemReview: { 
        cardiovascular: [], 
        respiratory: [], 
        gastrointestinal: [], 
        neurological: [], 
        musculoskeletal: [], 
        urinary: [] 
      },
      // LearningPointsStep
      learningPoints: "",
    },
  });

  const { control, trigger, handleSubmit, setValue, watch, getValues, reset } = form; // Added reset

  // Load draft from local storage on mount
  useEffect(() => {
    const savedDraftJson = localStorage.getItem(DRAFT_STORAGE_KEY);
    if (savedDraftJson) {
      try {
        const savedDraft = JSON.parse(savedDraftJson);
        // Validate if savedDraft structure is somewhat compatible, could be more robust
        if (savedDraft && typeof savedDraft === 'object' && savedDraft.caseTitle !== undefined) {
          toast({
            title: "Draft Found",
            description: "You have a previously saved draft. Would you like to load it?",
            action: (
              <Button variant="outline" size="sm" onClick={() => {
                reset(savedDraft); 
                // Attempt to restore step progress if applicable, might need more sophisticated logic
                // For now, just resetting values is the primary goal and user can navigate.
                // Consider if highestValidatedStep should be stored and restored too.
                toast({ title: "Draft Loaded!", description: "Your saved progress has been loaded." });
              }}>
                Load Draft
              </Button>
            ),
            duration: 8000, 
          });
        } else {
          console.warn("Found incompatible draft in local storage.", savedDraft);
          localStorage.removeItem(DRAFT_STORAGE_KEY); // Clear incompatible draft
        }
      } catch (error) {
        console.error("Error parsing saved draft:", error);
        localStorage.removeItem(DRAFT_STORAGE_KEY); // Clear corrupted draft
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset]); // Added `reset` to dependency array as per exhaustive-deps, toast is stable

  const handleNext = async () => {
    const fieldsToValidate = STEPS[currentStepIndex].fields;
    // Ensure fieldsToValidate is not empty and contains valid field names
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
    } else {
      // This is the final step, actual submission is handled by the form's onSubmit
      // console.log("Attempting final submission...");
      // await handleSubmit(onSubmit)(); // This will be called by the submit button
    }
  };

  const handlePrevious = () => {
    setCurrentStepIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleStepClick = async (stepId: string) => {
    const targetStepIndex = STEPS.findIndex(step => step.id === stepId);
    if (targetStepIndex < 0 || targetStepIndex === currentStepIndex) return;

    // Allow navigation to any previous step or an already validated step
    if (targetStepIndex < currentStepIndex || targetStepIndex <= highestValidatedStep + 1) {
        // If moving to a future unvalidated step, validate intermediate steps
        if (targetStepIndex > currentStepIndex && targetStepIndex > highestValidatedStep) {
            for (let i = currentStepIndex; i < targetStepIndex; i++) {
                const fieldsToValidate = STEPS[i].fields;
                if (fieldsToValidate.length > 0) {
                    const isValid = await trigger(fieldsToValidate);
                    if (!isValid) {
                        setCurrentStepIndex(i); // Stay on the step that failed validation
                        console.error("Validation failed when trying to jump to step:", STEPS[i].label, form.formState.errors);
                        return;
                    }
                    setHighestValidatedStep(Math.max(highestValidatedStep, i));
                }
            }
        }
        setCurrentStepIndex(targetStepIndex);
    } else {
        // Optionally, provide feedback that user needs to complete current/intermediate steps
        console.log("Please complete the current step before moving to a future unvalidated step.");
    }
  };
  
  const onSubmit: SubmitHandler<CombinedCaseFormData> = (data) => {
    console.log("Form Submitted Successfully!");
    console.log("Data:", data);
    // Here you would typically send the data to your backend
    // e.g., await api.createCase(data);
    alert("Case submitted! Check console for data.");
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
      <PageHeader 
        title="Create New Clinical Case"
        description={`Step ${currentStepIndex + 1} of ${STEPS.length}: ${currentStepData.label}`}
      />

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
      
      <Form {...form}> {/* Spread RHF props to the Form component */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="p-6 border border-border rounded-lg min-h-[350px] bg-card shadow-sm">
            {renderStepContent()}
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-border">
            <div>
              <Button
                type="button"
                onClick={handlePrevious}
                disabled={currentStepIndex === 0}
                variant="outline"
              >
                Previous
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  localStorage.removeItem(DRAFT_STORAGE_KEY);
                  reset(form.formState.defaultValues); // Reset to initial default values
                  toast({ title: "Draft Cleared!", description: "Your saved draft has been removed and form reset." });
                }}
              >
                Clear Draft
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => {
                  const currentValues = getValues();
                  localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(currentValues));
                  toast({ title: "Draft Saved!", description: "Your case progress has been saved locally." });
                }}
              >
                Save Draft
              </Button>
              <div className="text-sm text-muted-foreground hidden md:block">
                Step {currentStepIndex + 1} of {STEPS.length}
              </div>
            </div>
            <div>
              <Button type={isLastStep ? "submit" : "button"} onClick={!isLastStep ? handleNext : undefined} variant="default">
                {isLastStep ? "Submit Case" : "Next"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateCaseFlow;
