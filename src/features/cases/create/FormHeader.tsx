import React, { memo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Save, CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
export const FormHeader = memo(function FormHeader({
  currentStep,
  totalSteps,
  completionPercentage,
  isDraftSaving = false,
  onSaveDraft,
  currentStepLabel,
  hideDraftButton = false,
  className,
  formTitle = "Create New Clinical Case",
}: FormHeaderProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {/* Main Header Card */}
      <div className="relative">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl" aria-hidden="true"></div>
        <div 
          className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6"
          role="banner"
          aria-labelledby="form-title"
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            {/* Title and Progress */}
            <div className="space-y-4 flex-1">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-1"
              >
                <h1 
                  id="form-title"
                  className="text-2xl font-bold tracking-tight text-white"
                >
                  {formTitle}
                </h1>
                <p 
                  className="text-white/70"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {currentStepLabel}
                </p>
              </motion.div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-white">Overall Progress</span>
                  <span 
                    className="text-white/70"
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    {completionPercentage}%
                  </span>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-white/20 rounded-full" aria-hidden="true"></div>
                  <div 
                    className="relative h-2 bg-white/30 rounded-full overflow-hidden"
                    style={{ width: `${completionPercentage}%` }}
                    role="progressbar"
                    aria-label={`Form completion progress: ${completionPercentage}%`}
                    aria-valuenow={completionPercentage}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuetext={`${completionPercentage}% complete`}
                  >
                    <div className="absolute inset-0 bg-white/60 rounded-full" aria-hidden="true"></div>
                  </div>
                </div>
              </div>
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
                      className="gap-2 whitespace-nowrap bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white"
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
    </div>
  );
});

FormHeader.displayName = "FormHeader";
