import React from 'react';
import { AnimatedDiv, StaggeredContainer } from '@/components/ui/animation';
import { ButtonSystemDemo } from './components/ButtonSystemDemo';
import { GlassmorphicEffectsDemo } from './components/GlassmorphicEffectsDemo';
import { AnimationComponentsDemo } from './components/AnimationComponentsDemo';
import { BentoGridDemo } from './components/BentoGridDemo';

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

        {/* Component Demos */}
        <StaggeredContainer className="space-y-6">
          <ButtonSystemDemo />
          <GlassmorphicEffectsDemo />
          <AnimationComponentsDemo />
          <BentoGridDemo />
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
