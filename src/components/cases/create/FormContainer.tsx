
import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FormProgressIndicator } from "@/components/cases/FormProgressIndicator";

interface FormContainerProps {
  currentStep: number;
  totalSteps: number;
  steps: {
    id: string;
    label: string;
    icon: JSX.Element;
    isCompleted: boolean;
    isNavigable: boolean;
  }[];
  onStepClick: (stepId: string) => void;
  children: ReactNode;
}

export function FormContainer({
  currentStep,
  totalSteps,
  steps,
  onStepClick,
  children
}: FormContainerProps) {
  return (
    <>
      <FormProgressIndicator
        currentStep={currentStep}
        totalSteps={totalSteps}
        steps={steps}
        onStepClick={onStepClick}
      />
      
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardContent className="p-8">
          <div className="min-h-[400px]">
            {children}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
