# Clinical Case Compass - Unified Design System Guide

This consolidated guide combines all design system documentation into a single reference.

## Table of Contents
1. [Core Design Principles](#core-design-principles)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Glassmorphic Effects & Frosted Glass](#glassmorphic-effects--frosted-glass)
5. [Translucent Backgrounds](#translucent-backgrounds)
6. [Softer Shadows](#softer-shadows)
7. [Spacing & Layout](#spacing--layout)
8. [Iconography](#iconography)
9. [Input System](#input-system)
10. [Motion & Animations](#motion--animations)

## Core Design Principles

### Medical Professional Focus
- Clean, professional aesthetic appropriate for medical environments
- High contrast for accessibility and readability
- Consistent visual hierarchy
- Trustworthy and reliable visual language

### Glassmorphic Design Language
- Apple-inspired liquid glass effects
- Translucent backgrounds with backdrop blur
- Soft, elevated shadows with inner highlights
- Smooth transitions and micro-interactions

## Color System

### Theme Variants
- **Medical Blue**: Professional clinical blue tones
- **Emerald Medical**: Fresh modern medical with emerald accents  
- **Purple Medical**: Sophisticated purple and violet tones

### Color Tokens
- Primary: Medical blues (HSL: 213, 84%, 54%)
- Secondary: Soft emerald greens
- Accent: Purple/violet highlights
- Neutrals: Warm grays with blue undertones
- Status: Green (success), Red (error), Yellow (warning), Blue (info)

## Typography

### Type Scale
- Display: 64px/72px (Large headings)
- H1: 48px/56px (Page titles)
- H2: 36px/44px (Section headers)
- H3: 24px/32px (Subsection headers)
- H4: 20px/28px (Card titles)
- Body Large: 18px/28px
- Body: 16px/24px (Default)
- Body Small: 14px/20px
- Caption: 12px/16px
- Micro: 10px/14px

### Font Stack
- Primary: Inter (system-ui fallback)
- Monospace: JetBrains Mono (code/data)

## Glassmorphic Effects & Frosted Glass

### Backdrop Filters
- Light: `blur(20px) brightness(1.1)`
- Medium: `blur(30px) saturate(150%) brightness(1.05)`
- Heavy: `blur(50px) saturate(180%) contrast(1.1)`
- Ultra: `blur(60px) saturate(200%) contrast(1.15)`

### Context-Specific Variants
- **Navigation**: `blur(24px) saturate(160%) brightness(1.08)`
- **Modal**: `blur(50px) saturate(200%) contrast(1.15)`
- **Card**: `blur(18px) saturate(140%) brightness(1.06)`
- **Dropdown**: `blur(28px) saturate(170%) brightness(1.07)`

### Glass Classes
```css
.glass-card { @apply bg-white/8 backdrop-blur-[18px] saturate-140 brightness-106; }
.glass-navigation { @apply bg-white/18 backdrop-blur-[24px] saturate-160 brightness-108; }
.glass-modal { @apply bg-white/25 backdrop-blur-[50px] saturate-200 contrast-115; }
```

## Translucent Backgrounds

### Opacity Levels
- Ultra-light: 5% (subtle overlays)
- Light: 8% (cards, panels)
- Medium: 12% (navigation, dropdowns)
- Heavy: 18% (modals, important overlays)
- Ultra-heavy: 25% (critical dialogs)

### Background Variants
```css
.bg-ultra-light { @apply bg-white/5 backdrop-blur-[12px] brightness-105; }
.bg-light { @apply bg-white/8 backdrop-blur-[18px] saturate-140 brightness-106; }
.bg-medium { @apply bg-white/12 backdrop-blur-[24px] saturate-160 brightness-108; }
.bg-heavy { @apply bg-white/18 backdrop-blur-[30px] saturate-150 brightness-105; }
```

## Softer Shadows

### Shadow System
- **Glass with Highlight**: Combines outer shadow with inner highlight
- **Elevation Shadows**: Subtle depth without harsh edges
- **Focus Shadows**: Ring-based focus indicators

### Shadow Tokens
```css
.shadow-glass { box-shadow: 0 8px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.3); }
.shadow-elevated { box-shadow: 0 12px 48px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.3); }
.shadow-modal { box-shadow: 0 16px 64px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.3); }
```

## Spacing & Layout

### Spacing Scale
- 0: 0px
- 1: 4px
- 2: 8px
- 3: 12px
- 4: 16px
- 5: 20px
- 6: 24px
- 8: 32px
- 10: 40px
- 12: 48px
- 16: 64px
- 20: 80px
- 24: 96px

### Layout Patterns
- **Container**: Max-width with responsive breakpoints
- **Grid**: CSS Grid for complex layouts
- **Flexbox**: For component-level arrangements
- **Bento Grid**: Card-based dashboard layouts

## Input System

### Input Variants
- Default: Standard form inputs with glass styling
- Floating Label: Label animates to top on focus
- Inline: Compact horizontal layout
- Search: With search icon and clear functionality

### Input States
- Default: Subtle glass effect
- Focus: Enhanced glow and elevation
- Error: Red accent with validation feedback
- Success: Green accent confirmation
- Disabled: Reduced opacity and interaction

## Motion & Animations

### Easing Curves
- **Glass Enter**: cubic-bezier(0.16, 1, 0.3, 1)
- **Glass Hover**: cubic-bezier(0.25, 0.46, 0.45, 0.94)
- **Glass Exit**: cubic-bezier(0.55, 0.055, 0.675, 0.19)

### Duration Scale
- **Instant**: 50ms (immediate feedback)
- **Fast**: 150ms (micro-interactions)
- **Smooth**: 300ms (standard transitions)
- **Slow**: 500ms (page transitions)
- **Slower**: 750ms (complex animations)

### Animation Patterns
- **Hover**: Subtle scale and brightness increase
- **Focus**: Ring appearance with slight elevation
- **Enter**: Fade in with scale from 95%
- **Exit**: Fade out with scale to 95% and blur

## Implementation Examples

### Glass Card Component
```tsx
<div className="bg-white/8 backdrop-blur-[18px] saturate-140 brightness-106 
                shadow-[0_8px_32px_rgba(0,0,0,0.08)] 
                shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] 
                rounded-2xl border border-white/20 
                transition-all duration-300 
                hover:bg-white/12 hover:scale-[1.02]">
  <div className="p-6">
    <h3 className="text-lg font-semibold mb-2">Card Title</h3>
    <p className="text-sm text-white/70">Card content...</p>
  </div>
</div>
```

### Glassmorphic Button
```tsx
<button className="bg-white/15 backdrop-blur-[20px] brightness-110 
                   shadow-[0_8px_32px_rgba(0,0,0,0.08)] 
                   shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] 
                   rounded-xl border border-white/20 
                   px-6 py-3 text-sm font-medium
                   transition-all duration-200
                   hover:bg-white/20 hover:scale-105
                   focus:ring-2 focus:ring-white/30">
  Button Text
</button>
```

---

*This consolidated guide replaces individual design documentation files and serves as the single source of truth for the Clinical Case Compass design system.*