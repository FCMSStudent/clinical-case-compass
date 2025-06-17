import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  animations
} from '@/lib/design-system';
import { card } from "@/lib/components";

export const UsageExamplesDemo: React.FC = () => {
  return (
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
  );
}; 