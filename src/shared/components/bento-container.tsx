import * as React from "react";
import { cn } from "@/shared/utils/utils";
import { bentoGrid } from "@/design-system/components/component-system";

interface BentoContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  layout?: keyof typeof bentoGrid.container;
  children: React.ReactNode;
}

const BentoContainer = React.forwardRef<HTMLDivElement, BentoContainerProps>(
  ({ className, layout = "default", children, ...props }, ref) => {
    const layoutClasses = bentoGrid.container[layout];

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
