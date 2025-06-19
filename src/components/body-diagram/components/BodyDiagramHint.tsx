import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { typography } from "@/lib/typography";
import type { BodyPart } from "../types/bodyPartTypes";

interface BodyDiagramHintProps {
  selectedParts: Set<BodyPart>;
  multiSelect: boolean;
  disabled: boolean;
}

export const BodyDiagramHint: React.FC<BodyDiagramHintProps> = ({
  selectedParts,
  multiSelect,
  disabled
}) => {
  return (
    <>
      {!disabled && selectedParts.size === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className={cn("text-center text-muted-foreground border-t pt-4", typography.bodySmall)}
        >
          {multiSelect ? "Click to select multiple body parts" : "Click to select a body part"}
        </motion.div>
      )}
    </>
  );
}; 
