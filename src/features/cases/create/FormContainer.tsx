import React, { memo, ReactNode } from "react";
import { cn } from "@/shared/utils/utils";
import { Card, CardContent } from "@/shared/components/card";
import { StepProgress } from "./components/StepProgress";

/**
 * Lightweight meta-data contract for each form step.
 * Re-exported in case consumers want to share the type without re-declaring it.
 */
export interface StepMeta {
  id: string;
  label: string;
  icon: React.ReactNode;
  isCompleted: boolean;
  isNavigable: boolean;
}

export interface FormContainerProps {
  /** Index (0-based) of the currently active step. */
  currentStepIndex: number;
  /** Ordered list of step definitions. The total number of steps is derived from this array's length. */
  steps: StepMeta[];
  /**
   * Callback when the user clicks a step in the progress indicator.
   * Receives the id of the clicked step.
   */
  onStepChange: (stepId: string) => void;
  /** Main content of the current step. */
  children: ReactNode;
  /** Extra classes for the outer wrapper. */
  className?: string;
}

/**
 * A generic, stylized wrapper that provides a clean card to house the active form section.
 * The progress visualization has been removed for a cleaner interface.
 */
export const FormContainer = memo(
  ({
    currentStepIndex,
    steps,
    onStepChange,
    children,
    className,
  }: FormContainerProps) => {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 shadow-xl">
          <CardContent className="p-6">
            <StepProgress 
              steps={steps}
              currentStep={currentStepIndex}
              onStepClick={onStepChange}
            />
          </CardContent>
        </Card>
        
        <div className="space-y-6">
          {children}
        </div>
      </div>
    );
  },
);

FormContainer.displayName = "FormContainer";
