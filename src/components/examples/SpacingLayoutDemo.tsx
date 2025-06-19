import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { typography } from '@/lib/typography';
import { spacing, borderRadius, layout } from '@/lib/design-system';

export const SpacingLayoutDemo: React.FC = () => {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h2 className={cn(typography.title, 'text-white')}>
          Apple-Inspired Spacing & Layout System
        </h2>
        <p className={cn(typography.body, 'text-white/70')}>
          Consistent spacing based on 8pt grid system
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Spacing Examples */}
        <Card className="bg-white/10 backdrop-blur-xl border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Spacing Examples</CardTitle>
            <CardDescription className="text-white/70">
              Consistent spacing values for UI elements
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-primary-500 rounded" style={{ width: spacing[8], height: spacing[8] }} />
              <span className="text-white">Spacing 8 - Small elements</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary-500 rounded" style={{ width: spacing[12], height: spacing[12] }} />
              <span className="text-white">Spacing 12 - Medium elements</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-primary-500 rounded" style={{ width: spacing[16], height: spacing[16] }} />
              <span className="text-white">Spacing 16 - Large elements</span>
            </div>
          </CardContent>
        </Card>

        {/* Border Radius Examples */}
        <Card className="bg-white/10 backdrop-blur-xl border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Border Radius</CardTitle>
            <CardDescription className="text-white/70">
              Consistent border radius values for UI elements
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-8 bg-primary-500 rounded-sm" style={{ borderRadius: borderRadius.sm }} />
              <span className="text-white">Rounded Small</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-8 bg-primary-500 rounded-md" style={{ borderRadius: borderRadius.md }} />
              <span className="text-white">Rounded Medium</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-8 bg-primary-500 rounded-lg" style={{ borderRadius: borderRadius.lg }} />
              <span className="text-white">Rounded Large</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-8 bg-primary-500 rounded-xl" style={{ borderRadius: borderRadius.xl }} />
              <span className="text-white">Rounded Extra Large</span>
            </div>
          </CardContent>
        </Card>

        {/* Layout Examples */}
        <Card className="bg-white/10 backdrop-blur-xl border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Layout Examples</CardTitle>
            <CardDescription className="text-white/70">
              Consistent layout values for UI elements
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-24 h-6 bg-primary-500 rounded" style={{ width: layout.xs }} />
              <span className="text-white">Extra Small Width</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-32 h-6 bg-primary-500 rounded" style={{ width: layout.sm }} />
              <span className="text-white">Small Width</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-40 h-6 bg-primary-500 rounded" style={{ width: layout.md }} />
              <span className="text-white">Medium Width</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
