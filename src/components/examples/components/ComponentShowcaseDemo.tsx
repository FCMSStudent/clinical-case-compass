import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Plus,
  Settings,
  User,
  BookOpen,
  Heart,
  Activity,
  TrendingUp,
  Mail
} from 'lucide-react';
import { 
  getComponentStyles,
  card,
  input,
  animations
} from '@/lib/design-system';
import { Textarea } from '@/components/ui/textarea';

export const ComponentShowcaseDemo: React.FC = () => {
  return (
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
            <CardTitle>Unified Input System</CardTitle>
            <CardDescription>Consistent glassmorphic inputs across the entire app</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Input Variants */}
              <div>
                <h4 className="text-sm font-medium text-white/80 mb-3">Input Variants</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs text-white/60">Default</label>
                    <Input 
                      placeholder="Default input"
                      variant="default"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-white/60">Subtle</label>
                    <Input 
                      placeholder="Subtle input"
                      variant="subtle"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-white/60">Elevated</label>
                    <Input 
                      placeholder="Elevated input"
                      variant="elevated"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-white/60">Medical</label>
                    <Input 
                      placeholder="Medical input"
                      variant="medical"
                    />
                  </div>
                </div>
              </div>

              {/* Input Sizes */}
              <div>
                <h4 className="text-sm font-medium text-white/80 mb-3">Input Sizes</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs text-white/60">Small</label>
                    <Input 
                      placeholder="Small input"
                      size="sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-white/60">Medium (Default)</label>
                    <Input 
                      placeholder="Medium input"
                      size="md"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-white/60">Large</label>
                    <Input 
                      placeholder="Large input"
                      size="lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-white/60">Extra Large</label>
                    <Input 
                      placeholder="Extra large input"
                      size="xl"
                    />
                  </div>
                </div>
              </div>

              {/* Input States */}
              <div>
                <h4 className="text-sm font-medium text-white/80 mb-3">Input States</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs text-white/60">With Icons</label>
                    <Input 
                      placeholder="Input with icons"
                      leftIcon={<Mail className="h-4 w-4" />}
                      rightIcon={<User className="h-4 w-4" />}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-white/60">Error State</label>
                    <Input 
                      placeholder="Error input"
                      error={true}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-white/60">Success State</label>
                    <Input 
                      placeholder="Success input"
                      success={true}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-white/60">Disabled</label>
                    <Input 
                      placeholder="Disabled input"
                      disabled
                    />
                  </div>
                </div>
              </div>

              {/* Textarea Variants */}
              <div>
                <h4 className="text-sm font-medium text-white/80 mb-3">Textarea Variants</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs text-white/60">Default</label>
                    <Textarea 
                      placeholder="Default textarea"
                      variant="default"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-white/60">Medical</label>
                    <Textarea 
                      placeholder="Medical textarea"
                      variant="medical"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-white/60">Error State</label>
                    <Textarea 
                      placeholder="Error textarea"
                      error={true}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-white/60">Large Size</label>
                    <Textarea 
                      placeholder="Large textarea"
                      size="lg"
                    />
                  </div>
                </div>
              </div>
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
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="h-4 w-4 text-red-400" />
                    <span className="text-sm font-medium">Default Card</span>
                  </div>
                  <p className="text-xs text-white/70">Standard card with glassmorphic effect</p>
                </CardContent>
              </Card>
              
              <Card className={`${card.base} ${card.variant.elevated} ${card.padding.md}`}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="h-4 w-4 text-blue-400" />
                    <span className="text-sm font-medium">Elevated Card</span>
                  </div>
                  <p className="text-xs text-white/70">Enhanced depth with stronger shadows</p>
                </CardContent>
              </Card>
              
              <Card className={`${card.base} ${card.variant.interactive} ${card.padding.md}`}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-green-400" />
                    <span className="text-sm font-medium">Interactive Card</span>
                  </div>
                  <p className="text-xs text-white/70">Hover effects and click interactions</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.section>
  );
}; 