# 🧭 Clinical Case Compass

> **A modern, glassmorphic medical application** built with React, TypeScript, and Tailwind CSS, featuring a comprehensive design system optimized for clinical workflows and medical education.

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.11-38B2AC.svg)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.4.1-646CFF.svg)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## 🎯 Project Overview

Clinical Case Compass is a **comprehensive medical case management system** designed for healthcare professionals and medical students. It features a modern glassmorphic interface with medical-specific design patterns, real-time vitals monitoring, and an intuitive case creation workflow.

### ✨ Key Features

- 🏥 **Medical-First Design** - Specialized components for clinical workflows
- 🎨 **Glassmorphic UI** - Modern backdrop blur and transparency effects
- 📱 **Responsive Design** - Mobile-first approach with medical semantics
- ♿ **Accessibility** - WCAG 2.1 AA compliance with reduced motion support
- 🎭 **Smooth Animations** - Framer Motion integration with medical patterns
- 🔄 **Real-time Updates** - Live vitals monitoring and case tracking
- 📊 **Interactive Charts** - Medical data visualization with Recharts
- 🎯 **Form Validation** - React Hook Form with Zod schema validation

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ 
- **npm** or **yarn**
- **Git**

### Installation

```bash
# Clone the repository
git clone https://github.com/FCMSStudent/clinical-case-compass.git
cd clinical-case-compass

# Install dependencies
npm install

# Start development server
npm run dev
```

### Development Commands

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

## 🏗️ Architecture & Design System

### 📐 Three-Phase Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    🎨 Phase 3: Component System            │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              🧩 Unified Component System            │   │
│  │  • 🎯 Standardized Variants                        │   │
│  │  • 🔄 Interaction States                           │   │
│  │  • 💎 Glassmorphic Effects                         │   │
│  │  • 📐 Layout Primitives                            │   │
│  │  • 🎭 Animation Standards                          │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│                    ⚡ Phase 2: Enhanced UI                 │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              🚀 Advanced Components                 │   │
│  │  • 💎 Glassmorphic Effects                         │   │
│  │  • ♿ Accessibility Features                        │   │
│  │  • 🏥 Medical-Specific Components                  │   │
│  │  • 🎭 Animation System                             │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│                    🏗️ Phase 1: Foundation                 │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              🎨 Design System                       │   │
│  │  • 🎯 Design Tokens                                │   │
│  │  • 🌈 Theme System                                 │   │
│  │  • 🧩 Base Components                              │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### 🎨 Design System Features

#### **Medical Color Semantics**
- 🟢 **Success (Green)** - Normal vital signs, stable condition, completed treatments
- 🟡 **Warning (Yellow)** - Elevated readings, monitoring required, pending results  
- 🔴 **Error (Red)** - Critical vital signs, emergency situations, abnormal results
- 🔵 **Info (Blue)** - General information, ongoing treatments, routine procedures

#### **Typography System**
- **Hero** - Main page titles and headers
- **Heading** - Section headers and important text
- **Body** - Regular content and descriptions
- **Caption** - Small text, metadata, and labels
- **Medical** - Specialized medical terminology

## 🧩 Component Library

### 🎯 Core Components

```typescript
// 🎨 Standardized Button Variants
<Button variant="primary" size="md">Primary Action</Button>
<Button variant="medical" size="lg">Medical Action</Button>
<Button variant="critical" size="sm">Critical Action</Button>

// 💎 Glassmorphic Cards
<Card variant="elevated">
  <CardHeader>
    <CardTitle>Elevated Card</CardTitle>
  </CardHeader>
  <CardContent>Enhanced glassmorphic effects</CardContent>
</Card>

// 📐 Layout Primitives
<Container variant="default">
  <Section spacing="lg">
    <Grid variant="responsive" gap="md">
      <Card variant="default">Card 1</Card>
      <Card variant="default">Card 2</Card>
    </Grid>
  </Section>
</Container>

// 🎭 Animation Standards
<StaggeredContainer>
  <StaggeredItem>
    <GlassyHover intensity="medium">
      <Card variant="interactive">Interactive Card</Card>
    </GlassyHover>
  </StaggeredItem>
</StaggeredContainer>
```

