
import React, { memo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Loader2, Save } from "lucide-react";
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
  }) => {
    const showSave = !hideDraftButton && Boolean(onSaveDraft);

    return (
      <Card className={cn("bg-muted/30 border-border", className)}>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Step Info */}
            <div className="space-y-1">
              <h2 className="text-xl font-semibold text-foreground">
                Create New Clinical Case
              </h2>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>
                  Step {currentStep} of {totalSteps}: {currentStepLabel}
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  {completionPercentage}% Complete
                </span>
                {isDraftSaving && (
                  <span className="flex items-center gap-1 text-primary">
                    <Loader2 className="h-3 w-3 animate-spin" />
                    Saving...
                  </span>
                )}
              </div>
            </div>

            {/* Save Draft Button */}
            {showSave && (
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
