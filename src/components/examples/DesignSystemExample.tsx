/**
 * Design System Example Component
 * Demonstrates all key features of the unified design system
 */

import React from 'react';
import { motion } from 'framer-motion';
import { animations } from '@/lib/design-system';
import { ThemeSwitcherDemo } from './components/ThemeSwitcherDemo';
import { ComponentShowcaseDemo } from './components/ComponentShowcaseDemo';
import { BentoGridDemo } from './components/BentoGridDemo';
import { AnimationSystemDemo } from './components/AnimationSystemDemo';
import { UsageExamplesDemo } from './components/UsageExamplesDemo';
import { IconographyDemo } from './IconographyDemo';

export const DesignSystemExample: React.FC = () => {
  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <motion.div
        variants={animations.fadeIn}
        initial="hidden"
        animate="visible"
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold text-white">
          Unified Design System Demo
        </h1>
        <p className="text-lg text-white/70 max-w-2xl mx-auto">
          Explore the comprehensive design system with themes, components, animations, and layouts
        </p>
      </motion.div>

      {/* Theme Switcher */}
      <ThemeSwitcherDemo />

      {/* Iconography System */}
      <IconographyDemo />

      {/* Component Showcase */}
      <ComponentShowcaseDemo />

      {/* Bento Grid System */}
      <BentoGridDemo />

      {/* Animation System */}
      <AnimationSystemDemo />

      {/* Usage Examples */}
      <UsageExamplesDemo />
    </div>
  );
};

export default DesignSystemExample;
