/**
 * PHASE 2 DESIGN SYSTEM DEMO
 * Comprehensive showcase of the standardized typography and color systems
 * Clinical Case Compass - Design System Validation
 */

import React from 'react';
import { 
  createTypographyClass
} from '@/lib/typography';
import { TypographyDemo } from './components/TypographyDemo';
import { ColorSystemDemo } from './components/ColorSystemDemo';
import { ClinicalStatusDemo } from './components/ClinicalStatusDemo';
import { SpecialtyColorsDemo } from './components/SpecialtyColorsDemo';
import { ResponsiveTypographyDemo } from './components/ResponsiveTypographyDemo';
import { ImplementationExamplesDemo } from './components/ImplementationExamplesDemo';

export function Phase2SystemDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 dark:from-blue-900 dark:via-blue-800 dark:to-blue-900">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-8 space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className={createTypographyClass('hero', 'text-white')}>
            Phase 2: Design System
          </h1>
          <p className={createTypographyClass('bodyLarge', 'text-white/80 max-w-3xl mx-auto')}>
            Standardized typography and color systems for the Clinical Case Compass. 
            This demo showcases the unified font families, semantic color tokens, 
            and medical-specific design patterns.
          </p>
        </div>

        {/* Typography System */}
        <TypographyDemo />

        {/* Color System */}
        <ColorSystemDemo />

        {/* Clinical Status Examples */}
        <ClinicalStatusDemo />

        {/* Specialty Colors */}
        <SpecialtyColorsDemo />

        {/* Responsive Typography */}
        <ResponsiveTypographyDemo />

        {/* Usage Examples */}
        <ImplementationExamplesDemo />

        {/* Footer */}
        <div className="text-center pt-12 border-t border-white/20">
          <p className={createTypographyClass('body', 'text-white/70')}>
            Phase 2 Complete: Typography & Color Systems Standardized
          </p>
          <p className={createTypographyClass('caption', 'text-white/60 mt-2')}>
            All design tokens are now centralized and medical-specific semantic meanings are established
          </p>
        </div>
      </div>
    </div>
  );
}
