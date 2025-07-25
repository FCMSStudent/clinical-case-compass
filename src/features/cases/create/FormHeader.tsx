
import React, { memo } from "react";
import { Button } from "@/shared/components/button";
import { Loader2, Save } from "lucide-react";
import { cn } from "@/shared/utils/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/tooltip";

export interface FormHeaderProps {
  /** Current (1-based) step index. */
  currentStep: number;
  /** Total number of steps in the wizard. */
  totalSteps: number;
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
  formTitle?: string;
}

/**
 * Compact header component for multi-step forms that integrates well with EnhancedAppLayout.
 */
export const FormHeader = memo(function FormHeader({
  currentStep,
  totalSteps,
  isDraftSaving = false,
  onSaveDraft,
  currentStepLabel,
  hideDraftButton = false,
  className,
  formTitle = "Create New Clinical Case",
}: FormHeaderProps) {
  return (
    <div className={cn("mb-6", className)}>
      <div
        role="banner"
        aria-labelledby="form-title"
        className="p-0" // Removed card specific padding, adjust if necessary for alignment
      >
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          {/* Title and Step Info */}
          <div className="space-y-4 flex-1">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-1"
            >
              <h1
                id="form-title"
                className="text-2xl md:text-3xl font-bold tracking-tight text-white"
              >
                {formTitle}
              </h1>
              <p
                className="text-white/70"
                aria-live="polite"
                aria-atomic="true"
              >
                Step {currentStep} of {totalSteps}: {currentStepLabel}
              </p>
            </motion.div>
          </div>

          {/* Draft Save Button */}
          {!hideDraftButton && onSaveDraft && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    onClick={onSaveDraft}
                    disabled={isDraftSaving}
                    className="gap-2 whitespace-nowrap bg-white/10 border-white/20 text-white"
                    aria-label={isDraftSaving ? "Saving draft..." : "Save draft"}
                    aria-describedby="save-draft-tooltip"
                    aria-busy={isDraftSaving}
                  >
                    <AnimatePresence mode="wait">
                      {isDraftSaving ? (
                        <motion.div
                          key="saving"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          aria-hidden="true"
                        >
                          <Loader2 className="h-4 w-4 animate-spin" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="save"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          aria-hidden="true"
                        >
                          <Save className="h-4 w-4" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <span className="hidden sm:inline">
                      {isDraftSaving ? "Saving..." : "Save Draft"}
                    </span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  id="save-draft-tooltip"
                  className="bg-white/10 backdrop-blur-md border border-white/20 text-white"
                >
                  <p>Save your progress and continue later</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>
    </div>
  );
});

FormHeader.displayName = "FormHeader";
