import React from "react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface FormProgressIndicatorProps {
  currentStep: number; // 1-based index
  totalSteps: number;
  steps: {
    id: string;
    label: string;
    icon?: React.ReactNode;
    isCompleted?: boolean;
    isNavigable?: boolean;
  }[];
  onStepClick?: (stepId: string) => void;
  className?: string;
}

export function FormProgressIndicator({
  currentStep,
  totalSteps,
  steps,
  onStepClick,
  className
}: FormProgressIndicatorProps) {
  // Calculation for progress bar value remains, as the bar itself is kept
  const progressPercentage = Math.min(((currentStep - 1) / totalSteps) * 100, 100);

  return (
    <div className={cn("w-full space-y-4", className)}>
      {/* Removed the div containing "Step X of Y" and "% Complete" */}

      <Progress
        value={progressPercentage}
        className="h-2 bg-muted"
        indicatorClassName="bg-primary"
      />

      <div className="flex justify-between flex-wrap gap-2">
        {steps.map((step, index) => {
          const stepNumber = index + 1; // Convert 0-based index to 1-based step number
          const isActive = stepNumber === currentStep;
          const isCompleted = step.isCompleted || stepNumber < currentStep; // A step is completed if explicitly marked or if its number is less than currentStep
          const isNavigable = step.isNavigable !== false; // Default to true if not explicitly false

          return (
            <button
              key={step.id}
              onClick={() => isNavigable && onStepClick?.(step.id)}
              disabled={!isNavigable || !onStepClick}
              className={cn(
                "flex flex-col items-center space-y-2 px-2 py-1 rounded-lg transition-all",
                "hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20",
                isActive && "bg-primary/5", // Subtle background highlight for the active step's clickable area
                isNavigable && onStepClick && "cursor-pointer",
                !isNavigable && "cursor-not-allowed opacity-50" // Dim and disable non-navigable steps
              )}
            >
              {/* Step Icon/Number Bubble */}
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground" // Active: Primary background, foreground text
                  : isCompleted
                    ? "bg-primary/20 text-primary" // Completed: Lighter primary background, primary text
                    : "bg-muted text-muted-foreground" // Default: Muted background, muted foreground text
              )}>
                {step.icon || (
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    isActive ? "bg-primary-foreground" : "bg-current"
                  )} />
                )}
              </div>
              {/* Step Label */}
              <span className={cn(
                "text-xs font-medium text-center hidden sm:block",
                isActive ? "text-primary" : "text-muted-foreground" // Active label: Primary text
              )}>
                {step.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
