import React, { memo, useState } from "react";
import { 
  FileText, 
  Stethoscope, 
  Tag, 
  AlertCircle, 
  User, 
  Calendar, 
  UserCheck,
  ChevronLeft, 
  ChevronRight, 
  Save, 
  Loader2, 
  Keyboard,
  CheckCircle,
  Clock,
  Target,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";

// Enhanced Step Header Component
export const StepHeader = memo(({ title, description, icon: Icon }) => (
  <div className="relative overflow-hidden">
    {/* Animated background gradient */}
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-pulse rounded-2xl" />
    
    <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 shadow-2xl">
      <div className="flex items-start gap-6">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl blur-lg opacity-60 animate-pulse" />
          <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-2xl shadow-xl">
            <Icon className="h-8 w-8 text-white" />
          </div>
        </div>
        
        <div className="flex-1 space-y-3">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
            {title}
          </h2>
          <p className="text-white/70 text-lg leading-relaxed max-w-2xl">
            {description}
          </p>
        </div>
      </div>
    </div>
  </div>
));

// Enhanced Form Field Card
export const FormFieldCard = memo(({ icon: Icon, title, tooltip, isRequired, children }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div 
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated background effects */}
      <div className={`absolute inset-0 rounded-2xl transition-all duration-500 ${
        isHovered || isFocused 
          ? 'bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-xl scale-105' 
          : 'bg-white/5 blur-sm'
      }`} />
      
      <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 shadow-xl transition-all duration-300 hover:border-white/30 hover:shadow-2xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/50 to-purple-500/50 rounded-xl blur-md" />
            <div className="relative bg-gradient-to-br from-blue-500/80 to-purple-600/80 p-3 rounded-xl backdrop-blur-sm">
              <Icon className="h-5 w-5 text-white" />
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-white">{title}</h3>
              {isRequired && (
                <span className="px-2 py-1 text-xs font-medium bg-red-500/20 text-red-300 rounded-full border border-red-500/30">
                  Required
                </span>
              )}
            </div>
            {tooltip && (
              <p className="text-sm text-white/60 mt-1">{tooltip}</p>
            )}
          </div>
        </div>

        {/* Content */}
        <div onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)}>
          {children}
        </div>
      </div>
    </div>
  );
});

// Enhanced Status Field Card
export const StatusFieldCard = memo(({ icon: Icon, title, tooltip, isRequired, fieldValue, hasError, children }: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  tooltip?: string;
  isRequired?: boolean;
  fieldValue?: string | number | undefined;
  hasError?: boolean;
  children: React.ReactNode;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const getStatusIcon = () => {
    if (hasError) return <AlertCircle className="h-4 w-4 text-red-400" />;
    if (fieldValue) return <CheckCircle className="h-4 w-4 text-green-400" />;
    return <Clock className="h-4 w-4 text-yellow-400" />;
  };

  const getStatusColor = () => {
    if (hasError) return 'from-red-500/20 to-red-600/20 border-red-500/30';
    if (fieldValue) return 'from-green-500/20 to-emerald-600/20 border-green-500/30';
    return 'from-yellow-500/20 to-amber-600/20 border-yellow-500/30';
  };

  return (
    <div 
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${getStatusColor()} rounded-2xl transition-all duration-300 ${
        isHovered ? 'scale-105 blur-lg opacity-60' : 'scale-100 blur-sm opacity-40'
      }`} />
      
      <div className="relative bg-white/8 backdrop-blur-xl rounded-2xl border border-white/20 p-5 transition-all duration-300 hover:border-white/40">
        {/* Header with status */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/40 to-purple-500/40 rounded-lg blur-sm" />
              <div className="relative bg-white/10 p-2 rounded-lg backdrop-blur-sm">
                <Icon className="h-4 w-4 text-white" />
              </div>
            </div>
            
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-medium text-white">{title}</h4>
                {isRequired && (
                  <span className="text-xs text-red-300">*</span>
                )}
              </div>
              {tooltip && (
                <p className="text-xs text-white/50 mt-1">{tooltip}</p>
              )}
            </div>
          </div>
          
          {getStatusIcon()}
        </div>

        {children}
      </div>
    </div>
  );
});

// Enhanced Field Group
export const FieldGroup = memo(({ title, description, icon: Icon, status, completedFields, totalFields, children }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  
  const getStatusColor = () => {
    switch (status) {
      case 'success': return 'from-green-500 to-emerald-600';
      case 'error': return 'from-red-500 to-red-600';
      default: return 'from-blue-500 to-purple-600';
    }
  };

  return (
    <div className="relative">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 rounded-3xl" />
      
      <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-6 shadow-2xl">
        {/* Group Header */}
        <div 
          className="flex items-center justify-between p-4 cursor-pointer hover:bg-white/5 rounded-2xl transition-all duration-200"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className={`absolute inset-0 bg-gradient-to-br ${getStatusColor()} rounded-xl blur-md opacity-60`} />
              <div className={`relative bg-gradient-to-br ${getStatusColor()} p-3 rounded-xl`}>
                <Icon className="h-5 w-5 text-white" />
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-white">{title}</h3>
              <p className="text-white/60 text-sm">{description}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Progress indicator */}
            <div className="flex items-center gap-2">
              <div className="text-sm text-white/70">
                {completedFields}/{totalFields}
              </div>
              <div className="w-20 h-2 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${getStatusColor()} transition-all duration-500`}
                  style={{ width: `${(completedFields / totalFields) * 100}%` }}
                />
              </div>
            </div>
            
            <ChevronRight className={`h-5 w-5 text-white/60 transition-transform duration-200 ${
              isExpanded ? 'rotate-90' : ''
            }`} />
          </div>
        </div>

        {/* Content */}
        {isExpanded && (
          <div className="mt-6 space-y-6 animate-in slide-in-from-top-2 duration-300">
            {children}
          </div>
        )}
      </div>
    </div>
  );
});

