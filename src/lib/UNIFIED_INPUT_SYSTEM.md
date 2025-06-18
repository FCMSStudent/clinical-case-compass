# Unified Input System

## Overview

The Unified Input System provides consistent, glassmorphic styling for all text inputs and textareas across the Clinical Case Compass application. This system ensures visual consistency, improved accessibility, and better user experience.

## Features

- **Glassmorphic Design**: Consistent backdrop blur and transparency effects
- **Multiple Variants**: Different styles for different use cases
- **Size Options**: XS, SM, MD, LG, XL sizes
- **State Management**: Error, success, disabled states
- **Icon Support**: Left and right icon positioning
- **Accessibility**: Proper ARIA attributes and focus management
- **Animation**: Smooth transitions and focus effects
- **Responsive**: Works across all device sizes

## Components

### Input Component

The main `Input` component located at `src/components/ui/input.tsx`.

```tsx
import { Input } from "@/components/ui/input";

<Input
  placeholder="Enter text..."
  variant="default"
  size="md"
  leftIcon={<Mail className="h-4 w-4" />}
  rightIcon={<User className="h-4 w-4" />}
  error={hasError}
  success={isValid}
  disabled={isLoading}
/>
```

### Textarea Component

The `Textarea` component located at `src/components/ui/textarea.tsx`.

```tsx
import { Textarea } from "@/components/ui/textarea";

<Textarea
  placeholder="Enter long text..."
  variant="medical"
  size="lg"
  error={hasError}
  success={isValid}
/>
```

## Variants

### Default Variant
- **Use Case**: General purpose inputs
- **Style**: Standard glassmorphic with white/10 background
- **Focus**: Blue ring with medium opacity

```tsx
<Input variant="default" placeholder="Default input" />
```

### Subtle Variant
- **Use Case**: Less prominent inputs, secondary information
- **Style**: Lighter background (white/5) with subtle borders
- **Focus**: Lighter blue ring

```tsx
<Input variant="subtle" placeholder="Subtle input" />
```

### Elevated Variant
- **Use Case**: Important inputs, primary actions
- **Style**: Stronger background (white/15) with shadow
- **Focus**: Stronger blue ring with shadow enhancement

```tsx
<Input variant="elevated" placeholder="Important input" />
```

### Medical Variant
- **Use Case**: Clinical data, patient information
- **Style**: Blue-tinted background with medical theming
- **Focus**: Blue ring matching medical theme

```tsx
<Input variant="medical" placeholder="Patient data" />
```

### Error Variant
- **Use Case**: Validation errors
- **Style**: Red-tinted background and borders
- **Focus**: Red ring for error state

```tsx
<Input error={true} placeholder="Error input" />
```

### Success Variant
- **Use Case**: Validated inputs
- **Style**: Green-tinted background and borders
- **Focus**: Green ring for success state

```tsx
<Input success={true} placeholder="Valid input" />
```

## Sizes

| Size | Height | Use Case |
|------|--------|----------|
| `xs` | 24px | Compact spaces, dense layouts |
| `sm` | 32px | Secondary inputs, search bars |
| `md` | 40px | **Default** - Most common use |
| `lg` | 48px | Primary forms, important inputs |
| `xl` | 56px | Hero sections, prominent actions |

```tsx
<Input size="xs" placeholder="Compact" />
<Input size="sm" placeholder="Small" />
<Input size="md" placeholder="Medium (default)" />
<Input size="lg" placeholder="Large" />
<Input size="xl" placeholder="Extra large" />
```

## Icon Support

### Left Icons
Icons positioned on the left side of the input, commonly used for input type indicators.

```tsx
<Input
  leftIcon={<Mail className="h-4 w-4" />}
  placeholder="Enter email"
/>
```

### Right Icons
Icons positioned on the right side, commonly used for actions like show/hide password.

```tsx
<Input
  type="password"
  rightIcon={
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="hover:opacity-100 transition-colors"
    >
      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
    </button>
  }
/>
```

