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
    className="mb-8"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 group overflow-hidden transition-all duration-300 hover:bg-white/15 hover:border-white/30">
      <div className="flex items-center gap-4">
        <div className="bg-white/20 text-white border border-white/20 p-3 rounded-xl">
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
          <p className="text-white/70 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
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
  <Card className="mb-6 bg-white/10 backdrop-blur-md border-white/20 shadow-lg hover:shadow-xl transition-shadow">
    <CardHeader className="pb-3">
      <div className="flex items-center gap-3">
        <div className="bg-white/20 text-white border border-white/20 p-2 rounded-lg">
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-white flex items-center gap-2">
            {title}
            {isRequired && <Badge variant="destructive" className="text-xs">Required</Badge>}
          </h3>
          {tooltip && (
            <p className="text-sm text-white/70 mt-1">{tooltip}</p>
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle2 className="h-4 w-4 text-green-400" />;
      case 'error': return <AlertCircle className="h-4 w-4 text-red-400" />;
      case 'warning': return <Clock className="h-4 w-4 text-yellow-400" />;
      default: return <Circle className="h-4 w-4 text-white/60" />;
    }
  };

  return (
    <Card className={`mb-6 bg-white/10 backdrop-blur-md border-white/20 shadow-lg hover:shadow-xl transition-shadow ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 text-white border border-white/20 p-2 rounded-lg">
            <Icon className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-white flex items-center gap-2">
              {title}
              {isRequired && <Badge variant="destructive" className="text-xs">Required</Badge>}
              {getStatusIcon(determinedStatus)}
            </h3>
            {tooltip && (
              <p className="text-sm text-white/70 mt-1">{tooltip}</p>
            )}
            {description && (
              <p className="text-sm text-white/70 mt-1">{description}</p>
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
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle2 className="h-4 w-4 text-green-400" />;
      case 'error': return <AlertCircle className="h-4 w-4 text-red-400" />;
      case 'warning': return <Clock className="h-4 w-4 text-yellow-400" />;
      default: return <Circle className="h-4 w-4 text-white/60" />;
    }
  };

  const progressPercentage = totalFields > 0 ? (completedFields / totalFields) * 100 : 0;

  return (
    <Card className="mb-6 bg-white/10 backdrop-blur-md border-white/20 shadow-lg hover:shadow-xl transition-all duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 text-white border border-white/20 p-2 rounded-lg">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-white flex items-center gap-2">
                {title}
                {getStatusIcon(status)}
              </h3>
              <p className="text-sm text-white/70">{description}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-white/80">
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
        isValid ? 'text-green-400' : 'text-red-400'
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

// Form Header Component - Import from separate file
export { FormHeader } from "../FormHeader";

// Form Navigation Component - Import from separate file  
export { FormNavigation } from "../FormNavigation";

// Enhanced Form Header Component (alias for compatibility)
export const EnhancedFormHeader = FormHeader;

// Enhanced Form Navigation Component (alias for compatibility)
export const EnhancedFormNavigation = FormNavigation;
