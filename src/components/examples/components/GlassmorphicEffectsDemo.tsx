import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { StaggeredItem } from '@/components/ui/animation';
import { card } from '@/lib/design-system';

export function GlassmorphicEffectsDemo() {
  return (
    <StaggeredItem>
      <Card className={card.variant.elevated}>
        <CardHeader>
          <CardTitle className="text-white">Glassmorphic Effect Variants</CardTitle>
          <CardDescription className="text-white/70">
            Standardized glass effects for consistent depth and hierarchy
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={card.variant.default + ' p-4'}>
            <div className="text-white/90 font-medium">Subtle Glass</div>
            <div className="text-white/70 text-sm">Minimal depth for backgrounds</div>
          </div>
          <div className={card.variant.elevated + ' p-4'}>
            <div className="text-white font-medium">Medium Glass</div>
            <div className="text-white/70 text-sm">Standard card depth</div>
          </div>
          <div className={card.variant.featured + ' p-4'}>
            <div className="text-white font-medium">Elevated Glass</div>
            <div className="text-white/70 text-sm">Prominent overlays</div>
          </div>
        </CardContent>
      </Card>
    </StaggeredItem>
  );
} 