
import * as React from "react";
import { cn } from "@/lib/utils";
import { getBentoStyles } from "@/lib/design-system";

interface BentoContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  layout?: "default" | "dense" | "spacious";
  children: React.ReactNode;
}

const BentoContainer = React.forwardRef<HTMLDivElement, BentoContainerProps>(
  ({ className, layout = "default", children, ...props }, ref) => {
    const layoutClasses = getBentoStyles('container', layout);

    return (
      <div
        ref={ref}
        className={cn(layoutClasses, className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

BentoContainer.displayName = "BentoContainer";

export { BentoContainer };
