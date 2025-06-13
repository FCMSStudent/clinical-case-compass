
import React from "react";
import { LucideIcon } from "lucide-react";
import { FormFieldCard } from "./FormFieldCard";
import { StatusIndicator, StatusType } from "./StatusIndicator";
import { cn } from "@/lib/utils";

interface StatusFieldCardProps {
  icon: LucideIcon;
  title: string;
  tooltip?: string;
  isRequired?: boolean;
  children: React.ReactNode;
  className?: string;
  status?: StatusType;
  badge?: string;
  isCollapsible?: boolean;
  defaultCollapsed?: boolean;
  footer?: React.ReactNode;
  onStatusChange?: (status: StatusType) => void;
  actions?: React.ReactNode;
  isHighlighted?: boolean;
  isDisabled?: boolean;
  fieldValue?: any;
  hasError?: boolean;
}

export const StatusFieldCard: React.FC<StatusFieldCardProps> = ({
  icon,
  title,
  tooltip,
  isRequired,
  children,
  className,
  status: propStatus,
  badge,
  isCollapsible,
  defaultCollapsed,
  footer,
  onStatusChange,
  actions,
  isHighlighted,
  isDisabled,
  fieldValue,
  hasError,
  ...props
}) => {
  // Auto-determine status based on field state if not explicitly provided
  const determinedStatus = React.useMemo((): StatusType => {
    if (propStatus) return propStatus;
    
    if (hasError) return "error";
    
    if (fieldValue !== undefined && fieldValue !== null && fieldValue !== "") {
      if (Array.isArray(fieldValue) && fieldValue.length > 0) return "success";
      if (typeof fieldValue === "string" && fieldValue.trim().length > 0) return "success";
      if (typeof fieldValue === "object" && Object.keys(fieldValue).length > 0) return "success";
      if (typeof fieldValue === "number" && fieldValue > 0) return "success";
    }
    
    return "default";
  }, [propStatus, hasError, fieldValue]);

  // Enhanced actions with status indicator
  const enhancedActions = (
    <div className="flex items-center gap-2">
      <StatusIndicator status={determinedStatus} size="sm" />
      {actions}
    </div>
  );

  return (
    <FormFieldCard
      icon={icon}
      title={title}
      tooltip={tooltip}
      isRequired={isRequired}
      className={cn(
        "transition-all duration-300",
        determinedStatus === "success" && "ring-1 ring-emerald-400/20",
        determinedStatus === "error" && "ring-1 ring-red-400/20",
        determinedStatus === "warning" && "ring-1 ring-amber-400/20",
        className
      )}
      status={determinedStatus}
      badge={badge}
      isCollapsible={isCollapsible}
      defaultCollapsed={defaultCollapsed}
      footer={footer}
      onStatusChange={onStatusChange}
      actions={enhancedActions}
      isHighlighted={isHighlighted}
      isDisabled={isDisabled}
      {...props}
    >
      {children}
    </FormFieldCard>
  );
};
