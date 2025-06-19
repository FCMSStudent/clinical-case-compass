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
  status?: StatusType; // Explicit status prop
  badge?: string;
  isCollapsible?: boolean;
  defaultCollapsed?: boolean;
  footer?: React.ReactNode;
  onStatusChange?: (status: StatusType) => void;
  actions?: React.ReactNode;
  isHighlighted?: boolean;
  isDisabled?: boolean;
  fieldValue?: any; // Used for auto-status determination
  hasError?: boolean; // Used for auto-status determination
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
  const determinedStatus = React.useMemo((): StatusType => {
    if (propStatus) return propStatus;
    
    if (hasError) return "error";
    
    if (fieldValue !== undefined && fieldValue !== null && fieldValue !== "") {
      if (Array.isArray(fieldValue) && fieldValue.length > 0) return "success";
      if (typeof fieldValue === "string" && fieldValue.trim().length > 0) return "success";
      if (typeof fieldValue === 'object' && !Array.isArray(fieldValue) && fieldValue !== null && Object.keys(fieldValue).length > 0) return "success";
      if (typeof fieldValue === "number") return "success"; // Allow 0 for numbers unless specific validation says otherwise
    }
    
    return "default";
  }, [propStatus, hasError, fieldValue]);

  const formFieldCardStatus = React.useMemo(() => {
    switch (determinedStatus) {
      case "loading":
        return "default"; // FormFieldCard might not have a distinct "loading" visual state other than default
      case "success":
        return "success";
      case "error":
        return "error";
      case "warning":
        return "warning";
      default:
        return "default";
    }
  }, [determinedStatus]);

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
        className
      )}
      status={formFieldCardStatus}
      badge={badge}
      isCollapsible={isCollapsible}
      defaultCollapsed={defaultCollapsed}
      footer={footer}
      actions={enhancedActions}
      isHighlighted={isHighlighted}
      isDisabled={isDisabled}
      {...props}
    >
      {children}
    </FormFieldCard>
  );
};
