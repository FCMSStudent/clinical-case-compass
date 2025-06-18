import * as React from "react";
import { cn } from "@/lib/utils";
import { layoutPrimitives } from "@/lib/component-system";

// ────────────────────────────────────────────────────────────────────────────────
// CONTAINER COMPONENTS
// ────────────────────────────────────────────────────────────────────────────────

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof layoutPrimitives.container;
  children: React.ReactNode;
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(layoutPrimitives.container[variant], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Container.displayName = "Container";

// ────────────────────────────────────────────────────────────────────────────────
// FLEX LAYOUT COMPONENTS
// ────────────────────────────────────────────────────────────────────────────────

interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof layoutPrimitives.flex;
  children: React.ReactNode;
}

const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  ({ className, variant = "center", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(layoutPrimitives.flex[variant], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Flex.displayName = "Flex";

// ────────────────────────────────────────────────────────────────────────────────
// GRID LAYOUT COMPONENTS
// ────────────────────────────────────────────────────────────────────────────────

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof layoutPrimitives.grid;
  gap?: keyof typeof layoutPrimitives.gap;
  children: React.ReactNode;
}

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className, variant = "responsive", gap = "md", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          layoutPrimitives.grid[variant],
          layoutPrimitives.gap[gap],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Grid.displayName = "Grid";

// ────────────────────────────────────────────────────────────────────────────────
// SPACING COMPONENTS
// ────────────────────────────────────────────────────────────────────────────────

interface SpacingProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof layoutPrimitives.spacing;
  children: React.ReactNode;
}

const Spacing = React.forwardRef<HTMLDivElement, SpacingProps>(
  ({ className, variant = "md", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(layoutPrimitives.spacing[variant], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Spacing.displayName = "Spacing";

// ────────────────────────────────────────────────────────────────────────────────
// SECTION COMPONENTS
// ────────────────────────────────────────────────────────────────────────────────

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  container?: keyof typeof layoutPrimitives.container;
  spacing?: keyof typeof layoutPrimitives.spacing;
  children: React.ReactNode;
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, container = "default", spacing = "lg", children, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(
          layoutPrimitives.container[container],
          layoutPrimitives.spacing[spacing],
          className
        )}
        {...props}
      >
        {children}
      </section>
    );
  }
);
Section.displayName = "Section";

// ────────────────────────────────────────────────────────────────────────────────
// EXPORTS
// ────────────────────────────────────────────────────────────────────────────────

export { Container, Flex, Grid, Spacing, Section };
export type { ContainerProps, FlexProps, GridProps, SpacingProps, SectionProps }; 