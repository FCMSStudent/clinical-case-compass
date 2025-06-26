# Unified Layout System

## Overview

The Clinical Case Compass application features a unified layout system with consistent design patterns, glass morphism effects, and responsive behaviors across all layout components. This system provides a comprehensive set of tools for building complex, accessible, and visually appealing layouts.

## Core Design Principles

- **Glass Morphism**: Apple-inspired liquid glass effects with backdrop blur and translucency
- **Responsive First**: Mobile-first responsive design with consistent breakpoints
- **Consistent Variants**: Unified variant system across all layout components
- **Type Safety**: Full TypeScript support with proper variant typing
- **Accessibility**: ARIA-compliant and keyboard navigation support
- **Performance**: Optimized for smooth animations and interactions

## Layout Components

### Card

Enhanced card component with unified variants, interactive states, and glass effects.

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/shared/components/card'

// Basic usage
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
  <CardFooter>
    <p>Card footer</p>
  </CardFooter>
</Card>

// Variants
<Card variant="default">Default card</Card>
<Card variant="subtle">Subtle card</Card>
<Card variant="elevated">Elevated card</Card>
<Card variant="interactive" interactive>Interactive card</Card>
<Card variant="featured">Featured card</Card>
<Card variant="medical">Medical card</Card>
<Card variant="success">Success card</Card>
<Card variant="warning">Warning card</Card>
<Card variant="error">Error card</Card>
<Card variant="info">Info card</Card>

// Sizes
<Card size="xs">Extra small padding</Card>
<Card size="sm">Small padding</Card>
<Card size="md">Medium padding</Card>
<Card size="lg">Large padding</Card>
<Card size="xl">Extra large padding</Card>

// Interactive with glass effects
<Card 
  variant="interactive" 
  interactive 
  glassIntensity="strong"
  onClick={() => console.log('Card clicked')}
>
  Interactive card with enhanced glass effects
</Card>
```

### Bento Grid

Flexible grid system for dashboard-style layouts with automatic sizing and responsive behavior.

```tsx
import { BentoContainer, BentoCard } from '@/shared/components'

// Basic grid container
<BentoContainer>
  <BentoCard grid="small" title="Small Card">
    Content for small card
  </BentoCard>
  <BentoCard grid="medium" title="Medium Card">
    Content for medium card
  </BentoCard>
  <BentoCard grid="large" title="Large Card">
    Content for large card
  </BentoCard>
</BentoContainer>

// Container variants
<BentoContainer layout="default" gap="md">Default layout</BentoContainer>
<BentoContainer layout="dense" gap="sm">Dense layout</BentoContainer>
<BentoContainer layout="spacious" gap="lg">Spacious layout</BentoContainer>
<BentoContainer layout="autoFit" gap="xl">Auto-fit layout</BentoContainer>

// Card grid layouts
<BentoCard grid="small">Small (1-2 cols, 160px height)</BentoCard>
<BentoCard grid="medium">Medium (2-3 cols, 240px height)</BentoCard>
<BentoCard grid="large">Large (2-4 cols, 280px height)</BentoCard>
<BentoCard grid="hero">Hero (2-4 cols, 320px height)</BentoCard>
<BentoCard grid="wide">Wide (full width, 200px height)</BentoCard>
<BentoCard grid="tall">Tall (2-3 cols, 380px height)</BentoCard>
<BentoCard grid="compact">Compact (1-2 cols, 140px height)</BentoCard>
<BentoCard grid="square">Square (2 cols, square aspect)</BentoCard>

// Medical dashboard example
<BentoContainer layout="default" gap="lg" padding="md">
  <BentoCard 
    variant="medical" 
    grid="hero" 
    title="Patient Overview"
    subtitle="Current case summary"
    interactive
  >
    <PatientSummaryComponent />
  </BentoCard>
  
  <BentoCard 
    variant="success" 
    grid="medium" 
    title="Recent Tests"
    interactive
  >
    <TestResultsComponent />
  </BentoCard>
  
  <BentoCard 
    variant="info" 
    grid="small" 
    title="Notifications"
  >
    <NotificationsComponent />
  </BentoCard>
</BentoContainer>
```

### Container

Responsive container component with consistent max-widths and padding.

```tsx
import { Container } from '@/shared/components/layout'

// Basic usage
<Container>
  <h1>Page content</h1>
</Container>

// Container variants
<Container variant="default">Standard container (max-w-7xl)</Container>
<Container variant="narrow">Narrow container (max-w-4xl)</Container>
<Container variant="wide">Wide container (max-w-full)</Container>
<Container variant="fluid">Fluid container (no max-width)</Container>
<Container variant="tight">Tight container (max-w-3xl)</Container>
<Container variant="loose">Loose container (max-w-full, more padding)</Container>
<Container variant="content">Content container (max-w-prose)</Container>
<Container variant="screen">Screen container (max-w-screen-xl)</Container>

