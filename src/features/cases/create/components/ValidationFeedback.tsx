import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ValidationFeedbackProps {
  isValid: boolean;
  message?: string;
  className?: string;
  showIcon?: boolean;
  id?: string;
  role?: "alert" | "status";
}

export const ValidationFeedback = React.memo(function ValidationFeedback({
  isValid,
  message,
  className,
  showIcon = true,
  id,
  role = "status",
}: ValidationFeedbackProps) {
  if (!message) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className={cn(
          "flex items-center gap-2 mt-2 text-sm",
          isValid ? "text-emerald-300" : "text-red-300",
          className
        )}
        role={role}
        aria-live="polite"
        aria-atomic="true"
        id={id}
      >
        {showIcon && (
          isValid ? (
            <CheckCircle2 
              className="h-4 w-4 flex-shrink-0 text-emerald-300" 
              aria-hidden="true"
              aria-label="Validation passed"
            />
          ) : (
            <AlertCircle 
              className="h-4 w-4 flex-shrink-0 text-red-300" 
              aria-hidden="true"
              aria-label="Validation error"
            />
          )
        )}
        <span>{message}</span>
      </motion.div>
    </AnimatePresence>
  );
});

ValidationFeedback.displayName = "ValidationFeedback"; 