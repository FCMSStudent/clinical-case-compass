
import React from "react";
import { motion } from "framer-motion";
import { LucideIcon, Info, AlertCircle, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface FormFieldCardProps {
  icon: LucideIcon;
  title: string;
  tooltip?: string;
  isRequired?: boolean;
  children: React.ReactNode;
  className?: string;
  status?: "default" | "success" | "warning" | "error";
  badge?: string;
  isCollapsible?: boolean;
  defaultCollapsed?: boolean;
  footer?: React.ReactNode;
  onStatusChange?: (status: FormFieldCardProps["status"]) => void;
  actions?: React.ReactNode;
  isHighlighted?: boolean;
  isDisabled?: boolean;
}

const statusIcons = {
  default: null,
  success: <CheckCircle2 className="h-4 w-4 text-emerald-400" />,
  warning: <AlertCircle className="h-4 w-4 text-amber-400" />,
  error: <AlertCircle className="h-4 w-4 text-red-400" />,
} as const;

const statusMessages = {
  default: "",
  success: "All validations passed",
  warning: "Some fields need attention",
  error: "Please fix the errors",
} as const;

export const FormFieldCard = React.memo(function FormFieldCard({
  icon: Icon,
  title,
  tooltip,
  isRequired,
  children,
  className,
  status = "default",
  badge,
  isCollapsible = false,
  defaultCollapsed = false,
  footer,
  onStatusChange,
  actions,
  isHighlighted = false,
  isDisabled = false,
}: FormFieldCardProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);

  const cardId = React.useId();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      <div
        className={cn(
          "bg-slate-800/60 backdrop-blur-sm rounded-xl border border-slate-600/50 p-4 transition-all hover:bg-slate-700/60 hover:border-slate-500/70",
          isHighlighted && "ring-2 ring-blue-400/30",
          isDisabled && "opacity-50 cursor-not-allowed"
        )}
        role="group"
        aria-labelledby={`${cardId}-title`}
        aria-describedby={tooltip ? `${cardId}-tooltip` : undefined}
        aria-disabled={isDisabled}
      >
        <Collapsible open={!isCollapsible || !isCollapsed} onOpenChange={setIsCollapsed}>
          <div className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="h-8 w-8 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300 transition-all duration-300"
                  aria-hidden="true"
                >
                  <Icon className="h-4 w-4 relative z-10" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-lg font-semibold flex items-center gap-2 text-slate-100">
                    <span id={`${cardId}-title`}>
                      {title}
                      {isRequired && (
                        <span className="text-red-300 text-sm" aria-label="required">*</span>
                      )}
                    </span>
                  </div>
                  {badge && (
                    <Badge
                      variant="outline"
                      aria-label={`Status: ${badge}`}
                      className="ml-2 bg-blue-500/20 border-blue-400/30 text-white"
                    >
                      {badge}
                    </Badge>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {status !== "default" && statusIcons[status] && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div
                          className="p-1 rounded-full bg-slate-700/50 backdrop-blur-sm border border-slate-500/50"
                          role="img"
                          aria-label={statusMessages[status]}
                        >
                          {statusIcons[status]}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent
                        id={`${cardId}-status-tooltip`}
                        className="bg-slate-800/90 backdrop-blur-md border-slate-600/50 text-slate-100"
                      >
                        <p className="text-sm">
                          {statusMessages[status]}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
                {tooltip && (
                  <TooltipProvider delayDuration={0}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div
                          className="flex items-center justify-center h-8 w-8 rounded-full hover:bg-blue-500/20 cursor-help transition-colors backdrop-blur-sm border border-blue-400/30"
                          role="button"
                          tabIndex={0}
                          aria-label="More information"
                          aria-describedby={`${cardId}-tooltip`}
                        >
                          <Info className="h-4 w-4 text-blue-300 hover:text-blue-200" aria-hidden="true" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent
                        side="right"
                        align="start"
                        sideOffset={5}
                        id={`${cardId}-tooltip`}
                        className="bg-slate-800/90 backdrop-blur-md border-slate-600/50 text-slate-100"
                      >
                        <p className="text-sm leading-relaxed">{tooltip}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
                {actions}
                {isCollapsible && (
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-slate-300 hover:text-slate-100 hover:bg-blue-500/20"
                      disabled={isDisabled}
                      aria-label={isCollapsed ? "Expand section" : "Collapse section"}
                      aria-expanded={!isCollapsed}
                    >
                      {isCollapsed ? (
                        <ChevronDown className="h-4 w-4" aria-hidden="true" />
                      ) : (
                        <ChevronUp className="h-4 w-4" aria-hidden="true" />
                      )}
                    </Button>
                  </CollapsibleTrigger>
                )}
              </div>
            </div>
          </div>

          <CollapsibleContent>
            <div className="pt-2">
              {children}
              {footer && (
                <div className="mt-4 pt-4 border-t border-slate-600/50">
                  {footer}
                </div>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </motion.div>
  );
});

FormFieldCard.displayName = "FormFieldCard";