// Padding variants
<Container padding="none">No padding</Container>
<Container padding="xs">Extra small padding</Container>
<Container padding="sm">Small padding</Container>
<Container padding="md">Medium padding</Container>
<Container padding="lg">Large padding</Container>
<Container padding="xl">Extra large padding</Container>

// Combined usage
<Container variant="narrow" padding="lg">
  <h1>Narrow container with large padding</h1>
</Container>
```

### Flex

Flexible layout component with comprehensive flexbox properties.

```tsx
import { Flex } from '@/shared/components/layout'

// Basic usage
<Flex>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Flex>

// Direction variants
<Flex direction="row">Horizontal layout</Flex>
<Flex direction="col">Vertical layout</Flex>
<Flex direction="rowReverse">Horizontal reversed</Flex>
<Flex direction="colReverse">Vertical reversed</Flex>

// Alignment
<Flex align="start">Align to start</Flex>
<Flex align="center">Align to center</Flex>
<Flex align="end">Align to end</Flex>
<Flex align="stretch">Stretch items</Flex>
<Flex align="baseline">Align to baseline</Flex>

// Justification
<Flex justify="start">Justify start</Flex>
<Flex justify="center">Justify center</Flex>
<Flex justify="end">Justify end</Flex>
<Flex justify="between">Justify between</Flex>
<Flex justify="around">Justify around</Flex>
<Flex justify="evenly">Justify evenly</Flex>

// Wrapping
<Flex wrap="wrap">Allow wrapping</Flex>
<Flex wrap="nowrap">No wrapping</Flex>
<Flex wrap="reverse">Reverse wrapping</Flex>

// Gap spacing
<Flex gap="none">No gap</Flex>
<Flex gap="xs">Extra small gap</Flex>
<Flex gap="sm">Small gap</Flex>
<Flex gap="md">Medium gap</Flex>
<Flex gap="lg">Large gap</Flex>
<Flex gap="xl">Extra large gap</Flex>
<Flex gap="2xl">2x large gap</Flex>

// Common patterns
<Flex direction="col" align="center" gap="lg">
  <h1>Centered vertical layout</h1>
  <p>With large gaps</p>
</Flex>

<Flex justify="between" align="center">
  <h1>Header</h1>
  <nav>Navigation</nav>
</Flex>
```

### Grid

Responsive grid component with predefined layouts and custom configurations.

```tsx
import { Grid } from '@/shared/components/layout'

// Basic usage
<Grid>
  <div>Grid item 1</div>
  <div>Grid item 2</div>
  <div>Grid item 3</div>
</Grid>

// Grid variants
<Grid variant="responsive">Responsive grid (1-6 cols)</Grid>
<Grid variant="twoCol">Two column grid</Grid>
<Grid variant="threeCol">Three column grid</Grid>
<Grid variant="fourCol">Four column grid</Grid>
<Grid variant="sixCol">Six column grid</Grid>
<Grid variant="autoFit">Auto-fit grid (280px min)</Grid>
<Grid variant="autoFill">Auto-fill grid (280px min)</Grid>
<Grid variant="equal">Equal width columns</Grid>

// Fixed column grids
<Grid variant="cols1">1 column</Grid>
<Grid variant="cols2">2 columns</Grid>
<Grid variant="cols3">3 columns</Grid>
<Grid variant="cols4">4 columns</Grid>
<Grid variant="cols5">5 columns</Grid>
<Grid variant="cols6">6 columns</Grid>
<Grid variant="cols12">12 columns</Grid>

// Gap variants
<Grid gap="none">No gap</Grid>
<Grid gap="xs">Extra small gap</Grid>
<Grid gap="sm">Small gap</Grid>
<Grid gap="md">Medium gap</Grid>
<Grid gap="lg">Large gap</Grid>
<Grid gap="xl">Extra large gap</Grid>
<Grid gap="2xl">2x large gap</Grid>

// Row behavior
<Grid rows="auto">Auto rows</Grid>
<Grid rows="min">Min content rows</Grid>
<Grid rows="max">Max content rows</Grid>
<Grid rows="fr">Fractional rows</Grid>

// Medical dashboard grid
<Grid variant="responsive" gap="lg" rows="min">
  <Card variant="medical">Patient Info</Card>
  <Card variant="info">Test Results</Card>
  <Card variant="success">Treatment Plan</Card>
  <Card variant="warning">Alerts</Card>
</Grid>
```

### Spacing

Utility component for consistent spacing between elements.

```tsx
import { Spacing } from '@/shared/components/layout'

