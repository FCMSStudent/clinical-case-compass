
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface FormNavigationProps {
  currentStep: number;
  totalSteps: number;
  currentStepLabel: string;
  isLastStep: boolean;
  isSubmitting: boolean;
  onPrevious: () => void;
  onNext?: () => void;
}

export function FormNavigation({
  currentStep,
  totalSteps,
  currentStepLabel,
  isLastStep,
  isSubmitting,
  onPrevious,
  onNext
}: FormNavigationProps) {
  return (
    <Card className="border-0 shadow-sm bg-white/60 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex justify-between items-center">
          <Button
            type="button"
            onClick={onPrevious}
            disabled={currentStep === 1}
            variant="outline"
            size="lg"
          >
            Previous
          </Button>
          
          <div className="text-sm text-muted-foreground text-center">
            <div>Step {currentStep} of {totalSteps}</div>
            <div className="text-xs mt-1">{currentStepLabel}</div>
          </div>
          
          <Button 
            type={isLastStep ? "submit" : "button"} 
            onClick={!isLastStep ? onNext : undefined} 
            variant="default"
            size="lg"
            disabled={isSubmitting}
            className="min-w-[120px]"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Submitting...
              </>
            ) : (
              isLastStep ? "Submit Case" : "Next"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
