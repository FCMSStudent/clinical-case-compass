
import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { StatusIndicator, StatusType } from "./StatusIndicator";

interface FieldGroupProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  children: React.ReactNode;
  className?: string;
  status?: StatusType;
  isExpanded?: boolean;
  onToggle?: () => void;
  completedFields?: number;
  totalFields?: number;
}

export const FieldGroup: React.FC<FieldGroupProps> = ({
  title,
  description,
  icon: Icon,
  children,
  className,
  status = "default",
  isExpanded = true,
  onToggle,
  completedFields,
  totalFields,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn("space-y-4", className)}
    >
      {/* Group Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 shadow-lg"></div>
        <div className="relative bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-4 group">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {Icon && (
                <div className="p-2 rounded-lg bg-blue-500/20 text-white border border-blue-400/30">
                  <Icon className="h-4 w-4" />
                </div>
              )}
              <div>
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  {title}
                  <StatusIndicator status={status} size="sm" />
                </h3>
                {description && (
                  <p className="text-sm text-white/70 mt-1">{description}</p>
                )}
                {completedFields !== undefined && totalFields !== undefined && (
                  <p className="text-xs text-white/60 mt-1">
                    {completedFields} of {totalFields} fields completed
                  </p>
                )}
              </div>
            </div>
            {onToggle && (
              <button
                onClick={onToggle}
                className="text-white/70 hover:text-white transition-colors"
                aria-label={isExpanded ? "Collapse section" : "Expand section"}
              >
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.div>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Group Content */}
      <motion.div
        initial={false}
        animate={{
          height: isExpanded ? "auto" : 0,
          opacity: isExpanded ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="pl-4 border-l-2 border-white/10 space-y-6">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
};
