# Apple-Inspired Typography System

## Overview

This typography system is based on Apple's Human Interface Guidelines (HIG) and provides a comprehensive set of typographic styles that automatically use San Francisco fonts on Apple devices while maintaining excellent readability across all platforms.

## Font Stack

### Sans Serif (Primary)
```css
font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif
```

**Benefits:**
- Automatically uses San Francisco on Apple devices
- Falls back gracefully to system fonts on other platforms
- Provides native app feel on macOS and iOS
- Maintains consistency across different operating systems

### Monospace (Code & Numbers)
```css
font-family: "SF Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace
```

**Use cases:**
- Medical measurements and lab results
- Code snippets
- Numerical data requiring alignment
- Technical specifications

## Typographic Hierarchy

### Core Styles (Apple HIG Inspired)

| Style | Size | Weight | Line Height | Use Case |
|-------|------|--------|-------------|----------|
| `largeTitle` | 34pt | Semibold | Tight | Navigation titles, hero text |
| `title` | 28pt | Semibold | Tight | Section headers, important titles |
| `headline` | 17pt | Semibold | Snug | Card titles, prominent labels |
| `body` | 17pt | Regular | Relaxed | Main content, descriptions |
| `callout` | 16pt | Regular | Relaxed | Highlighted content, notes |
| `subheadline` | 15pt | Regular | Normal | Secondary content |
| `footnote` | 13pt | Regular | Normal | Additional information |
| `caption1` | 12pt | Regular | Normal | Small labels, metadata |
| `caption2` | 11pt | Regular | Tight | Fine details |

### Font Weights

| Weight | Value | Usage |
|--------|-------|-------|
| Regular | 400 | Body text, captions, general content |
| Medium | 500 | Labels, emphasis, form elements |
| Semibold | 600 | Headings, important text, navigation |
| Bold | 700 | Large titles, critical information |

## Medical Typography

### Specialized Medical Styles

```typescript
// Patient information
patientName: "text-2xl md:text-3xl font-semibold leading-tight tracking-[-0.01em]"

// Medical conditions
diagnosis: "text-xl md:text-2xl font-semibold leading-snug tracking-[0.01em]"

// Vital signs with monospace for numbers
vitals: "text-lg md:text-xl font-mono tabular-nums font-medium leading-snug"

// Lab results with precision
labResults: "text-base md:text-lg font-mono tabular-nums font-normal leading-relaxed"

// Clinical documentation
clinicalNotes: "text-base md:text-lg font-normal leading-relaxed tracking-[0.01em]"

// Medication information
medication: "text-sm md:text-base font-medium leading-normal"

// Dosage with monospace
dosage: "text-xs md:text-sm font-mono tabular-nums font-normal leading-normal"

// Status indicators
status: "text-xs font-medium leading-tight tracking-[0.025em]"
```

## Component Typography

### UI Component Styles

```typescript
// Navigation
navTitle: "text-lg md:text-xl font-semibold leading-snug tracking-[0.01em]"
navItem: "text-base font-medium leading-normal tracking-[0.01em]"

// Buttons
buttonLarge: "text-base md:text-lg font-medium leading-none tracking-[0.01em]"
buttonDefault: "text-sm md:text-base font-medium leading-none tracking-[0.01em]"
buttonSmall: "text-xs md:text-sm font-medium leading-none tracking-[0.025em]"

// Forms
label: "text-sm md:text-base font-medium leading-none tracking-[0.01em]"
input: "text-base md:text-lg font-normal leading-relaxed tracking-[0.01em]"

// Cards
cardTitle: "text-lg md:text-xl font-semibold leading-snug tracking-[0.01em]"
cardBody: "text-base md:text-lg font-normal leading-relaxed tracking-[0.01em]"
cardCaption: "text-xs md:text-sm font-normal leading-normal tracking-[0.025em]"

// Tables
tableHeader: "text-sm md:text-base font-semibold leading-none tracking-[0.01em]"
tableCell: "text-sm md:text-base font-normal leading-normal tracking-[0.01em]"

// Alerts
alertTitle: "text-base md:text-lg font-semibold leading-snug tracking-[0.01em]"
alertBody: "text-sm md:text-base font-normal leading-relaxed tracking-[0.01em]"
```

