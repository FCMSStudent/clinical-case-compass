import * as React from "react";
import { cn } from "@/lib/utils";
import { bento as newBentoStyles } from "@/lib/styles/components"; // Updated import

interface BentoContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: keyof typeof newBentoStyles.container.gap; // Changed prop from layout to gap
  children: React.ReactNode;
}

const BentoContainer = React.forwardRef<HTMLDivElement, BentoContainerProps>(
  ({ className, gap = "default", children, ...props }, ref) => { // Changed prop from layout to gap
    // Map old layout values to new gap values if necessary, or just use new gap directly
    const gapClass = newBentoStyles.container.gap[gap];

    return (
      <div
        ref={ref}
        className={cn(newBentoStyles.container.base, gapClass, className)} // Apply new base and gap
        {...props}
      >
        {children}
      </div>
    );
  }
);

BentoContainer.displayName = "BentoContainer";

export { BentoContainer };
