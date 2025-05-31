import React, { useState, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Enhanced type definitions
export type BodyPart = 
  | "Head" 
  | "Neck" 
  | "Chest" 
  | "Abdomen" 
  | "Arms" 
  | "Legs";

export type BodyPartCategory = "upper" | "core" | "lower";

export interface BodyPartConfig {
  id: BodyPart;
  label: string;
  category: BodyPartCategory;
  description: string;
  icon: string;
  relatedParts?: BodyPart[];
}

// Comprehensive body part configuration
const BODY_PART_CONFIG: Record<BodyPart, BodyPartConfig> = {
  Head: {
    id: "Head",
    label: "Head & Face",
    category: "upper",
    description: "Brain, eyes, ears, nose, mouth, jaw",
    icon: "🧠",
    relatedParts: ["Neck"]
  },
  Neck: {
    id: "Neck",
    label: "Neck",
    category: "upper", 
    description: "Cervical spine, throat, lymph nodes",
    icon: "🦴",
    relatedParts: ["Head", "Chest"]
  },
  Chest: {
    id: "Chest",
    label: "Chest",
    category: "core",
    description: "Heart, lungs, ribs, shoulders",
    icon: "🫁",
    relatedParts: ["Neck", "Arms", "Abdomen"]
  },
  Abdomen: {
    id: "Abdomen",
    label: "Abdomen",
    category: "core",
    description: "Stomach, liver, intestines, kidneys",
    icon: "🫃",
    relatedParts: ["Chest", "Legs"]
  },
  Arms: {
    id: "Arms",
    label: "Arms & Hands",
    category: "upper",
    description: "Shoulders, elbows, wrists, fingers",
    icon: "💪",
    relatedParts: ["Chest"]
  },
  Legs: {
    id: "Legs",
    label: "Legs & Feet",
    category: "lower",
    description: "Hips, knees, ankles, toes",
    icon: "🦵",
    relatedParts: ["Abdomen"]
  }
} as const;

export interface InteractiveBodyDiagramProps {
  /** Callback when body parts are selected/deselected */
  onSelectionChange: (selectedParts: BodyPart[]) => void;
  /** Initially selected body parts */
  initialSelection?: BodyPart[];
  /** Parts to highlight (but not necessarily select) */
  highlightedParts?: BodyPart[];
  /** Allow multiple selections */
  multiSelect?: boolean;
  /** Show detailed descriptions on hover */
  showDescriptions?: boolean;
  /** Compact layout mode */
  compact?: boolean;
  /** Custom styling */
  className?: string;
  /** Disabled state */
  disabled?: boolean;
}

/**
 * Enhanced interactive body diagram with improved UX, accessibility, and functionality
 */
export const InteractiveBodyDiagram: React.FC<InteractiveBodyDiagramProps> = React.memo(({
  onSelectionChange,
  initialSelection = [],
  highlightedParts = [],
  multiSelect = true,
  showDescriptions = true,
  compact = false,
  className,
  disabled = false
}) => {
  const [selectedParts, setSelectedParts] = useState<Set<BodyPart>>(
    new Set(initialSelection)
  );
  const [hoveredPart, setHoveredPart] = useState<BodyPart | null>(null);

  // Categorized body parts for better layout
  const categorizedParts = useMemo(() => {
    const categories: Record<BodyPartCategory, BodyPartConfig[]> = {
      upper: [],
      core: [],
      lower: []
    };
    
    Object.values(BODY_PART_CONFIG).forEach(part => {
      categories[part.category].push(part);
    });
    
    return categories;
  }, []);

  const handlePartClick = useCallback((part: BodyPart) => {
    if (disabled) return;

    setSelectedParts(prev => {
      const newSelection = new Set(prev);
      
      if (multiSelect) {
        if (newSelection.has(part)) {
          newSelection.delete(part);
        } else {
          newSelection.add(part);
        }
      } else {
        newSelection.clear();
        if (!prev.has(part)) {
          newSelection.add(part);
        }
      }
      
      onSelectionChange(Array.from(newSelection));
      return newSelection;
    });
  }, [disabled, multiSelect, onSelectionChange]);

  const isPartSelected = useCallback((part: BodyPart) => 
    selectedParts.has(part), [selectedParts]);

  const isPartHighlighted = useCallback((part: BodyPart) => 
    highlightedParts.includes(part), [highlightedParts]);

  const getPartVariant = useCallback((part: BodyPart) => {
    if (isPartSelected(part)) return "default";
    if (isPartHighlighted(part)) return "secondary";
    return "outline";
  }, [isPartSelected, isPartHighlighted]);

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

  const renderCategory = (category: BodyPartCategory, parts: BodyPartConfig[]) => (
    <motion.div
      key={category}
      variants={categoryVariants}
      initial="hidden"
      animate="visible"
      className="space-y-3"
    >
      <h4 className="text-sm font-semibold text-muted-foreground capitalize tracking-wide">
        {category === "core" ? "Torso" : category}
      </h4>
      <div className={cn(
        "grid gap-3",
        compact ? "grid-cols-1" : "grid-cols-2"
      )}>
        {parts.map((partConfig) => {
          const isSelected = isPartSelected(partConfig.id);
          const isHighlighted = isPartHighlighted(partConfig.id);
          const isHovered = hoveredPart === partConfig.id;
          
          return (
            <motion.div
              key={partConfig.id}
              variants={partVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Button
                variant={getPartVariant(partConfig.id)}
                size={compact ? "sm" : "default"}
                className={cn(
                  "w-full justify-start gap-3 h-auto p-4 transition-all duration-200",
                  "hover:shadow-md active:shadow-sm",
                  isSelected && "ring-2 ring-primary ring-offset-2 bg-primary text-primary-foreground",
                  isHighlighted && !isSelected && "ring-2 ring-secondary ring-offset-1",
                  disabled && "opacity-50 cursor-not-allowed",
                  compact && "p-2 text-sm"
                )}
                disabled={disabled}
                aria-pressed={isSelected}
                aria-describedby={showDescriptions ? `${partConfig.id}-desc` : undefined}
                onClick={() => handlePartClick(partConfig.id)}
                onMouseEnter={() => setHoveredPart(partConfig.id)}
                onMouseLeave={() => setHoveredPart(null)}
              >
                <span className="text-lg" role="img" aria-hidden="true">
                  {partConfig.icon}
                </span>
                <div className="flex-1 text-left">
                  <div className="font-medium">{partConfig.label}</div>
                  {showDescriptions && !compact && (
                    <div className="text-xs opacity-70 mt-1">
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
        })}
      </div>
    </motion.div>
  );

  return (
    <div className={cn(
      "space-y-6 rounded-2xl border p-6 shadow-sm bg-background/80 backdrop-blur-sm",
      "transition-all duration-300",
      disabled && "opacity-75",
      className
    )}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className={cn(
            "font-bold tracking-tight",
            compact ? "text-lg" : "text-xl"
          )}>
            Body Diagram
          </h3>
          {selectedParts.size > 0 && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="text-sm text-muted-foreground mt-1"
            >
              {selectedParts.size} part{selectedParts.size !== 1 ? 's' : ''} selected
            </motion.p>
          )}
        </div>
        
        {selectedParts.size > 0 && multiSelect && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSelectedParts(new Set());
              onSelectionChange([]);
            }}
            disabled={disabled}
            className="text-muted-foreground hover:text-foreground"
          >
            Clear All
          </Button>
        )}
      </div>

      {/* Body parts by category */}
      <div className="space-y-6">
        {Object.entries(categorizedParts).map(([category, parts]) =>
          renderCategory(category as BodyPartCategory, parts)
        )}
      </div>

      {/* Hover tooltip for compact mode */}
      <AnimatePresence>
        {showDescriptions && compact && hoveredPart && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="bg-popover text-popover-foreground px-3 py-2 rounded-lg shadow-lg border text-sm max-w-xs">
              <div className="font-medium">{BODY_PART_CONFIG[hoveredPart].label}</div>
              <div className="text-xs opacity-80 mt-1">
                {BODY_PART_CONFIG[hoveredPart].description}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Usage hint */}
      {!disabled && selectedParts.size === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-sm text-muted-foreground border-t pt-4"
        >
          {multiSelect ? "Click to select multiple body parts" : "Click to select a body part"}
        </motion.div>
      )}
    </div>
  );
});

InteractiveBodyDiagram.displayName = "InteractiveBodyDiagram";

// Usage examples:
export const BodyDiagramExamples = {
  // Basic usage
  Basic: () => (
    <InteractiveBodyDiagram 
      onSelectionChange={(parts) => console.log('Selected:', parts)}
    />
  ),

  // Single selection mode
  SingleSelect: () => (
    <InteractiveBodyDiagram 
      onSelectionChange={(parts) => console.log('Selected:', parts)}
      multiSelect={false}
    />
  ),

  // Compact mode
  Compact: () => (
    <InteractiveBodyDiagram 
      onSelectionChange={(parts) => console.log('Selected:', parts)}
      compact={true}
    />
  ),

  // With initial selection and highlights
  Advanced: () => (
    <InteractiveBodyDiagram 
      onSelectionChange={(parts) => console.log('Selected:', parts)}
      initialSelection={["Head", "Chest"]}
      highlightedParts={["Arms", "Legs"]}
      showDescriptions={true}
    />
  )
};