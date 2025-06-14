
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { CheckCircle2, AlertCircle, Clock, ChevronRight } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

interface StepProgressProps {
  completedFields: number;
  totalFields: number;
  label?: string;
  className?: string;
  showPercentage?: boolean;
  status?: "default" | "success" | "warning" | "error";
  showIcon?: boolean;
  showTooltip?: boolean;
  showBadge?: boolean;
  showSteps?: boolean;
  steps?: Array<{
    label: string;
    isCompleted: boolean;
    isCurrent?: boolean;
  }>;
  onStepClick?: (index: number) => void;
  estimatedTime?: string;
  lastUpdated?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "gradient" | "minimal";
}

const statusStyles = {
  default: "bg-blue-100 text-blue-700",
  success: "bg-emerald-100 text-emerald-700",
  warning: "bg-amber-100 text-amber-700",
  error: "bg-red-100 text-red-700",
} as const;

const statusIcons = {
  default: Clock,
  success: CheckCircle2,
  warning: AlertCircle,
  error: AlertCircle,
} as const;

const sizeStyles = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
} as const;

const variantStyles = {
  default: "bg-white border shadow-sm",
  gradient: "bg-gradient-to-r from-blue-50 to-indigo-50 border shadow-sm",
  minimal: "bg-transparent border-none shadow-none",
} as const;

export const StepProgress = React.memo(function StepProgress({
  completedFields,
  totalFields,
  label = "Step Progress",
  className,
  showPercentage = true,
  status = "default",
  showIcon = true,
  showTooltip = true,
  showBadge = true,
  showSteps = false,
  steps,
  onStepClick,
  estimatedTime,
  lastUpdated,
  size = "md",
  variant = "default",
}: StepProgressProps) {
  const percentage = Math.round((completedFields / totalFields) * 100);
  const Icon = statusIcons[status];
  
  const getStatusMessage = () => {
    if (percentage === 100) return "All fields completed!";
    if (percentage === 0) return "No fields completed yet";
    if (status === "warning") return "Some fields need attention";
    if (status === "error") return "Please fix the errors";
    return `${completedFields} of ${totalFields} fields completed`;
  };

  const progressColor = React.useMemo(() => {
    if (percentage === 100) return "bg-emerald-500";
    if (status === "error") return "bg-red-500";
    if (status === "warning") return "bg-amber-500";
    return "bg-blue-500";
  }, [percentage, status]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={className}
    >
      <div className="relative">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl"></div>
        <div className={cn(
          "relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-4 group overflow-hidden transition-all duration-300 before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent before:translate-x-[-100%] before:transition-transform before:duration-700"
        )}
        >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {showIcon && Icon && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={cn(
                  "p-1.5 rounded-full",
                  statusStyles[status]
                )}
              >
                <Icon className={cn("h-4 w-4", sizeStyles[size])} />
              </motion.div>
            )}
            <div className="flex items-center gap-2">
              <span className={cn("font-medium text-white", sizeStyles[size])}>
                {label}
              </span>
              {showBadge && (
                <Badge
                  variant="outline"
                  className={cn(
                    "ml-2 bg-white/10 border-white/20 text-white",
                    status === "success" && "border-emerald-200/50 text-emerald-300",
                    status === "warning" && "border-amber-200/50 text-amber-300",
                    status === "error" && "border-red-200/50 text-red-300"
                  )}
                >
                  {percentage}%
                </Badge>
              )}
            </div>
          </div>
          <div className="flex items-center gap-4">
            {estimatedTime && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className={cn("text-white/70", sizeStyles[size])}>
                      Est. time: {estimatedTime}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Estimated time to complete this step</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            {lastUpdated && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className={cn("text-white/70", sizeStyles[size])}>
                      Updated: {lastUpdated}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Last updated timestamp</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            {showPercentage ? (
              <span className={cn("text-white/70", sizeStyles[size])}>
                {percentage}% Complete
              </span>
            ) : (
              <span className={cn("text-white/70", sizeStyles[size])}>
                {completedFields} of {totalFields} fields completed
              </span>
            )}
            {showTooltip && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className={cn("text-white/70 cursor-help", sizeStyles[size])}>
                      {getStatusMessage()}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{getStatusMessage()}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          <div className="relative">
            <Progress 
              value={percentage} 
              className={cn(
                "h-2 transition-all duration-300",
                progressColor,
                percentage === 100 && "bg-emerald-100"
              )}
            />
            <AnimatePresence>
              {percentage === 100 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute -right-2 -top-1"
                >
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {showSteps && steps && (
          <div className="mt-4 space-y-2">
            {steps.map((step, index) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "flex items-center gap-2 p-2 rounded-lg transition-colors duration-200",
                  step.isCurrent && "bg-blue-50",
                  onStepClick && "cursor-pointer"
                )}
                onClick={() => onStepClick?.(index)}
              >
                <div className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center",
                  step.isCompleted 
                    ? "bg-emerald-100 text-emerald-600"
                    : step.isCurrent
                    ? "bg-blue-100 text-blue-600"
                    : "bg-gray-100 text-gray-400"
                )}>
                  {step.isCompleted ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <span className="text-xs">{index + 1}</span>
                  )}
                </div>
                <span className={cn(
                  "flex-1",
                  sizeStyles[size],
                  step.isCompleted ? "text-emerald-600" : "text-gray-600"
                )}>
                  {step.label}
                </span>
                {step.isCurrent && (
                  <ChevronRight className="h-4 w-4 text-blue-400" />
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
        </div>
      </div>
    </motion.div>
  );
});

StepProgress.displayName = "StepProgress";
