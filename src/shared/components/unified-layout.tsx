import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/shared/utils/utils";
import { 
  layoutPrimitives, 
  bentoGrid, 
  cardVariants as unifiedCardVariants,
  componentSizes 
} from "@/design-system/components/component-system";
import { getGlassHoverVariants, getGlassTransitionVariants } from "@/design-system/components/glass-effects";
import { typography } from "@/design-system/tokens/typography";

// ────────────────────────────────────────────────────────────────────────────────
// UNIFIED LAYOUT TYPES
// ────────────────────────────────────────────────────────────────────────────────

type LayoutVariant = keyof typeof layoutPrimitives.container;
type FlexVariant = keyof typeof layoutPrimitives.flex;
type GridVariant = keyof typeof layoutPrimitives.grid;
type GapVariant = keyof typeof layoutPrimitives.gap;
type SpacingVariant = keyof typeof layoutPrimitives.spacing;
type BentoLayout = keyof typeof bentoGrid.layouts;
type CardVariant = keyof typeof unifiedCardVariants;

// ────────────────────────────────────────────────────────────────────────────────
// CONTAINER COMPONENT
// ────────────────────────────────────────────────────────────────────────────────

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: LayoutVariant;
  spacing?: SpacingVariant;
  children: React.ReactNode;
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, variant = "default", spacing, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          layoutPrimitives.container[variant],
          spacing && layoutPrimitives.spacing[spacing],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Container.displayName = "Container";

// ────────────────────────────────────────────────────────────────────────────────
// FLEX COMPONENT
// ────────────────────────────────────────────────────────────────────────────────

interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: FlexVariant;
  gap?: GapVariant;
  children: React.ReactNode;
}

