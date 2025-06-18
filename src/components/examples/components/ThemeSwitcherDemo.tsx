import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  useTheme,
  getComponentStyles,
  card,
  themes
} from '@/lib/design-system';
import { animations } from '@/lib/design-system';

export const ThemeSwitcherDemo: React.FC = () => {
  const { currentTheme, setTheme, availableThemes } = useTheme();

  return (
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
  );
}; 