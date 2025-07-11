
import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/shared/utils/utils";

interface StepHeaderProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
  secondaryIcon?: LucideIcon;
}

export const StepHeader = React.memo(function StepHeader({
  title,
  description,
  icon: Icon,
  className,
  secondaryIcon: SecondaryIcon,
}: StepHeaderProps) {
  const headerId = React.useId();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("mb-8", className)}
    >
      <div className="p-0"> {/* Removed card styling, adjust padding if needed */}
        <div className="flex items-center gap-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="rounded-xl bg-white/20 text-white border border-white/20 p-3 relative transition-all duration-300"
            aria-hidden="true"
          >
            <Icon className="h-6 w-6" />
          </motion.div>
          <div className="flex-1">
            <h2 
              id={`${headerId}-title`}
              className="text-xl font-bold text-white mb-2"
            >
              {title}
            </h2>
            <p
              id={`${headerId}-description`}
              className="text-white/70 leading-relaxed"
            >
              {description}
            </p>
          </div>
          {/* Potential place for SecondaryIcon if needed */}
        </div>
      </div>
    </motion.div>
  );
});

StepHeader.displayName = "StepHeader";
