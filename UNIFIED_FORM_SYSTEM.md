# Unified Form System

## Overview

The Clinical Case Compass application now features a unified form system with consistent design, variants, sizing, and glass morphism effects across all form elements. This system ensures visual consistency, improved accessibility, and seamless user experience.

## Core Design Principles

- **Glass Morphism**: Apple-inspired liquid glass effects with backdrop blur, shadows, and translucency
- **Consistent Variants**: All form elements share the same semantic variants (default, subtle, elevated, medical, success, warning, error, info)
- **Unified Sizing**: Consistent size system (xs, sm, md, lg, xl) across all components
- **Enhanced Accessibility**: Proper focus states, ARIA attributes, and keyboard navigation
- **Framer Motion Integration**: Smooth animations and micro-interactions
- **Haptic Feedback**: Subtle vibration feedback on supported devices

## Form Components

### Button

Enhanced button component with consistent variants and improved glass effects.

```tsx
import { Button } from '@/shared/components/button'

// Basic usage
<Button>Click me</Button>

// Variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="success">Success</Button>
<Button variant="warning">Warning</Button>
<Button variant="error">Error</Button>
<Button variant="info">Info</Button>
<Button variant="medical">Medical</Button>
<Button variant="critical">Critical</Button>

// Sizes
<Button size="xs">Extra Small</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>
<Button size="icon">🏠</Button>

// States
<Button loading>Loading...</Button>
<Button disabled>Disabled</Button>

// Glass intensity
<Button glassIntensity="subtle">Subtle Glass</Button>
<Button glassIntensity="medium">Medium Glass</Button>
<Button glassIntensity="strong">Strong Glass</Button>
```

### Input

Enhanced input component with icon support, state management, and glass effects.

```tsx
import { Input } from '@/shared/components/input'
import { Search, User } from 'lucide-react'

// Basic usage
<Input placeholder="Enter text..." />

// Variants
<Input variant="default" placeholder="Default input" />
<Input variant="subtle" placeholder="Subtle input" />
<Input variant="elevated" placeholder="Elevated input" />
<Input variant="medical" placeholder="Medical input" />
<Input variant="success" placeholder="Success input" />
<Input variant="warning" placeholder="Warning input" />
<Input variant="error" placeholder="Error input" />
<Input variant="info" placeholder="Info input" />

// Sizes
<Input size="xs" placeholder="Extra small" />
<Input size="sm" placeholder="Small" />
<Input size="md" placeholder="Medium" />
<Input size="lg" placeholder="Large" />
<Input size="xl" placeholder="Extra large" />

// With icons
<Input leftIcon={<User className="h-4 w-4" />} placeholder="Username" />
<Input rightIcon={<Search className="h-4 w-4" />} placeholder="Search..." />

// States
<Input error placeholder="Error state" />
<Input success placeholder="Success state" />
<Input warning placeholder="Warning state" />
<Input disabled placeholder="Disabled" />
```

### Select

Enhanced select component with consistent variants and improved dropdown styling.

```tsx
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/shared/components/select'

// Basic usage
<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select an option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
    <SelectItem value="option3">Option 3</SelectItem>
  </SelectContent>
</Select>

// Variants
<Select>
  <SelectTrigger variant="default">
    <SelectValue placeholder="Default select" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="item1">Item 1</SelectItem>
  </SelectContent>
</Select>

<Select>
  <SelectTrigger variant="medical" size="lg">
    <SelectValue placeholder="Medical select" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="condition1">Condition 1</SelectItem>
    <SelectItem value="condition2">Condition 2</SelectItem>
  </SelectContent>
</Select>
```

### Checkbox

Enhanced checkbox component with consistent variants and smooth animations.

