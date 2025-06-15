# Clinical Case Compass

A modern, glassmorphic medical application built with React, TypeScript, and Tailwind CSS, featuring a comprehensive design system optimized for clinical workflows.

## 🎯 Project Status

### ✅ Phase 1: Foundation & Design System
- **Design Tokens**: Comprehensive typography, color, and spacing system
- **Theme System**: Multiple medical-themed color schemes
- **Base Components**: Core UI components with medical semantics

### ✅ Phase 2: Enhanced UI & Accessibility
- **Glassmorphic Effects**: Advanced backdrop blur and transparency
- **Accessibility Features**: WCAG 2.1 AA compliance, reduced motion support
- **Medical-Specific Components**: Specialized components for clinical use cases
- **Animation System**: Framer Motion integration with medical animations

### ✅ Phase 3: Component System Unification
- **Standardized Variants**: Consistent button, input, and card variants
- **Unified Interaction States**: Hover, focus, active, disabled states across all components
- **Glassmorphic Standards**: Consistent backdrop blur and transparency effects
- **Layout Primitives**: Standardized container, flex, and grid components
- **Animation Standards**: Unified animation variants and transition effects

## 🏗️ Architecture

### Design System Layers

```
┌─────────────────────────────────────────────────────────────┐
│                    Phase 3: Component System               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Unified Component System               │   │
│  │  • Standardized Variants                           │   │
│  │  • Interaction States                              │   │
│  │  • Glassmorphic Effects                            │   │
│  │  • Layout Primitives                               │   │
│  │  • Animation Standards                             │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│                    Phase 2: Enhanced UI                    │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Advanced Components                    │   │
│  │  • Glassmorphic Effects                            │   │
│  │  • Accessibility Features                          │   │
│  │  • Medical-Specific Components                     │   │
│  │  • Animation System                                │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│                    Phase 1: Foundation                     │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Design System                          │   │
│  │  • Design Tokens                                   │   │
│  │  • Theme System                                    │   │
│  │  • Base Components                                 │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## 🎨 Unified Component System

### Core Features

- **Standardized Variants**: Consistent button, input, and card variants with medical semantics
- **Interaction States**: Unified hover, focus, active, and disabled states
- **Glassmorphic Effects**: Standardized backdrop blur and transparency
- **Layout Primitives**: Container, Flex, Grid, and Section components
- **Animation Standards**: Entrance, hover, and medical-specific animations

### Component Examples

```typescript
// Standardized Button Variants
<Button variant="primary" size="md">Primary Action</Button>
<Button variant="medical" size="lg">Medical Action</Button>
<Button variant="critical" size="sm">Critical Action</Button>

// Glassmorphic Cards
<Card variant="elevated">
  <CardHeader>
    <CardTitle>Elevated Card</CardTitle>
  </CardHeader>
  <CardContent>Enhanced glassmorphic effects</CardContent>
</Card>

// Layout Primitives
<Container variant="default">
  <Section spacing="lg">
    <Grid variant="responsive" gap="md">
      <Card variant="default">Card 1</Card>
      <Card variant="default">Card 2</Card>
    </Grid>
  </Section>
</Container>

// Animation Standards
<StaggeredContainer>
  <StaggeredItem>
    <GlassyHover intensity="medium">
      <Card variant="interactive">Interactive Card</Card>
    </GlassyHover>
  </StaggeredItem>
</StaggeredContainer>
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/clinical-case-compass.git
cd clinical-case-compass

# Install dependencies
npm install

# Start development server
npm run dev
```

### Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm run test

# Run linting
npm run lint
```

## 📦 Key Features

### 🎨 Design System
- **Comprehensive Design Tokens**: Typography, colors, spacing, and medical semantics
- **Multiple Themes**: Medical blue, emerald, purple, sunset, ocean, rose, and neutral themes
- **Glassmorphic Effects**: Advanced backdrop blur and transparency
- **Medical Color Semantics**: Clinical status colors (success, warning, error, info)

### 🧩 Component Library
- **Unified Component System**: Standardized variants and interaction states
- **Medical-Specific Components**: Specialized for clinical workflows
- **Accessibility First**: WCAG 2.1 AA compliance, screen reader support
- **Responsive Design**: Mobile-first approach with breakpoint system

### 🎭 Animation System
- **Framer Motion Integration**: Smooth, performant animations
- **Medical Animations**: Pulse, glow, and entrance effects
- **Reduced Motion Support**: Respects user preferences
- **Staggered Animations**: Coordinated multi-element animations

### 📐 Layout System
- **Layout Primitives**: Container, Flex, Grid, and Section components
- **Bento Grid**: Enhanced 6-column responsive grid system
- **Responsive Design**: Mobile-first with consistent breakpoints
- **Spacing System**: Standardized spacing and gap utilities

## 🏥 Medical-Specific Features

### Clinical Color Semantics
- **Success (Green)**: Normal vital signs, stable condition, completed treatments
- **Warning (Yellow)**: Elevated readings, monitoring required, pending results
- **Error (Red)**: Critical vital signs, emergency situations, abnormal results
- **Info (Blue)**: General information, ongoing treatments, routine procedures

