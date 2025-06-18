
// -----------------------------------------------------------------------------
// Bento Card – Liquid Glass Edition
// -----------------------------------------------------------------------------
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { bentoGrid, componentSizes } from "@/lib/component-system";

// Variants --------------------------------------------------------------------
const bentoCardVariants = cva("flex flex-col", {
  variants: {
    layout: bentoGrid.layouts,
    surface: {
      none: "",
      "glass-subtle": "glass-subtle",
      glass: "glass",
      "glass-elevated": "glass-elevated",
    },
    variant: {
      default: "glass backdrop-blur-lg border border-white/20",
      elevated: "glass-elevated backdrop-blur-lg border border-white/30",
      subtle: "glass-subtle backdrop-blur-md border border-white/10",
    },
  },
  defaultVariants: {
    layout: "medium",
    surface: "none",
    variant: "default",
  },
});

export interface BentoCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bentoCardVariants> {
  icon?: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export const BentoCard = React.forwardRef<HTMLDivElement, BentoCardProps>(
  (
    {
      className,
      layout,
      surface,
      variant = "default",
      icon,
      title,
      subtitle,
      children,
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={cn(bentoCardVariants({ layout, surface, variant, className }), componentSizes.card.md)}
      {...props}
    >
      {/* Header ------------------------------------------------------------ */}
      {(icon || title || subtitle) && (
        <div className="mb-4 flex items-start gap-3">
          {icon && <div className={cn("flex-shrink-0", componentSizes.icon.lg)}>{icon}</div>}
          <div className="min-w-0 flex-1">
            {title && <h3 className="mb-1 text-lg font-semibold text-white">{title}</h3>}
            {subtitle && <p className="text-sm text-white/70">{subtitle}</p>}
          </div>
        </div>
      )}
      {/* Content ----------------------------------------------------------- */}
      <div className="flex-1">{children}</div>
    </div>
  ),
);
BentoCard.displayName = "BentoCard";

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------
export { bentoCardVariants };