```tsx
import { Checkbox } from '@/shared/components/checkbox'

// Basic usage
<Checkbox id="terms" />

// Variants
<Checkbox variant="default" />
<Checkbox variant="subtle" />
<Checkbox variant="elevated" />
<Checkbox variant="medical" />
<Checkbox variant="success" />
<Checkbox variant="warning" />
<Checkbox variant="error" />
<Checkbox variant="info" />

// Sizes
<Checkbox size="xs" />
<Checkbox size="sm" />
<Checkbox size="md" />
<Checkbox size="lg" />
<Checkbox size="xl" />

// With labels
<div className="flex items-center space-x-2">
  <Checkbox id="newsletter" variant="medical" />
  <label htmlFor="newsletter">Subscribe to newsletter</label>
</div>
```

### RadioGroup

Enhanced radio group component with consistent variants and glass effects.

```tsx
import { RadioGroup, RadioGroupItem } from '@/shared/components/radio-group'

// Basic usage
<RadioGroup defaultValue="option1">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option1" id="r1" />
    <label htmlFor="r1">Option 1</label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option2" id="r2" />
    <label htmlFor="r2">Option 2</label>
  </div>
</RadioGroup>

// Variants
<RadioGroup defaultValue="low">
  <div className="flex items-center space-x-2">
    <RadioGroupItem variant="medical" size="lg" value="low" id="priority-low" />
    <label htmlFor="priority-low">Low Priority</label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem variant="warning" size="lg" value="medium" id="priority-medium" />
    <label htmlFor="priority-medium">Medium Priority</label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem variant="error" size="lg" value="high" id="priority-high" />
    <label htmlFor="priority-high">High Priority</label>
  </div>
</RadioGroup>
```

### Switch

Enhanced switch component with consistent variants and smooth transitions.

```tsx
import { Switch } from '@/shared/components/switch'

// Basic usage
<Switch />

// Variants
<Switch variant="default" />
<Switch variant="subtle" />
<Switch variant="elevated" />
<Switch variant="medical" />
<Switch variant="success" />
<Switch variant="warning" />
<Switch variant="error" />
<Switch variant="info" />

// Sizes
<Switch size="xs" />
<Switch size="sm" />
<Switch size="md" />
<Switch size="lg" />
<Switch size="xl" />

// With labels
<div className="flex items-center space-x-2">
  <Switch id="notifications" variant="medical" size="lg" />
  <label htmlFor="notifications">Enable notifications</label>
</div>
```

### Slider

Enhanced slider component with variants, tooltips, and glass effects.

```tsx
import { Slider } from '@/shared/components/slider'

// Basic usage
<Slider defaultValue={[50]} max={100} step={1} />

// Variants
<Slider variant="default" defaultValue={[25]} />
<Slider variant="medical" defaultValue={[50]} />
<Slider variant="success" defaultValue={[75]} />
<Slider variant="warning" defaultValue={[60]} />
<Slider variant="error" defaultValue={[85]} />

// Sizes
<Slider size="xs" defaultValue={[30]} />
<Slider size="sm" defaultValue={[40]} />
<Slider size="md" defaultValue={[50]} />
<Slider size="lg" defaultValue={[60]} />
<Slider size="xl" defaultValue={[70]} />

// With tooltip
<Slider 
  defaultValue={[50]} 
  showTooltip 
  tooltipValue="50%" 
  variant="medical" 
  size="lg" 
/>

// Range slider
<Slider defaultValue={[20, 80]} max={100} step={1} />
```

## Form Integration

### Using with React Hook Form

```tsx
import { useForm } from 'react-hook-form'
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/shared/components/form'
import { Button } from '@/shared/components/button'
import { Input } from '@/shared/components/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/select'

function MedicalForm() {
  const form = useForm({
    defaultValues: {
      patientName: '',
      condition: '',
      priority: 'medium',
      sendNotifications: false
    }
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="patientName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Patient Name</FormLabel>
              <FormControl>
                <Input 
                  variant="medical" 
                  size="lg" 
                  placeholder="Enter patient name" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="condition"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Medical Condition</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger variant="medical" size="lg">
                    <SelectValue placeholder="Select a condition" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="cardiology">Cardiology</SelectItem>
                  <SelectItem value="neurology">Neurology</SelectItem>
                  <SelectItem value="orthopedics">Orthopedics</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" variant="medical" size="lg">
          Submit Medical Form
        </Button>
      </form>
    </Form>
  )
}
```

