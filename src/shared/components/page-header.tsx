import { cn } from "@/lib/utils";
import { typo, responsiveType } from "@/lib/typography";

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
  actions?: React.ReactNode;
  icon?: React.ReactNode;
}

export function PageHeader({ 
  title, 
  description, 
  className,
  children,
  actions,
  icon
}: PageHeaderProps) {
  return (
    <div className={cn("mb-6 flex flex-col gap-1 md:flex-row md:items-center md:justify-between", className)}>
      <div className="flex items-center gap-3">
        {icon && (
          <div className="flex items-center text-white">
            {icon}
          </div>
        )}
        <div>
          <h1 className={cn(responsiveType.h1, "text-white")}>{title}</h1>
          {description && (
            <p className={cn(typo.bodyLarge, "text-white/80")}>{description}</p>
          )}
        </div>
      </div>
      {(children || actions) && (
        <div className="mt-4 md:mt-0">
          {actions || children}
        </div>
      )}
    </div>
  );
}
