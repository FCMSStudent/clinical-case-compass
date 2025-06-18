// -----------------------------------------------------------------------------
// Layout Primitives – Liquid Glass Edition
// -----------------------------------------------------------------------------
// Adds optional frosted-surface variants (`glass-*`) so wrappers themselves can
// participate in glassmorphic stacks (e.g. hero sections, translucent sidebars).
// -----------------------------------------------------------------------------

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { layoutPrimitives as legacy } from "@/lib/component-system";

// ─── Helpers ------------------------------------------------------------------
const merge = <T extends Record<string, string>>(a: T, b: Partial<T>): T =>
  ({ ...a, ...b }) as T;

// ─── Container ----------------------------------------------------------------
const containerVariants = cva("w-full mx-auto", {
  variants: {
    variant: merge(legacy.container, {
      "glass-subtle": "glass-subtle backdrop-blur-md px-4 md:px-8",
      glass: "glass backdrop-blur-lg px-4 md:px-8",
      "glass-elevated": "glass-elevated backdrop-blur-lg px-4 md:px-8",
    }),
  },
  defaultVariants: { variant: "default" },
});

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(containerVariants({ variant, className }))}
      {...props}
    />
  ),
);
Container.displayName = "Container";

// ─── Flex ---------------------------------------------------------------------
const flexVariants = cva("flex", {
  variants: {
    variant: merge(legacy.flex, {
      "glass-subtle": "glass-subtle",
      glass: "glass",
      "glass-elevated": "glass-elevated",
    }),
  },
  defaultVariants: { variant: "center" },
});

export interface FlexProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof flexVariants> {}

export const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(flexVariants({ variant, className }))}
      {...props}
    />
  ),
);
Flex.displayName = "Flex";

// ─── Grid ---------------------------------------------------------------------
const gridVariants = cva("grid", {
  variants: {
    variant: merge(legacy.grid, {
      "glass-subtle": "glass-subtle",
      glass: "glass",
      "glass-elevated": "glass-elevated",
    }),
  },
  defaultVariants: { variant: "responsive" },
});

const gapVariants = merge(legacy.gap, {
  none: "gap-0",
});

export interface GridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {
  gap?: keyof typeof gapVariants;
}

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className, variant, gap = "md", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(gridVariants({ variant }), gapVariants[gap], className)}
      {...props}
    />
  ),
);
Grid.displayName = "Grid";

// ─── Spacing ------------------------------------------------------------------
const spacingVariants = merge(legacy.spacing, {
  xs: "py-1",
  xl: "py-16",
});

export interface SpacingProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof spacingVariants;
}

export const Spacing = React.forwardRef<HTMLDivElement, SpacingProps>(
  ({ className, variant = "md", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(spacingVariants[variant], className)}
      {...props}
    />
  ),
);
Spacing.displayName = "Spacing";

// ─── Section ------------------------------------------------------------------
export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof containerVariants> {
  spacing?: keyof typeof spacingVariants;
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  (
    { className, variant = "default", spacing = "lg", ...props },
    ref,
  ) => (
    <section
      ref={ref}
      className={cn(
        containerVariants({ variant }),
        spacingVariants[spacing],
        className,
      )}
      {...props}
    />
  ),
);
Section.displayName = "Section";

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------
export { containerVariants, flexVariants, gridVariants };
export type { GridProps, FlexProps, SectionProps, SpacingProps, ContainerProps };
