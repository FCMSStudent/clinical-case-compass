
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  Save, 
  ArrowLeft, 
  ArrowRight,
  AlertCircle,
  Info,
  LucideIcon
} from "lucide-react";

interface StepHeaderProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

interface FormFieldCardProps {
  icon: LucideIcon;
  title: string;
  tooltip?: string;
  isRequired?: boolean;
  children: React.ReactNode;
}

interface StatusFieldCardProps {
  title: string;
  description?: string;
  icon: LucideIcon;
  status?: string;
  completedFields?: number;
  totalFields?: number;
  children: React.ReactNode;
  tooltip?: string;
  isRequired?: boolean;
  fieldValue?: any;
  hasError?: boolean;
  className?: string;
  badge?: string;
  isCollapsible?: boolean;
  defaultCollapsed?: boolean;
  footer?: React.ReactNode;
  onStatusChange?: (status: string) => void;
  actions?: React.ReactNode;
  isHighlighted?: boolean;
  isDisabled?: boolean;
}

interface ValidationFeedbackProps {
  isValid: boolean;
  message: string;
  id?: string;
}

interface FormHeaderProps {
  currentStep: number;
  totalSteps: number;
  completionPercentage: number;
  isDraftSaving: boolean;
  onSaveDraft: () => void;
  currentStepLabel: string;
  formTitle: string;
}

interface FormNavigationProps {
  currentStep: number;
  totalSteps: number;
  currentStepLabel: string;
  isSubmitting: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSaveAndExit: () => void;
  submitLabel?: string;
}

interface FieldGroupProps {
  title: string;
  description: string;
  icon: LucideIcon;
  status: string;
  completedFields: number;
  totalFields: number;
  children: React.ReactNode;
}

// Step Header Component
export const StepHeader: React.FC<StepHeaderProps> = ({ title, description, icon: Icon }) => (
  <motion.div 
    className="text-center mb-8"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-center justify-center mb-4">
      <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
        <Icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
      </div>
    </div>
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{title}</h2>
    <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">{description}</p>
  </motion.div>
);

// Form Field Card Component
export const FormFieldCard: React.FC<FormFieldCardProps> = ({ 
  icon: Icon, 
  title, 
  tooltip, 
  isRequired = false, 
  children 
}) => (
  <Card className="mb-6 border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-shadow">
    <CardHeader className="pb-3">
      <div className="flex items-center gap-3">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg">
          <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            {title}
            {isRequired && <Badge variant="destructive" className="text-xs">Required</Badge>}
          </h3>
          {tooltip && (
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{tooltip}</p>
          )}
        </div>
      </div>
    </CardHeader>
    <CardContent className="pt-0">
      {children}
    </CardContent>
  </Card>
);

