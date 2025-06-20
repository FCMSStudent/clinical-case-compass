import * as React from "react";
import { cn } from "@/shared/utils/utils";
import { cardVariants as unifiedCardVariants, bentoGrid, componentSizes } from "@/design-system/components/component-system";

interface BentoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  layout?: keyof typeof bentoGrid.layouts;
  variant?: keyof typeof unifiedCardVariants;
  icon?: React.ReactNode;
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
}

const BentoCard = React.forwardRef<HTMLDivElement, BentoCardProps>(
  ({ 
    className, 
    layout = "medium", 
    variant = "default", 
    icon, 
    title, 
    subtitle, 
    children, 
    ...props 
  }, ref) => {
    const layoutClasses = bentoGrid.layouts[layout];
    const variantClasses = unifiedCardVariants[variant];

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col",
          layoutClasses,
          variantClasses,
          componentSizes.card.md,
          className
        )}
        {...props}
      >
        {/* Header */}
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

        {/* Content */}
        <div className="flex-1">
          {children}
        </div>
      </div>
    );
  }
);

BentoCard.displayName = "BentoCard";

export { BentoCard };