### 🏥 Medical-Specific Components

- **🫀 Interactive Vitals Card** - Real-time vital signs monitoring
- **📊 Radiology Card** - Medical imaging and study management
- **🧪 Lab Results Card** - Laboratory test results display
- **👤 Patient Info Card** - Patient demographics and history
- **📋 System Review Checklist** - Comprehensive patient assessment
- **🎯 Body Part Selector** - Interactive anatomical diagram

## 🎭 Animation System

### **Framer Motion Integration**
- **Entrance Animations** - Smooth page and component transitions
- **Hover Effects** - Interactive feedback with glassmorphic effects
- **Staggered Animations** - Coordinated multi-element animations
- **Medical Patterns** - Pulse, glow, and medical-specific effects
- **Reduced Motion** - Respects user accessibility preferences

### **Animation Examples**

```typescript
// 🎭 Staggered Container
<StaggeredContainer>
  <StaggeredItem>
    <Card>Animated Card 1</Card>
  </StaggeredItem>
  <StaggeredItem>
    <Card>Animated Card 2</Card>
  </StaggeredItem>
</StaggeredContainer>

// 💎 Glassy Hover Effect
<GlassyHover intensity="medium">
  <Card variant="interactive">
    Interactive with 3D hover effect
  </Card>
</GlassyHover>

// 🌊 Floating Animation
<Floating>
  <Card>Gentle floating animation</Card>
</Floating>

// 💓 Pulse Glow
<PulseGlow>
  <AlertTriangle />
  Medical pulse effect
</PulseGlow>
```

## 📊 Data Visualization

### **Chart Components**
- **📈 Line Charts** - Vital signs trends and patient progress
- **📊 Bar Charts** - Clinical statistics and comparisons
- **🎯 Radar Charts** - Multi-dimensional patient assessments
- **📉 Area Charts** - Cumulative data and trends
- **🔢 Scatter Plots** - Correlation analysis

### **Interactive Features**
- **🔍 Zoom & Pan** - Detailed data exploration
- **📱 Responsive** - Mobile-optimized chart interactions
- **🎨 Medical Themes** - Clinical color schemes
- **📊 Tooltips** - Detailed data point information
- **📋 Legends** - Clear data series identification

## 🏥 Medical Workflows

### **Case Management**
1. **📝 Case Creation** - Multi-step form with validation
2. **👤 Patient Information** - Demographics and history
3. **🫀 Vital Signs** - Real-time monitoring interface
4. **📊 Diagnostics** - Lab results and imaging
5. **📋 Clinical Details** - Symptoms and assessment
6. **🎯 Learning Points** - Educational insights and takeaways

### **Clinical Features**
- **🔄 Autosave** - Automatic case data preservation
- **📱 Mobile Responsive** - Tablet and phone optimization
- **🔍 Search & Filter** - Advanced case discovery
- **📊 Analytics** - Clinical performance metrics
- **👥 Collaboration** - Multi-user case sharing

## 🛠️ Technology Stack

### **Frontend Framework**
- **⚛️ React 18.3.1** - Modern component-based architecture
- **📘 TypeScript 5.5.3** - Type-safe development
- **🎨 Tailwind CSS 3.4.11** - Utility-first styling
- **⚡ Vite 5.4.1** - Fast build tool and dev server

### **UI Components**
- **🧩 Radix UI** - Accessible component primitives
- **🎭 Framer Motion** - Smooth animations and transitions
- **📊 Recharts** - Medical data visualization
- **📝 React Hook Form** - Form state management
- **✅ Zod** - Schema validation

### **Backend & Data**
- **☁️ Supabase** - Backend-as-a-Service
- **🔄 TanStack Query** - Data fetching and caching
- **🔐 Authentication** - Secure user management

### **Development Tools**
- **🔍 ESLint** - Code quality and consistency
- **🧪 Vitest** - Fast unit testing
- **📦 TypeScript ESLint** - TypeScript-specific linting
- **🎨 PostCSS** - CSS processing and optimization

