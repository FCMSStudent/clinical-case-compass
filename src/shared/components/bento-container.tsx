import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/shared/utils/utils";

// Unified bento container variants
const bentoContainerVariants = cva(
  "grid grid-cols-1 auto-rows-min",
  {
    variants: {
      layout: {
        // Responsive grid layouts
        default: "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6",
        dense: "sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8",
        spacious: "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
        twoCol: "lg:grid-cols-2",
        threeCol: "md:grid-cols-2 lg:grid-cols-3",
        fourCol: "sm:grid-cols-2 lg:grid-cols-4",
        autoFit: "grid-cols-[repeat(auto-fit,minmax(280px,1fr))]",
        autoFill: "grid-cols-[repeat(auto-fill,minmax(280px,1fr))]",
        masonry: "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
      },
      gap: {
        xs: "gap-2",
        sm: "gap-3", 
        md: "gap-4",
        lg: "gap-6",
        xl: "gap-8",
        "2xl": "gap-12",
      },
      padding: {
        none: "",
        xs: "p-2",
        sm: "p-4",
        md: "p-6", 
        lg: "p-8",
        xl: "p-12",
      },
    },
    defaultVariants: {
      layout: "default",
      gap: "md",
      padding: "none",
    },
  }
)

interface BentoContainerProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bentoContainerVariants> {}

const BentoContainer = React.forwardRef<HTMLDivElement, BentoContainerProps>(
  ({ className, layout, gap, padding, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          bentoContainerVariants({ layout, gap, padding }),
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

BentoContainer.displayName = "BentoContainer";

export { BentoContainer, bentoContainerVariants };
