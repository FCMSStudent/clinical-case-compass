import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepHeaderProps {
  title: string;
  description: string;
  icon: LucideIcon;
  gradient?: "blue" | "teal" | "amber" | "purple";
  className?: string;
  secondaryIcon?: LucideIcon;
}

const gradients = {
  blue: "from-blue-600 via-indigo-600 to-purple-700",
  teal: "from-teal-600 via-cyan-600 to-blue-700",
  amber: "from-amber-600 via-orange-600 to-red-700",
  purple: "from-purple-600 via-indigo-600 to-blue-700",
} as const;

export const StepHeader = React.memo(function StepHeader({
  title,
  description,
  icon: Icon,
  gradient = "blue",
  className,
  secondaryIcon: SecondaryIcon,
}: StepHeaderProps) {
  const headerId = React.useId();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "relative overflow-hidden rounded-2xl p-8 text-white shadow-2xl",
        `bg-gradient-to-br ${gradients[gradient]}`,
        className
      )}
      role="banner"
      aria-labelledby={`${headerId}-title`}
      aria-describedby={`${headerId}-description`}
    >
      <div className="absolute inset-0 bg-black/10" aria-hidden="true" />
      
      {/* Primary Icon */}
      <div className="absolute -top-4 -right-4 opacity-10" aria-hidden="true">
        <Icon className="h-24 w-24" />
      </div>

      {/* Secondary Icon (optional) */}
      {SecondaryIcon && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="absolute top-8 right-8 opacity-20"
          aria-hidden="true"
        >
          <SecondaryIcon className="h-8 w-8" />
        </motion.div>
      )}

      <div className="relative space-y-3">
        <h3 
          id={`${headerId}-title`}
          className="flex items-center text-2xl font-bold"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mr-4 rounded-xl bg-white/20 p-3 backdrop-blur-sm"
            aria-hidden="true"
          >
            <Icon className="h-7 w-7" />
          </motion.div>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
            {title}
          </span>
        </h3>
        <p 
          id={`${headerId}-description`}
          className={cn(
            "text-lg max-w-2xl leading-relaxed",
            gradient === "blue" && "text-blue-100",
            gradient === "teal" && "text-cyan-100",
            gradient === "amber" && "text-amber-100",
            gradient === "purple" && "text-purple-100"
          )}
        >
          {description}
        </p>
      </div>
    </motion.header>
  );
});

StepHeader.displayName = "StepHeader"; 