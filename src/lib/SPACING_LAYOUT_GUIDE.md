# Spacing & Layout System - Apple-Inspired 8pt Grid

## Overview

Our spacing and layout system is built on Apple's Human Interface Guidelines, implementing an 8-point grid system that balances density and openness for optimal readability and visual rhythm. This system ensures consistent spacing throughout the application while maintaining the breathable, polished feel characteristic of Apple's design language.

## Core Principles

### 8pt Grid System
- **Base unit**: 8px (0.5rem)
- **Half-step**: 4px (0.25rem) for finer adjustments
- **All spacing values** should be multiples of 8px to maintain consistent rhythm
- **Visual harmony** through predictable spacing patterns

### Apple-Inspired Spacing
- **Generous margins** that scale with screen size
- **Consistent padding** inside similar components
- **44px minimum touch targets** for interactive elements
- **Whitespace as design element** for clarity and focus

### Fluid Responsiveness
- **Adaptive spacing** that scales gracefully across devices
- **Readable content widths** that prevent overly long line lengths
- **Consistent visual rhythm** maintained across all breakpoints

## Spacing Scale

### Core Spacing Values
```typescript
spacing = {
  0: '0',           // 0px
  1: '0.25rem',     // 4px - half-step for fine adjustments
  2: '0.5rem',      // 8px - base unit
  3: '0.75rem',     // 12px - 1.5x base
  4: '1rem',        // 16px - 2x base (standard iOS margin)
  5: '1.25rem',     // 20px - 2.5x base
  6: '1.5rem',      // 24px - 3x base
  8: '2rem',        // 32px - 4x base
  10: '2.5rem',     // 40px - 5x base
  12: '3rem',       // 48px - 6x base
  16: '4rem',       // 64px - 8x base
  20: '5rem',       // 80px - 10x base
  24: '6rem',       // 96px - 12x base
  32: '8rem',       // 128px - 16x base
  40: '10rem',      // 160px - 20x base
  48: '12rem',      // 192px - 24x base
  56: '14rem',      // 224px - 28x base
  64: '16rem',      // 256px - 32x base
}
```

### Layout Spacing Patterns
```typescript
layoutSpacing = {
  container: {
    mobile: '1rem',      // 16px - iOS standard
    tablet: '1.5rem',    // 24px - iPad standard
    desktop: '2rem',     // 32px - macOS standard
    wide: '3rem',        // 48px - large displays
  },
  section: {
    compact: '2rem',     // 32px - between related sections
    default: '3rem',     // 48px - between major sections
    spacious: '4rem',    // 64px - between page sections
    hero: '6rem',        // 96px - hero sections
  },
  component: {
    tight: '0.5rem',     // 8px - within compact components
    default: '1rem',     // 16px - standard component spacing
    comfortable: '1.5rem', // 24px - comfortable component spacing
    spacious: '2rem',    // 32px - spacious component spacing
  },
  grid: {
    tight: '0.5rem',     // 8px - compact grids
    default: '1rem',     // 16px - standard grid gap
    comfortable: '1.5rem', // 24px - comfortable grid gap
    spacious: '2rem',    // 32px - spacious grid gap
  },
}
```

## Component Sizing

### Button Sizes (Apple Touch Targets)
```typescript
button = {
  xs: 'h-8 px-2 text-xs',           // 32px height + 8px padding = 40px touch target
  sm: 'h-9 px-3 text-sm',           // 36px height + 12px padding = 48px touch target
  default: 'h-11 px-4 text-sm',     // 44px height + 16px padding = 60px touch target (Apple standard)
  md: 'h-11 px-4 text-sm',          // 44px height + 16px padding = 60px touch target
  lg: 'h-12 px-6 text-base',        // 48px height + 24px padding = 72px touch target
  xl: 'h-14 px-8 text-lg',          // 56px height + 32px padding = 88px touch target
  icon: "h-11 w-11",                // 44px x 44px - Apple's minimum touch target
}
```

### Input Sizes
```typescript
input = {
  xs: 'h-8 px-2 text-xs',           // 32px height + 8px padding = 40px touch target
  sm: 'h-9 px-3 text-sm',           // 36px height + 12px padding = 48px touch target
  md: 'h-11 px-4 text-sm',          // 44px height + 16px padding = 60px touch target (Apple standard)
  lg: 'h-12 px-4 text-base',        // 48px height + 16px padding = 64px touch target
  xl: 'h-14 px-6 text-lg',          // 56px height + 24px padding = 80px touch target
}
```

### Card Padding
```typescript
card = {
  compact: 'p-3',      // 12px - compact cards
  default: 'p-4',      // 16px - standard cards
  comfortable: 'p-6',  // 24px - comfortable cards
  spacious: 'p-8',     // 32px - spacious cards
}
```

## Container System

### Max-Widths for Readable Content
```typescript
container = {
  readable: 'max-w-4xl',     // 896px - optimal reading width
  comfortable: 'max-w-5xl',  // 1024px - comfortable content width
  spacious: 'max-w-6xl',     // 1152px - spacious content width
}
```

