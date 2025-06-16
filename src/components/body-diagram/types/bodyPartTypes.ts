// Enhanced type definitions for body part selector
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

export interface SimpleBodyPartSelectorProps {
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