
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { glass } from '@/lib/styles/common'; // Updated import

interface SettingsCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
}

const SettingsCard: React.FC<SettingsCardProps> = ({
  title,
  description,
  children,
  className,
  icon,
  badge
}) => {
  return (
    <Card className={cn(glass.elevated, 'hover:bg-white/10', className)}>
      <CardHeader className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {icon && (
              <div className="p-2 bg-white/10 rounded-lg">
                {icon}
              </div>
            )}
            <div>
              <CardTitle className="text-white text-lg">{title}</CardTitle>
              {description && (
                <CardDescription className="text-white/70 mt-1">
                  {description}
                </CardDescription>
              )}
            </div>
          </div>
          {badge}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {children}
      </CardContent>
    </Card>
  );
};

export { SettingsCard };