## 📱 Responsive Design

### **Breakpoint System**
- **📱 Mobile** - 320px to 768px
- **💻 Tablet** - 768px to 1024px
- **🖥️ Desktop** - 1024px to 1440px
- **🖥️ Large Desktop** - 1440px+

### **Mobile-First Approach**
- **📱 Touch Optimized** - Large touch targets and gestures
- **🎯 Medical Context** - Optimized for clinical workflows
- **⚡ Performance** - Fast loading on mobile networks
- **🔋 Battery Efficient** - Optimized animations and effects

## ♿ Accessibility

### **WCAG 2.1 AA Compliance**
- **🎯 Focus Management** - Clear focus indicators and navigation
- **📖 Screen Reader Support** - Semantic HTML and ARIA labels
- **🎨 Color Contrast** - High contrast ratios for readability
- **🎭 Reduced Motion** - Respects user motion preferences
- **⌨️ Keyboard Navigation** - Full keyboard accessibility

### **Medical Accessibility**
- **🏥 Clinical Context** - Medical terminology and workflows
- **👥 Multi-user Support** - Role-based accessibility features
- **📱 Mobile Accessibility** - Touch and gesture optimization
- **🔊 Audio Support** - Screen reader and audio feedback

## 🧪 Testing

### **Test Coverage**
- **🧩 Component Testing** - Individual component behavior
- **🔄 Integration Testing** - Component interaction testing
- **📱 Responsive Testing** - Cross-device compatibility
- **♿ Accessibility Testing** - WCAG compliance verification

### **Testing Commands**
```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage

# Run accessibility tests
npm run test:a11y
```

## 🚀 Deployment

### **Production Build**
```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to Vercel
vercel --prod
```

### **Environment Variables**
```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Application Settings
VITE_APP_NAME=Clinical Case Compass
VITE_APP_VERSION=1.0.0-beta.1
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### **Development Setup**
1. **🔗 Fork** the repository
2. **📥 Clone** your fork locally
3. **📦 Install** dependencies with `npm install`
4. **🔧 Create** a feature branch
5. **💻 Make** your changes
6. **🧪 Test** your changes
7. **📝 Commit** with descriptive messages
8. **🚀 Push** and create a Pull Request

### **Code Standards**
- **📘 TypeScript** - Strict type checking enabled
- **🎨 Prettier** - Consistent code formatting
- **🔍 ESLint** - Code quality and best practices
- **📝 Conventional Commits** - Standardized commit messages

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **🏥 Medical Professionals** - For clinical workflow insights
- **🎨 Design Community** - For glassmorphic design inspiration
- **⚛️ React Community** - For excellent tooling and libraries
- **📚 Open Source** - For the amazing libraries that make this possible

## 📞 Support

- **📧 Email** - support@clinicalcasecompass.com
- **🐛 Issues** - [GitHub Issues](https://github.com/FCMSStudent/clinical-case-compass/issues)
- **💬 Discussions** - [GitHub Discussions](https://github.com/FCMSStudent/clinical-case-compass/discussions)
- **📖 Documentation** - [Project Wiki](https://github.com/FCMSStudent/clinical-case-compass/wiki)

---

<div align="center">

**Made with ❤️ for the medical community**

[![GitHub stars](https://img.shields.io/github/stars/FCMSStudent/clinical-case-compass?style=social)](https://github.com/FCMSStudent/clinical-case-compass)
[![GitHub forks](https://img.shields.io/github/forks/FCMSStudent/clinical-case-compass?style=social)](https://github.com/FCMSStudent/clinical-case-compass)
[![GitHub issues](https://img.shields.io/github/issues/FCMSStudent/clinical-case-compass)](https://github.com/FCMSStudent/clinical-case-compass/issues)
[![GitHub license](https://img.shields.io/github/license/FCMSStudent/clinical-case-compass)](https://github.com/FCMSStudent/clinical-case-compass/blob/main/LICENSE)

</div>