## Variant Reference

| Variant | Use Case | Color Scheme |
|---------|----------|--------------|
| `default` | Standard form elements | White/translucent |
| `subtle` | Less prominent elements | Light white/translucent |
| `elevated` | Important form elements | Enhanced white/translucent |
| `medical` | Clinical/medical data | Sky blue theme |
| `success` | Success states, confirmations | Green theme |
| `warning` | Warnings, cautions | Amber theme |
| `error` | Error states, validation | Red theme |
| `info` | Information, hints | Blue theme |

## Size Reference

| Size | Height | Use Case |
|------|--------|----------|
| `xs` | 24px (h-6) | Compact interfaces |
| `sm` | 32px (h-8) | Dense layouts |
| `md` | 40px (h-10) | Standard size (default) |
| `lg` | 48px (h-12) | Prominent elements |
| `xl` | 56px (h-14) | Hero elements |

## Accessibility Features

- **Focus Management**: Enhanced focus rings with glass effects
- **Keyboard Navigation**: Full keyboard support for all components
- **Screen Reader Support**: Proper ARIA labels and descriptions
- **Color Contrast**: High contrast variants for better visibility
- **Motion Preferences**: Respects user's motion preferences

## Glass Effects

All components feature Apple-inspired liquid glass effects:

- **Backdrop Blur**: Smooth background blur for depth
- **Translucent Backgrounds**: Semi-transparent surfaces
- **Inner Highlights**: Subtle inner light effects
- **Soft Shadows**: Layered shadow system for depth
- **Smooth Transitions**: 300ms easing for interactions

## Best Practices

1. **Consistent Variants**: Use the same variant family within related form sections
2. **Appropriate Sizing**: Use consistent sizes for related elements
3. **State Communication**: Use success/warning/error variants to communicate state
4. **Medical Context**: Use `medical` variant for clinical data inputs
5. **Glass Intensity**: Adjust glass intensity based on content hierarchy
6. **Accessibility**: Always provide proper labels and descriptions

## Migration Guide

If upgrading from the previous form system:

1. Update import statements to use the new unified components
2. Replace old variant names with new semantic variants
3. Update size props to use the new unified sizing system
4. Add appropriate glass intensity props where needed
5. Test focus states and accessibility features

## Examples in Context

### Patient Information Form
```tsx
<div className="space-y-6">
  <Input 
    variant="medical" 
    size="lg" 
    placeholder="Patient ID" 
    leftIcon={<User className="h-5 w-5" />}
  />
  
  <Select>
    <SelectTrigger variant="medical" size="lg">
      <SelectValue placeholder="Department" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="cardiology">Cardiology</SelectItem>
      <SelectItem value="emergency">Emergency</SelectItem>
    </SelectContent>
  </Select>
  
  <div className="flex items-center space-x-2">
    <Switch variant="medical" size="lg" />
    <Label>Critical case</Label>
  </div>
</div>
```

### Settings Panel
```tsx
<div className="space-y-4">
  <div className="flex items-center justify-between">
    <Label>Notifications</Label>
    <Switch variant="subtle" />
  </div>
  
  <div className="space-y-2">
    <Label>Theme Preference</Label>
    <RadioGroup defaultValue="auto">
      <div className="flex items-center space-x-2">
        <RadioGroupItem variant="subtle" value="light" />
        <Label>Light</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem variant="subtle" value="dark" />
        <Label>Dark</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem variant="subtle" value="auto" />
        <Label>Auto</Label>
      </div>
    </RadioGroup>
  </div>
</div>
```

This unified form system provides a solid foundation for building consistent, accessible, and visually appealing forms throughout the Clinical Case Compass application.