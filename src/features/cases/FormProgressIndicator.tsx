
import React from "react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface FormProgressIndicatorProps {
  currentStep: number;
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
  const progressPercentage = Math.min(((currentStep) / totalSteps) * 100, 100);

  return (
    <div className={cn("w-full space-y-2", className)}>
      <div className="flex items-center justify-between mb-1">
        <div className="text-sm font-medium text-primary">
          Step {currentStep} of {totalSteps}
        </div>
        <div className="text-sm text-primary">
          {Math.round(progressPercentage)}% Complete
        </div>
      </div>
      
      <Progress 
        value={progressPercentage} 
        className="h-2 bg-muted"
        indicatorClassName="bg-primary"
      />
      
      <div className="flex justify-between flex-wrap mt-2">
        {steps.map((step, index) => {
          const isActive = index + 1 === currentStep;
          const isCompleted = step.isCompleted || index + 1 < currentStep;
          const isNavigable = step.isNavigable !== false;
          
          return (
            <button
              key={step.id}
              onClick={() => isNavigable && onStepClick?.(step.id)}
              disabled={!isNavigable || !onStepClick}
              className={cn(
                "flex flex-col items-center space-y-1 px-1 transition-colors",
                isActive ? "text-primary" : isCompleted ? "text-muted-foreground" : "text-muted-foreground",
                isNavigable && onStepClick && "cursor-pointer hover:text-primary",
                !isNavigable && "cursor-not-allowed opacity-50"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center",
                isActive ? "bg-primary text-primary-foreground" :
                isCompleted ? "bg-secondary text-primary" :
                "bg-muted text-muted-foreground"
              )}>
                {step.icon ? step.icon : index + 1}
              </div>
              <span className="text-xs font-medium hidden md:inline">{step.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
