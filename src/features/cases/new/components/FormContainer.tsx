import React, { memo, ReactNode } from "react";
import { Card, CardContent } from "@/shared/ui/card";
import { FormProgressIndicator } from "@/features/cases/FormProgressIndicator";
import { cn } from "@/shared/utils";

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
  /** Index (0-based) of the current step. */
  currentStep: number;
  /** Total number of steps. */
  totalSteps: number;
  /** Ordered list of step definitions. */
  steps: StepMeta[];
  /** Callback when the user clicks a step bubble in the progress indicator. */
  onStepClick?: (stepId: string) => void;
  /** Main content of the current step. */
  children: ReactNode;
  /** Extra classes for the outer wrapper. */
  className?: string;
}

/**
 * Generic, stylised wrapper that pairs a step-based progress indicator with a
 * clean card to house the active form section.
 */
export const FormContainer: React.FC<FormContainerProps> = memo(
  ({ currentStep, totalSteps, steps, onStepClick, children, className }) => {
    return (
      <section className={cn("space-y-6", className)}>
        <FormProgressIndicator
          currentStep={currentStep}
          totalSteps={totalSteps}
          steps={steps}
          onStepClick={onStepClick}
        />

        <Card className="border-border bg-card shadow-sm">
          <CardContent className="p-6">
            <div className="w-full">
              {children}
            </div>
          </CardContent>
        </Card>
      </section>
    );
  },
);

FormContainer.displayName = "FormContainer";
