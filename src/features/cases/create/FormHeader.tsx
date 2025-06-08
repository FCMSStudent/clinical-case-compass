import React, { memo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Loader2, Save, FileText, Sparkles } from "lucide-react";
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
 * Beautiful header component for multi-step forms with modern glass-morphism design
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
      <Card className={cn(
        "bg-gradient-to-br from-white/80 to-gray-50/80 backdrop-blur-sm border-0 shadow-xl overflow-hidden",
        className
      )}>
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 to-purple-600/5"></div>
        <CardContent className="relative p-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            {/* Main Content */}
            <div className="space-y-4 flex-1">
              {/* Title Section */}
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    Create New Clinical Case
                  </h1>
                  <p className="text-gray-600 text-sm mt-1">
                    Build comprehensive medical case studies for education and reference
                  </p>
                </div>
              </div>

              {/* Progress Section */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-6 text-sm">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-200">
                    <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                    <span className="font-medium text-indigo-700">
                      Step {currentStep} of {totalSteps}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 border border-green-200">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-green-700">
                      {completionPercentage}% Complete
                    </span>
                  </div>

                  {isDraftSaving && (
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200">
                      <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                      <span className="font-medium text-blue-700">Saving...</span>
                    </div>
                  )}
                </div>

                {/* Current Step Label */}
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-purple-500" />
                  <span className="text-lg font-semibold text-gray-800">
                    {currentStepLabel}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="relative">
                  <div className="h-3 w-full rounded-full bg-gray-200 overflow-hidden shadow-inner">
                    <div 
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-700 ease-out rounded-full shadow-sm"
                      style={{ width: `${completionPercentage}%` }}
                    >
                      <div className="h-full w-full bg-gradient-to-r from-white/20 to-transparent rounded-full"></div>
                    </div>
                  </div>
                  <div className="absolute top-0 left-0 w-full h-full rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                </div>
              </div>
            </div>

            {/* Save Draft Button */}
            {showSave && (
              <div className="flex-shrink-0">
                <Button
                  type="button"
                  onClick={onSaveDraft}
                  disabled={isDraftSaving}
                  variant="outline"
                  size="lg"
                  className="relative overflow-hidden border-2 border-gray-200 hover:border-indigo-300 bg-white/80 backdrop-blur-sm hover:bg-indigo-50/80 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5"></div>
                  <div className="relative flex items-center gap-2">
                    {isDraftSaving ? (
                      <Loader2 className="h-4 w-4 animate-spin text-indigo-600" />
                    ) : (
                      <Save className="h-4 w-4 text-indigo-600" />
                    )}
                    <span className
