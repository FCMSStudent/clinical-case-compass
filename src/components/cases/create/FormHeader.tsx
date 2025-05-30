
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { CheckCircle, Save } from "lucide-react";

interface FormHeaderProps {
  currentStep: number;
  totalSteps: number;
  completionPercentage: number;
  isDraftSaving: boolean;
  onSaveDraft: () => void;
  currentStepLabel: string;
}

export function FormHeader({
  currentStep,
  totalSteps,
  completionPercentage,
  isDraftSaving,
  onSaveDraft,
  currentStepLabel
}: FormHeaderProps) {
  return (
    <div className="flex justify-between items-start">
      <div>
        <PageHeader 
          title="Create New Clinical Case"
          description={`Step ${currentStep} of ${totalSteps}: ${currentStepLabel}`}
        />
        <div className="mt-2 flex items-center space-x-4 text-sm text-muted-foreground">
          <span className="flex items-center">
            <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
            {completionPercentage}% Complete
          </span>
          {isDraftSaving && (
            <span className="flex items-center">
              <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse mr-1" />
              Auto-saving...
            </span>
          )}
        </div>
      </div>
      <Button
        onClick={onSaveDraft}
        disabled={isDraftSaving}
        variant="outline"
        size="sm"
        className="flex-shrink-0"
      >
        <Save className="h-4 w-4 mr-2" />
        {isDraftSaving ? "Saving..." : "Save Draft"}
      </Button>
    </div>
  );
}
