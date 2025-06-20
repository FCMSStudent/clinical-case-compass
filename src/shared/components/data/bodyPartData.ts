import type { BodyPart, BodyPartCategory, BodyPartConfig } from "../types/bodyPartTypes";

// Comprehensive body part configuration
export const BODY_PART_CONFIG: Record<BodyPart, BodyPartConfig> = {
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

export const CATEGORY_LABEL: Record<BodyPartCategory, string> = {
  upper: "Upper Body",
  core: "Torso",
  lower: "Lower Body",
};

export const getCategorizedParts = () => {
  const categories: Record<BodyPartCategory, BodyPartConfig[]> = {
    upper: [],
    core: [],
    lower: []
  };

  Object.values(BODY_PART_CONFIG).forEach(part => {
    categories[part.category].push(part);
  });

  return categories;
}; 