// Vertical spacing (default)
<Spacing variant="md">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Spacing>

// Horizontal spacing
<Spacing direction="horizontal" variant="lg">
  <button>Button 1</button>
  <button>Button 2</button>
  <button>Button 3</button>
</Spacing>

// Spacing variants
<Spacing variant="xs">Extra small spacing</Spacing>
<Spacing variant="sm">Small spacing</Spacing>
<Spacing variant="md">Medium spacing</Spacing>
<Spacing variant="lg">Large spacing</Spacing>
<Spacing variant="xl">Extra large spacing</Spacing>
<Spacing variant="2xl">2x large spacing</Spacing>
<Spacing variant="3xl">3x large spacing</Spacing>
```

### Section

Page section component with container and spacing options.

```tsx
import { Section } from '@/shared/components/layout'

// Basic usage
<Section>
  <h1>Section content</h1>
</Section>

// Container variants
<Section container="default">Standard section</Section>
<Section container="narrow">Narrow section</Section>
<Section container="wide">Wide section</Section>
<Section container="fluid">Fluid section</Section>

// Spacing variants
<Section spacing="none">No spacing</Section>
<Section spacing="xs">Extra small spacing</Section>
<Section spacing="sm">Small spacing</Section>
<Section spacing="md">Medium spacing</Section>
<Section spacing="lg">Large spacing</Section>
<Section spacing="xl">Extra large spacing</Section>
<Section spacing="2xl">2x large spacing</Section>
<Section spacing="3xl">3x large spacing</Section>

// Background variants
<Section background="none">No background</Section>
<Section background="subtle">Subtle background</Section>
<Section background="glass">Glass background</Section>

// Medical page section
<Section 
  container="default" 
  spacing="xl" 
  background="glass"
>
  <Container variant="narrow">
    <h1>Patient Dashboard</h1>
    <Grid variant="responsive" gap="lg">
      <Card variant="medical">Patient Overview</Card>
      <Card variant="info">Recent Activity</Card>
    </Grid>
  </Container>
