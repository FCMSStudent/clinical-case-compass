# 🎨 Unified Design System Guide

## Overview

This design system provides a unified, consistent approach to UI development across the entire application. It combines Apple-inspired liquid glass effects with medical-grade accessibility and performance.

## 🏗️ Architecture

### Core Principles
1. **Consistency** - All UI elements follow the same design patterns
2. **Accessibility** - WCAG 2.1 AA compliance built-in
3. **Performance** - Optimized animations and effects
4. **Maintainability** - Single source of truth for all design tokens
5. **Scalability** - Modular system that grows with the application

### File Structure
```
src/design-system/
├── tokens/           # Design tokens (colors, spacing, typography)
├── components/       # Component styles and variants
├── themes/          # Theme system and providers
├── animations/      # Animation definitions and utilities
├── glass-effects/   # Apple-inspired liquid glass effects
├── accessibility.ts # Accessibility utilities
├── interactions.ts  # Interaction patterns
├── performance.ts   # Performance optimizations
└── unified-system.ts # Single source of truth
```

## 🎯 Design Tokens

### Colors
```typescript
import { UnifiedDesignSystem } from '@/design-system/unified-system';

const { colors, themeColors } = UnifiedDesignSystem.tokens;

// Primary colors
colors.primary[50]   // Lightest
colors.primary[500]  // Base
colors.primary[900]  // Darkest

// Semantic colors
colors.success[500]  // Green
colors.warning[500]  // Yellow
colors.error[500]    // Red
colors.info[500]     // Blue
```

### Spacing
```typescript
const { spacing, borderRadius, shadows } = UnifiedDesignSystem.tokens;

// Consistent spacing scale
spacing.xs    // 4px
spacing.sm    // 8px
spacing.md    // 16px
spacing.lg    // 24px
spacing.xl    // 32px

// Border radius
borderRadius.sm   // 4px
borderRadius.md   // 8px
borderRadius.lg   // 12px
borderRadius.xl   // 16px
```

### Typography
```typescript
const { typography, typographyTokens } = UnifiedDesignSystem.tokens;

// Font sizes
typographyTokens.fontSize.xs    // 12px
typographyTokens.fontSize.sm    // 14px
typographyTokens.fontSize.base  // 16px
typographyTokens.fontSize.lg    // 18px
typographyTokens.fontSize.xl    // 20px

// Font weights
typographyTokens.fontWeight.normal   // 400
typographyTokens.fontWeight.medium   // 500
typographyTokens.fontWeight.semibold // 600
typographyTokens.fontWeight.bold     // 700
```

## 🧩 Component System

### Button Variants
```typescript
import { UnifiedDesignSystem } from '@/design-system/unified-system';

const { buttonVariants } = UnifiedDesignSystem.components;

// Available variants
buttonVariants.primary     // Primary action
buttonVariants.secondary   // Secondary action
buttonVariants.outline     // Outline style
buttonVariants.ghost       // Minimal style
buttonVariants.destructive // Dangerous action
buttonVariants.success     // Success action
buttonVariants.warning     // Warning action
buttonVariants.error       // Error action
buttonVariants.info        // Info action
buttonVariants.medical     // Medical-specific
buttonVariants.critical    // Critical medical action
```

### Card Variants
```typescript
const { card } = UnifiedDesignSystem.components;

// Available variants
card.variant.default     // Standard card
card.variant.elevated    // Raised card
card.variant.interactive // Clickable card
card.variant.featured    // Highlighted card
card.variant.compact     // Compact card
card.variant.navigation  // Navigation card
card.variant.modal       // Modal overlay
card.variant.alert       // Alert card
```

### Input System
```typescript
const { input } = UnifiedDesignSystem.components;

// Base input with glass effects
input.base

// Size variants
input.size.sm    // Small
input.size.md    // Medium (default)
input.size.lg    // Large
```

## 🌟 Glass Effects

### Liquid Glass Backgrounds
```typescript
import { UnifiedDesignSystem } from '@/design-system/unified-system';

const { glass } = UnifiedDesignSystem.glass;

// Background variants
glass.subtle      // Subtle glass effect
glass.elevated    // Elevated glass effect
glass.overlay     // Overlay glass effect
glass.card        // Card glass effect
glass.navigation  // Navigation glass effect
glass.modal       // Modal glass effect
glass.alert       // Alert glass effect
glass.dropdown    // Dropdown glass effect
```

### Glass Effect Utilities
```typescript
const { 
  applyLiquidGlass, 
  getGlassHoverVariants, 
  getGlassTransitionVariants,
  liquidGlassClasses 
} = UnifiedDesignSystem.glass;

// Apply glass effect to element
applyLiquidGlass(element, 'card');

// Get hover variants
getGlassHoverVariants('card');

// Get transition variants
getGlassTransitionVariants('card');

// Pre-defined glass classes
liquidGlassClasses.card;
liquidGlassClasses.modal;
liquidGlassClasses.navigation;
```

## 🎨 Theme System

### Theme Provider
```typescript
import { UnifiedDesignSystem } from '@/design-system/unified-system';

const { ThemeProvider, useTheme, themes } = UnifiedDesignSystem.theme;

// Wrap your app
<ThemeProvider themes={themes} defaultTheme="light">
  <App />
</ThemeProvider>

// Use theme in components
const { theme, setTheme } = useTheme();
```

### Available Themes
- `light` - Light theme with subtle glass effects
- `dark` - Dark theme with enhanced glass effects
- `medical` - Medical-specific theme with clinical colors
- `high-contrast` - High contrast for accessibility

## 🎭 Animation System

