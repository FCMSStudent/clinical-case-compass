import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Heart, Activity, Users, TrendingUp, AlertTriangle } from 'lucide-react';
import {
  AnimatedDiv,
  StaggeredContainer,
  StaggeredItem,
  GlassyHover,
  Floating,
  PulseGlow
} from '@/components/ui/animation';
import { 
  getComponentStyles, 
  getBentoStyles, 
  getGlassmorphicStyles
} from '@/lib/styles/utils';
import { buttonVariants } from '@/lib/styles/common';
import { card } from '@/lib/styles/components';

export function UnifiedComponentSystemExample() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 dark:from-blue-900 dark:via-blue-800 dark:to-blue-900">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-8 space-y-12">
        {/* Header */}
        <AnimatedDiv variant="glassmorphicEntrance" className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">Phase 3: Unified Component System</h1>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            Complete component system with standardized variants, interaction states, 
            glassmorphic effects, and animation patterns for medical applications.
          </p>
        </AnimatedDiv>

        {/* Button System */}
        <StaggeredContainer className="space-y-6">
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

          {/* Glassmorphic Effects */}
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

          {/* Animation Components */}
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

          {/* Bento Grid System */}
          <StaggeredItem>
            <Card className={card.variant.featured}>
              <CardHeader>
                <CardTitle className="text-white">Enhanced Bento Grid</CardTitle>
                <CardDescription className="text-white/70">
                  Responsive grid system with predefined layouts for medical dashboards
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className={getBentoStyles('container', 'default')}>
                  <div className={`${getBentoStyles('card', 'small')} ${card.variant.default} p-4 rounded-lg`}>
                    <Users className="h-6 w-6 text-blue-400 mb-2" />
                    <div className="text-white font-medium">Patients</div>
                    <div className="text-2xl font-bold text-white">1,234</div>
                  </div>
                  
                  <div className={`${getBentoStyles('card', 'medium')} ${card.variant.default} p-4 rounded-lg`}>
                    <TrendingUp className="h-6 w-6 text-green-400 mb-2" />
                    <div className="text-white font-medium mb-4">Patient Statistics</div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-white/70">Recovery Rate</span>
                        <span className="text-green-400">94.2%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-white/70">Average Stay</span>
                        <span className="text-white">3.2 days</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`${getBentoStyles('card', 'large')} ${card.variant.elevated} p-4 rounded-lg`}>
                    <div className="text-white font-medium mb-4">Medical Dashboard</div>
                    <div className="space-y-3">
                      <Input 
                        placeholder="Search patients..." 
                        className={getComponentStyles('input', 'default', 'md')}
                      />
                      <div className="flex gap-2 flex-wrap">
                        <Badge className="bg-green-500/20 text-green-300 border-green-400/30">
                          Stable: {12}
                        </Badge>
                        <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-400/30">
                          Monitor: {5}
                        </Badge>
                        <Badge className="bg-red-500/20 text-red-300 border-red-400/30">
                          Critical: {2}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </StaggeredItem>
        </StaggeredContainer>

        {/* Footer */}
        <div className="text-center pt-12 border-t border-white/20">
          <p className="text-white/70">
            Phase 3 Complete: Unified Component System with Enhanced Medical Patterns
          </p>
          <p className="text-white/60 text-sm mt-2">
            All components now use standardized variants, effects, and animations
          </p>
        </div>
      </div>
    </div>
  );
}
