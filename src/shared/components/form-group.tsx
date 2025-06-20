import { forwardRef } from 'react';
import { cn } from '@/shared/utils/utils';
import { Label } from '@/shared/components/label';
import { typo } from '@/design-system/tokens/typography';

interface FormGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  error?: string;
  description?: string;
  required?: boolean;
  children: React.ReactNode;
}

const FormGroup = forwardRef<HTMLDivElement, FormGroupProps>(
  ({ className, label, error, description, required, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('space-y-2', className)} {...props}>
        {label && (
          <Label className={cn(typo.label, error && 'text-destructive')}>
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </Label>
        )}
        {children}
        {description && !error && (
          <p className={cn(typo.bodySmall, "text-muted-foreground")}>{description}</p>
        )}
        {error && (
          <p className={cn(typo.bodySmall, "text-destructive")}>{error}</p>
        )}
      </div>
    );
  }
);

FormGroup.displayName = 'FormGroup';

export { FormGroup };
