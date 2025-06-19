
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { typography } from "@/lib/typography";
import type { BodyPart } from "../types/bodyPartTypes";
import { BODY_PART_CONFIG } from "../data/bodyPartData";

interface BodyDiagramTooltipProps {
  hoveredPart: BodyPart | null;
  showDescriptions: boolean;
  compact: boolean;
}

export const BodyDiagramTooltip: React.FC<BodyDiagramTooltipProps> = ({
  hoveredPart,
  showDescriptions,
  compact
}) => {
  return (
    <AnimatePresence>
      {showDescriptions && compact && hoveredPart && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50"
        >
          <div className={cn("bg-popover text-popover-foreground px-3 py-2 rounded-lg shadow-lg border max-w-xs", typography.bodySmall)}>
            <div className={cn(typography.label)}>{BODY_PART_CONFIG[hoveredPart].label}</div>
            <div className={cn(typography.caption1, "opacity-80 mt-1")}>
              {BODY_PART_CONFIG[hoveredPart].description}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}; 
