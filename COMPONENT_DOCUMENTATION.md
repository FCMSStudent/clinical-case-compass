# Clinical Case Compass - Component Documentation

## Overview

This document provides comprehensive documentation for all components in the Clinical Case Compass application, including design system components, feature components, and utility components.

## Table of Contents

1. [Design System](#design-system)
2. [Core Components](#core-components)
3. [Feature Components](#feature-components)
4. [Component Guidelines](#component-guidelines)
5. [Testing Guidelines](#testing-guidelines)
6. [Performance Guidelines](#performance-guidelines)

## Design System

### Theme System

The application uses a unified theme system with glassmorphic design principles.

```typescript
import { ThemeProvider } from '@/design-system/design-system';

// Wrap your application
<ThemeProvider>
  <App />
</ThemeProvider>
```

### Color System

```typescript
// Primary colors
const colors = {
  primary: {
    50: '#f0f9ff',
    500: '#3b82f6',
    900: '#1e3a8a'
  },
  glass: {
    light: 'rgba(255, 255, 255, 0.1)',
    medium: 'rgba(255, 255, 255, 0.2)',
    dark: 'rgba(0, 0, 0, 0.1)'
  }
};
```

### Typography

```typescript
// Usage example
<h1 className="text-4xl font-bold text-white">Main Heading</h1>
<p className="text-lg text-white/80">Body text</p>
```

## Core Components

### Button Component

**Location:** `src/components/ui/button.tsx`

```typescript
interface ButtonProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

// Usage
<Button variant="default" size="lg" onClick={handleClick}>
  Save Case
</Button>

<Button variant="outline" loading={isSubmitting}>
  {isSubmitting ? 'Saving...' : 'Save'}
</Button>
```

**Props:**
- `variant`: Visual style variant
- `size`: Size variant
- `disabled`: Disables the button
- `loading`: Shows loading state
- `children`: Button content
- `onClick`: Click handler

**Testing:**
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './button';

test('button handles click events', () => {
  const handleClick = vi.fn();
  render(<Button onClick={handleClick}>Click me</Button>);
  
  fireEvent.click(screen.getByRole('button'));
  expect(handleClick).toHaveBeenCalledOnce();
});
```

### Card Component

**Location:** `src/components/ui/card.tsx`

```typescript
interface CardProps {
  className?: string;
  children: React.ReactNode;
  variant?: 'default' | 'glass' | 'elevated';
}

// Usage
<Card variant="glass" className="p-6">
  <CardHeader>
    <CardTitle>Case Details</CardTitle>
  </CardHeader>
  <CardContent>
    {/* Card content */}
  </CardContent>
</Card>
```

**Features:**
- Glassmorphic design with blur effects
- Multiple variants for different contexts
- Responsive design
- Accessibility compliant

### Form Components

**Location:** `src/components/ui/form.tsx`

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
});

// Usage
function MyForm() {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
    },
  });

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </Form>
  );
}
```

## Feature Components

### CaseCard Component

**Location:** `src/features/cases/CaseCard.tsx`

```typescript
interface CaseCardProps {
  case: MedicalCase;
  onClick?: (caseId: string) => void;
  className?: string;
  variant?: 'default' | 'compact';
}

// Usage
<CaseCard 
  case={medicalCase} 
  onClick={handleCaseSelect}
  variant="compact"
  className="mb-4"
/>
```

**Features:**
- Displays case summary information
- Interactive hover and click states
- Tag system with color coding
- Responsive layout
- Accessibility support

**Testing Location:** `src/features/cases/CaseCard.test.tsx`

### InteractiveBodyDiagram Component

**Location:** `src/features/cases/InteractiveBodyDiagram.tsx`

```typescript
interface InteractiveBodyDiagramProps {
  selectedParts: string[];
  onPartSelect: (partId: string) => void;
  disabled?: boolean;
  variant?: 'male' | 'female';
}

// Usage
<InteractiveBodyDiagram
  selectedParts={selectedBodyParts}
  onPartSelect={handleBodyPartSelect}
  variant="male"
/>
```

**Features:**
- SVG-based interactive body diagram
- Multi-select capability
- Gender variants
- Tooltips for body parts
- Touch-friendly for mobile

### Dashboard Components

**Location:** `src/features/dashboard/components/`

#### StatCards
```typescript
<StatCards
  stats={[
    { label: 'Total Cases', value: 42, trend: '+12%' },
    { label: 'Completed', value: 38, trend: '+8%' },
  ]}
/>
```

#### RecentActivity
```typescript
<RecentActivity
  activities={recentActivities}
  maxItems={5}
  showTimestamps={true}
/>
```

## Component Guidelines

### Naming Conventions

1. **Components**: PascalCase (e.g., `CaseCard`, `InteractiveBodyDiagram`)
2. **Props**: camelCase (e.g., `onClick`, `selectedParts`)
3. **Files**: PascalCase for components, kebab-case for utilities
4. **Test files**: `ComponentName.test.tsx`

### Component Structure

```typescript
// 1. Imports
import React from 'react';
import { cn } from '@/lib/utils';

// 2. Types
interface ComponentProps {
  // Props definition
}

// 3. Component
export const Component: React.FC<ComponentProps> = ({
  prop1,
  prop2,
  ...props
}) => {
  // Component logic
  
  return (
    <div className={cn("base-classes", props.className)}>
      {/* Component JSX */}
    </div>
  );
};

// 4. Display name (for debugging)
Component.displayName = 'Component';
```

### Props Guidelines

1. **Required props**: Should have clear TypeScript types
2. **Optional props**: Use `?` and provide sensible defaults
3. **Event handlers**: Prefix with `on` (e.g., `onClick`, `onSubmit`)
4. **Boolean props**: Use positive names (e.g., `disabled` not `enabled`)
5. **Render props**: Use function type with clear return type

### Styling Guidelines

1. **Use Tailwind CSS**: Prefer utility classes over custom CSS
2. **Responsive design**: Use responsive prefixes (`sm:`, `md:`, `lg:`)
3. **Dark mode**: Components should work in both light and dark themes
4. **Glassmorphic effects**: Use predefined glass utility classes
5. **Consistent spacing**: Use Tailwind spacing scale

### Accessibility Guidelines

1. **ARIA labels**: Provide descriptive labels for interactive elements
2. **Keyboard navigation**: Support Tab, Enter, and Space keys
3. **Focus management**: Clear focus indicators
4. **Screen readers**: Use semantic HTML and ARIA attributes
5. **Color contrast**: Ensure WCAG AA compliance

## Testing Guidelines

### Test Structure

1. **Co-location**: Tests should be next to components (`Component.test.tsx`)
2. **Test naming**: Descriptive test names that explain behavior
3. **Test organization**: Group related tests with `describe` blocks
4. **Setup**: Use `beforeEach` for common setup

### Testing Patterns

```typescript
// Component testing template
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { Component } from './Component';

describe('Component', () => {
  const defaultProps = {
    // Default props
  };

  const renderComponent = (props = {}) => {
    return render(<Component {...defaultProps} {...props} />);
  };

  it('renders correctly with default props', () => {
    renderComponent();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('handles user interactions', () => {
    const onClickMock = vi.fn();
    renderComponent({ onClick: onClickMock });
    
    fireEvent.click(screen.getByRole('button'));
    expect(onClickMock).toHaveBeenCalledOnce();
  });
});
```

### What to Test

1. **Rendering**: Component renders without crashing
2. **Props**: Component responds to prop changes
3. **User interactions**: Click, keyboard, form inputs
4. **State changes**: Component state updates correctly
5. **Edge cases**: Error states, empty data, loading states

### Mocking Guidelines

1. **External dependencies**: Mock API calls, router, external libraries
2. **Child components**: Mock complex child components
3. **Browser APIs**: Mock localStorage, fetch, etc.
4. **Time-dependent**: Mock dates and timers

## Performance Guidelines

### Component Optimization

1. **React.memo**: Use for expensive components that render frequently
2. **useMemo**: Memoize expensive calculations
3. **useCallback**: Memoize event handlers passed to children
4. **Lazy loading**: Use `React.lazy()` for route-level components
5. **Bundle splitting**: Keep feature components in separate chunks

### Bundle Optimization

1. **Tree shaking**: Import only what you need
2. **Code splitting**: Split routes and heavy features
3. **Image optimization**: Use modern formats and proper sizing
4. **Chunk optimization**: Configure Vite for optimal chunks

### Runtime Performance

1. **Avoid inline objects**: Define objects outside render or use useMemo
2. **Minimize re-renders**: Use appropriate dependency arrays
3. **Virtual scrolling**: For large lists
4. **Debounce inputs**: For search and filter inputs

## Best Practices

### Development Workflow

1. **TypeScript first**: Define types before implementation
2. **Test-driven**: Write tests alongside or before components
3. **Documentation**: Document complex components and APIs
4. **Performance**: Consider performance implications early
5. **Accessibility**: Build accessibility in from the start

### Code Quality

1. **ESLint**: Follow configured linting rules
2. **Prettier**: Use consistent formatting
3. **TypeScript strict**: Enable strict mode for better type safety
4. **Component composition**: Favor composition over complex components
5. **Single responsibility**: Each component should have a clear purpose

### Maintenance

1. **Version control**: Meaningful commit messages
2. **Change logs**: Document breaking changes
3. **Migration guides**: Provide upgrade paths for component changes
4. **Deprecation**: Graceful deprecation of old APIs
5. **Monitoring**: Track component usage and performance

## Additional Resources

- [Design System Guide](./src/lib/DESIGN_SYSTEM_GUIDE.md)
- [Typography Guide](./src/lib/TYPOGRAPHY_GUIDE.md)
- [Testing Guide](./TESTING_GUIDE.md)
- [Performance Guide](./PERFORMANCE_GUIDE.md)

---

This documentation is a living document and should be updated as components evolve. For questions or suggestions, please reach out to the development team.