// Status Field Card Component - Enhanced version that supports all the props being used
export const StatusFieldCard: React.FC<StatusFieldCardProps> = ({ 
  title, 
  description, 
  icon: Icon, 
  status = "default", 
  completedFields = 0, 
  totalFields = 1, 
  children,
  tooltip,
  isRequired = false,
  fieldValue,
  hasError = false,
  className = "",
  ...rest
}) => {
  // Auto-determine status based on field state if not explicitly provided
  const determinedStatus = React.useMemo(() => {
    if (status !== "default") return status;
    
    if (hasError) return "error";
    
    if (fieldValue !== undefined && fieldValue !== null && fieldValue !== "") {
      if (Array.isArray(fieldValue) && fieldValue.length > 0) return "success";
      if (typeof fieldValue === "string" && fieldValue.trim().length > 0) return "success";
      if (typeof fieldValue === "object" && Object.keys(fieldValue).length > 0) return "success";
      if (typeof fieldValue === "number" && fieldValue > 0) return "success";
    }
    
    return "default";
  }, [status, hasError, fieldValue]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      case 'error': return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      case 'warning': return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
      default: return 'bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case 'error': return <AlertCircle className="h-4 w-4 text-red-600" />;
      case 'warning': return <Clock className="h-4 w-4 text-yellow-600" />;
      default: return <Circle className="h-4 w-4 text-gray-400" />;
    }
  };

  const progressPercentage = totalFields > 0 ? (completedFields / totalFields) * 100 : 0;

  return (
    <Card className={`mb-6 border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-shadow ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg">
            <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              {title}
              {isRequired && <Badge variant="destructive" className="text-xs">Required</Badge>}
              {getStatusIcon(determinedStatus)}
            </h3>
            {tooltip && (
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{tooltip}</p>
            )}
            {description && (
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{description}</p>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {children}
      </CardContent>
    </Card>
  );
};

// Field Group Component
export const FieldGroup: React.FC<FieldGroupProps> = ({ 
  title, 
  description, 
  icon: Icon, 
  status, 
  completedFields, 
  totalFields, 
  children 
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      case 'error': return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      case 'warning': return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
      default: return 'bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case 'error': return <AlertCircle className="h-4 w-4 text-red-600" />;
      case 'warning': return <Clock className="h-4 w-4 text-yellow-600" />;
      default: return <Circle className="h-4 w-4 text-gray-400" />;
    }
  };

  const progressPercentage = totalFields > 0 ? (completedFields / totalFields) * 100 : 0;

  return (
    <Card className={`mb-6 border-2 ${getStatusColor(status)} transition-all duration-200 hover:shadow-md`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-sm">
              <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                {title}
                {getStatusIcon(status)}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {completedFields}/{totalFields} fields
            </div>
            <div className="w-16 mt-1">
              <Progress value={progressPercentage} className="h-2" />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {children}
      </CardContent>
    </Card>
  );
};

// Validation Feedback Component
export const ValidationFeedback: React.FC<ValidationFeedbackProps> = ({ isValid, message, id }) => {
  if (!message) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-center gap-2 mt-2 text-sm ${
        isValid ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
      }`}
      id={id}
    >
      {isValid ? (
        <CheckCircle2 className="h-4 w-4" />
      ) : (
        <AlertCircle className="h-4 w-4" />
      )}
      <span>{message}</span>
    </motion.div>
  );
};

// Form Header Component
export const FormHeader: React.FC<FormHeaderProps> = ({
  currentStep,
  totalSteps,
  completionPercentage,
  isDraftSaving,
  onSaveDraft,
  currentStepLabel,
  formTitle
}) => (
  <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{formTitle}</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Step {currentStep} of {totalSteps}: {currentStepLabel}
          </p>
        </div>
        <Button 
          variant="outline" 
          onClick={onSaveDraft}
          disabled={isDraftSaving}
          className="flex items-center gap-2"
        >
          <Save className="h-4 w-4" />
          {isDraftSaving ? 'Saving...' : 'Save Draft'}
        </Button>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
          <span>Progress</span>
          <span>{Math.round(completionPercentage)}% complete</span>
        </div>
        <Progress value={completionPercentage} className="h-2" />
      </div>
    </div>
  </div>
);

// Enhanced Form Header Component (alias for compatibility)
export const EnhancedFormHeader = FormHeader;

// Form Navigation Component
export const FormNavigation: React.FC<FormNavigationProps> = ({
  currentStep,
  totalSteps,
  currentStepLabel,
  isSubmitting,
  onPrevious,
  onNext,
  onSaveAndExit,
  submitLabel = "Submit Case"
}) => (
  <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-6 py-4">
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {currentStep > 1 && (
            <Button
              variant="outline"
              onClick={onPrevious}
              disabled={isSubmitting}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </Button>
          )}
          
          <Button
            variant="ghost"
            onClick={onSaveAndExit}
            disabled={isSubmitting}
            className="text-gray-600 dark:text-gray-300"
          >
            Save & Exit
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600 dark:text-gray-300">
            Step {currentStep} of {totalSteps}
          </span>
          
          <Button
            onClick={onNext}
            disabled={isSubmitting}
            className="flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Processing...
              </>
            ) : currentStep === totalSteps ? (
              submitLabel
            ) : (
              <>
                Next
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  </div>
);

// Enhanced Form Navigation Component (alias for compatibility)
export const EnhancedFormNavigation = FormNavigation;
