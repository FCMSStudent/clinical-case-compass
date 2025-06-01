import React, { memo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FormNavigationProps {
  /** 1-based index of the active step. */
  currentStep: number;
  /** Total number of steps in the wizard. */
  totalSteps: number;
  /** Human-readable label for the current step. */
  currentStepLabel?: string;
  /** Indicates a form submission is in progress. */
  isSubmitting?: boolean;
  /** Navigate to the previous step. Optional: hides _Previous_ when omitted. */
  onPrevious?: () => void;
  /** Navigate to the next step. Optional: hides _Next_ when omitted + not last. */
  onNext?: () => void;
  /** Override text on the final submit button. */
  submitLabel?: string;
  /** Extra classes for the wrapper card. */
  className?: string;
}

/**
 * Bottom navigation bar for multi-step forms – previous / next / submit &
 * a compact progress indicator.
 */
export const FormNavigation: React.FC<FormNavigationProps> = memo(
  ({
    currentStep,
    totalSteps,
    currentStepLabel,
    isSubmitting = false,
    onPrevious,
    onNext,
    submitLabel = "Submit Case",
    className,
  }) => {
    const isFirst = currentStep === 1;
    const isLast = currentStep >= totalSteps;

    return (
      <Card className={cn("bg-white/60 backdrop-blur-sm shadow-sm", className)}>
        <CardContent className="p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* — Previous — */}
            {onPrevious ? (
              <Button
                type="button"
                onClick={onPrevious}
                disabled={isFirst || isSubmitting}
                variant="outline"
                size="lg"
              >
                Previous
              </Button>
            ) : (
              <span />
            )}

            {/* — Progress indicator — */}
            <div className="flex flex-col items-center text-sm text-muted-foreground">
              <span>
                Step {currentStep} of {totalSteps}
              </span>
              {currentStepLabel && (
                <span className="mt-1 text-xs">{currentStepLabel}</span>
              )}
              {/* Linear progress bar */}
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded bg-muted">
                <div
                  className="h-full bg-primary transition-all"
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                />
              </div>
            </div>

            {/* — Next / Submit — */}
            {isLast ? (
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="min-w-[120px]"
              >
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />
                )}
                {isSubmitting ? "Submitting…" : submitLabel}
              </Button>
            ) : onNext ? (
              <Button
                type="button"
                onClick={onNext}
                variant="default"
                size="lg"
                disabled={isSubmitting}
                className="min-w-[120px]"
              >
                Next
              </Button>
            ) : (
              <span />
            )}
          </div>
        </CardContent>
      </Card>
    );
  },
);

FormNavigation.displayName = "FormNavigation";
