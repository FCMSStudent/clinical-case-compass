import React, { memo } from "react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { CheckCircle, Loader2, Save } from "lucide-react";
import { cn } from "@/utils";

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
 * Header component for multi-step forms. Shows current step, % complete, and an
 * optional _Save Draft_ button with live autosave status.
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
    const stepText = `Step ${currentStep} of ${totalSteps}: ${currentStepLabel}`;
    const showSave = !hideDraftButton && Boolean(onSaveDraft);

    return (
      <header className={cn("flex flex-wrap items-start justify-between gap-4", className)}>
        {/* — Title & progress — */}
        <div className="space-y-2">
          <PageHeader title="Create New Clinical Case" description={stepText} />

          {/* Inline progress + autosave indicator */}
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4 text-green-500" aria-hidden />
              {completionPercentage}% Complete
            </span>

            {isDraftSaving && (
              <span className="flex items-center gap-1" aria-live="polite">
                <Loader2 className="h-3 w-3 animate-spin text-blue-500" /> Saving…
              </span>
            )}
          </div>
        </div>

        {/* — Save draft — */}
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
            {isDraftSaving ? "Saving…" : "Save Draft"}
          </Button>
        )}
      </header>
    );
  },
);

FormHeader.displayName = "FormHeader";
