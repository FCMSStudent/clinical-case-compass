import React, { memo, ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FormProgressIndicator } from "@/features/cases/FormProgressIndicator";
import { cn } from "@/lib/utils";

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
  /** * Callback when the user clicks a step in the progress indicator.
   * Receives the id of the clicked step.
   */
  onStepChange?: (stepId: string) => void;
  /** Main content of the current step. */
  children: ReactNode;
  /** Extra classes for the outer wrapper. */
  className?: string;
}

/**
 * A generic, stylized wrapper that pairs a step-based progress indicator 
 * with a clean card to house the active form section. It manages the layout 
 * and progress visualization for a multi-step form.
 */
// 1. MODERNIZED DEFINITION: Using a standard function with typed props is a more
// modern and slightly less verbose pattern than `React.FC`.
export const FormContainer = memo(
  ({
    currentStepIndex,
    steps,
    onStepChange,
    children,
    className,
  }: FormContainerProps) => {
    // 2. DERIVED STATE: totalSteps is derived directly from the `steps` array.
    // This makes the component's API cleaner and removes the possibility of
    // inconsistent props (e.g., passing totalSteps={5} but an array of 4 steps).
    const totalSteps = steps.length;

    return (
      <section className={cn("space-y-6", className)}>
        <FormProgressIndicator
          currentStep={currentStepIndex}
          totalSteps={totalSteps} // Derived, not passed in.
          steps={steps}
          onStepClick={onStepChange} // Renamed for clarity.
        />
        
        <Card>
          <CardContent className="p-6">{children}</CardContent>
        </Card>
      </section>
    );
  },
);

FormContainer.displayName = "FormContainer";
