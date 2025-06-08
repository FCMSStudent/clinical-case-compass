import React, { memo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Save, CheckCircle } from "lucide-react"; // Keep CheckCircle if needed elsewhere or for future use
import { cn } from "@/lib/utils";

export interface FormHeaderProps {
  /** Current (1-based) step index. */
  currentStep: number;
  /** Total number of steps in the wizard. */
  totalSteps: number;
  /** Value from 0 - 100 for completion indicator. */
  completionPercentage: number;
  /** `true` while a draft save is pending. */
  isDraftSaving?: boolean;
  /** Callback to trigger a manual draft save. */
  onSaveDraft?: () => void;
  /** Human-friendly label for the active step. */
  currentStepLabel: string;
  /** Hide the draft button entirely. */
  hideDraftButton?: boolean;
  /** Extra class names for the wrapper. */
  className?: string;
  /** Title for the form, e.g., "Create New Clinical Case". */
  formTitle?: string; // Added prop for flexibility
}

/**
 * Compact header component for multi-step forms that integrates well with AppLayout.
 */
export const FormHeader: React.FC<FormHeaderProps> = memo(
  ({
    currentStep,
    totalSteps,
    completionPercentage,
    isDraftSaving = false,
    onSaveDraft,
    currentStepLabel,
    hideDraftButton = false,
    className,
    formTitle = "Form Progress", // Default title
  }) => {
    // Determine if the save button should be shown
    const shouldShowSaveButton = !hideDraftButton && typeof onSaveDraft === 'function';

    return (
      <Card className={cn("bg-muted/30 border-border", className)}>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Step Info */}
            <div className="space-y-1">
              {/* Added formTitle prop for dynamic title */}
              <h2 className="text-xl font-semibold text-foreground">
                {formTitle}
              </h2>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                {/* Current Step Progress */}
                <span className="font-medium text-foreground"> {/* Made this text more prominent */}
                  Step {currentStep} of {totalSteps}: {currentStepLabel}
                </span>

                {/* Completion Percentage - removed CheckCircle as it implies 'complete' */}
                <span className={cn(
                    "flex items-center gap-1",
                    completionPercentage === 100 ? "text-primary font-medium" : "text-muted-foreground" // Highlight if 100% complete
                )}>
                  {/* You could add a progress icon here if preferred, e.g., <ProgressBarIcon /> */}
                  {completionPercentage}% Complete
                </span>

                {/* Saving Status - made it an ARIA live region */}
                {isDraftSaving && (
                  <span
                    className="flex items-center gap-1 text-primary animate-pulse" // Added animate-pulse for better visual feedback
                    role="status" // ARIA role for live regions
                    aria-live="polite" // Screen readers announce changes politely
                  >
                    <Loader2 className="h-3 w-3 animate-spin" />
                    Saving Draft...
                  </span>
                )}
              </div>
            </div>

            {/* Save Draft Button */}
            {shouldShowSaveButton && (
              <Button
                type="button"
                onClick={onSaveDraft}
                disabled={isDraftSaving}
                variant="outline"
                size="sm"
                className="flex-shrink-0"
              >
                {isDraftSaving ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                {isDraftSaving ? "Saving..." : "Save Draft"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  },
);

FormHeader.displayName = "FormHeader";
