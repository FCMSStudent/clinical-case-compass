import React, { useState, useCallback, useMemo, useEffect } from "react";
import { cn } from "@/lib/utils";
import type { BodyPart, SimpleBodyPartSelectorProps, BodyPartCategory as BodyPartCategoryType } from "./types/bodyPartTypes";
import { getCategorizedParts } from "./data/bodyPartData";
import { BodyDiagramHeader } from "./components/BodyDiagramHeader";
import { BodyPartCategory } from "./components/BodyPartCategory";
import { BodyDiagramTooltip } from "./components/BodyDiagramTooltip";
import { BodyDiagramHint } from "./components/BodyDiagramHint";

/**
 * Enhanced interactive body diagram with improved UX, accessibility, and functionality
 */
export const SimpleBodyPartSelector: React.FC<SimpleBodyPartSelectorProps> = React.memo(({
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
  useEffect(() => {
    setSelectedParts(new Set(initialSelection));
  }, [initialSelection]);
  const [hoveredPart, setHoveredPart] = useState<BodyPart | null>(null);
  const highlightedSet = useMemo(() => new Set(highlightedParts), [highlightedParts]);

  // Categorized body parts for better layout
  const categorizedParts = useMemo(() => getCategorizedParts(), []);

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

  const isPartHighlighted = useCallback((part: BodyPart) => highlightedSet.has(part), [highlightedSet]);

  const getPartVariant = useCallback((part: BodyPart) => {
    if (isPartSelected(part)) return "default";
    if (isPartHighlighted(part)) return "secondary";
    return "outline";
  }, [isPartSelected, isPartHighlighted]);

  const handleClearAll = useCallback(() => {
    setSelectedParts(new Set());
    onSelectionChange([]);
  }, [onSelectionChange]);

  return (
    <div className={cn(
      "space-y-6 rounded-2xl border p-6 shadow-sm bg-background/80 backdrop-blur-sm",
      "transition-all duration-300",
      disabled && "opacity-75",
      className
    )}>
      {/* Header */}
      <BodyDiagramHeader
        selectedParts={selectedParts}
        multiSelect={multiSelect}
        compact={compact}
        disabled={disabled}
        onClearAll={handleClearAll}
      />

      {/* Body parts by category */}
      <div className="space-y-6">
        {Object.entries(categorizedParts).map(([category, parts]) => (
          <BodyPartCategory
            key={category}
            category={category as BodyPartCategoryType}
            parts={parts}
            selectedParts={selectedParts}
            highlightedParts={highlightedSet}
            hoveredPart={hoveredPart}
            disabled={disabled}
            compact={compact}
            showDescriptions={showDescriptions}
            onPartClick={handlePartClick}
            onPartHover={setHoveredPart}
            getPartVariant={getPartVariant}
          />
        ))}
      </div>

      {/* Hover tooltip for compact mode */}
      <BodyDiagramTooltip
        hoveredPart={hoveredPart}
        showDescriptions={showDescriptions}
        compact={compact}
      />

      {/* Usage hint */}
      <BodyDiagramHint
        selectedParts={selectedParts}
        multiSelect={multiSelect}
        disabled={disabled}
      />
    </div>
  );
});

SimpleBodyPartSelector.displayName = "SimpleBodyPartSelector";

// Usage examples:
export const BodyDiagramExamples = {
  // Basic usage
  Basic: () => (
    <SimpleBodyPartSelector
      onSelectionChange={(parts) => console.log('Selected:', parts)}
    />
  ),

  // Single selection mode
  SingleSelect: () => (
    <SimpleBodyPartSelector
      onSelectionChange={(parts) => console.log('Selected:', parts)}
      multiSelect={false}
    />
  ),

  // Compact mode
  Compact: () => (
    <SimpleBodyPartSelector
      onSelectionChange={(parts) => console.log('Selected:', parts)}
      compact={true}
    />
  ),

  // With initial selection and highlights
  Advanced: () => (
    <SimpleBodyPartSelector
      onSelectionChange={(parts) => console.log('Selected:', parts)}
      initialSelection={["Head", "Chest"]}
      highlightedParts={["Arms", "Legs"]}
      showDescriptions={true}
    />
  )
};
