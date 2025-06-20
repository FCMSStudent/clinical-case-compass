import React from "react";
import { Button } from "@/shared/components/button";
import { motion } from "framer-motion";
import { cn } from "@/shared/utils/utils";
import { typo } from "@/design-system/tokens/typography";
import type { BodyPart, BodyPartConfig } from "../types/bodyPartTypes";

interface BodyPartButtonProps {
  partConfig: BodyPartConfig;
  isSelected: boolean;
  isHighlighted: boolean;
  isHovered: boolean;
  disabled: boolean;
  compact: boolean;
  showDescriptions: boolean;
  variant: "default" | "secondary" | "outline";
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export const BodyPartButton: React.FC<BodyPartButtonProps> = ({
  partConfig,
  isSelected,
  isHighlighted,
  isHovered,
  disabled,
  compact,
  showDescriptions,
  variant,
  onClick,
  onMouseEnter,
  onMouseLeave
}) => {
  const baseClasses = "w-full justify-start gap-3 h-auto p-4 transition-all duration-200 hover:shadow-md active:shadow-sm";
  const selectedClasses = isSelected ? "ring-2 ring-primary ring-offset-2 bg-primary text-primary-foreground" : "";
  const highlightedClasses = isHighlighted && !isSelected ? "ring-2 ring-secondary ring-offset-1" : "";
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";
  const compactClasses = compact ? "p-2 text-sm" : "";

  const partVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    },
    hover: {
      scale: 1.05,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    tap: { scale: 0.95 }
  };

  return (
    <motion.div
      variants={partVariants}
      whileHover="hover"
      whileTap="tap"
    >
      <Button
        variant={variant}
        size={compact ? "sm" : "md"}
        className={cn(
          baseClasses,
          selectedClasses,
          highlightedClasses,
          disabledClasses,
          compactClasses
        )}
        disabled={disabled}
        aria-pressed={isSelected}
        aria-describedby={showDescriptions ? `${partConfig.id}-desc` : undefined}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        data-testid={`bodypart-${partConfig.id}`}
      >
        <span className={cn(typo.vital, "text-lg")} role="img" aria-hidden="true">
          {partConfig.icon}
        </span>
        <div className="flex-1 text-left">
          <div className={cn(typo.label)}>{partConfig.label}</div>
          {showDescriptions && !compact && (
            <div className={cn(typo.caption, "opacity-70 mt-1")}>
              {partConfig.description}
            </div>
          )}
        </div>
        {isSelected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-2 h-2 bg-current rounded-full"
          />
        )}
      </Button>
    </motion.div>
  );
}; 