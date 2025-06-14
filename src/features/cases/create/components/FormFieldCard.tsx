import React from "react";
import { motion } from "framer-motion";
import { LucideIcon, Info, AlertCircle, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
// Card import is removed as we are not using <Card> component directly from shadcn/ui for the main wrapper
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
  const [isHovered, setIsHovered] = React.useState(false); // This state might not be needed if onStatusChange logic is removed/rethought

  const cardId = React.useId();

  // The onStatusChange effect based on hover might be less relevant with simplified styling.
  // Consider removing if it's not a key interaction anymore.
  // React.useEffect(() => {
  //   if (onStatusChange && isHovered) {
  //     const timeout = setTimeout(() => {
  //       onStatusChange(status === "default" ? "success" : "default");
  //     }, 500);
  //     return () => clearTimeout(timeout);
  //   }
  // }, [isHovered, onStatusChange, status]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={className}
      // onHoverStart and onHoverEnd might be removed if isHovered effect is removed
    >
      <div
        className={cn(
          "p-4 border border-white/10 rounded-lg", // Simplified styling
          isHighlighted && "ring-2 ring-blue-400/30", // Highlight remains useful
          isDisabled && "opacity-50 cursor-not-allowed",
          // Add status-based border colors if desired, e.g.:
          // status === "error" && "border-red-400/50",
          // status === "success" && "border-emerald-400/50",
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
                  className="p-3 rounded-xl bg-blue-500/20 text-white border border-blue-400/30 transition-all duration-300"
                  aria-hidden="true"
                >
                  <Icon className="h-5 w-5 relative z-10" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-lg font-semibold flex items-center gap-2 text-white">
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
                {status !== "default" && statusIcons[status] && ( // Ensure statusIcon exists
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div
                          className="p-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
                          role="img"
                          aria-label={statusMessages[status]}
                        >
                          {statusIcons[status]}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent
                        id={`${cardId}-status-tooltip`}
                        className="bg-black/30 backdrop-blur-md border-white/20 text-white"
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
                          <Info className="h-4 w-4 text-white/70 hover:text-white" aria-hidden="true" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent
                        side="right"
                        align="start"
                        sideOffset={5}
                        id={`${cardId}-tooltip`}
                        className="bg-black/30 backdrop-blur-md border-white/20 text-white"
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
                      className="h-8 w-8 text-white/70 hover:text-white hover:bg-blue-500/20"
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
            <div className="pt-2"> {/* Added small top padding for content */}
              {children}
              {footer && (
                <div className="mt-4 pt-4 border-t border-white/20">
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
