import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/shared/utils/utils";

// ────────────────────────────────────────────────────────────────────────────────
// CONTAINER COMPONENTS
// ────────────────────────────────────────────────────────────────────────────────

const containerVariants = cva(
  "w-full mx-auto",
  {
    variants: {
      variant: {
        default: "max-w-7xl px-4 sm:px-6 lg:px-8",
        narrow: "max-w-4xl px-4 sm:px-6 lg:px-8",
        wide: "max-w-full px-4 sm:px-6 lg:px-8",
        fluid: "px-4 sm:px-6 lg:px-8",
        tight: "max-w-3xl px-4 sm:px-6",
        loose: "max-w-full px-6 sm:px-8 lg:px-12",
        content: "max-w-prose px-4 sm:px-6",
        screen: "max-w-screen-xl px-4 sm:px-6 lg:px-8",
      },
      padding: {
        none: "px-0",
        xs: "px-2 sm:px-3",
        sm: "px-4 sm:px-6",
        md: "px-4 sm:px-6 lg:px-8",
        lg: "px-6 sm:px-8 lg:px-12",
        xl: "px-8 sm:px-12 lg:px-16",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "md",
    },
  }
)

interface ContainerProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, variant, padding, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(containerVariants({ variant, padding }), className)}
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

const flexVariants = cva(
  "flex",
  {
    variants: {
      direction: {
        row: "flex-row",
        col: "flex-col",
        rowReverse: "flex-row-reverse",
        colReverse: "flex-col-reverse",
      },
      align: {
        start: "items-start",
        center: "items-center",
        end: "items-end",
        stretch: "items-stretch",
        baseline: "items-baseline",
      },
      justify: {
        start: "justify-start",
        center: "justify-center",
        end: "justify-end",
        between: "justify-between",
        around: "justify-around",
        evenly: "justify-evenly",
      },
      wrap: {
        wrap: "flex-wrap",
        nowrap: "flex-nowrap",
        reverse: "flex-wrap-reverse",
      },
      gap: {
        none: "gap-0",
        xs: "gap-1",
        sm: "gap-2",
        md: "gap-4",
        lg: "gap-6",
        xl: "gap-8",
        "2xl": "gap-12",
      },
    },
    defaultVariants: {
      direction: "row",
      align: "center",
      justify: "start",
      wrap: "nowrap",
      gap: "md",
    },
  }
)

interface FlexProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof flexVariants> {}

const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  ({ className, direction, align, justify, wrap, gap, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          flexVariants({ direction, align, justify, wrap, gap }),
          className
        )}
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

const gridVariants = cva(
  "grid",
  {
    variants: {
      variant: {
        responsive: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6",
        twoCol: "grid-cols-1 lg:grid-cols-2",
        threeCol: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        fourCol: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
        sixCol: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
        autoFit: "grid-cols-[repeat(auto-fit,minmax(280px,1fr))]",
        autoFill: "grid-cols-[repeat(auto-fill,minmax(280px,1fr))]",
        equal: "grid-cols-[repeat(auto-fit,minmax(0,1fr))]",
        
        // Fixed grids
        cols1: "grid-cols-1",
        cols2: "grid-cols-2",
        cols3: "grid-cols-3",
        cols4: "grid-cols-4",
        cols5: "grid-cols-5",
        cols6: "grid-cols-6",
        cols12: "grid-cols-12",
      },
      gap: {
        none: "gap-0",
        xs: "gap-1",
        sm: "gap-2",
        md: "gap-4",
        lg: "gap-6",
        xl: "gap-8",
        "2xl": "gap-12",
      },
      rows: {
        auto: "auto-rows-auto",
        min: "auto-rows-min",
        max: "auto-rows-max",
        fr: "auto-rows-fr",
      },
    },
    defaultVariants: {
      variant: "responsive",
      gap: "md",
      rows: "auto",
    },
  }
)

interface GridProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {}

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className, variant, gap, rows, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          gridVariants({ variant, gap, rows }),
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

const spacingVariants = cva(
  "",
  {
    variants: {
      variant: {
        xs: "space-y-1",
        sm: "space-y-2",
        md: "space-y-3",
        lg: "space-y-4",
        xl: "space-y-6",
        "2xl": "space-y-8",
        "3xl": "space-y-12",
      },
      direction: {
        vertical: "",
        horizontal: "",
      },
    },
    compoundVariants: [
      {
        direction: "horizontal",
        variant: "xs",
        class: "space-x-1 space-y-0",
      },
      {
        direction: "horizontal", 
        variant: "sm",
        class: "space-x-2 space-y-0",
      },
      {
        direction: "horizontal",
        variant: "md", 
        class: "space-x-3 space-y-0",
      },
      {
        direction: "horizontal",
        variant: "lg",
        class: "space-x-4 space-y-0", 
      },
      {
        direction: "horizontal",
        variant: "xl",
        class: "space-x-6 space-y-0",
      },
      {
        direction: "horizontal",
        variant: "2xl",
        class: "space-x-8 space-y-0",
      },
      {
        direction: "horizontal",
        variant: "3xl", 
        class: "space-x-12 space-y-0",
      },
    ],
    defaultVariants: {
      variant: "md",
      direction: "vertical",
    },
  }
)

interface SpacingProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spacingVariants> {}

const Spacing = React.forwardRef<HTMLDivElement, SpacingProps>(
  ({ className, variant, direction, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(spacingVariants({ variant, direction }), className)}
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

const sectionVariants = cva(
  "",
  {
    variants: {
      container: {
        default: "w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        narrow: "w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8",
        wide: "w-full max-w-full mx-auto px-4 sm:px-6 lg:px-8",
        fluid: "w-full px-4 sm:px-6 lg:px-8",
      },
      spacing: {
        none: "",
        xs: "py-4",
        sm: "py-6",
        md: "py-8",
        lg: "py-12",
        xl: "py-16",
        "2xl": "py-24",
        "3xl": "py-32",
      },
      background: {
        none: "",
        subtle: "bg-white/5 backdrop-blur-sm",
        glass: "bg-black/15 backdrop-blur-[24px] saturate-120 brightness-105 border-y border-white/10",
      },
    },
    defaultVariants: {
      container: "default",
      spacing: "lg",
      background: "none",
    },
  }
)

interface SectionProps 
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, container, spacing, background, children, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(
          sectionVariants({ container, spacing, background }),
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

export { 
  Container, 
  Flex, 
  Grid, 
  Spacing, 
  Section,
  containerVariants,
  flexVariants,
  gridVariants,
  spacingVariants,
  sectionVariants
};

export type { 
  ContainerProps, 
  FlexProps, 
  GridProps, 
  SpacingProps, 
  SectionProps 
}; 