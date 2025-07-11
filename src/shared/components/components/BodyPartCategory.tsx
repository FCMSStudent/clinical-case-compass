
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/shared/utils/utils";
import { typo } from "@/design-system/tokens/typography";
import type { BodyPart, BodyPartCategory as BodyPartCategoryType, BodyPartConfig } from "../types/bodyPartTypes";
import { BodyPartButton } from "./BodyPartButton";
import { CATEGORY_LABEL } from "../data/bodyPartData";

interface BodyPartCategoryComponentProps {
  category: BodyPartCategoryType;
  parts: BodyPartConfig[];
  selectedParts: Set<BodyPart>;
  highlightedParts: Set<BodyPart>;
  hoveredPart: BodyPart | null;
  disabled: boolean;
  compact: boolean;
  showDescriptions: boolean;
  onPartClick: (part: BodyPart) => void;
  onPartHover: (part: BodyPart | null) => void;
  getPartVariant: (part: BodyPart) => "default" | "secondary" | "outline";
}

export const BodyPartCategory: React.FC<BodyPartCategoryComponentProps> = ({
  category,
  parts,
  selectedParts,
  highlightedParts,
  hoveredPart,
  disabled,
  compact,
  showDescriptions,
  onPartClick,
  onPartHover,
  getPartVariant
}) => {
  const categoryVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  return (
    <motion.div
      variants={categoryVariants}
      initial="hidden"
      animate="visible"
      className="space-y-3"
    >
      <h4 className={cn(typo.labelSmall, "text-muted-foreground capitalize tracking-wide")}>
        {CATEGORY_LABEL[category]}
      </h4>
      <div className={cn(
        "grid gap-3",
        compact ? "grid-cols-1" : "grid-cols-2"
      )}>
        {parts.map((partConfig) => {
          const isSelected = selectedParts.has(partConfig.id);
          const isHighlighted = highlightedParts.has(partConfig.id);
          const isHovered = hoveredPart === partConfig.id;

          return (
            <BodyPartButton
              key={partConfig.id}
              partConfig={partConfig}
              isSelected={isSelected}
              isHighlighted={isHighlighted}
              isHovered={isHovered}
              disabled={disabled}
              compact={compact}
              showDescriptions={showDescriptions}
              variant={getPartVariant(partConfig.id)}
              onClick={() => onPartClick(partConfig.id)}
              onMouseEnter={() => onPartHover(partConfig.id)}
              onMouseLeave={() => onPartHover(null)}
            />
          );
        })}
      </div>
    </motion.div>
  );
}; 