## Status Typography

### Color-Coded Status Styles

```typescript
// Status indicators with appropriate weights
critical: "font-semibold text-red-500"
warning: "font-medium text-amber-500"
success: "font-medium text-green-500"
info: "font-medium text-blue-500"
neutral: "font-normal text-gray-500"
```

## Responsive Typography

### Fluid Scaling

```typescript
// Hero text with fluid scaling
hero: "text-3xl md:text-4xl lg:text-6xl xl:text-7xl"

// Display text
display: "text-2xl md:text-3xl lg:text-4xl xl:text-5xl"

// Section headings
h1: "text-2xl md:text-3xl lg:text-4xl"
h2: "text-xl md:text-2xl lg:text-3xl"
h3: "text-lg md:text-xl lg:text-2xl"
h4: "text-base md:text-lg lg:text-xl"

// Body text with fluid scaling
body: "text-sm md:text-base lg:text-lg"
bodyLarge: "text-base md:text-lg lg:text-xl"

// Caption and small text
caption: "text-xs md:text-sm"
small: "text-xs"
```

## Medical Context Functions

### Status-Based Styling

```typescript
// Vital signs with status colors
vitalSignsText('normal')    // Returns: "text-green-500 font-medium"
vitalSignsText('elevated')  // Returns: "text-amber-500 font-medium"
vitalSignsText('critical')  // Returns: "text-red-500 font-medium"

// Medical priority levels
medicalPriorityText('low')     // Returns: "text-green-500 font-semibold"
medicalPriorityText('medium')  // Returns: "text-amber-500 font-semibold"
medicalPriorityText('high')    // Returns: "text-orange-500 font-semibold"
medicalPriorityText('urgent')  // Returns: "text-red-500 font-semibold"

// Clinical status
clinicalStatusText('stable')     // Returns: "text-green-500 font-medium"
clinicalStatusText('monitoring') // Returns: "text-amber-500 font-medium"
clinicalStatusText('acute')      // Returns: "text-red-500 font-medium"
clinicalStatusText('chronic')    // Returns: "text-blue-500 font-medium"

// Treatment status
treatmentStatusText('complete')  // Returns: "text-green-500 font-semibold"
treatmentStatusText('ongoing')   // Returns: "text-blue-500 font-semibold"
treatmentStatusText('pending')   // Returns: "text-amber-500 font-semibold"
treatmentStatusText('emergency') // Returns: "text-red-500 font-semibold"
```

## Usage Examples

### Basic Typography

```tsx
import { typography } from '@/lib/typography'

// Large title for hero sections
<h1 className={typography.largeTitle + " text-white"}>
  Welcome to Clinical Case Compass
</h1>

// Body text for content
<p className={typography.body + " text-white/80"}>
  This is the primary text style for content with comfortable line height.
</p>

// Caption for metadata
<p className={typography.caption1 + " text-white/60"}>
  Last updated: 2 hours ago
</p>
```

### Medical Content

```tsx
import { medicalTypography } from '@/lib/typography'

// Patient name
<h2 className={medicalTypography.patientName + " text-white"}>
  John Smith, 45
</h2>

// Diagnosis
<h3 className={medicalTypography.diagnosis + " text-white"}>
  Acute Myocardial Infarction
</h3>

// Vital signs
<p className={medicalTypography.vitals + " text-white"}>
  BP: 140/90 mmHg
</p>

// Clinical notes
<p className={medicalTypography.clinicalNotes + " text-white/90"}>
  Patient presents with chest pain radiating to left arm...
</p>
```

### Component Usage