## State Management

### Error State
Automatically applies error styling when `error={true}` is passed.

```tsx
<Input
  error={!!fieldState.error}
  placeholder="This will show error styling"
/>
```

### Success State
Applies success styling when `success={true}` is passed.

```tsx
<Input
  success={isValid}
  placeholder="This will show success styling"
/>
```

### Disabled State
Standard HTML disabled attribute with consistent styling.

```tsx
<Input
  disabled={isLoading}
  placeholder="Disabled input"
/>
```

## Usage Examples

### Authentication Forms
```tsx
<FormField
  control={form.control}
  name="email"
  render={({ field, fieldState }) => (
    <FormItem>
      <FormLabel>Email</FormLabel>
      <FormControl>
        <Input
          {...field}
          type="email"
          placeholder="Enter your email"
          variant="elevated"
          size="lg"
          leftIcon={<Mail className="h-5 w-5" />}
          error={!!fieldState.error}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
```

### Medical Data Entry
```tsx
<FormField
  control={form.control}
  name="patientName"
  render={({ field, fieldState }) => (
    <FormItem>
      <FormControl>
        <Input
          {...field}
          placeholder="Patient name"
          variant="medical"
          leftIcon={<User className="h-4 w-4" />}
          error={!!fieldState.error}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
```

### Clinical Notes
```tsx
<FormField
  control={form.control}
  name="medicalHistory"
  render={({ field, fieldState }) => (
    <FormItem>
      <FormControl>
        <Textarea
          {...field}
          placeholder="Enter medical history..."
          variant="medical"
          size="lg"
          error={!!fieldState.error}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
```

## Migration Guide

### From Custom Styling
Replace custom className-based styling with variant props:

```tsx
// Before
<Input className="border pl-12 h-12 rounded-xl transition-all duration-300" />

// After
<Input variant="elevated" size="lg" leftIcon={<Icon />} />
```

### From Inline Styles
Replace inline styles with variant props:

```tsx
// Before
<Input style={{ backgroundColor: 'rgba(255,255,255,0.1)' }} />

// After
<Input variant="default" />
```

### From Multiple Components
Consolidate different input components to use the unified system:

```tsx
// Before
<CustomInput />
<StyledInput />
<GlassInput />

// After
<Input variant="default" />
<Input variant="elevated" />
<Input variant="subtle" />
```

## Best Practices

1. **Use Appropriate Variants**: Choose variants based on context and importance
2. **Consistent Sizing**: Use `lg` for primary forms, `md` for secondary
3. **Icon Consistency**: Use consistent icon sizes (h-4 w-4 for inputs, h-5 w-5 for forms)
4. **Error Handling**: Always pass error state from form validation
5. **Accessibility**: Include proper labels and ARIA attributes
6. **Responsive Design**: Test across different screen sizes

## Accessibility Features

- Proper focus management with visible focus rings
- ARIA attributes for screen readers
- Keyboard navigation support
- Reduced motion support for animations
- High contrast mode compatibility
- Proper color contrast ratios

## Performance Considerations

- CSS-in-JS with class-variance-authority for optimal bundle size
- Minimal re-renders with proper prop handling
- Efficient animation with Framer Motion
- Lazy loading of icon components

## Troubleshooting

### Common Issues

1. **Icons not showing**: Ensure proper icon sizing and positioning
2. **Focus ring missing**: Check if focus-visible styles are being overridden
3. **Inconsistent styling**: Verify variant prop is being passed correctly
4. **Animation not working**: Check if Framer Motion is properly installed

### Debug Tips

- Use browser dev tools to inspect applied classes
- Check for CSS specificity conflicts
- Verify all required dependencies are installed
- Test with different variants and sizes

## Future Enhancements

- Additional variants for specific use cases
- Custom color schemes
- Advanced validation states
- Integration with form libraries
- Enhanced animation options 