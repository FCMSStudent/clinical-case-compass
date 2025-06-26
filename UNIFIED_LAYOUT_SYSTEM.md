# Unified Layout System

A comprehensive, unified layout system that consolidates Card, Bento Grid, Container, Flex, and Grid components into a cohesive, reusable design system.

## Overview

The unified layout system provides:
- **Consistent API** across all layout components
- **Flexible Grid System** with bento grid support
- **Interactive Cards** with motion animations
- **Responsive Design** built-in
- **TypeScript Support** with full type safety

## Components

### Container

Responsive container component with standardized max-widths and spacing.

```tsx
import { Container } from '@/shared/components'

// Basic container
<Container>
  Content here
</Container>

// Different variants
<Container variant="narrow">Narrow content</Container>
<Container variant="wide">Wide content</Container>
<Container variant="fluid">Full-width content</Container>

// With spacing
<Container spacing="lg">Content with large spacing</Container>
```

**Props:**
- `variant`: `"default" | "narrow" | "wide" | "fluid"`
- `spacing`: `"xs" | "sm" | "md" | "lg" | "xl" | "2xl"`

### Flex

Flexbox utility component with predefined layouts.

```tsx
import { Flex } from '@/shared/components'

// Center content
<Flex variant="center">
  <div>Centered content</div>
</Flex>

// Space between
<Flex variant="between" gap="md">
  <div>Left</div>
  <div>Right</div>
</Flex>

// Column layout
<Flex variant="col" gap="lg">
  <div>Item 1</div>
  <div>Item 2</div>
</Flex>
```

**Props:**
- `variant`: `"center" | "between" | "start" | "end" | "col" | "colCenter" | "colBetween"`
- `gap`: `"xs" | "sm" | "md" | "lg" | "xl" | "2xl"`

### Grid

Unified grid system supporting both standard and bento grid layouts.

```tsx
import { Grid } from '@/shared/components'

// Standard responsive grid
<Grid variant="responsive" gap="md">
  <div>Grid item 1</div>
  <div>Grid item 2</div>
  <div>Grid item 3</div>
</Grid>

// Bento grid
<Grid isBento variant="default" gap="lg">
  <Card isBento layout="hero">Hero card</Card>
  <Card isBento layout="small">Small card</Card>
  <Card isBento layout="medium">Medium card</Card>
</Grid>

// Auto-fit grid
<Grid variant="autoFit" gap="md">
  <div>Auto-sized item</div>
  <div>Auto-sized item</div>
</Grid>
```

**Props:**
- `variant`: Grid layout variant or bento container variant
- `gap`: Gap size between items
- `isBento`: Enable bento grid behavior

### Card (Unified)

Unified card component supporting both standard and bento grid layouts.

```tsx
import { Card } from '@/shared/components'

// Basic card
<Card variant="default">
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    Card content here
  </CardContent>
</Card>

// Bento grid card
<Card 
  isBento 
  layout="hero" 
  variant="elevated"
  icon={<Icon />}
  title="Hero Card"
  subtitle="Subtitle text"
  interactive
>
  Card content
</Card>

// Interactive card with motion
<Card 
  interactive 
  glassIntensity="medium"
  variant="glass"
  onClick={handleClick}
>
  Interactive content
</Card>
```

**Props:**
- `variant`: Visual variant (`"default" | "elevated" | "glass" | "compact"`)
- `layout`: Bento grid layout (`"small" | "medium" | "large" | "hero" | "wide" | "tall"`)
- `isBento`: Enable bento grid positioning
- `interactive`: Enable motion animations
- `glassIntensity`: Glass morphism intensity
- `icon`: Header icon
- `title`: Header title
- `subtitle`: Header subtitle

### Section

Semantic section component with container and spacing.

```tsx
import { Section } from '@/shared/components'

<Section container="default" spacing="lg">
  <h2>Section Title</h2>
  <p>Section content</p>
</Section>
```

## Utilities

### Spacer

Add consistent spacing between elements.

```tsx
import { Spacer } from '@/shared/components'

<div>Content 1</div>
<Spacer size="lg" />
<div>Content 2</div>
```

### Divider

Visual separator with consistent styling.

```tsx
import { Divider } from '@/shared/components'

<div>Content above</div>
<Divider spacing="md" />
<div>Content below</div>

// Vertical divider
<Flex variant="between">
  <div>Left content</div>
  <Divider orientation="vertical" />
  <div>Right content</div>
</Flex>
```