```tsx
import { componentTypography } from '@/lib/typography'

// Button text
<button className={componentTypography.buttonDefault + " bg-blue-500 text-white px-4 py-2 rounded"}>
  Save Changes
</button>

// Form label
<label className={componentTypography.label + " text-white"}>
  Patient Name
</label>

// Card title
<h4 className={componentTypography.cardTitle + " text-white"}>
  Recent Cases
</h4>
```

### Status Indicators

```tsx
import { statusTypography, vitalSignsText } from '@/lib/typography'

// Status badge
<span className={statusTypography.success + " bg-green-500/20 px-2 py-1 rounded"}>
  Stable
</span>

// Vital signs with status
<p className={vitalSignsText('normal') + " font-mono"}>
  Heart Rate: 72 bpm
</p>
```

## Accessibility Features

### High Contrast Variants

```typescript
// Accessible typography with background highlights
accessibleTypography.critical: "font-bold text-red-400 bg-red-900/20 px-2 py-1 rounded"
accessibleTypography.warning: "font-semibold text-amber-400 bg-amber-900/20 px-2 py-1 rounded"
accessibleTypography.success: "font-semibold text-green-400 bg-green-900/20 px-2 py-1 rounded"
accessibleTypography.vital: "font-medium font-mono text-lg bg-slate-800/50 px-2 py-1 rounded"
```

### Responsive Design

- All typography scales appropriately across different screen sizes
- Maintains readability on mobile devices
- Supports user zoom preferences
- Uses relative units (rem) for accessibility

## Best Practices

### 1. Font Weight Hierarchy
- Use Semibold (600) for headings and important text
- Use Medium (500) for labels and emphasis
- Use Regular (400) for body text and captions
- Avoid extremely heavy weights (800+) for UI text

### 2. Line Height and Spacing
- Use relaxed line height (1.375-1.5) for body text
- Use tight line height (1.0-1.2) for headings
- Maintain consistent letter spacing for readability
- Add appropriate vertical spacing between text elements

### 3. Medical Content
- Use monospace fonts for numerical data
- Apply appropriate status colors for medical information
- Maintain clear hierarchy for patient information
- Use consistent terminology and formatting

### 4. Responsive Design
- Test typography across different screen sizes
- Ensure text remains readable on mobile devices
- Use fluid typography for large headings
- Maintain proper contrast ratios

### 5. Performance
- System fonts load faster than web fonts
- San Francisco is optimized for Apple devices
- Fallback fonts ensure consistent rendering
- Minimal font stack reduces loading time

## Migration Guide

### From Old Typography System

```typescript
// Old
import { typography } from '@/lib/typography'
<h1 className={typography.h1}>Title</h1>

// New
import { typography } from '@/lib/typography'
<h1 className={typography.largeTitle}>Title</h1>
```

### Component Updates

```typescript
// Old
import { typo } from '@/lib/typography'
<button className={typo.button}>Button</button>

// New
import { componentTypography } from '@/lib/typography'
<button className={componentTypography.buttonDefault}>Button</button>
```

### Medical Text Updates

```typescript
// Old
import { medicalText } from '@/lib/typography'
<span className={medicalText.critical}>Critical</span>

// New
import { statusTypography } from '@/lib/typography'
<span className={statusTypography.critical}>Critical</span>
```

## Browser Support

- **Apple Devices**: Uses San Francisco fonts natively
- **Windows**: Falls back to Segoe UI
- **Android**: Falls back to Roboto
- **Linux**: Falls back to system fonts
- **All Platforms**: Graceful degradation to Arial

## Performance Benefits

1. **Faster Loading**: System fonts load instantly
2. **Better Performance**: No web font downloads required
3. **Native Feel**: Matches OS typography on Apple devices
4. **Consistent Rendering**: Predictable font behavior
5. **Accessibility**: Respects user font preferences

This typography system provides a solid foundation for creating professional, accessible, and Apple-inspired medical applications while maintaining excellent performance and cross-platform compatibility. 