// Enhanced Validation Feedback
export const ValidationFeedback = memo(({ isValid, message, id }) => {
  if (!message) return null;
  
  return (
    <div className={`flex items-center gap-2 mt-2 text-sm transition-all duration-200 ${
      isValid ? 'text-green-300' : 'text-red-300'
    }`} id={id}>
      {isValid ? (
        <CheckCircle className="h-4 w-4" />
      ) : (
        <AlertCircle className="h-4 w-4" />
      )}
      <span>{message}</span>
    </div>
  );
});

// Enhanced Form Header
export const EnhancedFormHeader = memo(({ 
  currentStep, 
  totalSteps, 
  completionPercentage, 
  isDraftSaving, 
  onSaveDraft, 
  currentStepLabel, 
  formTitle = "Create New Clinical Case" 
}) => {
  return (
    <div className="relative mb-8">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 rounded-3xl blur-xl animate-pulse" />
      
      <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl p-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Title and Progress */}
          <div className="flex-1 space-y-6">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                {formTitle}
              </h1>
              <p className="text-white/70 text-lg">{currentStepLabel}</p>
            </div>

            {/* Enhanced Progress Bar */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white">Overall Progress</span>
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-blue-400" />
                  <span className="text-white/80 font-medium">{completionPercentage}%</span>
                </div>
              </div>
              
              <div className="relative h-3 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${completionPercentage}%` }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full" />
              </div>
              
              <div className="text-xs text-white/60">
                Step {currentStep} of {totalSteps} completed
              </div>
            </div>
          </div>

          {/* Draft Save Button */}
          {onSaveDraft && (
            <button
              onClick={onSaveDraft}
              disabled={isDraftSaving}
              className="relative group px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 rounded-2xl backdrop-blur-sm transition-all duration-200 disabled:opacity-50"
            >
              <div className="flex items-center gap-3">
                {isDraftSaving ? (
                  <Loader2 className="h-5 w-5 animate-spin text-white" />
                ) : (
                  <Save className="h-5 w-5 text-white" />
                )}
                <span className="text-white font-medium">
                  {isDraftSaving ? "Saving..." : "Save Draft"}
                </span>
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
});

// Enhanced Form Navigation
export const EnhancedFormNavigation = memo(({ 
  currentStep, 
  totalSteps, 
  currentStepLabel, 
  isSubmitting, 
  onPrevious, 
  onNext, 
  onSaveAndExit, 
  submitLabel = "Submit Case" 
}) => {
  const isFirst = currentStep === 1;
  const isLast = currentStep === totalSteps;
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="sticky bottom-0 z-50 p-4">
      <div className="relative bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 shadow-2xl p-6">
        {/* Progress indicator */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold text-white">Step {currentStep} of {totalSteps}</span>
            <span className="text-white/70">{currentStepLabel}</span>
          </div>
          
          <div className="relative h-2 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Previous button */}
            <button
              onClick={onPrevious}
              disabled={isFirst || isSubmitting}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 rounded-xl backdrop-blur-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Previous</span>
            </button>

            {/* Save and Exit button */}
            {onSaveAndExit && (
              <button
                onClick={onSaveAndExit}
                disabled={isSubmitting}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 rounded-xl backdrop-blur-sm transition-all duration-200 disabled:opacity-50"
              >
                <Save className="h-4 w-4" />
                <span>Save & Exit</span>
              </button>
            )}
          </div>

          {/* Next/Submit button */}
          <button
            onClick={onNext}
            disabled={isSubmitting}
            className={`relative group flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 disabled:opacity-50 ${
              isLast 
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg' 
                : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg'
            }`}
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : isLast ? (
              <Sparkles className="h-4 w-4" />
            ) : (
              <ArrowRight className="h-4 w-4" />
            )}
            <span>{isLast ? submitLabel : "Next"}</span>
          </button>
        </div>

        {/* Keyboard shortcuts hint */}
        <div className="mt-4 flex items-center gap-2 text-xs text-white/50">
          <Keyboard className="h-3 w-3" />
          <span>Tip: Use Alt + ←/→ to navigate, Alt + S to save</span>
        </div>
      </div>
    </div>
  );
}); 