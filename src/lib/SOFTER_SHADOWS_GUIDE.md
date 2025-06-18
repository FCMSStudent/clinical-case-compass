# Softer Shadows & Highlights Guide

## Overview

This guide documents the implementation of Apple-inspired softer shadows and highlights that create translucent panes of glass floating above content. The system uses very soft, diffuse shadows with larger blur radii and lower opacity, combined with subtle inner highlights to simulate the way light catches the edge of glass.

## Key Principles

### Softer Shadows
- **Larger blur radii with lower opacity**: Avoid harsh, dark drop-shadows
- **Pre-defined "glass" shadows**: Use the shadow tokens for consistency
- **Softened further for floating elements**: Modals, cards, and dropdowns
- **Suggest elevation without hard edges**: Create depth perception naturally

### Inner Highlights
- **Subtle inner shadow or border**: Light color to simulate light catching edges
- **Luminous edge like macOS windows**: Creates the glass pane effect
- **Makes components feel translucent**: Enhances the glass material perception

## Shadow System

### Base Shadows (Softer than Traditional)
```css
/* Traditional shadows replaced with softer variants */
shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.08)
shadow-md: 0 4px 12px -2px rgba(0, 0, 0, 0.08)
shadow-lg: 0 10px 25px -3px rgba(0, 0, 0, 0.08)
shadow-xl: 0 20px 40px -5px rgba(0, 0, 0, 0.08)
```

### Glass-Specific Shadows
```css
/* Very soft and diffuse for floating elements */
glass: 0 8px 32px rgba(0, 0, 0, 0.08)
glassElevated: 0 12px 48px rgba(0, 0, 0, 0.12)
glassFloating: 0 16px 64px rgba(0, 0, 0, 0.1)
glassModal: 0 24px 80px rgba(0, 0, 0, 0.15)
```

### Ultra-Soft Shadows
```css
/* For subtle elevation */
soft: 0 2px 8px rgba(0, 0, 0, 0.04)
softer: 0 4px 16px rgba(0, 0, 0, 0.06)
softest: 0 8px 24px rgba(0, 0, 0, 0.08)
```

### Inner Highlights
```css
/* Subtle luminous edges like macOS windows */
innerHighlight: inset 0 1px 0 rgba(255, 255, 255, 0.3)
innerHighlightMedium: inset 0 2px 4px rgba(255, 255, 255, 0.2)
innerHighlightStrong: inset 0 4px 8px rgba(255, 255, 255, 0.15)
```

### Combined Glass Effects
```css
/* Combined shadows and highlights for complete glass effect */
glassWithHighlight: 0 8px 32px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.3)
glassElevatedWithHighlight: 0 12px 48px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.3)
glassFloatingWithHighlight: 0 16px 64px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.3)
glassModalWithHighlight: 0 24px 80px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3)
```

## Usage Examples

### Cards
```tsx
// Using the card component with softer shadows
<Card variant="default" className="p-6">
  <CardTitle>Default Card</CardTitle>
  <CardDescription>Uses glassWithHighlight shadow</CardDescription>
</Card>

<Card variant="elevated" className="p-6">
  <CardTitle>Elevated Card</CardTitle>
  <CardDescription>Uses glassElevatedWithHighlight shadow</CardDescription>
</Card>

<Card variant="featured" className="p-6">
  <CardTitle>Featured Card</CardTitle>
  <CardDescription>Uses glassFloatingWithHighlight shadow</CardDescription>
</Card>
```

### Buttons
```tsx
// Buttons with softer shadows and inner highlights
<Button variant="primary">
  Primary Button
</Button>

<Button variant="secondary">
  Secondary Button
</Button>
```

### Glass Classes
```tsx
// Using glass classes directly
import { getGlassClasses } from '@/lib/glass-effects';

<div className={`${getGlassClasses('card')} p-6 rounded-xl`}>
  <h3>Card Glass</h3>
  <p>Uses card glass classes with softer shadows and inner highlights</p>
</div>

<div className={`${getGlassClasses('modal')} p-6 rounded-xl`}>
  <h3>Modal Glass</h3>
  <p>Uses modal glass classes with heavy backdrop blur and contrast</p>
</div>
```

### Elevation System
```tsx
// Elevation variants with softer shadows
import { liquidGlassClasses } from '@/lib/glass-effects';

<div className={`${liquidGlassClasses.elevation50} p-4 rounded-xl`}>
  <h4>Elevation 50</h4>
  <p>Ultra-soft shadow</p>
</div>

<div className={`${liquidGlassClasses.elevation300} p-4 rounded-xl`}>
  <h4>Elevation 300</h4>
  <p>Elevated shadow</p>
</div>
```

## Component Updates

