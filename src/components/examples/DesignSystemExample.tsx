/**
 * Design System Example Component
 * Demonstrates all key features of the unified design system
 */

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Stethoscope, 
  Activity, 
  TrendingUp, 
  Plus,
  Settings,
  User,
  BookOpen
} from 'lucide-react';

import { 
  useTheme,
  animations,
  getComponentStyles,
  getBentoStyles,
  getGlassmorphicStyles,
  getAnimationVariants,
  backgroundConfig,
  button,
  card,
  input,
  bento,
  themes
} from '@/lib/design-system';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { BentoContainer } from '@/components/ui/bento-container';
import { BentoCard } from '@/components/ui/bento-card';

export const DesignSystemExample: React.FC = () => {
  const { currentTheme, setTheme, availableThemes } = useTheme();

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
      <motion.section
        variants={animations.fadeIn}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        <h2 className="text-2xl font-semibold text-white">Theme System</h2>
        <Card className={`${card.base} ${card.variant.elevated} ${card.padding.lg}`}>
          <CardContent>
            <div className="space-y-4">
              <p className="text-white/70">
                Current Theme: <span className="font-semibold text-white">{currentTheme.name}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {availableThemes.map((themeName) => (
                  <Button
                    key={themeName}
                    onClick={() => setTheme(themeName)}
                    className={`${getComponentStyles('button', 
                      themeName === currentTheme.name.toLowerCase().replace(' ', '') ? 'primary' : 'secondary', 
                      'sm'
                    )}`}
                  >
                    {themes[themeName]?.name || themeName}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.section>

      {/* Component Showcase */}
      <motion.section
        variants={animations.staggeredContainer}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <h2 className="text-2xl font-semibold text-white">Component System</h2>
        
        {/* Buttons */}
        <motion.div variants={animations.staggeredItem}>
          <Card className={`${card.base} ${card.variant.default} ${card.padding.lg}`}>
            <CardHeader>
              <CardTitle>Button Variants</CardTitle>
              <CardDescription>All button styles using the design system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <Button className={getComponentStyles('button', 'primary', 'sm')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Primary
                </Button>
                <Button className={getComponentStyles('button', 'secondary', 'md')}>
                  <Settings className="h-4 w-4 mr-2" />
                  Secondary
                </Button>
                <Button className={getComponentStyles('button', 'outline', 'md')}>
                  <User className="h-4 w-4 mr-2" />
                  Outline
                </Button>
                <Button className={getComponentStyles('button', 'ghost', 'lg')}>
                  <BookOpen className="h-4 w-4 mr-2" />
                  Ghost
                </Button>
                <Button className={getComponentStyles('button', 'destructive', 'md')}>
                  Destructive
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Inputs */}
        <motion.div variants={animations.staggeredItem}>
          <Card className={`${card.base} ${card.variant.default} ${card.padding.lg}`}>
            <CardHeader>
              <CardTitle>Input System</CardTitle>
              <CardDescription>Form inputs with consistent styling</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input 
                  placeholder="Small input"
                  className={input.size.sm}
                />
                <Input 
                  placeholder="Medium input (default)"
                  className={input.size.md}
                />
                <Input 
                  placeholder="Large input"
                  className={input.size.lg}
                />
                <Input 
                  placeholder="Disabled input"
                  disabled
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Card Variants */}
        <motion.div variants={animations.staggeredItem}>
          <Card className={`${card.base} ${card.variant.default} ${card.padding.lg}`}>
            <CardHeader>
              <CardTitle>Card Variants</CardTitle>
              <CardDescription>Different card styles for various use cases</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className={`${card.base} ${card.variant.default} ${card.padding.md}`}>
                  <CardContent>
                    <div className="flex items-center space-x-2">
                      <Heart className="h-5 w-5 text-red-400" />
                      <span className="text-white">Default Card</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className={`${card.base} ${card.variant.elevated} ${card.padding.md}`}>
                  <CardContent>
                    <div className="flex items-center space-x-2">
                      <Activity className="h-5 w-5 text-green-400" />
                      <span className="text-white">Elevated Card</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className={`${card.base} ${card.variant.interactive} ${card.padding.md}`}>
                  <CardContent>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5 text-blue-400" />
                      <span className="text-white">Interactive Card</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.section>

      {/* Bento Grid System */}
      <motion.section
        variants={animations.staggeredContainer}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <h2 className="text-2xl font-semibold text-white">Bento Grid System</h2>
        
        <BentoContainer layout="default">
          <BentoCard
            layout="small"
            variant="elevated"
            icon={<Stethoscope />}
            title="Medical Records"
            subtitle="Patient data management"
          >
            <div className="space-y-2">
              <div className="text-2xl font-bold text-white">1,234</div>
              <div className="text-sm text-white/70">Active records</div>
            </div>
          </BentoCard>

          <BentoCard
            layout="medium"
            variant="interactive"
            icon={<Activity />}
            title="Patient Monitoring"
            subtitle="Real-time health tracking"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-white/70">Heart Rate</span>
                <span className="text-white font-semibold">72 BPM</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/70">Blood Pressure</span>
                <span className="text-white font-semibold">120/80</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div className="bg-green-400 h-2 rounded-full" style={{ width: '75%' }} />
              </div>
            </div>
          </BentoCard>

          <BentoCard
            layout="large"
            variant="featured"
            title="Case Analytics"
            subtitle="Comprehensive medical insights"
          >
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">89%</div>
                  <div className="text-sm text-white/70">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">234</div>
                  <div className="text-sm text-white/70">Cases Handled</div>
                </div>
              </div>
              <Button className={`w-full ${getComponentStyles('button', 'primary', 'md')}`}>
                View Details
              </Button>
            </div>
          </BentoCard>
        </BentoContainer>
      </motion.section>

      {/* Animation System */}
      <motion.section
        variants={animations.staggeredContainer}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <h2 className="text-2xl font-semibold text-white">Animation System</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <motion.div
            variants={animations.fadeIn}
            whileHover={{ scale: 1.05 }}
            className={`${card.base} ${card.variant.interactive} ${card.padding.lg}`}
          >
            <div className="text-center space-y-2">
              <Heart className="h-8 w-8 text-red-400 mx-auto" />
              <h3 className="text-lg font-semibold text-white">Fade In</h3>
              <p className="text-sm text-white/70">Smooth entrance animation</p>
            </div>
          </motion.div>

          <motion.div
            variants={animations.glassyHover}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            className={`${card.base} ${card.variant.interactive} ${card.padding.lg}`}
          >
            <div className="text-center space-y-2">
              <Activity className="h-8 w-8 text-green-400 mx-auto" />
              <h3 className="text-lg font-semibold text-white">Glassy Hover</h3>
              <p className="text-sm text-white/70">3D hover effect</p>
            </div>
          </motion.div>

          <motion.div
            variants={animations.floating}
            initial="initial"
            animate="animate"
            className={`${card.base} ${card.variant.interactive} ${card.padding.lg}`}
          >
            <div className="text-center space-y-2">
              <TrendingUp className="h-8 w-8 text-blue-400 mx-auto" />
              <h3 className="text-lg font-semibold text-white">Floating</h3>
              <p className="text-sm text-white/70">Continuous float animation</p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Usage Examples */}
      <motion.section
        variants={animations.fadeIn}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        <h2 className="text-2xl font-semibold text-white">Usage Examples</h2>
        <Card className={`${card.base} ${card.variant.elevated} ${card.padding.lg}`}>
          <CardHeader>
            <CardTitle>How to Use the Design System</CardTitle>
            <CardDescription>Code examples for common patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-white mb-2">1. Using Component Styles</h4>
                <code className="block bg-black/20 p-3 rounded text-sm text-white/80">
                  {`className={getComponentStyles('button', 'primary', 'md')}`}
                </code>
              </div>
              
              <div>
                <h4 className="font-medium text-white mb-2">2. Using Bento Grid</h4>
                <code className="block bg-black/20 p-3 rounded text-sm text-white/80">
                  {`const containerClass = getBentoStyles('container', 'default');
const cardClass = getBentoStyles('card', 'medium', 'default');`}
                </code>
              </div>
              
              <div>
                <h4 className="font-medium text-white mb-2">3. Using Animations</h4>
                <code className="block bg-black/20 p-3 rounded text-sm text-white/80">
                  {`<motion.div variants={animations.fadeIn} initial="hidden" animate="visible">`}
                </code>
              </div>
              
              <div>
                <h4 className="font-medium text-white mb-2">4. Using Theme Context</h4>
                <code className="block bg-black/20 p-3 rounded text-sm text-white/80">
                  {`const { currentTheme, setTheme } = useTheme();`}
                </code>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.section>
    </div>
  );
};

export default DesignSystemExample;
