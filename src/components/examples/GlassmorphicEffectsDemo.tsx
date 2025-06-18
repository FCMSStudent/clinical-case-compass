import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { translucentBackgrounds, liquidGlassClasses, getGlassHoverVariants } from '@/lib/glass-effects';
import { cn } from '@/lib/utils';

const GlassmorphicEffectsDemo: React.FC = () => {
  return (
    <div className="space-y-8 p-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-white">Enhanced Translucent Backgrounds</h1>
        <p className="text-white/70 max-w-2xl mx-auto">
          Apple-inspired frosted glass effects with enhanced backdrop blur and semi-transparent layers
        </p>
      </div>

      {/* Translucent Background Variants */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-white">Translucent Background Variants</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Ultra Light */}
          <Card className={cn("border-white/20", translucentBackgrounds.ultraLight.white)}>
            <CardHeader>
              <CardTitle className="text-white">Ultra Light</CardTitle>
              <CardDescription className="text-white/70">bg-white/5 backdrop-blur-[12px]</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-white/80 text-sm">
                Subtle translucent effect for minimal UI elements
              </p>
            </CardContent>
          </Card>

          {/* Light */}
          <Card className={cn("border-white/20", translucentBackgrounds.light.white)}>
            <CardHeader>
              <CardTitle className="text-white">Light</CardTitle>
              <CardDescription className="text-white/70">bg-white/8 backdrop-blur-[18px]</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-white/80 text-sm">
                Standard translucent effect for cards and panels
              </p>
            </CardContent>
          </Card>

          {/* Medium */}
          <Card className={cn("border-white/20", translucentBackgrounds.medium.white)}>
            <CardHeader>
              <CardTitle className="text-white">Medium</CardTitle>
              <CardDescription className="text-white/70">bg-white/12 backdrop-blur-[24px]</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-white/80 text-sm">
                Enhanced translucent effect for navigation elements
              </p>
            </CardContent>
          </Card>

          {/* Heavy */}
          <Card className={cn("border-white/20", translucentBackgrounds.heavy.white)}>
            <CardHeader>
              <CardTitle className="text-white">Heavy</CardTitle>
              <CardDescription className="text-white/70">bg-white/18 backdrop-blur-[30px]</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-white/80 text-sm">
                Strong translucent effect for modals and overlays
              </p>
            </CardContent>
          </Card>

          {/* Ultra Heavy */}
          <Card className={cn("border-white/20", translucentBackgrounds.ultraHeavy.white)}>
            <CardHeader>
              <CardTitle className="text-white">Ultra Heavy</CardTitle>
              <CardDescription className="text-white/70">bg-white/25 backdrop-blur-[45px]</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-white/80 text-sm">
                Maximum translucent effect for critical UI elements
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Context-Specific Backgrounds */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-white">Context-Specific Backgrounds</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Navigation */}
          <motion.div
            className={cn(
              "p-6 rounded-xl border border-white/20 shadow-lg",
              translucentBackgrounds.navigation
            )}
            variants={getGlassHoverVariants('medium')}
            whileHover="hover"
            whileTap="tap"
          >
            <h3 className="text-lg font-semibold text-white mb-2">Navigation</h3>
            <p className="text-white/70 text-sm mb-4">
              Optimized for navigation bars and sidebars
            </p>
            <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white">
              View Demo
            </Button>
          </motion.div>

          {/* Modal */}
          <motion.div
            className={cn(
              "p-6 rounded-xl border border-white/20 shadow-xl",
              translucentBackgrounds.modal
            )}
            variants={getGlassHoverVariants('medium')}
            whileHover="hover"
            whileTap="tap"
          >
            <h3 className="text-lg font-semibold text-white mb-2">Modal</h3>
            <p className="text-white/70 text-sm mb-4">
              High-contrast translucent effect for dialogs
            </p>
            <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white">
              View Demo
            </Button>
          </motion.div>

          {/* Card */}
          <motion.div
            className={cn(
              "p-6 rounded-xl border border-white/20 shadow-md",
              translucentBackgrounds.card
            )}
            variants={getGlassHoverVariants('medium')}
            whileHover="hover"
            whileTap="tap"
          >
            <h3 className="text-lg font-semibold text-white mb-2">Card</h3>
            <p className="text-white/70 text-sm mb-4">
              Balanced translucent effect for content cards
            </p>
            <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white">
              View Demo
            </Button>
          </motion.div>

          {/* Dropdown */}
          <motion.div
            className={cn(
              "p-6 rounded-xl border border-white/20 shadow-md",
              translucentBackgrounds.dropdown
            )}
            variants={getGlassHoverVariants('medium')}
            whileHover="hover"
            whileTap="tap"
          >
            <h3 className="text-lg font-semibold text-white mb-2">Dropdown</h3>
            <p className="text-white/70 text-sm mb-4">
              Medium translucent effect for dropdown menus
            </p>
            <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white">
              View Demo
            </Button>
          </motion.div>

          {/* Overlay */}
          <motion.div
            className={cn(
              "p-6 rounded-xl border border-white/20 shadow-lg",
              translucentBackgrounds.overlay
            )}
            variants={getGlassHoverVariants('medium')}
            whileHover="hover"
            whileTap="tap"
          >
            <h3 className="text-lg font-semibold text-white mb-2">Overlay</h3>
            <p className="text-white/70 text-sm mb-4">
              Subtle translucent effect for overlays
            </p>
            <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white">
              View Demo
            </Button>
          </motion.div>

          {/* Alert */}
          <motion.div
            className={cn(
              "p-6 rounded-xl border border-white/20 shadow-md",
              translucentBackgrounds.alert
            )}
            variants={getGlassHoverVariants('medium')}
            whileHover="hover"
            whileTap="tap"
          >
            <h3 className="text-lg font-semibold text-white mb-2">Alert</h3>
            <p className="text-white/70 text-sm mb-4">
              Enhanced translucent effect for alerts
            </p>
            <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white">
              View Demo
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Interactive Examples */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-white">Interactive Examples</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Search Bar */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Search Bar</h3>
            <div className="relative">
              <div className={cn(
                "absolute inset-0 rounded-xl border border-white/20 shadow-lg",
                translucentBackgrounds.input
              )}></div>
              <input
                type="text"
                placeholder="Search with translucent background..."
                className="relative w-full px-4 py-3 bg-transparent border-0 text-white placeholder:text-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/30"
              />
            </div>
          </div>

          {/* Button Group */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Button Group</h3>
            <div className="flex space-x-3">
              <Button className={cn(
                "bg-white/15 backdrop-blur-[20px] brightness-110 border border-white/20",
                "hover:bg-white/25 hover:brightness-105 hover:saturate-110"
              )}>
                Primary
              </Button>
              <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                Secondary
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Usage Guidelines */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-white">Usage Guidelines</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className={cn("border-white/20", translucentBackgrounds.light.white)}>
            <CardHeader>
              <CardTitle className="text-white">Best Practices</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-white/80 text-sm">
                <strong>Layer Appropriately:</strong> Use lighter backgrounds for content that should be less prominent
              </div>
              <div className="text-white/80 text-sm">
                <strong>Maintain Contrast:</strong> Ensure text remains readable against translucent backgrounds
              </div>
              <div className="text-white/80 text-sm">
                <strong>Consider Context:</strong> Choose background intensity based on UI element importance
              </div>
            </CardContent>
          </Card>

          <Card className={cn("border-white/20", translucentBackgrounds.medium.white)}>
            <CardHeader>
              <CardTitle className="text-white">Implementation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-white/80 text-sm">
                <strong>CSS Classes:</strong> Use the predefined translucent background classes
              </div>
              <div className="text-white/80 text-sm">
                <strong>Backdrop Filters:</strong> Combine with backdrop-blur for frosted glass effect
              </div>
              <div className="text-white/80 text-sm">
                <strong>Borders:</strong> Add subtle borders for better definition
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default GlassmorphicEffectsDemo; 