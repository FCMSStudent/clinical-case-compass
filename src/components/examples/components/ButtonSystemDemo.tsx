import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StaggeredItem } from '@/components/ui/animation';
import { buttonVariants } from '@/lib/design-system';
import { card } from "@/lib/components";

export function ButtonSystemDemo() {
  return (
    <StaggeredItem>
      <Card className={card.variant.elevated}>
        <CardHeader>
          <CardTitle className="text-white">Unified Button System</CardTitle>
          <CardDescription className="text-white/70">
            Standardized button variants with consistent glassmorphic effects
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <Button className={buttonVariants.primary}>Primary Action</Button>
            <Button className={buttonVariants.secondary}>Secondary</Button>
            <Button className={buttonVariants.outline}>Outline</Button>
            <Button className={buttonVariants.ghost}>Ghost</Button>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button className={buttonVariants.success}>Success</Button>
            <Button className={buttonVariants.destructive}>Error</Button>
            <Button className={buttonVariants.medical}>Medical</Button>
            <Button className={buttonVariants.critical}>Critical</Button>
          </div>
        </CardContent>
      </Card>
    </StaggeredItem>
  );
} 