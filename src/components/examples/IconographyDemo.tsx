
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { 
  EnhancedIcon, 
  StateIcon, 
  ToggleIcon, 
  LoadingIcon, 
  BadgeIcon,
  useIconState,
  getIconConfig
} from '@/lib/iconography';
import { 
  Heart, 
  HeartOff,
  Star,
  StarOff,
  Bell,
  BellOff,
  Settings,
  User,
  Search,
  Plus,
  CheckCircle,
  AlertCircle,
  Clock,
  Loader2,
  Mail,
  MessageSquare,
  FileText,
  BookOpen,
  Activity,
  TrendingUp,
  Target,
  Zap,
  Sparkles,
  Home,
  ChevronRight,
  ChevronDown,
  RotateCcw,
  Play,
  Pause,
  Volume2,
  VolumeX,
  RefreshCw,
  Download,
  Upload
} from 'lucide-react';
import { createTypographyClass } from '@/lib/typography';

export const IconographyDemo: React.FC = () => {
  const [isFilled, setIsFilled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [badgeCount, setBadgeCount] = useState(5);
  const { state, setHover, setActive, setDefault } = useIconState();

  return (
    <section className="space-y-8">
      <div className="space-y-4">
        <h2 className={createTypographyClass('h2', 'text-white')}>
          Apple-Inspired Iconography System
        </h2>
        <p className={createTypographyClass('body', 'text-white/70')}>
          Consistent weight, monochromatic treatment, state variations, and smooth animations
        </p>
      </div>

      {/* Icon Weights */}
      <Card className="bg-white/10 backdrop-blur-xl border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Icon Weights</CardTitle>
          <CardDescription className="text-white/70">
            Consistent stroke weights matching Apple's SF Symbols approach
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {(['thin', 'regular', 'medium', 'bold'] as const).map((weight) => (
              <div key={weight} className="flex flex-col items-center space-y-2">
                <EnhancedIcon
                  icon={Settings}
                  weight={weight}
                  size="lg"
                  color="default"
                />
                <span className="text-sm text-white/70 capitalize">{weight}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Toggle Icons (Outline/Filled) */}
      <Card className="bg-white/10 backdrop-blur-xl border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Toggle Icons</CardTitle>
          <CardDescription className="text-white/70">
            SF Symbols-style outline to filled transitions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center space-y-2">
              <ToggleIcon
                icon={Heart}
                outlineIcon={Heart}
                filledIcon={HeartOff}
                isFilled={isFilled}
                size="lg"
                weight="regular"
                color="error"
                interactive
                onClick={() => setIsFilled(!isFilled)}
              />
              <span className="text-sm text-white/70">Heart</span>
            </div>
            
            <div className="flex flex-col items-center space-y-2">
              <ToggleIcon
                icon={Star}
                outlineIcon={Star}
                filledIcon={StarOff}
                isFilled={isFilled}
                size="lg"
                weight="regular"
                color="warning"
                interactive
                onClick={() => setIsFilled(!isFilled)}
              />
              <span className="text-sm text-white/70">Star</span>
            </div>
            
            <div className="flex flex-col items-center space-y-2">
              <ToggleIcon
                icon={Bell}
                outlineIcon={Bell}
                filledIcon={BellOff}
                isFilled={isFilled}
                size="lg"
                weight="regular"
                color="info"
                interactive
                onClick={() => setIsFilled(!isFilled)}
              />
              <span className="text-sm text-white/70">Bell</span>
            </div>
          </div>
          
          <div className="flex items-center justify-center space-x-4">
            <Switch
              checked={isFilled}
              onCheckedChange={setIsFilled}
              className="data-[state=checked]:bg-primary"
            />
            <span className="text-sm text-white/70">
              Toggle Filled State
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Loading States */}
      <Card className="bg-white/10 backdrop-blur-xl border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Loading States</CardTitle>
          <CardDescription className="text-white/70">
            Smooth loading animations with state transitions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {([
              { icon: Search, label: 'Search' },
              { icon: RefreshCw, label: 'Refresh' },
              { icon: Download, label: 'Download' },
              { icon: Upload, label: 'Upload' }
            ]).map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center space-y-2">
                <LoadingIcon
                  icon={Icon}
                  isLoading={isLoading}
                  loadingIcon={Loader2}
                  size="lg"
                  weight="regular"
                  color="primary"
                />
                <span className="text-sm text-white/70">{label}</span>
              </div>
            ))}
          </div>
          
          <div className="flex items-center justify-center space-x-4">
            <Button
              variant="outline"
              onClick={() => setIsLoading(!isLoading)}
              className="border-white/20 text-white hover:bg-white/10"
            >
              Toggle Loading
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Badge Icons */}
      <Card className="bg-white/10 backdrop-blur-xl border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Badge Icons</CardTitle>
          <CardDescription className="text-white/70">
            Notification badges with smooth animations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center space-y-2">
              <BadgeIcon
                icon={Mail}
                badge={badgeCount}
                badgeColor="error"
                badgeSize="sm"
                size="lg"
                weight="regular"
                color="default"
              />
              <span className="text-sm text-white/70">Mail</span>
            </div>
            
            <div className="flex flex-col items-center space-y-2">
              <BadgeIcon
                icon={MessageSquare}
                badge="New"
                badgeColor="success"
                badgeSize="md"
                size="lg"
                weight="regular"
                color="default"
              />
              <span className="text-sm text-white/70">Messages</span>
            </div>
            
            <div className="flex flex-col items-center space-y-2">
              <BadgeIcon
                icon={Bell}
                badge={99}
                badgeColor="warning"
                badgeSize="lg"
                size="lg"
                weight="regular"
                color="default"
              />
              <span className="text-sm text-white/70">Notifications</span>
            </div>
            
            <div className="flex flex-col items-center space-y-2">
              <BadgeIcon
                icon={Activity}
                badge="!"
                badgeColor="error"
                badgeSize="sm"
                size="lg"
                weight="regular"
                color="default"
              />
              <span className="text-sm text-white/70">Alerts</span>
            </div>
          </div>
          
          <div className="flex items-center justify-center space-x-4">
            <Button
              variant="outline"
              onClick={() => setBadgeCount(prev => Math.max(0, prev - 1))}
              className="border-white/20 text-white hover:bg-white/10"
            >
              Decrease
            </Button>
            <span className="text-sm text-white/70">Badge Count: {badgeCount}</span>
            <Button
              variant="outline"
              onClick={() => setBadgeCount(prev => prev + 1)}
              className="border-white/20 text-white hover:bg-white/10"
            >
              Increase
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Interactive State Management */}
      <Card className="bg-white/10 backdrop-blur-xl border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Interactive State Management</CardTitle>
          <CardDescription className="text-white/70">
            Programmatic state control with the useIconState hook
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <EnhancedIcon
              icon={Settings}
              state={state}
              size="xl"
              weight="regular"
              color="primary"
              interactive
              onMouseEnter={setHover}
              onMouseLeave={setDefault}
              onMouseDown={setActive}
              onMouseUp={setDefault}
            />
            <span className="text-sm text-white/70">Current State: {state}</span>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}; 
