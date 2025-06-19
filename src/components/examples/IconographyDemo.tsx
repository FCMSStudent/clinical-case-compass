
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, 
  Search, 
  Heart, 
  Star, 
  Bell, 
  User, 
  Home, 
  Plus, 
  CheckCircle, 
  Mail,
  Loader2
} from 'lucide-react';
import { EnhancedIcon, StateIcon, ToggleIcon, LoadingIcon, BadgeIcon } from '@/lib/iconography.tsx';
import { cn } from '@/lib/utils';
import { typography } from '@/lib/typography';

export const IconographyDemo: React.FC = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [isStarred, setIsStarred] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h2 className={cn(typography.subtitle, 'text-white')}>
          Apple-Inspired Iconography System
        </h2>
        <p className={cn(typography.body, 'text-white/70')}>
          Consistent icon weights, monochromatic treatment, and smooth animations
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Icon Weights */}
        <Card className="bg-white/10 backdrop-blur-xl border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Icon Weights</CardTitle>
            <CardDescription className="text-white/70">
              Consistent stroke weights for visual hierarchy
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <EnhancedIcon icon={Settings} weight="thin" size="lg" />
              <span className="text-white">Thin - Subtle elements</span>
            </div>
            <div className="flex items-center gap-4">
              <EnhancedIcon icon={Settings} weight="regular" size="lg" />
              <span className="text-white">Regular - Standard usage</span>
            </div>
            <div className="flex items-center gap-4">
              <EnhancedIcon icon={Settings} weight="medium" size="lg" />
              <span className="text-white">Medium - Primary actions</span>
            </div>
            <div className="flex items-center gap-4">
              <EnhancedIcon icon={Settings} weight="bold" size="lg" />
              <span className="text-white">Bold - Strong emphasis</span>
            </div>
          </CardContent>
        </Card>

        {/* Icon Sizes */}
        <Card className="bg-white/10 backdrop-blur-xl border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Icon Sizes</CardTitle>
            <CardDescription className="text-white/70">
              Scalable sizes for different contexts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <EnhancedIcon icon={Home} size="xs" />
              <span className="text-white">XS - Fine details</span>
            </div>
            <div className="flex items-center gap-4">
              <EnhancedIcon icon={Home} size="sm" />
              <span className="text-white">SM - Secondary elements</span>
            </div>
            <div className="flex items-center gap-4">
              <EnhancedIcon icon={Home} size="md" />
              <span className="text-white">MD - Standard icons</span>
            </div>
            <div className="flex items-center gap-4">
              <EnhancedIcon icon={Home} size="lg" />
              <span className="text-white">LG - Primary elements</span>
            </div>
            <div className="flex items-center gap-4">
              <EnhancedIcon icon={Home} size="xl" />
              <span className="text-white">XL - Headers</span>
            </div>
          </CardContent>
        </Card>

        {/* Interactive States */}
        <Card className="bg-white/10 backdrop-blur-xl border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Interactive States</CardTitle>
            <CardDescription className="text-white/70">
              Hover and selection states with smooth transitions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <EnhancedIcon 
                icon={Plus} 
                size="lg" 
                animation="bounce" 
                interactive 
                color="primary"
              />
              <span className="text-white">Interactive with bounce animation</span>
            </div>
            <div className="flex items-center gap-4">
              <StateIcon 
                icon={CheckCircle} 
                state="selected" 
                size="lg" 
                color="success"
              />
              <span className="text-white">Selected state</span>
            </div>
            <div className="flex items-center gap-4">
              <StateIcon 
                icon={User} 
                state="disabled" 
                size="lg"
              />
              <span className="text-white">Disabled state</span>
            </div>
          </CardContent>
        </Card>

        {/* Special Components */}
        <Card className="bg-white/10 backdrop-blur-xl border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Special Components</CardTitle>
            <CardDescription className="text-white/70">
              Toggle icons, loading states, and badges
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <ToggleIcon
                outlineIcon={Heart}
                filledIcon={Heart}
                isFilled={isLiked}
                size="lg"
                color="error"
                interactive
                onClick={() => setIsLiked(!isLiked)}
              />
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setIsLiked(!isLiked)}
                className="text-white hover:text-white/80"
              >
                {isLiked ? 'Unlike' : 'Like'}
              </Button>
            </div>
            
            <div className="flex items-center gap-4">
              <ToggleIcon
                outlineIcon={Star}
                filledIcon={Star}
                isFilled={isStarred}
                size="lg"
                color="warning"
                interactive
                onClick={() => setIsStarred(!isStarred)}
              />
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setIsStarred(!isStarred)}
                className="text-white hover:text-white/80"
              >
                {isStarred ? 'Unstar' : 'Star'}
              </Button>
            </div>
            
            <div className="flex items-center gap-4">
              <LoadingIcon
                icon={Search}
                isLoading={isSearching}
                loadingIcon={Loader2}
                size="lg"
                color="primary"
              />
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setIsSearching(!isSearching)}
                className="text-white hover:text-white/80"
              >
                {isSearching ? 'Stop Search' : 'Start Search'}
              </Button>
            </div>
            
            <div className="flex items-center gap-4">
              <BadgeIcon
                icon={Mail}
                badge={5}
                badgeColor="error"
                size="lg"
              />
              <span className="text-white">Mail with notification badge</span>
            </div>
            
            <div className="flex items-center gap-4">
              <BadgeIcon
                icon={Bell}
                badge="NEW"
                badgeColor="success"
                size="lg"
              />
              <span className="text-white">Bell with text badge</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
