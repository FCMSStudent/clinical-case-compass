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
      <Card className="border-2 bg-gradient-to-br from-slate-50 to-slate-100/50">
        <CardContent className="p-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            {/* Title and Progress */}
            <div className="space-y-4 flex-1">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-1"
              >
                <h1 className="text-2xl font-bold tracking-tight">{formTitle}</h1>
                <p className="text-muted-foreground">
                  {currentStepLabel}
                </p>
              </motion.div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Overall Progress</span>
                  <span className="text-muted-foreground">{completionPercentage}%</span>
                </div>
                <Progress value={completionPercentage} className="h-2" />
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
                      className="gap-2 whitespace-nowrap"
                    >
                      <AnimatePresence mode="wait">
                        {isDraftSaving ? (
                          <motion.div
                            key="saving"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            <Loader2 className="h-4 w-4 animate-spin" />
                          </motion.div>
                        ) : (
                          <motion.div
                            key="save"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
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
                  <TooltipContent>
                    <p>Save your progress and continue later</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Step Indicator */}
      <div className="grid grid-cols-4 gap-2 md:gap-4">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1;
          const isCurrent = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          const isUpcoming = stepNumber > currentStep;

          return (
            <motion.div
              key={stepNumber}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "relative flex items-center justify-center rounded-lg border-2 p-3 text-sm font-medium transition-colors",
                isCurrent && "border-primary bg-primary/5 text-primary",
                isCompleted && "border-emerald-500 bg-emerald-50 text-emerald-700",
                isUpcoming && "border-muted bg-muted/5 text-muted-foreground"
              )}
            >
              <AnimatePresence mode="wait">
                {isCompleted ? (
                  <motion.div
                    key="completed"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <CheckCircle className="h-5 w-5 text-emerald-500" />
                  </motion.div>
                ) : isCurrent ? (
                  <motion.div
                    key="current"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className="flex items-center gap-2"
                  >
                    <span className="text-primary font-medium">Current</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="upcoming"
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2"
                  >
                    <span className="text-muted-foreground">Upcoming</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Progress Line */}
              {stepNumber < totalSteps && (
                <div
                  className={cn(
                    "absolute top-1/2 -right-[calc(0.5rem+1px)] h-0.5 w-[calc(100%+1rem)] -translate-y-1/2",
                    isCompleted ? "bg-emerald-500" : "bg-muted"
                  )}
                />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
});

FormHeader.displayName = "FormHeader";
