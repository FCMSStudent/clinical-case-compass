
import * as React from "react";
import { cn } from "@/lib/utils";
import { layouts } from "@/lib/ui-styles";

interface BentoContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  layout?: "default" | "dense" | "spacious";
  children: React.ReactNode;
}

const BentoContainer = React.forwardRef<HTMLDivElement, BentoContainerProps>(
  ({ className, layout = "default", children, ...props }, ref) => {
    const layoutClasses = layouts.bento[layout];

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
