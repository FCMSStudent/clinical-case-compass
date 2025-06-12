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
      <Card>
        <CardContent className="p-8">
          <div className="space-y-3">
            <h3 
              id={`${headerId}-title`}
              className="flex items-center text-2xl font-bold text-foreground"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mr-4 rounded-xl bg-primary/10 p-3 text-primary"
                aria-hidden="true"
              >
                <Icon className="h-7 w-7" />
              </motion.div>
              <span>
                {title}
              </span>
            </h3>
            <p 
              id={`${headerId}-description`}
              className="text-lg max-w-2xl leading-relaxed text-muted-foreground"
            >
              {description}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
});

StepHeader.displayName = "StepHeader"; 