### Card System
All card variants now use the new shadow system:
- `default`: Uses `glassWithHighlight`
- `elevated`: Uses `glassElevatedWithHighlight`
- `featured`: Uses `glassFloatingWithHighlight`
- `modal`: Uses `glassModalWithHighlight`
- `alert`: Uses `glassElevatedWithHighlight`

### Button System
All button variants include softer shadows and inner highlights:
- `primary`: Enhanced with `glassWithHighlight` on hover
- `secondary`: Enhanced with `glassWithHighlight` on hover
- `outline`: Enhanced with `glassWithHighlight` on hover
- `ghost`: Enhanced with `glassWithHighlight` on hover

### Input System
Input fields now include subtle shadows and inner highlights:
- Base state: `soft` shadow with `innerHighlight`
- Focus state: Enhanced brightness and saturation
- Hover state: Enhanced background opacity

### Glass Effects
The glass effects system has been updated to use the new shadow tokens:
- `liquidGlassEffects.hover`: Updated with softer shadows
- `liquidGlassEffects.focus`: Updated with softer shadows
- `liquidGlassClasses`: All classes updated with new shadow system

## Implementation Details

### Shadow Token Structure
```typescript
export const shadows = {
  // Base shadows - softer and more diffuse
  sm: '0 1px 3px 0 rgba(0, 0, 0, 0.08)',
  md: '0 4px 12px -2px rgba(0, 0, 0, 0.08), 0 2px 6px -4px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 25px -3px rgba(0, 0, 0, 0.08), 0 4px 10px -6px rgba(0, 0, 0, 0.06)',
  xl: '0 20px 40px -5px rgba(0, 0, 0, 0.08), 0 8px 16px -8px rgba(0, 0, 0, 0.06)',
  
  // Glass-specific shadows - very soft and diffuse
  glass: '0 8px 32px rgba(0, 0, 0, 0.08)',
  glassElevated: '0 12px 48px rgba(0, 0, 0, 0.12)',
  glassFloating: '0 16px 64px rgba(0, 0, 0, 0.1)',
  glassModal: '0 24px 80px rgba(0, 0, 0, 0.15)',
  
  // Ultra-soft shadows for subtle elevation
  soft: '0 2px 8px rgba(0, 0, 0, 0.04)',
  softer: '0 4px 16px rgba(0, 0, 0, 0.06)',
  softest: '0 8px 24px rgba(0, 0, 0, 0.08)',
  
  // Inner highlights for glass panels (like macOS windows)
  innerHighlight: 'inset 0 1px 0 rgba(255, 255, 255, 0.3)',
  innerHighlightMedium: 'inset 0 2px 4px rgba(255, 255, 255, 0.2)',
  innerHighlightStrong: 'inset 0 4px 8px rgba(255, 255, 255, 0.15)',
  
  // Combined glass effects
  glassWithHighlight: '0 8px 32px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
  glassElevatedWithHighlight: '0 12px 48px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
  glassFloatingWithHighlight: '0 16px 64px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
  glassModalWithHighlight: '0 24px 80px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
} as const;
```

### CSS Class Implementation
```css
/* Example of how shadows are applied in CSS classes */
.card {
  @apply bg-white/8 backdrop-blur-[18px] saturate-140 brightness-106;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

.card:hover {
  @apply bg-white/25;
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.3);
}
```

## Best Practices

### When to Use Each Shadow Type
1. **Base shadows** (`sm`, `md`, `lg`, `xl`): For general UI elements
2. **Glass shadows** (`glass`, `glassElevated`, etc.): For floating elements like cards, modals
3. **Ultra-soft shadows** (`soft`, `softer`, `softest`): For subtle elevation changes
4. **Inner highlights**: Always combine with outer shadows for complete glass effect

### Performance Considerations
- Use `will-change: transform` for elements with hover animations
- Consider using `transform: translateZ(0)` for hardware acceleration
- Monitor performance on lower-end devices

### Accessibility
- Ensure sufficient contrast ratios with the new shadow system
- Test with high contrast mode enabled
- Verify focus indicators remain visible

## Demo Component

See `SofterShadowsDemo.tsx` for a comprehensive showcase of all shadow and highlight effects, including:
- Shadow system showcase
- Component examples
- Glass classes demo
- Elevation system
- Technical implementation details

## Migration Guide

### From Old Shadow System
1. Replace `shadow-sm` with new softer variant
2. Replace `shadow-md` with new softer variant
3. Replace `shadow-lg` with new softer variant
4. Add inner highlights where appropriate
5. Update hover states to use new shadow tokens

### Example Migration
```tsx
// Before
<div className="bg-white/10 shadow-md rounded-lg">

// After
<div className="bg-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.08)] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] rounded-lg">
```

## Conclusion

The softer shadows and highlights system creates a more refined, Apple-inspired glass design that feels modern and polished. The combination of larger blur radii, lower opacity, and subtle inner highlights creates the illusion of translucent glass panes floating above content, enhancing the overall user experience while maintaining excellent performance and accessibility. 