import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LucideIcon, Info, AlertCircle, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
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

const gradients = {
  emerald: "from-emerald-50 to-teal-50",
  rose: "from-rose-50 to-pink-50",
  violet: "from-violet-50 to-purple-50",
  amber: "from-amber-50 to-orange-50",
  blue: "from-blue-50 to-indigo-50",
  teal: "from-teal-50 to-cyan-50",
  purple: "from-purple-50 to-indigo-50",
} as const;

const iconColors = {
  emerald: "text-emerald-600",
  rose: "text-rose-600",
  violet: "text-violet-600",
  amber: "text-amber-600",
  blue: "text-blue-600",
  teal: "text-teal-600",
  purple: "text-purple-600",
} as const;

const iconBgColors = {
  emerald: "bg-emerald-100",
  rose: "bg-rose-100",
  violet: "bg-violet-100",
  amber: "bg-amber-100",
  blue: "bg-blue-100",
  teal: "bg-teal-100",
  purple: "bg-purple-100",
} as const;

const statusStyles = {
  default: "border-gray-200",
  success: "border-emerald-200 bg-emerald-50/50",
  warning: "border-amber-200 bg-amber-50/50",
  error: "border-red-200 bg-red-50/50",
} as const;

const statusIcons = {
  default: null,
  success: <CheckCircle2 className="h-4 w-4 text-emerald-600" />,
  warning: <AlertCircle className="h-4 w-4 text-amber-600" />,
  error: <AlertCircle className="h-4 w-4 text-red-600" />,
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
      <Card
        ref={cardRef}
        className={cn(
          "overflow-hidden border-2 transition-all duration-200",
          `bg-gradient-to-br ${gradients[gradient]}`,
          statusStyles[status],
          isHighlighted && "ring-2 ring-primary ring-offset-2",
          isDisabled && "opacity-50 cursor-not-allowed",
          isHovered && "shadow-lg -translate-y-0.5",
          !isDisabled && "hover:shadow-md"
        )}
      >
        <Collapsible open={!isCollapsible || !isCollapsed} onOpenChange={setIsCollapsed}>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={cn(
                    "p-2 rounded-lg shadow-sm transition-colors duration-200",
                    iconBgColors[gradient],
                    !isDisabled && "hover:shadow-md"
                  )}
                >
                  <Icon className={cn("h-5 w-5", iconColors[gradient])} />
                </motion.div>
                <div className="flex items-center gap-2">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    {title}
                    {isRequired && (
                      <span className="text-red-500 text-sm">*</span>
                    )}
                  </CardTitle>
                  {badge && (
                    <Badge variant="outline" className="ml-2">
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
                        <div className="p-1 rounded-full bg-white/50">
                          {statusIcons[status]}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
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
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full hover:bg-white/50"
                          disabled={isDisabled}
                        >
                          <Info className="h-4 w-4 text-gray-400" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs p-4">
                        <p className="text-sm">{tooltip}</p>
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
                      className="h-8 w-8 rounded-full hover:bg-white/50"
                      disabled={isDisabled}
                    >
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                          key={isCollapsed ? "collapsed" : "expanded"}
                          initial={{ rotate: -90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: 90, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {isCollapsed ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronUp className="h-4 w-4" />
                          )}
                        </motion.div>
                      </AnimatePresence>
                    </Button>
                  </CollapsibleTrigger>
                )}
              </div>
            </div>
          </CardHeader>
          <CollapsibleContent>
            <CardContent>
              <AnimatePresence mode="wait">
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {children}
                </motion.div>
              </AnimatePresence>
            </CardContent>
            {footer && (
              <CardFooter className="pt-4 border-t bg-white/50">
                {footer}
              </CardFooter>
            )}
          </CollapsibleContent>
        </Collapsible>
      </Card>
    </motion.div>
  );
});

FormFieldCard.displayName = "FormFieldCard"; 