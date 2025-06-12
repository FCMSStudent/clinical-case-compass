import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LucideIcon, Info, AlertCircle, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
  const [isHovered, setIsHovered] = React.useState(false);

  const cardId = React.useId();

  React.useEffect(() => {
    if (onStatusChange && isHovered) {
      const timeout = setTimeout(() => {
        onStatusChange(status === "default" ? "success" : "default");
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [isHovered, onStatusChange, status]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={className}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card
        className={cn(
          "transition-all duration-200",
          isHighlighted && "ring-2 ring-primary/30 ring-offset-2",
          isDisabled && "opacity-50 cursor-not-allowed",
          isHovered && "shadow-lg -translate-y-0.5",
          !isDisabled && "hover:shadow-md"
        )}
        role="group"
        aria-labelledby={`${cardId}-title`}
        aria-describedby={tooltip ? `${cardId}-tooltip` : undefined}
        aria-disabled={isDisabled}
      >
        <Collapsible open={!isCollapsible || !isCollapsed} onOpenChange={setIsCollapsed}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="p-2 rounded-xl bg-primary/10 text-primary"
                  aria-hidden="true"
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-lg font-semibold flex items-center gap-2 text-foreground">
                    <span id={`${cardId}-title`}>
                      {title}
                      {isRequired && (
                        <span className="text-destructive text-sm" aria-label="required">*</span>
                      )}
                    </span>
                  </div>
                  {badge && (
                    <Badge 
                      variant="outline" 
                      aria-label={`Status: ${badge}`}
                      className="ml-2"
                    >
                      {badge}
                    </Badge>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {status !== "default" && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div 
                          className="p-1 rounded-full bg-muted"
                          role="img"
                          aria-label={statusMessages[status]}
                        >
                          {statusIcons[status]}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent 
                        id={`${cardId}-status-tooltip`}
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
                          className="flex items-center justify-center h-8 w-8 rounded-full hover:bg-muted cursor-help transition-colors"
                          role="button"
                          tabIndex={0}
                          aria-label="More information"
                          aria-describedby={`${cardId}-tooltip`}
                        >
                          <Info className="h-4 w-4 text-muted-foreground hover:text-foreground" aria-hidden="true" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent 
                        side="right" 
                        align="start"
                        sideOffset={5}
                        id={`${cardId}-tooltip`}
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
                      className="h-8 w-8"
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
          </CardHeader>
          
          <CollapsibleContent>
            <CardContent className="pt-0">
              {children}
              {footer && (
                <div className="mt-4 pt-4 border-t border-border">
                  {footer}
                </div>
              )}
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>
    </motion.div>
  );
});

FormFieldCard.displayName = "FormFieldCard"; 