### Pre-built Animations
```typescript
import { UnifiedDesignSystem } from '@/design-system/unified-system';

const { animations } = UnifiedDesignSystem;

// Fade animations
animations.fadeIn
animations.fadeOut
animations.fadeInUp
animations.fadeInDown

// Scale animations
animations.scaleIn
animations.scaleOut
animations.bounceIn

// Slide animations
animations.slideInLeft
animations.slideInRight
animations.slideInUp
animations.slideInDown
```

### Custom Animation Builder
```typescript
import { createAnimation } from '@/design-system/animations/motion';

const customAnimation = createAnimation({
  duration: 300,
  ease: 'easeOut',
  variants: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  }
});
```

## 📱 Responsive Design

### Breakpoints
```typescript
const { breakpoints } = UnifiedDesignSystem.tokens;

// Available breakpoints
breakpoints.sm   // 640px
breakpoints.md   // 768px
breakpoints.lg   // 1024px
breakpoints.xl   // 1280px
breakpoints.2xl  // 1536px
```

### Responsive Utilities
```typescript
// Responsive spacing
className="p-4 md:p-6 lg:p-8"

// Responsive typography
className="text-sm md:text-base lg:text-lg"

// Responsive grid
className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
```

## ♿ Accessibility

### Built-in Accessibility Features
- **Focus Management** - Consistent focus indicators
- **Keyboard Navigation** - Full keyboard support
- **Screen Reader Support** - ARIA labels and descriptions
- **Color Contrast** - WCAG 2.1 AA compliant
- **Motion Preferences** - Respects user motion preferences

### Accessibility Utilities
```typescript
import { UnifiedDesignSystem } from '@/design-system/unified-system';

const { focusRing, disabledState } = UnifiedDesignSystem.components;

// Focus ring for interactive elements
className={`${focusRing} ${disabledState}`}

// Screen reader only text
<span className="sr-only">Screen reader text</span>

// Reduced motion
@media (prefers-reduced-motion: reduce) {
  /* Reduced motion styles */
}
```

## 🚀 Performance

### Optimization Features
- **CSS-in-JS Optimization** - Minimal runtime overhead
- **Animation Performance** - Hardware-accelerated animations
- **Bundle Splitting** - Tree-shakeable design tokens
- **Lazy Loading** - Components load on demand

### Performance Best Practices
```typescript
// Use design tokens instead of hardcoded values
const styles = {
  padding: spacing.md,        // ✅ Good
  padding: '16px',           // ❌ Avoid
};

// Use pre-built variants instead of custom styles
className={buttonVariants.primary}  // ✅ Good
className="custom-button-styles"    // ❌ Avoid

// Use glass effect utilities
className={glass.card}              // ✅ Good
className="custom-glass-styles"     // ❌ Avoid
```

## 🔧 Usage Examples

### Creating a Button
```tsx
import { Button } from '@/shared/components/button';
import { UnifiedDesignSystem } from '@/design-system/unified-system';

const { buttonVariants } = UnifiedDesignSystem.components;

function MyButton() {
  return (
    <Button 
      variant="primary"
      className={buttonVariants.primary}
    >
      Click me
    </Button>
  );
}
```

### Creating a Card
```tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/card';
import { UnifiedDesignSystem } from '@/design-system/unified-system';

const { card, glass } = UnifiedDesignSystem.components;

function MyCard() {
  return (
    <Card className={`${card.variant.elevated} ${glass.card}`}>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
      </CardHeader>
      <CardContent>
        Card content with glass effects
      </CardContent>
    </Card>
  );
}
```

### Creating a Form Input
```tsx
import { Input } from '@/shared/components/input';
import { UnifiedDesignSystem } from '@/design-system/unified-system';

const { input } = UnifiedDesignSystem.components;

function MyInput() {
  return (
    <Input 
      className={`${input.base} ${input.size.md}`}
      placeholder="Enter text..."
    />
  );
}
```

## 📋 Migration Guide

### From Legacy Components
1. **Replace hardcoded styles** with design tokens
2. **Use unified component variants** instead of custom classes
3. **Apply glass effects** using the glass effect utilities
4. **Update theme usage** to use the unified theme system

### Before (Legacy)
```tsx
<div className="bg-white/10 backdrop-blur-md p-4 rounded-lg">
  <button className="bg-blue-500 text-white px-4 py-2 rounded">
    Click me
  </button>
</div>
```

### After (Unified)
```tsx
import { UnifiedDesignSystem } from '@/design-system/unified-system';

const { card, buttonVariants, glass } = UnifiedDesignSystem.components;

<div className={`${card.variant.default} ${glass.card}`}>
  <button className={buttonVariants.primary}>
    Click me
  </button>
</div>
```

## 🧪 Testing

### Design System Testing
```typescript
import { UnifiedDesignSystem } from '@/design-system/unified-system';

// Test design tokens
expect(UnifiedDesignSystem.tokens.colors.primary[500]).toBeDefined();

// Test component variants
expect(UnifiedDesignSystem.components.buttonVariants.primary).toBeDefined();

// Test glass effects
expect(UnifiedDesignSystem.glass.card).toBeDefined();
```

### Visual Regression Testing
- Use Storybook for component documentation
- Implement visual regression tests
- Test across different themes and breakpoints

## 📚 Resources

- [Design Tokens Documentation](./tokens/)
- [Component Library](./components/)
- [Theme System](./themes/)
- [Animation System](./animations/)
- [Glass Effects](./glass-effects/)

## 🤝 Contributing

When adding new design elements:

1. **Follow the established patterns** in the design system
2. **Add to the unified system** in `unified-system.ts`
3. **Update this documentation** with usage examples
4. **Test across themes and breakpoints**
5. **Ensure accessibility compliance**

---

*This design system is the single source of truth for all UI elements in the application.*