## Bento Grid System

The bento grid system provides a Pinterest-style masonry layout with predefined card sizes and responsive behavior.

### Layout Variants

- `small`: 1-2 columns, compact height
- `medium`: 2-3 columns, medium height  
- `large`: 2-4 columns, large height
- `hero`: 2-4 columns, hero height
- `wide`: Full width, standard height
- `tall`: 2-3 columns, extra tall height

### Example Bento Layout

```tsx
import { Grid, Card } from '@/shared/components'

<Grid isBento variant="default" gap="lg">
  {/* Hero card */}
  <Card 
    isBento 
    layout="hero" 
    variant="elevated"
    icon={<BookOpen />}
    title="Featured Content"
    subtitle="Main highlight"
  >
    Hero content here
  </Card>

  {/* Small cards */}
  <Card 
    isBento 
    layout="small" 
    variant="glass"
    icon={<User />}
    title="Quick Info"
  >
    Compact information
  </Card>

  <Card 
    isBento 
    layout="small" 
    variant="glass"
    icon={<Settings />}
    title="Settings"
  >
    Configuration options
  </Card>

  {/* Medium cards */}
  <Card 
    isBento 
    layout="medium" 
    variant="default"
    icon={<Chart />}
    title="Analytics"
  >
    Chart or data visualization
  </Card>

  {/* Wide card */}
  <Card 
    isBento 
    layout="wide" 
    variant="elevated"
    icon={<Activity />}
    title="Activity Feed"
  >
    Full-width content like lists or feeds
  </Card>
</Grid>
```

## Responsive Behavior

All components include responsive design:

- **Containers**: Adaptive max-widths and padding
- **Grids**: Column counts adjust by breakpoint
- **Cards**: Span adjustments for different screen sizes
- **Spacing**: Consistent across all breakpoints

## Migration Guide

### From Legacy Components

```tsx
// Old way
import { BentoContainer, BentoCard } from '@/shared/components'

<BentoContainer layout="default">
  <BentoCard layout="medium" variant="default">
    Content
  </BentoCard>
</BentoContainer>

// New way (backward compatible)
import { BentoContainer, BentoCard } from '@/shared/components'
// OR unified approach:
import { Grid, Card } from '@/shared/components'

<Grid isBento variant="default">
  <Card isBento layout="medium" variant="default">
    Content
  </Card>
</Grid>
```

### Benefits of Unified System

1. **Consistent API**: Same props pattern across all components
2. **Better TypeScript**: Full type safety and intellisense
3. **Smaller Bundle**: Single implementation reduces code duplication
4. **Enhanced Features**: Motion animations, glass effects, better responsive behavior
5. **Future-Proof**: Easier to extend and maintain

## Examples

### Dashboard Layout

```tsx
<Container variant="default" spacing="lg">
  <Grid isBento variant="default" gap="lg">
    <Card isBento layout="hero" variant="elevated" 
          icon={<BarChart />} title="Analytics Overview">
      <AnalyticsChart />
    </Card>
    
    <Card isBento layout="small" variant="glass"
          icon={<Users />} title="Active Users">
      <MetricDisplay value="1,234" />
    </Card>
    
    <Card isBento layout="small" variant="glass"
          icon={<TrendingUp />} title="Growth">
      <MetricDisplay value="+12%" />
    </Card>
    
    <Card isBento layout="wide" variant="default"
          icon={<Activity />} title="Recent Activity">
      <ActivityFeed />
    </Card>
  </Grid>
</Container>
```

### Content Layout

```tsx
<Section container="narrow" spacing="xl">
  <Grid variant="twoCol" gap="lg">
    <Card variant="default" interactive>
      <CardHeader>
        <CardTitle>Article Title</CardTitle>
        <CardDescription>Article summary</CardDescription>
      </CardHeader>
      <CardContent>
        Article content...
      </CardContent>
    </Card>
    
    <Card variant="glass">
      <CardHeader>
        <CardTitle>Sidebar</CardTitle>
      </CardHeader>
      <CardContent>
        Additional information...
      </CardContent>
    </Card>
  </Grid>
</Section>
```

This unified layout system provides a consistent, powerful foundation for building responsive, beautiful layouts throughout your application.