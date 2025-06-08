import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Save, ArrowLeft, ArrowRight, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface FormNavigationProps {
  /** 1-based index of the active step. */
  currentStep: number;
  /** Total number of steps in the wizard. */
  totalSteps: number;
  /** Human-readable label for the current step. */
  currentStepLabel: string;
  /** Indicates a form submission is in progress. */
  isSubmitting?: boolean;
  /** Navigate to the previous step. Optional: hides _Previous_ when omitted. */
  onPrevious?: () => void;
  /** Navigate to the next step. Optional: hides _Next_ when omitted + not last. */
  onNext?: () => void;
  /** Navigate to save and exit. Optional: hides _Save & Exit_ when omitted. */
  onSaveAndExit?: () => void;
  /** Override text on the final submit button. */
  submitLabel?: string;
  /** Extra classes for the wrapper card. */
  className?: string;
}

/**
 * Bottom navigation bar for multi-step forms – previous / next / submit &
 * a compact progress indicator.
 */
export const FormNavigation: React.FC<FormNavigationProps> = ({
  currentStep,
  totalSteps,
  currentStepLabel,
  isSubmitting = false,
  onPrevious,
  onNext,
  onSaveAndExit,
  submitLabel = "Submit Case",
  className,
}) => {
  const isFirst = currentStep === 1;
  const isLast = currentStep === totalSteps;

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Don't trigger shortcuts if user is typing in an input or textarea
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      // Alt + Left Arrow for previous
      if (event.altKey && event.key === "ArrowLeft" && onPrevious && !isFirst) {
        event.preventDefault();
        onPrevious();
      }

      // Alt + Right Arrow for next
      if (event.altKey && event.key === "ArrowRight" && onNext && !isLast) {
        event.preventDefault();
        onNext();
      }

      // Alt + S for save and exit
      if (event.altKey && event.key === "s" && onSaveAndExit) {
        event.preventDefault();
        onSaveAndExit();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [onPrevious, onNext, onSaveAndExit, isFirst, isLast]);

  return (
    <Card className={cn("sticky bottom-0 z-10 border-t", className)}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {!isFirst && onPrevious && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      onClick={onPrevious}
                      disabled={isSubmitting}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Previous
                      <kbd className="ml-2 hidden sm:inline-block rounded bg-muted px-2 py-0.5 text-xs">
                        Alt + ←
                      </kbd>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Go to previous step (Alt + Left Arrow)</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}

            {onSaveAndExit && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      onClick={onSaveAndExit}
                      disabled={isSubmitting}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Save & Exit
                      <kbd className="ml-2 hidden sm:inline-block rounded bg-muted px-2 py-0.5 text-xs">
                        Alt + S
                      </kbd>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Save progress and return to cases list (Alt + S)</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>

          <div className="flex items-center gap-2">
            {isLast ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
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
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Submit the case for review</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : onNext ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      onClick={onNext}
                      variant="default"
                      size="lg"
                      disabled={isSubmitting}
                      className="min-w-[120px]"
                    >
                      Next
                      <ArrowRight className="ml-2 h-4 w-4" />
                      <kbd className="ml-2 hidden sm:inline-block rounded bg-muted px-2 py-0.5 text-xs">
                        Alt + →
                      </kbd>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Proceed to next step (Alt + Right Arrow)</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <span />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

FormNavigation.displayName = "FormNavigation";
