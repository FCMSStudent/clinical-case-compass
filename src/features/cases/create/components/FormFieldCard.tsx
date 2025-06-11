import React from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  gradient?: "emerald" | "rose" | "violet" | "amber" | "blue" | "teal" | "purple";
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

const iconColors = {
  emerald: "text-emerald-400",
  rose: "text-rose-400",
  violet: "text-violet-400",
  amber: "text-amber-400",
  blue: "text-blue-400",
  teal: "text-teal-400",
  purple: "text-purple-400",
} as const;

const iconBgColors = {
  emerald: "bg-emerald-400/20",
  rose: "bg-rose-400/20",
  violet: "bg-violet-400/20",
  amber: "bg-amber-400/20",
  blue: "bg-blue-400/20",
  teal: "bg-teal-400/20",
  purple: "bg-purple-400/20",
} as const;

const statusStyles = {
  default: "border-white/20",
  success: "border-emerald-400/30 bg-emerald-400/10",
  warning: "border-amber-400/30 bg-amber-400/10",
  error: "border-red-400/30 bg-red-400/10",
} as const;

const statusIcons = {
  default: null,
  success: <CheckCircle2 className="h-4 w-4 text-emerald-400" />,
  warning: <AlertCircle className="h-4 w-4 text-amber-400" />,
  error: <AlertCircle className="h-4 w-4 text-red-400" />,
} as const;

export const FormFieldCard = React.memo(function FormFieldCard({
  icon: Icon,
  title,
  gradient = "emerald",
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

  const cardRef = React.useRef<HTMLDivElement>(null);

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
      <div className="relative">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl"></div>
        <div
          ref={cardRef}
          className={cn(
            "relative bg-white/10 backdrop-blur-md rounded-2xl border transition-all duration-200",
            statusStyles[status],
            isHighlighted && "ring-2 ring-white/30 ring-offset-2",
            isDisabled && "opacity-50 cursor-not-allowed",
            isHovered && "shadow-lg -translate-y-0.5",
            !isDisabled && "hover:shadow-md",
            "space-y-4"
          )}
        >
          <Collapsible open={!isCollapsible || !isCollapsed} onOpenChange={setIsCollapsed}>
            <div className="p-6 pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={cn(
                      "p-2 rounded-xl shadow-sm transition-colors duration-200",
                      iconBgColors[gradient],
                      !isDisabled && "hover:shadow-md"
                    )}
                  >
                    <Icon className={cn("h-5 w-5", iconColors[gradient])} />
                  </motion.div>
                  <div className="flex items-center gap-2">
                    <div className="text-lg font-semibold flex items-center gap-2 text-white">
                      {title}
                      {isRequired && (
                        <span className="text-red-400 text-sm">*</span>
                      )}
                    </div>
                    {badge && (
                      <Badge variant="outline" className="ml-2 bg-white/10 border-white/20 text-white">
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
                          <div className="p-1 rounded-full bg-white/20">
                            {statusIcons[status]}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent className="bg-white/10 backdrop-blur-md border border-white/20 text-white">
                          <p className="text-sm">
                            {status === "success" && "All validations passed"}
                            {status === "warning" && "Some fields need attention"}
                            {status === "error" && "Please fix the errors"}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                  {tooltip && (
                    <TooltipProvider delayDuration={0}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center justify-center h-8 w-8 rounded-full hover:bg-white/20 cursor-help transition-colors">
                            <Info className="h-4 w-4 text-white/70 hover:text-white" />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent 
                          side="right" 
                          align="start"
                          className="max-w-xs p-4 bg-white/10 backdrop-blur-md border border-white/20 text-white"
                          sideOffset={5}
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
                        className="h-8 w-8 rounded-full hover:bg-white/20 text-white"
                        disabled={isDisabled}
                      >
                        {isCollapsed ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronUp className="h-4 w-4" />
                        )}
                      </Button>
                    </CollapsibleTrigger>
                  )}
                </div>
              </div>
            </div>
            <div className="px-6 pb-6">
              <CollapsibleContent>
                {children}
              </CollapsibleContent>
            </div>
            {footer && (
              <div className="px-6 pb-6">
                {footer}
              </div>
            )}
          </Collapsible>
        </div>
      </div>
    </motion.div>
  );
});

FormFieldCard.displayName = "FormFieldCard"; 