### Medical Components
- **Vital Signs Display**: Real-time health monitoring components
- **Patient Records**: Medical data management interfaces
- **Medication Tracking**: Prescription and dosage management
- **Clinical Status**: Patient condition and treatment status indicators

## 🎯 Usage Examples

### Basic Component Usage

```typescript
import {
  Button,
  Card,
  Input,
  Container,
  Section,
  BentoContainer,
  BentoCard,
} from '@/components/ui';

function MedicalDashboard() {
  return (
    <Container variant="default">
      <Section spacing="lg">
        <BentoContainer layout="default">
          <BentoCard
            layout="medium"
            variant="interactive"
            icon={<Stethoscope />}
            title="Patient Records"
            subtitle="1,234 active cases"
          >
            <div className="text-2xl font-bold text-white">1,234</div>
          </BentoCard>
        </BentoContainer>
      </Section>
    </Container>
  );
}
```

### Animation Integration

```typescript
import {
  AnimatedDiv,
  StaggeredContainer,
  StaggeredItem,
  GlassyHover,
} from '@/components/ui';

function AnimatedContent() {
  return (
    <StaggeredContainer>
      <StaggeredItem>
        <GlassyHover intensity="medium">
          <Card variant="interactive">
            <h3>Interactive Card</h3>
            <p>Hover for 3D effects</p>
          </Card>
        </GlassyHover>
      </StaggeredItem>
    </StaggeredContainer>
  );
}
```

## 📚 Documentation

### Phase Documentation
- [Phase 1: Foundation & Design System](./PHASE_1_DOCUMENTATION.md)
- [Phase 2: Enhanced UI & Accessibility](./PHASE_2_DOCUMENTATION.md)
- [Phase 3: Component System Unification](./PHASE_3_DOCUMENTATION.md)

### Component Documentation
- [Design Tokens](./src/lib/design-tokens.ts)
- [Component System](./src/lib/component-system.ts)
- [Animation Variants](./src/components/ui/animation.tsx)
- [Layout Primitives](./src/components/ui/layout.tsx)

### Examples
- [Unified Component System Example](./src/components/examples/UnifiedComponentSystemExample.tsx)
- [Design System Example](./src/components/examples/DesignSystemExample.tsx)

## 🛠️ Technology Stack

### Core Technologies
- **React 18**: Modern React with concurrent features
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **Radix UI**: Accessible component primitives

### Development Tools
- **Vite**: Fast build tool and dev server
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting
- **Vitest**: Unit testing framework

### Design System
- **Design Tokens**: Typography, colors, spacing
- **Theme System**: Multiple medical themes
- **Component Library**: Unified component system
- **Animation System**: Medical-specific animations

## 🎨 Theme System

### Available Themes
- **Medical Blue**: Professional clinical theme (default)
- **Emerald Medical**: Fresh and modern medical theme
- **Purple Medical**: Sophisticated medical theme
- **Sunset Medical**: Warm and comforting theme
- **Ocean Medical**: Calming ocean-inspired theme
- **Rose Medical**: Gentle and caring theme
- **Neutral Medical**: Clean and minimal theme

### Theme Switching
```typescript
import { useTheme } from '@/lib/design-system';

function ThemeSwitcher() {
  const { currentTheme, setTheme, getThemeNames } = useTheme();
  
  return (
    <select onChange={(e) => setTheme(e.target.value)}>
      {getThemeNames().map(theme => (
        <option key={theme.name} value={theme.name}>
          {theme.name}
        </option>
      ))}
    </select>
  );
}
```

## 🔧 Configuration

### Tailwind Configuration
The project uses a custom Tailwind configuration with:
- Extended color palette with medical semantics
- Custom spacing and typography scales
- Glassmorphic effect utilities
- Animation keyframes and utilities

### Environment Variables
```bash
# Development
VITE_API_URL=http://localhost:3000
VITE_APP_NAME="Clinical Case Compass"

# Production
VITE_API_URL=https://api.clinicalcasecompass.com
VITE_APP_NAME="Clinical Case Compass"
```

## 🧪 Testing

### Test Structure
```bash
src/
├── __tests__/
│   ├── components/
│   ├── hooks/
│   └── utils/
├── components/
└── lib/
```

### Running Tests
```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 📱 Browser Support

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Add tests for new functionality
5. Run the test suite: `npm run test`
6. Commit your changes: `git commit -m 'Add amazing feature'`
7. Push to the branch: `git push origin feature/amazing-feature`
8. Open a Pull Request

### Code Standards
- Follow TypeScript best practices
- Use the unified component system
- Maintain accessibility standards
- Write comprehensive tests
- Follow the existing code style

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Radix UI**: For accessible component primitives
- **Framer Motion**: For smooth animations
- **Tailwind CSS**: For utility-first styling
- **Medical Design Community**: For inspiration and best practices

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review the examples

---

**Built with ❤️ for the medical community**
