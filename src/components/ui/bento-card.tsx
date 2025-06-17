// -----------------------------------------------------------------------------
// Bento Card – Liquid Glass Edition
// -----------------------------------------------------------------------------
// * Wraps the updated `cardVariants` so any card can render as a bento tile.
// * Adds `surface` prop (none | glass-subtle | glass | glass-elevated) to align
//   with the rest of the system.
// * Supports `layout` presets from `bentoGrid.layouts` for grid span control.
// -----------------------------------------------------------------------------

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { cardVariants } from "@/components/ui/card";
import { bentoGrid, componentSizes } from "@/lib/component-system";

// Helper merge ---------------------------------------------------------------
const merge = <T extends Record<string, string>>(a: T, b: Partial<T>): T =>
  ({ ...a, ...b }) as T;

// Variants --------------------------------------------------------------------
const bentoCardVariants = cva("flex flex-col", {
  variants: {
    layout: bentoGrid.layouts,
    surface: merge(
      {
        none: "",
      },
      {
        "glass-subtle": "glass-subtle",
        glass: "glass",
        "glass-elevated": "glass-elevated",
      },
    ),
    card: cardVariants.variants.variant!, // pull keys from existing cardVariants
  },
  defaultVariants: {
    layout: "medium",
    surface: "none",
    card: "default",
  },
});

type LayoutKey = keyof typeof bentoGrid.layouts;

type SurfaceKey = "none" | "glass-subtle" | "glass" | "glass-elevated";

type CardKey = Parameters<typeof cardVariants>[0]["variant"];

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
      card = "default",
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
      className={cn(bentoCardVariants({ layout, surface, card, className }), componentSizes.card.md)}
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
