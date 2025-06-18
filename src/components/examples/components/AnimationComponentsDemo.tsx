import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Activity, AlertTriangle } from 'lucide-react';
import { StaggeredItem, GlassyHover, Floating, PulseGlow } from '@/components/ui/animation';
import { card } from "@/lib/components";

export function AnimationComponentsDemo() {
  return (
    <StaggeredItem>
      <Card className={card.variant.interactive}>
        <CardHeader>
          <CardTitle className="text-white">Animation Components</CardTitle>
          <CardDescription className="text-white/70">
            Reusable animation wrappers with medical-specific patterns
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <GlassyHover className={`${card.variant.default} p-4 rounded-lg cursor-pointer`}>
              <Heart className="h-6 w-6 text-red-400 mb-2" />
              <div className="text-white font-medium">Glassy Hover</div>
              <div className="text-white/70 text-sm">3D hover effect</div>
            </GlassyHover>
            
            <Floating className={`${card.variant.default} p-4 rounded-lg`}>
              <Activity className="h-6 w-6 text-green-400 mb-2" />
              <div className="text-white font-medium">Floating</div>
              <div className="text-white/70 text-sm">Gentle float animation</div>
            </Floating>
            
            <PulseGlow className={`${card.variant.default} p-4 rounded-lg`}>
              <AlertTriangle className="h-6 w-6 text-yellow-400 mb-2" />
              <div className="text-white font-medium">Pulse Glow</div>
              <div className="text-white/70 text-sm">Medical pulse effect</div>
            </PulseGlow>
          </div>
        </CardContent>
      </Card>
    </StaggeredItem>
  );
} 