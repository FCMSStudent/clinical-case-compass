// -----------------------------------------------------------------------------
// Bento Container – Liquid Glass Edition
// -----------------------------------------------------------------------------
// Extends the legacy `bentoGrid.container` presets with optional frosted
// backgrounds so whole bento blocks can float on Apple‑style "liquid" glass.
// -----------------------------------------------------------------------------

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { bentoGrid } from "@/lib/component-system";

// Helper to merge record types                           ----------------------
const merge = <T extends Record<string, string>>(a: T, extra: Partial<T>): T =>
  ({ ...a, ...extra }) as T;

// -----------------------------------------------------------------------------
// Variants
// -----------------------------------------------------------------------------
const containerVariants = cva("relative w-full", {
  variants: {
    layout: bentoGrid.container,
    surface: merge(
      {
        none: "",
      },
      {
        "glass-subtle": "glass-subtle backdrop-blur-md",
        glass: "glass backdrop-blur-lg",
        "glass-elevated": "glass-elevated backdrop-blur-lg",
      },
    ),
  },
  defaultVariants: {
    layout: "default",
    surface: "none",
  },
});

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------
export interface BentoContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------
export const BentoContainer = React.forwardRef<HTMLDivElement, BentoContainerProps>(
  ({ className, layout, surface, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(containerVariants({ layout, surface, className }))}
      {...props}
    >
      {children}
    </div>
  ),
);
BentoContainer.displayName = "BentoContainer";

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------
export { containerVariants as bentoContainerVariants };
