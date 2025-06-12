import { z } from "zod";

export const learningPointsStepSchema = z.object({
  learningPoints: z.string()
    .min(1, "Learning points are required")
    .min(10, "Learning points must be at least 10 characters")
    .max(1000, "Learning points must be less than 1000 characters"),
  generalNotes: z.string()
    .max(2000, "General notes must be less than 2000 characters")
    .optional(),
  resourceLinks: z.array(
    z.object({
      url: z.string()
        .min(1, "Resource URL is required")
        .url("Please enter a valid URL"),
      description: z.string()
        .max(500, "Description must be less than 500 characters")
        .optional(),
    })
  ).optional(),
});

// Define a more specific type for resource links
export interface ResourceLink {
  url: string;
  description: string;
}

// Define the form data type with proper constraints
export interface LearningPointsFormData {
  learningPoints?: string;
  generalNotes?: string;
  resourceLinks: ResourceLink[];
} 