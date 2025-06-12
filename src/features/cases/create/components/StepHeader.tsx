import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

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
      className={className}
    >
      <div className="relative">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl"></div>
        <div className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 group overflow-hidden transition-all duration-300 hover:bg-white/15 hover:border-white/30 before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent before:translate-x-[-100%] before:group-hover:translate-x-[100%] before:transition-transform before:duration-700">
          <div className="space-y-3">
            <h3 
              id={`${headerId}-title`}
              className="flex items-center text-2xl font-bold text-white"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mr-4 rounded-xl bg-white/20 text-white border border-white/20 p-3 relative transition-all duration-300 group-hover:scale-110"
                aria-hidden="true"
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Icon className="h-7 w-7 relative z-10" />
              </motion.div>
              <span>
                {title}
              </span>
            </h3>
            <p 
              id={`${headerId}-description`}
              className="text-lg max-w-2xl leading-relaxed text-white/80"
            >
              {description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

StepHeader.displayName = "StepHeader"; 