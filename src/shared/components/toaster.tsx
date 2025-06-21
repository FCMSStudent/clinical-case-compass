/**
 * Toast Component - Unified Sonner Implementation
 * 
 * This replaces the old custom toast system with Sonner for better
 * performance and user experience.
 */

export { Toaster } from "./sonner";

// Re-export toast functions for convenience
export { toast } from "sonner";

// Type exports for better TypeScript support
export type { ToasterProps } from "./sonner";
