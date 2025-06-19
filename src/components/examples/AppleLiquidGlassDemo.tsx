import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  liquidGlassEffects, 
  getGlassHoverVariants, 
  getGlassTransitionVariants,
  getPulseAnimation,
  getParallaxEffect,
  liquidGlassClasses,
  getGlassClasses
} from '@/lib/glass-effects';

export const AppleLiquidGlassDemo = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl font-bold text-white">
            Apple-Inspired Liquid Glass Effects
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Experience the enhanced glassmorphic design system with Apple's signature liquid glass aesthetics, 
            featuring adaptive glass effects, micro-interactions, and contextual variants.
          </p>
        </motion.div>

        {/* Glass Effect Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Contextual Glass Variants */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Card className={getGlassClasses('card', true, true)}>
              <CardHeader>
                <CardTitle>Contextual Glass Variants</CardTitle>
                <CardDescription>
                  Different glass effects for different contexts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className={getGlassClasses('navigation', false, false)}>
                  <p className="p-3 text-sm">Navigation Glass</p>
                </div>
                <div className={getGlassClasses('modal', false, false)}>
                  <p className="p-3 text-sm">Modal Glass</p>
                </div>
                <div className={getGlassClasses('alert', false, false)}>
                  <p className="p-3 text-sm">Alert Glass</p>
                </div>
                <div className={getGlassClasses('button', false, false)}>
                  <p className="p-3 text-sm">Button Glass</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Interactive Components */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Card className={getGlassClasses('card', true, true)}>
              <CardHeader>
                <CardTitle>Interactive Components</CardTitle>
                <CardDescription>
                  Enhanced hover and focus states
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  variant="primary" 
                  glassIntensity="medium"
                  className="w-full"
                >
                  Enhanced Button
                </Button>
                <Input 
                  placeholder="Enhanced Input" 
                  glassIntensity="medium"
                />
                <Card 
                  variant="interactive" 
                  glassIntensity="medium"
                  interactive={true}
                  className="p-4"
                >
                  <p className="text-sm">Interactive Card</p>
                </Card>
              </CardContent>
            </Card>
          </motion.div>

          {/* Micro-interactions */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <Card className={getGlassClasses('card', true, true)}>
              <CardHeader>
                <CardTitle>Micro-interactions</CardTitle>
                <CardDescription>
                  Pulsing effects and animations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <motion.div
                  className="bg-red-500/20 border border-red-400/30 rounded-lg p-3"
                  animate={getPulseAnimation('critical')}
                >
                  <p className="text-red-200 text-sm">Critical Alert</p>
                </motion.div>
                <motion.div
                  className="bg-yellow-500/20 border border-yellow-400/30 rounded-lg p-3"
                  animate={getPulseAnimation('attention')}
                >
                  <p className="text-yellow-200 text-sm">Attention Alert</p>
                </motion.div>
                <motion.div
                  className="bg-blue-500/20 border border-blue-400/30 rounded-lg p-3"
                  animate={getPulseAnimation('gentle')}
                >
                  <p className="text-blue-200 text-sm">Gentle Pulse</p>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Enhanced Backdrop Effects */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <Card className={getGlassClasses('card', true, true)}>
              <CardHeader>
                <CardTitle>Backdrop Effects</CardTitle>
                <CardDescription>
                  Different blur and filter intensities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div 
                  className="p-3 rounded-lg border border-white/20"
                  style={{ backdropFilter: liquidGlassEffects.backdrop.light }}
                >
                  <p className="text-sm">Light Backdrop</p>
                </div>
                <div 
                  className="p-3 rounded-lg border border-white/20"
                  style={{ backdropFilter: liquidGlassEffects.backdrop.medium }}
                >
                  <p className="text-sm">Medium Backdrop</p>
                </div>
                <div 
                  className="p-3 rounded-lg border border-white/20"
                  style={{ backdropFilter: liquidGlassEffects.backdrop.heavy }}
                >
                  <p className="text-sm">Heavy Backdrop</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Surface Elevation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <Card className={getGlassClasses('card', true, true)}>
              <CardHeader>
                <CardTitle>Surface Elevation</CardTitle>
                <CardDescription>
                  Layered depth with opacity variants
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className={liquidGlassClasses.elevation50 + " p-3 rounded-lg border border-white/20"}>
                  <p className="text-sm">Elevation 50</p>
                </div>
                <div className={liquidGlassClasses.elevation100 + " p-3 rounded-lg border border-white/20"}>
                  <p className="text-sm">Elevation 100</p>
                </div>
                <div className={liquidGlassClasses.elevation200 + " p-3 rounded-lg border border-white/20"}>
                  <p className="text-sm">Elevation 200</p>
                </div>
                <div className={liquidGlassClasses.elevation300 + " p-3 rounded-lg border border-white/20"}>
                  <p className="text-sm">Elevation 300</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Parallax Effects */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            <Card className={getGlassClasses('card', true, true)}>
              <CardHeader>
                <CardTitle>Parallax Effects</CardTitle>
                <CardDescription>
                  Depth layers with motion
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <motion.div
                  className="bg-white/10 border border-white/20 rounded-lg p-3"
                  animate={getParallaxEffect('subtle')}
                >
                  <p className="text-sm">Subtle Parallax</p>
                </motion.div>
                <motion.div
                  className="bg-white/15 border border-white/25 rounded-lg p-3"
                  animate={getParallaxEffect('medium')}
                >
                  <p className="text-sm">Medium Parallax</p>
                </motion.div>
                <motion.div
                  className="bg-white/20 border border-white/30 rounded-lg p-3"
                  animate={getParallaxEffect('strong')}
                >
                  <p className="text-sm">Strong Parallax</p>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

        </div>

        {/* Feature Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <Card className={getGlassClasses('card', true, true)}>
            <CardHeader>
              <CardTitle>Enhanced Glass Effects</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm">Adaptive glass based on content underneath</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm">Enhanced backdrop filters with saturation and contrast</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm">Contextual glass variants for different UI elements</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm">Surface elevation colors for layered depth</span>
              </div>
            </CardContent>
          </Card>

          <Card className={getGlassClasses('card', true, true)}>
            <CardHeader>
              <CardTitle>Apple-Inspired Interactions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-sm">Apple's signature easing curves</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-sm">Micro-interactions with pulsing effects</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-sm">Subtle parallax effects for depth</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-sm">Enhanced hover states with brightness and saturation</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

      </div>
    </div>
  );
};

export default AppleLiquidGlassDemo; 