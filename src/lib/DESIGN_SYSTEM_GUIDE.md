# Unified Design System Guide

## Overview

The Clinical Case Compass unified design system provides a single source of truth for all design tokens, themes, component styles, animations, and configurations. This guide shows you how to use it effectively.

## 🚀 Quick Start

```typescript
import { useTheme } from '@/lib/styles/theme';
import { getComponentStyles, getBentoStyles } from '@/lib/styles/utils';
import { animations } from '@/lib/styles/animations';
import { button, card, input } from '@/lib/styles/components';
```

## 🎨 Theme System

### Using Theme Context

```typescript
import { useTheme } from '@/lib/styles/theme';

const MyComponent = () => {
  const { currentTheme, setTheme, availableThemes } = useTheme();
  
  return (
    <div>
      <p>Current: {currentTheme.name}</p>
      <button onClick={() => setTheme('emerald')}>
        Switch to Emerald
      </button>
    </div>
  );
};
```

### Available Themes

- `medical` - Professional medical blue (default)
- `emerald` - Fresh emerald medical theme
- `purple` - Sophisticated purple theme

## 🧩 Component System

### Buttons

```typescript
import { getComponentStyles } from '@/lib/styles/utils';

// Method 1: Using utility function
<Button className={getComponentStyles('button', 'primary', 'md')}>
  Primary Button
</Button>

// Method 2: Direct token access
<Button className={`${button.base} ${button.variant.primary} ${button.size.md}`}>
  Primary Button
</Button>
```

**Button Variants:** `primary`, `secondary`, `outline`, `ghost`, `destructive`
**Button Sizes:** `sm`, `md`, `lg`

### Cards

```typescript
// Using utility function
<Card className={getComponentStyles('card', 'elevated')}>
  <CardContent>Content here</CardContent>
</Card>

// Direct access
<Card className={`${card.base} ${card.variant.elevated} ${card.padding.lg}`}>
  <CardContent>Content here</CardContent>
</Card>
```

**Card Variants:** `default`, `elevated`, `interactive`, `featured`, `compact`
**Card Padding:** `sm`, `md`, `lg`

### Inputs

```typescript
<Input 
  placeholder="Enter text"
  className={getComponentStyles('input', undefined, 'md')}
/>
```

**Input Sizes:** `sm`, `md`, `lg`

## 📱 Bento Grid System

### Container

```typescript
import { BentoContainer } from '@/components/ui/bento-container';

<BentoContainer layout="default">
  {/* Bento cards here */}
</BentoContainer>
```

**Container Layouts:** `default`, `dense`, `spacious`

### Cards

```typescript
import { BentoCard } from '@/components/ui/bento-card';

<BentoCard
  layout="medium"      // Grid span configuration
  variant="elevated"   // Visual style
  icon={<Stethoscope />}
  title="Medical Records"
  subtitle="Patient data"
>
  Content here
</BentoCard>
```

**Card Layouts:** `small`, `medium`, `large`, `hero`, `wide`, `tall`
**Card Variants:** `default`, `elevated`, `interactive`, `featured`, `compact`

### Using Utility Functions

```typescript
// Get container classes
const containerClass = getBentoStyles('container', 'default');

// Get card classes (layout, size)
const cardClass = getBentoStyles('card', 'medium', 'default');

<div className={containerClass}>
  <div className={cardClass}>
    Card content
  </div>
</div>
```

## ✨ Animation System

### Basic Animations

```typescript
import { motion } from 'framer-motion';
import { animations } from '@/lib/styles/animations';

<motion.div
  variants={animations.fadeIn}
  initial="hidden"
  animate="visible"
>
  Animated content
</motion.div>
```

**Available Animations:**
- `fadeIn` - Smooth entrance with scale and opacity
- `glassmorphicEntrance` - Enhanced entrance with blur effect
- `staggeredContainer` - Container for staggered children
- `staggeredItem` - Individual items in staggered animation
- `glassyHover` - 3D hover effect
- `floating` - Continuous floating animation
- `pulseGlow` - Pulsing glow effect

### Staggered Animations

```typescript
<motion.div
  variants={animations.staggeredContainer}
  initial="hidden"
  animate="visible"
>
  <motion.div variants={animations.staggeredItem}>Item 1</motion.div>
  <motion.div variants={animations.staggeredItem}>Item 2</motion.div>
  <motion.div variants={animations.staggeredItem}>Item 3</motion.div>
</motion.div>
```

### Accessibility Support

```typescript
import { getAnimationVariants } from '@/lib/styles/utils';

// Automatically respects user's reduced motion preference
<motion.div variants={getAnimationVariants('fadeIn')}>
  Content
</motion.div>
```

## 🎯 Design Tokens

### Direct Token Access

```typescript
import { 
  typography,
  colors,
  spacing,
  shadows,
  borderRadius
} from '@/lib/design-system';

// Typography
const titleClass = `text-4xl font-bold text-white`; // Uses typography.fontSize['4xl']

// Colors
const primaryColor = colors.primary[500]; // #0ea5e9

// Spacing
const padding = spacing[4]; // 1rem

// Shadows
const cardShadow = shadows.glass; // 0 8px 32px rgba(0, 0, 0, 0.1)
```

## 🛠 Utility Functions

### Glassmorphic Styles

```typescript
import { getGlassmorphicStyles } from '@/lib/styles/utils';
import { useTheme } from '@/lib/styles/theme';

const MyComponent = () => {
  const { currentTheme } = useTheme();
  const glassStyles = getGlassmorphicStyles(currentTheme, 'elevated');
  
  return (
    <div style={glassStyles}>
      Glassmorphic content
    </div>
  );
};
```

**Glassmorphic Variants:** `default`, `elevated`, `subtle`

## 📱 Migration from Old System

### Before (Old System)

```typescript
// Old way
import { buttonVariants, cardBase } from '@/lib/ui-styles';

<Button className={buttonVariants.primary}>Button</Button>
<Card className={cardBase}>Content</Card>
```

### After (New System)

```typescript
// New way
import { getComponentStyles } from '@/lib/styles/utils';

<Button className={getComponentStyles('button', 'primary', 'md')}>Button</Button>
<Card className={getComponentStyles('card', 'default')}>Content</Card>
```

## 🎨 Background System

The design system includes animated background elements:

```typescript
import { backgroundConfig } from '@/lib/design-system';

// Access animated icons, particles, and hexagon configurations
const { animatedIcons, particles, hexagons } = backgroundConfig;
```

## 📝 Best Practices

1. **Always use the theme context** for dynamic theming
2. **Prefer utility functions** over direct token access for consistency
3. **Use staggered animations** for lists and grids
4. **Respect reduced motion preferences** with `getAnimationVariants()`
5. **Use semantic component variants** rather than custom styles
6. **Leverage the bento grid** for complex layouts

## 🔧 Development Workflow

1. Import design system utilities at the top of your component
2. Use `useTheme()` hook for theme-aware components
3. Apply component styles using utility functions
4. Add animations with pre-configured variants
5. Test across all available themes

## 📚 Examples

Check out `src/components/examples/DesignSystemExample.tsx` for comprehensive usage examples of all system features.

---

This unified design system ensures consistency, maintainability, and scalability across the entire Clinical Case Compass application. 