# Apple-Inspired Iconography System

A comprehensive iconography system that follows Apple's design principles with consistent weights, monochromatic treatment, state variations, and smooth animations.

## Overview

This iconography system provides a unified approach to icon usage throughout the application, ensuring visual consistency and enhancing user experience through thoughtful micro-interactions.

## Core Principles

### 1. Consistent Weight & Style
- **Stroke Weight Harmony**: Icons use stroke weights that complement adjacent text
- **Geometric Simplicity**: Clean, simple shapes with uniform stroke weight
- **Visual Balance**: Icons neither overpower nor are overpowered by text

### 2. Monochromatic Treatment
- **Single Color Approach**: Icons inherit text or accent color (like Apple's SF Symbols)
- **Semantic Colors**: Use color sparingly for status or emphasis
- **Accessibility**: High contrast ratios maintained across color schemes

### 3. State Variations
- **Interactive States**: Hover, active, selected, disabled states
- **Smooth Transitions**: 200-300ms transitions for state changes
- **Visual Feedback**: Clear indication of current state

### 4. Micro-Interactions
- **Physics-Based Animations**: Spring animations for natural feel
- **Subtle Feedback**: Enhance "alive" feel without distraction
- **Performance Optimized**: Hardware-accelerated animations

## Components

### EnhancedIcon
The core icon component with Apple-inspired design features.

```tsx
import { EnhancedIcon } from '@/lib/iconography';
import { Settings } from 'lucide-react';

<EnhancedIcon
  icon={Settings}
  weight="regular"
  size="md"
  color="default"
  animation="scale"
  interactive
/>
```

**Props:**
- `icon`: Lucide icon component
- `weight`: "thin" | "regular" | "medium" | "bold"
- `size`: "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
- `color`: "default" | "muted" | "primary" | "secondary" | "success" | "warning" | "error" | "info" | "accent"
- `animation`: "none" | "bounce" | "pulse" | "scale" | "rotate" | "slide"
- `interactive`: boolean for cursor pointer

### StateIcon
Icon component with built-in state management.

```tsx
import { StateIcon } from '@/lib/iconography';
import { Settings } from 'lucide-react';

<StateIcon
  icon={Settings}
  isSelected={true}
  isDisabled={false}
  size="md"
  weight="regular"
/>
```

### ToggleIcon
SF Symbols-style outline to filled transitions.

```tsx
import { ToggleIcon } from '@/lib/iconography';
import { Heart, HeartOff } from 'lucide-react';

<ToggleIcon
  outlineIcon={Heart}
  filledIcon={HeartOff}
  isFilled={isLiked}
  size="lg"
  weight="regular"
  color="error"
  interactive
  onClick={() => setIsLiked(!isLiked)}
/>
```

### LoadingIcon
Icon with smooth loading state transitions.

```tsx
import { LoadingIcon } from '@/lib/iconography';
import { Search, Loader2 } from 'lucide-react';

<LoadingIcon
  icon={Search}
  isLoading={isSearching}
  loadingIcon={Loader2}
  size="md"
  weight="regular"
  color="primary"
/>
```

### BadgeIcon
Icon with notification badges.

```tsx
import { BadgeIcon } from '@/lib/iconography';
import { Mail } from 'lucide-react';

<BadgeIcon
  icon={Mail}
  badge={5}
  badgeColor="error"
  badgeSize="sm"
  size="lg"
  weight="regular"
/>
```

## Icon Weights

| Weight | Stroke Width | Use Case |
|--------|--------------|----------|
| thin | 1.5px | Subtle UI elements, secondary actions |
| regular | 2px | Standard icons, body text context |
| medium | 2.5px | Primary actions, emphasis |
| bold | 3px | Headers, strong emphasis |

## Icon Sizes

| Size | Dimensions | Use Case |
|------|------------|----------|
| xs | 12px | Fine detail, captions |
| sm | 16px | Secondary UI elements |
| md | 20px | Standard icons |
| lg | 24px | Primary UI elements |
| xl | 32px | Headers, large actions |
| 2xl | 48px | Hero sections, major CTAs |

## Color System

### Semantic Colors
- **default**: Primary text color
- **muted**: Secondary text color
- **primary**: Brand/action color
- **secondary**: Alternative action color
- **success**: Positive states
- **warning**: Caution states
- **error**: Error states
- **info**: Informational states
- **accent**: Highlight color

### State Colors
- **default**: Normal state
- **hover**: Mouse hover state
- **active**: Pressed/active state
- **selected**: Selected state
- **disabled**: Disabled state

## Animation Types

### Bounce
Spring-based bounce animation for interactive feedback.

```tsx
<EnhancedIcon
  icon={Plus}
  animation="bounce"
  interactive
/>
```

### Pulse
Continuous pulse animation for loading or attention.

```tsx
<EnhancedIcon
  icon={Activity}
  animation="pulse"
/>
```

### Scale
Simple scale animation for hover/tap feedback.

```tsx
<EnhancedIcon
  icon={Target}
  animation="scale"
  interactive
/>
```

### Rotate
Rotation animation for loading or state changes.

```tsx
<EnhancedIcon
  icon={RotateCcw}
  animation="rotate"
  interactive
/>
```

### Slide
Horizontal slide animation for navigation.

```tsx
<EnhancedIcon
  icon={ChevronRight}
  animation="slide"
  interactive
/>
```

## Context Configurations

Pre-configured icon styles for different UI contexts.

```tsx
import { getIconConfig } from '@/lib/iconography';

const config = getIconConfig('navigation');
// Returns: { weight: "regular", size: "md", color: "muted" }
```

### Available Contexts
- **navigation**: Sidebar, menu icons
- **button**: Button icons
- **card**: Card header icons
- **status**: Status indicators
- **action**: Primary action icons

## State Management Hook

Programmatic state control for complex interactions.

```tsx
import { useIconState } from '@/lib/iconography';

const { state, setHover, setActive, setDefault } = useIconState();

<EnhancedIcon
  icon={Settings}
  state={state}
  onMouseEnter={setHover}
  onMouseLeave={setDefault}
  onMouseDown={setActive}
  onMouseUp={setDefault}
/>
```

## Best Practices

### 1. Weight Selection
- Match icon weight to adjacent text weight
- Use medium weight for primary actions
- Use regular weight for standard UI elements
- Use thin weight for subtle decorative elements

### 2. Size Hierarchy
- Use larger icons for primary actions
- Use smaller icons for secondary elements
- Maintain consistent size within related UI groups
- Scale appropriately for different screen sizes

### 3. Color Usage
- Prefer monochromatic treatment
- Use semantic colors for status indicators
- Reserve bright colors for emphasis only
- Ensure sufficient contrast ratios

### 4. Animation Guidelines
- Keep animations subtle and fast (200-300ms)
- Use spring animations for natural feel
- Avoid animations that cause motion sickness
- Provide reduced motion alternatives

### 5. Accessibility
- Always provide aria-labels for interactive icons
- Ensure sufficient touch targets (minimum 44px)
- Maintain color contrast ratios
- Support keyboard navigation

## Migration Guide

### From Legacy Icons
Replace direct Lucide icon usage:

```tsx
// Before
<Search className="h-5 w-5 text-muted-foreground" />

// After
<EnhancedIcon
  icon={Search}
  size="md"
  weight="regular"
  color="muted"
/>
```

### From ICON_SIZE Constant
Replace the deprecated constant:

```tsx
// Before
import { ICON_SIZE } from '@/constants/ui';
<Search className={ICON_SIZE} />

// After
<EnhancedIcon
  icon={Search}
  size="md"
  weight="regular"
/>
```

## Examples

### Navigation Icon
```tsx
<EnhancedIcon
  icon={Home}
  weight="regular"
  size="md"
  color="muted"
  animation="scale"
  interactive
/>
```

### Action Button Icon
```tsx
<EnhancedIcon
  icon={Plus}
  weight="medium"
  size="md"
  color="primary"
  animation="bounce"
  interactive
/>
```

### Status Indicator
```tsx
<EnhancedIcon
  icon={CheckCircle}
  weight="medium"
  size="sm"
  color="success"
/>
```

### Loading State
```tsx
<LoadingIcon
  icon={Search}
  isLoading={isSearching}
  loadingIcon={Loader2}
  size="md"
  weight="regular"
  color="primary"
/>
```

### Toggle State
```tsx
<ToggleIcon
  outlineIcon={Heart}
  filledIcon={HeartOff}
  isFilled={isLiked}
  size="lg"
  weight="regular"
  color="error"
  interactive
  onClick={() => setIsLiked(!isLiked)}
/>
```

## Performance Considerations

- Icons are optimized for rendering performance
- Animations use hardware acceleration
- State transitions are debounced where appropriate
- Lazy loading for large icon sets

## Browser Support

- Modern browsers with CSS Grid and Flexbox support
- Reduced motion support for accessibility
- Fallback styles for older browsers
- Progressive enhancement approach

## Future Enhancements

- Custom icon weight presets
- Advanced animation sequences
- Icon font integration
- Automated accessibility testing
- Performance monitoring
- Design token integration 