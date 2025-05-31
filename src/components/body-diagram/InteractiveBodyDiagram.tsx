import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { cn } from "@/utils";

/**
 * All supported body parts.
 * Using `as const` keeps the tuple literal type so we can derive an exact union type.
 */
const BODY_PARTS = [
  "Head",
  "Neck",
  "Chest",
  "Abdomen",
  "Arms",
  "Legs",
] as const;

/**
 * A union type that represents every item in `BODY_PARTS`.
 */
export type BodyPart = typeof BODY_PARTS[number];

export interface InteractiveBodyDiagramProps {
  /**
   * Callback when the user selects a body part.
   */
  onBodyPartSelected: (part: BodyPart) => void;
  /**
   * Parts to highlight as already selected or relevant.
   */
  highlightedSystems?: BodyPart[];
  /**
   * Optional extra class names for the outer wrapper.
   */
  className?: string;
}

/**
 * Renders an interactive list of body parts with smooth hover/tap animations
 * and theme‑aware styling via `shadcn/ui` primitives.
 */
export const InteractiveBodyDiagram: React.FC<InteractiveBodyDiagramProps> = React.memo(
  ({ onBodyPartSelected, highlightedSystems = [], className }) => {
    return (
      <div
        className={cn(
          "space-y-4 rounded-2xl border p-6 shadow-sm bg-background/50 backdrop-blur",
          className
        )}
      >
        <h3 className="text-xl font-bold">Body Diagram</h3>

        <div className="grid grid-cols-2 gap-3">
          {BODY_PARTS.map((part) => {
            const isActive = highlightedSystems.includes(part);
            return (
              <motion.div key={part} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant={isActive ? "secondary" : "outline"}
                  className={cn(
                    "w-full justify-center capitalize",
                    isActive &&
                      "border-primary bg-primary/10 text-primary-foreground shadow-inner"
                  )}
                  aria-pressed={isActive}
                  onClick={() => onBodyPartSelected(part)}
                >
                  {part}
                </Button>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  }
);

InteractiveBodyDiagram.displayName = "InteractiveBodyDiagram";
