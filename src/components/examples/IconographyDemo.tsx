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

      {/* Icon Sizes */}
      <Card className="bg-white/10 backdrop-blur-xl border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Icon Sizes</CardTitle>
          <CardDescription className="text-white/70">
            Responsive sizing for different contexts and hierarchies
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            {(['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).map((size) => (
              <div key={size} className="flex flex-col items-center space-y-2">
                <EnhancedIcon
                  icon={User}
                  size={size}
                  weight="regular"
                  color="default"
                />
                <span className="text-xs text-white/70">{size}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Monochromatic Colors */}
      <Card className="bg-white/10 backdrop-blur-xl border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Monochromatic Colors</CardTitle>
          <CardDescription className="text-white/70">
            Apple-style color treatment with semantic meaning
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {([
              { color: 'default', icon: User, label: 'Default' },
              { color: 'muted', icon: Settings, label: 'Muted' },
              { color: 'primary', icon: Search, label: 'Primary' },
              { color: 'success', icon: CheckCircle, label: 'Success' },
              { color: 'warning', icon: AlertCircle, label: 'Warning' },
              { color: 'error', icon: AlertCircle, label: 'Error' },
              { color: 'info', icon: Clock, label: 'Info' },
              { color: 'accent', icon: Sparkles, label: 'Accent' }
            ] as const).map(({ color, icon: Icon, label }) => (
              <div key={color} className="flex flex-col items-center space-y-2">
                <EnhancedIcon
                  icon={Icon}
                  color={color}
                  size="lg"
                  weight="regular"
                />
                <span className="text-sm text-white/70">{label}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* State Variations */}
      <Card className="bg-white/10 backdrop-blur-xl border-white/20">
        <CardHeader>
          <CardTitle className="text-white">State Variations</CardTitle>
          <CardDescription className="text-white/70">
            Interactive states with smooth transitions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {([
              { state: 'default', label: 'Default' },
              { state: 'hover', label: 'Hover' },
              { state: 'active', label: 'Active' },
              { state: 'selected', label: 'Selected' },
              { state: 'disabled', label: 'Disabled' }
            ] as const).map(({ state, label }) => (
              <div key={state} className="flex flex-col items-center space-y-2">
                <StateIcon
                  icon={Settings}
                  state={state}
                  size="lg"
                  weight="regular"
                  color="default"
                  isSelected={state === 'selected'}
                  isDisabled={state === 'disabled'}
                />
                <span className="text-sm text-white/70">{label}</span>
              </div>
            ))}
          </div>
          
          <div className="flex items-center justify-center space-x-4">
            <Button
              variant="outline"
              onClick={() => setIsSelected(!isSelected)}
              className="border-white/20 text-white hover:bg-white/10"
            >
              Toggle Selection
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsDisabled(!isDisabled)}
              className="border-white/20 text-white hover:bg-white/10"
            >
              Toggle Disabled
            </Button>
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

      {/* Animation Examples */}
      <Card className="bg-white/10 backdrop-blur-xl border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Micro-Interactions</CardTitle>
          <CardDescription className="text-white/70">
            Apple-style physics-based animations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {([
              { animation: 'bounce', icon: Plus, label: 'Bounce' },
              { animation: 'pulse', icon: Activity, label: 'Pulse' },
              { animation: 'scale', icon: Target, label: 'Scale' },
              { animation: 'rotate', icon: RotateCcw, label: 'Rotate' },
              { animation: 'slide', icon: ChevronRight, label: 'Slide' }
            ] as const).map(({ animation, icon: Icon, label }) => (
              <div key={animation} className="flex flex-col items-center space-y-2">
                <EnhancedIcon
                  icon={Icon}
                  animation={animation}
                  size="lg"
                  weight="regular"
                  color="primary"
                  interactive
                />
                <span className="text-sm text-white/70">{label}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Context-Based Configurations */}
      <Card className="bg-white/10 backdrop-blur-xl border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Context Configurations</CardTitle>
          <CardDescription className="text-white/70">
            Pre-configured icon styles for different UI contexts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {([
              { context: 'navigation', icon: Home, label: 'Navigation' },
              { context: 'button', icon: Plus, label: 'Button' },
              { context: 'card', icon: FileText, label: 'Card' },
              { context: 'status', icon: CheckCircle, label: 'Status' },
              { context: 'action', icon: Zap, label: 'Action' }
            ] as const).map(({ context, icon: Icon, label }) => {
              const config = getIconConfig(context);
              return (
                <div key={context} className="flex flex-col items-center space-y-2">
                  <EnhancedIcon
                    icon={Icon}
                    {...config}
                    size="lg"
                  />
                  <span className="text-sm text-white/70">{label}</span>
                </div>
              );
            })}
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
          
          <div className="flex items-center justify-center space-x-4">
            <Button
              variant="outline"
              onClick={setDefault}
              className="border-white/20 text-white hover:bg-white/10"
            >
              Default
            </Button>
            <Button
              variant="outline"
              onClick={setHover}
              className="border-white/20 text-white hover:bg-white/10"
            >
              Hover
            </Button>
            <Button
              variant="outline"
              onClick={setActive}
              className="border-white/20 text-white hover:bg-white/10"
            >
              Active
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}; 