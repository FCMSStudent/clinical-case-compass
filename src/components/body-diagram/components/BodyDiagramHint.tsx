import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { typo } from "@/lib/typography";

interface BodyDiagramHintProps {
  selectedParts: Set<any>;
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
          className={cn("text-center text-muted-foreground border-t pt-4", typo.bodySmall)}
        >
          {multiSelect ? "Click to select multiple body parts" : "Click to select a body part"}
        </motion.div>
      )}
    </>
  );
}; 