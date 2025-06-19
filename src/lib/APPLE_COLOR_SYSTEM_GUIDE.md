# Apple-Inspired Color System Guide

## Overview

This guide documents the implementation of an Apple-inspired color system that emphasizes neutral bases with minimal accents, sophisticated translucency, and refined color harmony. The system is designed to create polished, professional interfaces that feel native to Apple's design philosophy.

## Design Principles

### 1. Neutral Base, Minimal Accents
- **Slate grays** provide the sophisticated neutral foundation
- **Apple Blue (#0A84FF)** is reserved for primary actions only
- **Desaturated status colors** for subtle, non-intrusive feedback
- **Pure white** is reserved for content, not backgrounds

### 2. Translucency & Depth
- **Contextual glass opacity levels** based on hierarchy
- **Subtle backdrop blur** for depth without distraction
- **Inner highlights** for glass realism
- **Adaptive glass** that responds to underlying content

### 3. Apple-Like Color Adjustments
- **Apple Blue** refined to match iOS 15+ system blue
- **Slate grays** with blue undertones for sophisticated backgrounds
- **Dark mode** uses deep blue-black instead of pure black
- **Soft contrast** for high readability without harshness

## Color Palette

### Primary Colors
```typescript
primary: {
  50: '#f0f8ff',   // Very light blue tint
  100: '#e0f2fe',  // Light blue tint
  200: '#bae6fd',  // Soft blue
  300: '#7dd3fc',  // Medium blue
  400: '#38bdf8',  // Bright blue
  500: '#0A84FF',  // Apple Blue (iOS 15+) - deeper, less teal
  600: '#007AFF',  // Classic Apple Blue
  700: '#0056CC',  // Darker blue
  800: '#003D99',  // Deep blue
  900: '#002266',  // Very deep blue
}
```

### Neutral Grays
```typescript
gray: {
  50: '#fafbfc',   // Almost white with subtle blue tint
  100: '#f5f7fa',  // Very light blue-gray
  200: '#eef2f7',  // Light blue-gray
  300: '#e2e8f0',  // Medium blue-gray
  400: '#cbd5e1',  // Neutral gray
  500: '#94a3b8',  // Medium gray
  600: '#64748b',  // Dark gray
  700: '#475569',  // Darker gray
  800: '#334155',  // Very dark gray
  900: '#1e293b',  // Near black with blue undertone
}
```

### Slate Grays (Apple's Preferred)
```typescript
slate: {
  50: '#f8fafc',   // Pure white with minimal tint
  100: '#f1f5f9',  // Very light slate (Apple's preferred background)
  200: '#e2e8f0',  // Light slate
  300: '#cbd5e1',  // Medium slate
  400: '#94a3b8',  // Neutral slate
  500: '#64748b',  // Medium slate
  600: '#475569',  // Dark slate
  700: '#334155',  // Darker slate
  800: '#1e293b',  // Very dark slate
  900: '#0f172a',  // Deep blue-black (Apple's dark mode)
}
```

### Status Colors (Desaturated)
```typescript
success: {
  500: '#22c55e',  // Apple Green (desaturated)
  // ... full scale
}
warning: {
  500: '#f59e0b',  // Apple Amber (desaturated)
  // ... full scale
}
error: {
  500: '#ef4444',  // Apple Red (desaturated)
  // ... full scale
}
info: {
  500: '#3b82f6',  // Apple Info Blue
  // ... full scale
}
```

## Glass Effects System

### Light Glass Variants
```css
/* Standard Glass */
.bg-glass-white {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(15, 23, 42, 0.08);
}

/* Subtle Glass */
.bg-glass-white-subtle {
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Vibrant Glass */
.bg-glass-white-vibrant {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 12px 40px rgba(15, 23, 42, 0.12);
}

/* Slate Glass */
.bg-glass-slate {
  background: rgba(248, 250, 252, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(203, 213, 225, 0.2);
}
```

### Dark Glass Variants
```css
/* Dark Glass */
.bg-glass-dark {
  background: rgba(30, 41, 59, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(203, 213, 225, 0.15);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

/* Subtle Dark */
.bg-glass-dark-subtle {
  background: rgba(30, 41, 59, 0.4);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(203, 213, 225, 0.1);
}

/* Vibrant Dark */
.bg-glass-dark-vibrant {
  background: rgba(30, 41, 59, 0.9);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(203, 213, 225, 0.3);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
}
```

## Theme Configurations

### Medical Theme
```typescript
medical: {
  primary: "#0A84FF", // Apple Blue
  secondary: "#007AFF", // Classic Apple Blue
  background: "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 50%, #cbd5e1 100%)",
  surface: "#f8fafc", // Apple's preferred light background
  text: "#1e293b", // Dark slate for excellent readability
  textSecondary: "rgba(30, 41, 59, 0.7)", // Desaturated for hierarchy
  border: "rgba(203, 213, 225, 0.3)", // Subtle slate border
}
```

### Apple Light Theme
```typescript
apple: {
  primary: "#0A84FF", // Apple Blue
  secondary: "#007AFF", // Classic Apple Blue
  background: "#f1f5f9", // Apple's preferred light background
  surface: "#ffffff", // Pure white for content
  text: "#1e293b", // Dark slate for text
  textSecondary: "rgba(30, 41, 59, 0.7)", // Secondary text
  border: "rgba(203, 213, 225, 0.3)", // Subtle border
}
```

### Apple Dark Theme
```typescript
appleDark: {
  primary: "#0A84FF", // Apple Blue
  secondary: "#007AFF", // Classic Apple Blue
  background: "#0f172a", // Apple's dark mode background
  surface: "#1e293b", // Dark slate surface
  text: "#f8fafc", // Light slate text
  textSecondary: "rgba(248, 250, 252, 0.7)", // Secondary text
  border: "rgba(203, 213, 225, 0.2)", // Subtle border
}
```

## Component Usage

### Buttons
```tsx
// Primary action with Apple Blue
<Button className="bg-primary-500 hover:bg-primary-600 text-white">
  Primary Action
</Button>

// Secondary with neutral slate
<Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50">
  Secondary
</Button>

// Ghost with subtle interaction
<Button variant="ghost" className="text-slate-600 hover:bg-slate-100">
  Ghost
</Button>
```

### Cards
```tsx
// Standard card with glass effect
<Card className="backdrop-blur-md bg-white/60 border-slate-200/50 shadow-glass">
  <CardContent>
    Content here
  </CardContent>
</Card>

// Elevated card for focus
<Card className="backdrop-blur-lg bg-white/70 border-slate-200/60 shadow-glass-elevated">
  <CardContent>
    Elevated content
  </CardContent>
</Card>
```

### Badges
```tsx
// Success with desaturated colors
<Badge className="bg-success-100 text-success-700 border-success-200">
  Success
</Badge>

// Neutral badge
<Badge variant="outline" className="border-slate-300 text-slate-600">
  Neutral
</Badge>
```

## Tailwind Utilities

### Glass Colors
```css
.glass-white { background: rgba(255, 255, 255, 0.8); }
.glass-white-subtle { background: rgba(255, 255, 255, 0.4); }
.glass-white-vibrant { background: rgba(255, 255, 255, 0.9); }
.glass-slate { background: rgba(248, 250, 252, 0.8); }
.glass-dark { background: rgba(30, 41, 59, 0.8); }
```

### Backdrop Colors
```css
.backdrop-light { background: rgba(248, 250, 252, 0.12); }
.backdrop-medium { background: rgba(248, 250, 252, 0.18); }
.backdrop-heavy { background: rgba(248, 250, 252, 0.25); }
.backdrop-dark { background: rgba(15, 23, 42, 0.06); }
```

### Shadows
```css
.shadow-glass { box-shadow: 0 8px 32px rgba(15, 23, 42, 0.08); }
.shadow-glass-elevated { box-shadow: 0 12px 40px rgba(15, 23, 42, 0.12); }
.shadow-glass-heavy { box-shadow: 0 16px 48px rgba(15, 23, 42, 0.16); }
.shadow-glass-dark { box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3); }
```

## Best Practices

### 1. Color Hierarchy
- Use **slate-100** for main backgrounds
- Use **slate-200** for subtle borders
- Use **slate-700** for primary text
- Use **slate-600** for secondary text
- Reserve **primary-500** for primary actions only

### 2. Glass Effects
- Use **60% opacity** for standard cards
- Use **80% opacity** for navigation elements
- Use **95% opacity** for modals
- Apply **backdrop-blur-md** for standard depth
- Apply **backdrop-blur-xl** for modal depth

### 3. Contrast & Accessibility
- Ensure **4.5:1 contrast ratio** for text
- Use **slate-700** on **slate-100** for optimal readability
- Test glass effects with various background content
- Provide fallbacks for browsers without backdrop-filter support

### 4. Responsive Design
- Adjust glass opacity based on screen size
- Reduce blur intensity on mobile devices
- Maintain touch target sizes (44px minimum)
- Consider reduced motion preferences

## Implementation Notes

### Browser Support
- **backdrop-filter**: Modern browsers (Safari 9+, Chrome 76+)
- **CSS Grid**: All modern browsers
- **CSS Custom Properties**: All modern browsers

### Performance Considerations
- Use **will-change: backdrop-filter** sparingly
- Limit the number of glass elements per viewport
- Consider using **transform3d** for hardware acceleration
- Monitor paint and composite layers in DevTools

### Fallbacks
```css
/* Fallback for browsers without backdrop-filter */
@supports not (backdrop-filter: blur(20px)) {
  .glass-effect {
    background: rgba(255, 255, 255, 0.95);
    border: 1px solid rgba(203, 213, 225, 0.5);
  }
}
```

## Migration Guide

### From Previous Color System
1. Replace `bg-blue-500` with `bg-primary-500`
2. Replace `bg-gray-100` with `bg-slate-100`
3. Replace `text-gray-700` with `text-slate-700`
4. Update glass effects to use new opacity levels
5. Test contrast ratios with new color combinations

### Component Updates
- **Button**: Updated to use Apple Blue and slate grays
- **Card**: Refined glass effects with neutral colors
- **Badge**: Desaturated status colors for sophistication
- **Input**: Neutral borders with subtle focus states

## Examples

See `AppleLiquidGlassDemo.tsx` for comprehensive examples of:
- Color palette showcase
- Glass effect variants
- Component implementations
- Theme comparisons
- Design principles in practice

This system creates interfaces that feel native to Apple's design philosophy while maintaining excellent usability and accessibility standards. 