</Section>
```

## Comprehensive Layout Examples

### Medical Dashboard Layout

```tsx
function MedicalDashboard() {
  return (
    <Section container="default" spacing="xl" background="glass">
      <Container variant="default" padding="lg">
        
        {/* Header */}
        <Flex justify="between" align="center" className="mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Patient Dashboard</h1>
            <p className="text-white/70">Overview of current cases</p>
          </div>
          <Flex gap="md">
            <Button variant="medical" size="lg">Add Patient</Button>
            <Button variant="outline" size="lg">Settings</Button>
          </Flex>
        </Flex>

        {/* Main Content Grid */}
        <BentoContainer layout="default" gap="lg">
          
          {/* Hero Card - Patient Overview */}
          <BentoCard 
            variant="medical" 
            grid="hero" 
            size="lg"
            title="Current Patient"
            subtitle="John Doe - Emergency Case"
            interactive
            glassIntensity="strong"
          >
            <PatientOverviewComponent />
          </BentoCard>

          {/* Vital Signs */}
          <BentoCard 
            variant="success" 
            grid="medium" 
            title="Vital Signs"
            subtitle="Real-time monitoring"
          >
            <VitalSignsChart />
          </BentoCard>

          {/* Test Results */}
          <BentoCard 
            variant="info" 
            grid="medium" 
            title="Test Results"
            subtitle="Latest lab work"
          >
            <TestResultsList />
          </BentoCard>

          {/* Alerts */}
          <BentoCard 
            variant="warning" 
            grid="small" 
            title="Alerts"
            subtitle="2 urgent items"
          >
            <AlertsList />
          </BentoCard>

          {/* Treatment Plan */}
          <BentoCard 
            variant="elevated" 
            grid="large" 
            title="Treatment Plan"
            subtitle="Current medications and procedures"
          >
            <TreatmentPlanComponent />
          </BentoCard>

          {/* Quick Actions */}
          <BentoCard 
            variant="subtle" 
            grid="small" 
            title="Quick Actions"
          >
            <Spacing variant="md">
              <Button variant="medical" size="sm" className="w-full">
                Update Vitals
              </Button>
              <Button variant="info" size="sm" className="w-full">
                Add Note
              </Button>
              <Button variant="success" size="sm" className="w-full">
                Complete Task
              </Button>
            </Spacing>
          </BentoCard>

        </BentoContainer>

      </Container>
    </Section>
  )
}
```

### Form Layout Example

```tsx
function PatientFormLayout() {
  return (
    <Container variant="narrow" padding="lg">
      
      {/* Form Header */}
      <Card variant="medical" size="lg" className="mb-8">
        <CardHeader>
          <CardTitle>New Patient Registration</CardTitle>
          <CardDescription>Enter patient information below</CardDescription>
        </CardHeader>
      </Card>

      {/* Form Content */}
      <Grid variant="twoCol" gap="lg">
        
        {/* Personal Information */}
        <Card variant="elevated" size="md">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <Spacing variant="lg">
              <Input variant="medical" size="lg" placeholder="Full Name" />
              <Input variant="medical" size="lg" placeholder="Date of Birth" />
              <Select>
                <SelectTrigger variant="medical" size="lg">
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </Spacing>
          </CardContent>
        </Card>

        {/* Medical Information */}
        <Card variant="elevated" size="md">
          <CardHeader>
            <CardTitle>Medical Information</CardTitle>
          </CardHeader>
          <CardContent>
            <Spacing variant="lg">
              <Input variant="medical" size="lg" placeholder="Insurance ID" />
              <Input variant="medical" size="lg" placeholder="Emergency Contact" />
              <Select>
                <SelectTrigger variant="medical" size="lg">
                  <SelectValue placeholder="Blood Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="a+">A+</SelectItem>
                  <SelectItem value="a-">A-</SelectItem>
                  <SelectItem value="b+">B+</SelectItem>
                  <SelectItem value="b-">B-</SelectItem>
                  <SelectItem value="o+">O+</SelectItem>
                  <SelectItem value="o-">O-</SelectItem>
                  <SelectItem value="ab+">AB+</SelectItem>
                  <SelectItem value="ab-">AB-</SelectItem>
                </SelectContent>
              </Select>
            </Spacing>
          </CardContent>
        </Card>

      </Grid>

      {/* Form Actions */}
      <Card variant="subtle" size="md" className="mt-8">
        <CardContent>
          <Flex justify="end" gap="md">
            <Button variant="outline" size="lg">Cancel</Button>
            <Button variant="medical" size="lg">Save Patient</Button>
          </Flex>
        </CardContent>
      </Card>

    </Container>
  )
}
```

## Variant Reference

### Card Variants

| Variant | Use Case | Appearance |
|---------|----------|------------|
| `default` | Standard content cards | Black/translucent background |
| `subtle` | Less prominent content | Light translucent background |
| `elevated` | Important content | Enhanced shadow and opacity |
| `interactive` | Clickable cards | Hover effects and cursor pointer |
| `featured` | Hero/featured content | Ring border and enhanced effects |
| `medical` | Clinical data | Sky blue theme |
| `success` | Success states | Green theme |
| `warning` | Warnings/cautions | Amber theme |
| `error` | Error states | Red theme |
| `info` | Information/tips | Blue theme |

### Layout Grid Reference

| Grid Variant | Responsive Behavior | Use Case |
|-------------|-------------------|----------|
| `responsive` | 1→2→3→4→6 cols | General content |
| `twoCol` | 1→2 cols | Side-by-side content |
| `threeCol` | 1→2→3 cols | Three-column layouts |
| `fourCol` | 1→2→4 cols | Four-column grids |
| `autoFit` | Auto-fit 280px min | Dynamic content |
| `autoFill` | Auto-fill 280px min | Flexible layouts |

### Size Reference

| Size | Padding | Use Case |
|------|---------|----------|
| `xs` | 12px | Compact interfaces |
| `sm` | 16px | Dense layouts |
| `md` | 24px | Standard spacing (default) |
| `lg` | 32px | Spacious layouts |
| `xl` | 40px | Hero sections |

## Accessibility Features

- **Focus Management**: Enhanced focus indicators on interactive elements
- **Keyboard Navigation**: Full keyboard support for all interactive components
- **Screen Reader Support**: Proper ARIA labels and semantic structure
- **Color Contrast**: High contrast variants for better visibility
- **Motion Preferences**: Respects user's reduced motion preferences

## Best Practices

1. **Consistent Spacing**: Use the unified gap and spacing system
2. **Responsive Design**: Always consider mobile-first responsive behavior
3. **Semantic Structure**: Use appropriate HTML elements and ARIA labels
4. **Glass Effects**: Use glass intensity appropriately for content hierarchy
5. **Interactive States**: Provide clear feedback for interactive elements
6. **Performance**: Optimize for smooth animations and interactions

## Migration Guide

If upgrading from previous layout components:

1. Update import statements to use unified components
2. Replace old layout props with new variant system
3. Update spacing props to use new gap/spacing variants
4. Test responsive behavior across different screen sizes
5. Verify accessibility features are working correctly

This unified layout system provides a comprehensive foundation for building consistent, accessible, and visually appealing layouts throughout the Clinical Case Compass application.