### Responsive Container Padding
```typescript
// Tailwind config
container: {
  center: true,
  padding: {
    DEFAULT: '1rem',    // 16px - iOS standard mobile margin
    sm: '1.5rem',       // 24px - tablet margin
    md: '2rem',         // 32px - desktop margin
    lg: '3rem',         // 48px - large screen margin
  },
  screens: {
    '2xl': '1400px'     // Prevent overly wide content
  }
}
```

## Grid System

### Grid Gaps (8pt Aligned)
```typescript
grid = {
  gap: {
    none: 'gap-0',
    tight: 'gap-2',      // 8px
    default: 'gap-4',    // 16px
    comfortable: 'gap-6', // 24px
    spacious: 'gap-8',   // 32px
  },
}
```

### Responsive Grid Example
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 xl:gap-8">
  {/* Grid items */}
</div>
```

## Spacing Utilities

### Container Padding
```typescript
containerPadding = {
  mobile: 'px-4',      // 16px horizontal padding
  tablet: 'px-6',      // 24px horizontal padding
  desktop: 'px-8',     // 32px horizontal padding
  wide: 'px-12',       // 48px horizontal padding
}
```

### Section Spacing
```typescript
sectionSpacing = {
  compact: 'py-8',     // 32px vertical spacing
  default: 'py-12',    // 48px vertical spacing
  spacious: 'py-16',   // 64px vertical spacing
  hero: 'py-24',       // 96px vertical spacing
}
```

### Component Spacing
```typescript
componentSpacing = {
  tight: 'space-y-2',      // 8px between items
  default: 'space-y-4',    // 16px between items
  comfortable: 'space-y-6', // 24px between items
  spacious: 'space-y-8',   // 32px between items
}
```

## Usage Examples

### Page Layout
```tsx
// Standard page with Apple-inspired spacing
<div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
    <div className="max-w-4xl mx-auto space-y-8 lg:space-y-12">
      {/* Page content */}
    </div>
  </div>
</div>
```

### Card Layout
```tsx
// Card with consistent 8pt grid spacing
<Card className="backdrop-blur-md bg-white/10 border-white/20">
  <CardHeader className="space-y-2 p-4">
    <CardTitle className="text-white">Card Title</CardTitle>
    <CardDescription className="text-white/70">Card description</CardDescription>
  </CardHeader>
  <CardContent className="p-4 pt-0">
    {/* Card content */}
  </CardContent>
</Card>
```

### Form Layout
```tsx
// Form with consistent spacing
<form className="space-y-6">
  <div className="space-y-4">
    <Input placeholder="Email" size="md" />
    <Input placeholder="Password" type="password" size="md" />
  </div>
  <div className="flex gap-4">
    <Button size="md" variant="outline">Cancel</Button>
    <Button size="md">Submit</Button>
  </div>
</form>
```

### Grid Layout
```tsx
// Responsive grid with 8pt-aligned gaps
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
  {items.map((item) => (
    <Card key={item.id} className="p-4">
      {/* Card content */}
    </Card>
  ))}
</div>
```

## Best Practices

### ✅ Do's
- Use multiples of 8px for all spacing values
- Apply consistent padding inside similar components
- Use generous margins on larger screens
- Maintain 44px minimum touch targets for interactive elements
- Scale spacing with screen size for responsive design
- Treat whitespace as a design element for clarity
- Align elements to the 8pt grid for visual rhythm
- Use readable content widths (max-w-4xl or similar)

### ❌ Don'ts
- Use arbitrary spacing values that don't align with the 8pt grid
- Cram content with insufficient padding
- Ignore touch target requirements for interactive elements
- Use inconsistent spacing patterns across similar components
- Forget to adjust spacing for different screen sizes
- Overlook visual rhythm and alignment
- Create overly wide content that's difficult to read

## Quick Reference

| Spacing | Use Case | Tailwind Class |
|---------|----------|----------------|
| 4px | Fine adjustments | `p-1`, `m-1`, `gap-1` |
| 8px | Base unit | `p-2`, `m-2`, `gap-2` |
| 16px | Standard margin | `p-4`, `m-4`, `gap-4` |
| 24px | Comfortable spacing | `p-6`, `m-6`, `gap-6` |
| 32px | Section spacing | `p-8`, `m-8`, `gap-8` |
| 48px | Major spacing | `p-12`, `m-12`, `gap-12` |
| 64px | Page spacing | `p-16`, `m-16` |
| 96px | Hero spacing | `p-24`, `m-24` |

## Implementation Notes

### Tailwind Configuration
The spacing system is configured in `tailwind.config.ts` to extend the default spacing scale with our 8pt grid values. This ensures that all Tailwind spacing utilities align with our design system.

### Component Updates
All UI components have been updated to use the new spacing system:
- **Button**: Updated sizes to meet Apple's 44px minimum touch target
- **Input**: Aligned heights and padding with 8pt grid
- **Card**: Consistent padding options with 8pt alignment
- **Grid**: Gap options that align with spacing scale

### Responsive Design
The system includes responsive spacing patterns that scale appropriately across different screen sizes, maintaining the breathable feel on larger displays while ensuring usability on smaller devices.

## Demo Component

See `SpacingLayoutDemo.tsx` for a comprehensive demonstration of the spacing and layout system, including:
- Visual grid alignment examples
- Component spacing demonstrations
- Responsive design patterns
- Best practices showcase
- Quick reference guide

This demo component serves as both documentation and a testing ground for the spacing system implementation. 