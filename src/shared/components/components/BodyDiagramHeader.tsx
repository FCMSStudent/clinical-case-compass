import React from "react";
import { Button } from "@/shared/components/button";
import { motion } from "framer-motion";
import { cn } from "@/shared/utils/utils";
import { typo } from "@/design-system/tokens/typography";
import type { BodyPart } from "../types/bodyPartTypes";

interface BodyDiagramHeaderProps {
  selectedParts: Set<BodyPart>;
  multiSelect: boolean;
  compact: boolean;
  disabled: boolean;
  onClearAll: () => void;
}

export const BodyDiagramHeader: React.FC<BodyDiagramHeaderProps> = ({
  selectedParts,
  multiSelect,
  compact,
  disabled,
  onClearAll
}) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h3 className={cn(
          typo.h3,
          "tracking-tight",
          compact && "text-lg"
        )}>
          Body Diagram
        </h3>
        {selectedParts.size > 0 && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className={cn(typo.bodySmall, "text-muted-foreground mt-1")}
          >
            {selectedParts.size} part{selectedParts.size !== 1 ? 's' : ''} selected
          </motion.p>
        )}
      </div>
      
      {selectedParts.size > 0 && multiSelect && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearAll}
          disabled={disabled}
          className="text-muted-foreground hover:text-foreground"
        >
          Clear All
        </Button>
      )}
    </div>
  );
}; 