const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  ({ className, variant = "center", gap, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          layoutPrimitives.flex[variant],
          gap && layoutPrimitives.gap[gap],
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
// GRID COMPONENT
// ────────────────────────────────────────────────────────────────────────────────

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: GridVariant | keyof typeof bentoGrid.container;
  gap?: GapVariant;
  isBento?: boolean;
  children: React.ReactNode;
}

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className, variant = "responsive", gap = "md", isBento = false, children, ...props }, ref) => {
    const gridClasses = isBento 
      ? bentoGrid.container[variant as keyof typeof bentoGrid.container] || bentoGrid.container.default
      : cn(
          layoutPrimitives.grid[variant as GridVariant] || layoutPrimitives.grid.responsive,
          layoutPrimitives.gap[gap]
        );

    return (
      <div
        ref={ref}
        className={cn(gridClasses, className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Grid.displayName = "Grid";

// ────────────────────────────────────────────────────────────────────────────────
// UNIFIED CARD COMPONENT
// ────────────────────────────────────────────────────────────────────────────────

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  // Layout variants
  variant?: CardVariant;
  layout?: BentoLayout;
  isBento?: boolean;
  
  // Visual properties
  glassIntensity?: 'subtle' | 'medium';
  interactive?: boolean;
  
  // Content properties
  icon?: React.ReactNode;
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ 
    className, 
    variant = "default", 
    layout,
    isBento = false,
    glassIntensity = 'medium',
    interactive = false,
    icon,
    title,
    subtitle,
    children,
    ...restProps
  }, ref) => {

    const glassVariants = interactive 
      ? getGlassHoverVariants(glassIntensity) 
      : getGlassTransitionVariants(glassIntensity);

    const cardClasses = cn(
      // Base card styles
      "flex flex-col",
      unifiedCardVariants[variant],
      componentSizes.card.md,
      
      // Bento layout if specified
      isBento && layout && bentoGrid.layouts[layout],
      
      // Interactive states
      interactive && "cursor-pointer",
      
      className
    );

    if (interactive) {
      return (
        <motion.div
          ref={ref}
          className={cardClasses}
          variants={glassVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          whileTap="tap"
          whileFocus="focus"
          {...(restProps as any)}
        >
          {/* Header Section */}
          {(icon || title || subtitle) && (
            <div className="flex items-start gap-3 mb-4">
              {icon && (
                <div className={cn("flex-shrink-0", componentSizes.icon.lg)}>
                  {icon}
                </div>
              )}
              <div className="flex-1 min-w-0">
                {title && (
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {title}
                  </h3>
                )}
                {subtitle && (
                  <p className="text-sm text-white/70">
                    {subtitle}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Content Section */}
          <div className="flex-1">
            {children}
          </div>
        </motion.div>
      );
    }

    return (
             <div
         ref={ref}
         className={cardClasses}
         {...restProps}
       >
        {/* Header Section */}
        {(icon || title || subtitle) && (
          <div className="flex items-start gap-3 mb-4">
            {icon && (
              <div className={cn("flex-shrink-0", componentSizes.icon.lg)}>
                {icon}
              </div>
            )}
            <div className="flex-1 min-w-0">
              {title && (
                <h3 className="text-lg font-semibold text-white mb-1">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="text-sm text-white/70">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Content Section */}
        <div className="flex-1">
          {children}
        </div>
      </div>
    );
  }
);
Card.displayName = "Card";

// ────────────────────────────────────────────────────────────────────────────────
// CARD SUB-COMPONENTS (for compatibility with existing Card API)
// ────────────────────────────────────────────────────────────────────────────────

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-4", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(typography.h4, className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(typography.body.small, className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("pt-0 p-4", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center pt-0 p-4", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

// ────────────────────────────────────────────────────────────────────────────────
// SECTION COMPONENT
// ────────────────────────────────────────────────────────────────────────────────

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  container?: LayoutVariant;
  spacing?: SpacingVariant;
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
// LAYOUT UTILITIES
// ────────────────────────────────────────────────────────────────────────────────

interface SpacerProps {
  size?: SpacingVariant;
  className?: string;
}

const Spacer: React.FC<SpacerProps> = ({ size = "md", className }) => (
  <div className={cn(layoutPrimitives.spacing[size], className)} />
);

interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  spacing?: SpacingVariant;
}

const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ className, orientation = 'horizontal', spacing, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "border-white/10",
          orientation === 'horizontal' ? "border-t w-full" : "border-l h-full",
          spacing && (orientation === 'horizontal' 
            ? `my-${spacing}` 
            : `mx-${spacing}`
          ),
          className
        )}
        {...props}
      />
    );
  }
);
Divider.displayName = "Divider";

// ────────────────────────────────────────────────────────────────────────────────
// EXPORTS
// ────────────────────────────────────────────────────────────────────────────────

export {
  // Layout primitives
  Container,
  Flex,
  Grid,
  Section,
  
  // Card components
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  
  // Utilities
  Spacer,
  Divider,
};

export type {
  ContainerProps,
  FlexProps,
  GridProps,
  CardProps,
  SectionProps,
  SpacerProps,
  DividerProps,
  
  // Type aliases for easier usage
  LayoutVariant,
  FlexVariant,
  GridVariant,
  GapVariant,
  SpacingVariant,
  BentoLayout,
  CardVariant,
};

// ────────────────────────────────────────────────────────────────────────────────
// CONVENIENCE EXPORTS (Bento Grid Components)
// ────────────────────────────────────────────────────────────────────────────────

// These are convenience components that wrap the unified components
// for easier migration from existing BentoCard/BentoContainer usage

export const BentoContainer = React.forwardRef<
  HTMLDivElement,
  { layout?: keyof typeof bentoGrid.container; children: React.ReactNode; className?: string }
>(({ layout = "default", children, className, ...props }, ref) => (
  <Grid
    ref={ref}
    variant={layout}
    isBento={true}
    className={className}
    {...props}
  >
    {children}
  </Grid>
));
BentoContainer.displayName = "BentoContainer";

export const BentoCard = React.forwardRef<
  HTMLDivElement,
  Omit<CardProps, 'isBento'> & { layout?: BentoLayout }
>(({ layout = "medium", ...props }, ref) => (
  <Card
    ref={ref}
    isBento={true}
    layout={layout}
    {...props}
  />
));
BentoCard.displayName = "BentoCard";