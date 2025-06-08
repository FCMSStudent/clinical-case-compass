import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ValidationFeedbackProps {
  isValid: boolean;
  message?: string;
  className?: string;
  showIcon?: boolean;
}

export const ValidationFeedback = React.memo(function ValidationFeedback({
  isValid,
  message,
  className,
  showIcon = true,
}: ValidationFeedbackProps) {
  return (
    <AnimatePresence mode="wait">
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className={cn(
            "flex items-center gap-2 mt-2 text-sm",
            isValid ? "text-emerald-600" : "text-red-600",
            className
          )}
        >
          {showIcon && (
            isValid ? (
              <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
            ) : (
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
            )
          )}
          <span>{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

ValidationFeedback.displayName = "ValidationFeedback"; 