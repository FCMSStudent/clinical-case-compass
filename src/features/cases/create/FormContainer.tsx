
import React, { memo, ReactNode } from "react";
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
  /**
   * Callback when the user clicks a step in the progress indicator.
   * Receives the id of the clicked step.
   */
  onStepChange?: (stepId: string) => void;
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
      <section className={cn("space-y-6", className)}>
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-6 group overflow-hidden transition-all duration-300">
          {children}
        </div>
      </section>
    );
  },
);

FormContainer.displayName = "FormContainer";
