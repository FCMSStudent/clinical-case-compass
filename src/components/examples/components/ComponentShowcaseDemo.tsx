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
  TrendingUp
} from 'lucide-react';
import { 
  getComponentStyles,
  card,
  input,
  animations
} from '@/lib/design-system';

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
  );
}; 