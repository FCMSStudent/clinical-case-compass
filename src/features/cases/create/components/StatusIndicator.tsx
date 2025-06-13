
import React from "react";
import { CheckCircle2, AlertCircle, Clock, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type StatusType = "default" | "success" | "warning" | "error" | "loading";

interface StatusIndicatorProps {
  status: StatusType;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const statusConfig = {
  default: {
    icon: null,
    color: "text-white/40",
    bgColor: "bg-white/10",
    borderColor: "border-white/20",
  },
  success: {
    icon: CheckCircle2,
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/20",
    borderColor: "border-emerald-400/30",
  },
  warning: {
    icon: AlertCircle,
    color: "text-amber-400",
    bgColor: "bg-amber-500/20",
    borderColor: "border-amber-400/30",
  },
  error: {
    icon: X,
    color: "text-red-400",
    bgColor: "bg-red-500/20",
    borderColor: "border-red-400/30",
  },
  loading: {
    icon: Clock,
    color: "text-blue-400",
    bgColor: "bg-blue-500/20",
    borderColor: "border-blue-400/30",
  },
} as const;

const sizeConfig = {
  sm: "h-5 w-5",
  md: "h-6 w-6",
  lg: "h-8 w-8",
} as const;

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  className,
  size = "md",
}) => {
  const config = statusConfig[status];
  const Icon = config.icon;

  if (!Icon) {
    return (
      <div
        className={cn(
          "rounded-full border",
          config.bgColor,
          config.borderColor,
          sizeConfig[size],
          className
        )}
      />
    );
  }

  return (
    <div
      className={cn(
        "rounded-full border flex items-center justify-center",
        config.bgColor,
        config.borderColor,
        sizeConfig[size],
        className
      )}
    >
      <Icon className={cn("h-3 w-3", config.color)} />
    </div>
  );
};
