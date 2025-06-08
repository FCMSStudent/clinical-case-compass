import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Save, Loader2, Keyboard } from "lucide-react";
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

const KeyboardShortcut = ({ keys }: { keys: string[] }) => (
  <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg shadow-sm">
    {keys.join(" + ")}
  </kbd>
);

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
  const progress = (currentStep / totalSteps) * 100;

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Don't trigger shortcuts if user is typing in an input or textarea
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        event.target instanceof HTMLSelectElement
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
    <Card className={cn("sticky bottom-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60", className)}>
      <div className="container max-w-5xl mx-auto px-4 py-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Progress and Step Label */}
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Step {currentStep} of {totalSteps}</span>
              <span className="text-muted-foreground">{currentStepLabel}</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-3">
            {/* Previous Button */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    onClick={onPrevious}
                    disabled={isFirst || isSubmitting}
                    className="gap-2"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span className="hidden sm:inline">Previous</span>
                    <KeyboardShortcut keys={["Alt", "←"]} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Go to previous step</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Save and Exit Button */}
            {onSaveAndExit && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      onClick={onSaveAndExit}
                      disabled={isSubmitting}
                      className="gap-2"
                    >
                      <Save className="h-4 w-4" />
                      <span className="hidden sm:inline">Save & Exit</span>
                      <KeyboardShortcut keys={["Alt", "S"]} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Save your progress and return later</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}

            {/* Next/Submit Button */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={onNext}
                    disabled={isSubmitting}
                    className={cn(
                      "gap-2",
                      isLast ? "bg-emerald-600 hover:bg-emerald-700" : ""
                    )}
                  >
                    <AnimatePresence mode="wait">
                      {isSubmitting ? (
                        <motion.div
                          key="loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <Loader2 className="h-4 w-4 animate-spin" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="icon"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          {isLast ? (
                            <Save className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <span className="hidden sm:inline">
                      {isLast ? submitLabel : "Next"}
                    </span>
                    {!isLast && <KeyboardShortcut keys={["Alt", "→"]} />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isLast ? "Submit the case" : "Go to next step"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {/* Keyboard Shortcuts Help */}
        <div className="mt-4 flex items-center justify-center text-xs text-muted-foreground">
          <Keyboard className="h-3 w-3 mr-1" />
          <span>Use keyboard shortcuts: Alt + ← → for navigation, Alt + S to save</span>
        </div>
      </div>
    </Card>
  );
};

FormNavigation.displayName = "FormNavigation";
