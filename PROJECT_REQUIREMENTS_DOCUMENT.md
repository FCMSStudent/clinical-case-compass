# 🧭 Clinical Case Compass - Project Requirements Document (PRD)

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Application Flow](#application-flow)
3. [Tech Stack](#tech-stack)
4. [Frontend Guidelines](#frontend-guidelines)
5. [Backend Structure](#backend-structure)
6. [In-Scope vs Out-of-Scope](#in-scope-vs-out-of-scope)
7. [Development Guidelines](#development-guidelines)

---

## 🎯 Project Overview

### Introduction
**Clinical Case Compass** is a modern, glassmorphic medical application designed for healthcare professionals and medical students. It provides a comprehensive case management system with real-time vitals monitoring, interactive body diagrams, and an intuitive workflow for creating and managing clinical cases.

### Core Purpose
- **Medical Case Management**: Streamlined creation, editing, and tracking of clinical cases
- **Educational Tool**: Learning platform for medical students with interactive components
- **Clinical Workflow**: Professional tool for healthcare providers to manage patient cases
- **Data Visualization**: Real-time vitals monitoring and medical data presentation

### Target Users
- **Primary**: Medical students and healthcare professionals
- **Secondary**: Medical educators and clinical researchers
- **Tertiary**: Healthcare administrators and quality assurance teams

---

## 🔄 Application Flow

### User Journey Overview

```
Landing Page → Authentication → Dashboard → Case Management → Case Details
     ↓              ↓              ↓              ↓              ↓
   Marketing    Google OAuth    Overview      Create/Edit    View/Update
   & Features   Registration    & Stats       Cases          Case Data
```

### Detailed User Flow

#### 1. **Landing Page** (`/landing`)
- **Purpose**: Marketing and feature showcase
- **Components**: Hero section, features overview, call-to-action
- **Actions**: Sign up, learn more, view demo
- **Navigation**: → Authentication page

#### 2. **Authentication** (`/auth`)
- **Purpose**: User registration and login
- **Methods**: Google OAuth integration
- **Flow**: 
  - New users → Google sign-up → Account creation
  - Existing users → Google sign-in → Dashboard redirect
- **Navigation**: → Dashboard (authenticated users)

#### 3. **Dashboard** (`/dashboard`)
- **Purpose**: Central hub and overview
- **Sections**:
  - **Quick Stats**: Total cases, recent activity, progress metrics
  - **Recent Cases**: Latest case cards with quick actions
  - **Quick Start Panel**: Create new case, view tutorials
  - **Progress Charts**: Learning progress and case statistics
  - **Search Panel**: Global case search functionality
- **Navigation**: → Cases, Create Case, Account, Individual Case Details

#### 4. **Cases Overview** (`/cases`)
- **Purpose**: Browse and manage all cases
- **Features**:
  - **Grid/List View**: Toggle between display modes
  - **Search & Filter**: Find cases by symptoms, diagnosis, date
  - **Case Cards**: Preview case information with status indicators
  - **Bulk Actions**: Select multiple cases for operations
- **Navigation**: → Individual Case Details, Create New Case, Edit Cases

#### 5. **Case Creation Flow** (`/cases/new`)
- **Purpose**: Multi-step case creation process
- **Steps**:
  1. **Case Info**: Basic case information and metadata
  2. **Patient Details**: Demographics and medical history
  3. **Clinical Details**: Symptoms, examination findings
  4. **Diagnostics**: Lab results, imaging studies
  5. **Learning Points**: Educational notes and takeaways
- **Features**: Auto-save, progress tracking, validation
- **Navigation**: → Case Details (upon completion)

#### 6. **Case Details** (`/cases/:id`)
- **Purpose**: Comprehensive case view and management
- **Sections**:
  - **Patient Info Card**: Demographics and history
  - **Vitals Card**: Real-time vital signs monitoring
  - **Clinical Text**: Symptoms and examination notes
  - **Diagnostics**: Lab results and imaging
  - **Learning Points**: Educational insights
  - **Actions**: Edit, share, export, delete
- **Navigation**: → Edit Case, Back to Cases, Dashboard

#### 7. **Case Edit** (`/cases/edit/:id`)
- **Purpose**: Modify existing case information
- **Features**: Same form structure as creation with pre-filled data
- **Auto-save**: Real-time saving with conflict resolution
- **Navigation**: → Case Details (upon save)

#### 8. **Account Management** (`/account`)
- **Purpose**: User profile and settings
- **Features**: Profile information, preferences, account settings
- **Navigation**: → Dashboard, Logout

---

## 🛠️ Tech Stack

### Frontend Tech Stack

#### **Core Framework**
- **React 18.3.1**: Modern React with concurrent features
- **TypeScript 5.5.3**: Type-safe development
- **Vite 5.4.1**: Fast build tool and development server

#### **UI Framework & Styling**
- **Tailwind CSS 3.4.11**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **Framer Motion 12.15.0**: Advanced animations and transitions
- **Lucide React**: Modern icon library

#### **State Management & Data Fetching**
- **TanStack Query 5.56.2**: Server state management
- **React Hook Form 7.53.0**: Form handling and validation
- **Zod 3.23.8**: Schema validation

#### **Routing & Navigation**
- **React Router DOM 6.26.2**: Client-side routing
- **Custom Navigation System**: Sidebar and breadcrumb components

#### **UI Components & Libraries**
- **Class Variance Authority**: Component variant management
- **CLSX & Tailwind Merge**: Conditional styling utilities
- **Sonner**: Toast notifications
- **Recharts 2.12.7**: Data visualization
- **Embla Carousel**: Touch-friendly carousels

#### **Development Tools**
- **ESLint 9.9.0**: Code linting
- **Vitest**: Unit testing framework
- **Testing Library**: Component testing utilities

### Backend Tech Stack

#### **Database & Backend-as-a-Service**
- **Supabase**: PostgreSQL database with real-time features
- **PostgreSQL**: Primary database
- **Row Level Security (RLS)**: Data access control
- **Real-time Subscriptions**: Live data updates

#### **Authentication**
- **Supabase Auth**: Built-in authentication system
- **Google OAuth**: Social login integration
- **JWT Tokens**: Secure session management

#### **Storage**
- **Supabase Storage**: File upload and management
- **Image Optimization**: Automatic image processing

#### **API Layer**
- **Supabase Client**: Type-safe database operations
- **RESTful Endpoints**: Standard API patterns
- **Real-time API**: WebSocket connections for live updates

### Deployment & Hosting

#### **Frontend Deployment**
- **Netlify**: Primary hosting platform
- **Vercel**: Alternative deployment option
- **Static Site Generation**: Optimized for performance

#### **Environment Management**
- **Environment Variables**: Secure configuration management
- **Build Optimization**: Vite-based production builds
- **CDN**: Global content delivery

### Open Source Libraries & Dependencies

#### **Core Dependencies**
```json
{
  "@supabase/supabase-js": "^2.49.4",
  "@tanstack/react-query": "^5.56.2",
  "framer-motion": "^12.15.0",
  "react-hook-form": "^7.53.0",
  "zod": "^3.23.8",
  "recharts": "^2.12.7"
}
```

#### **UI Component Libraries**
```json
{
  "@radix-ui/react-*": "^1.1.0-2.2.1",
  "class-variance-authority": "^0.7.1",
  "lucide-react": "^0.462.0",
  "sonner": "^1.5.0"
}
```

#### **Development Dependencies**
```json
{
  "typescript": "^5.5.3",
  "tailwindcss": "^3.4.11",
  "vite": "^5.4.1",
  "vitest": "^3.2.3"
}
```

---

## 🎨 Frontend Guidelines

### Design Principles

#### **Medical-First Design**
- **Clinical Semantics**: Color coding for medical conditions (green=normal, red=critical)
- **Accessibility**: WCAG 2.1 AA compliance with medical context
- **Professional Aesthetics**: Clean, trustworthy interface for healthcare use
- **Reduced Motion**: Respect user accessibility preferences

#### **Glassmorphic Interface**
- **Backdrop Blur**: Modern transparency effects
- **Layered Design**: Depth through subtle shadows and borders
- **Translucent Elements**: Semi-transparent cards and overlays
- **Smooth Transitions**: Fluid animations between states

### Styling Guidelines

#### **Color System**
```typescript
// Medical Color Semantics
const medicalColors = {
  success: '#10B981',    // Normal vitals, stable condition
  warning: '#F59E0B',    // Elevated readings, monitoring
  error: '#EF4444',      // Critical vitals, emergency
  info: '#3B82F6',       // General information, routine
  neutral: '#6B7280'     // Default text and borders
}
```

#### **Typography System**
```typescript
// Apple-inspired typography
const typography = {
  hero: 'text-4xl font-bold tracking-tight',      // Main titles
  heading: 'text-2xl font-semibold tracking-tight', // Section headers
  body: 'text-base font-normal leading-relaxed',   // Regular content
  caption: 'text-sm font-medium text-muted',       // Small text
  medical: 'text-lg font-semibold text-primary'    // Medical terms
}
```

#### **Spacing System (8pt Grid)**
```typescript
const spacing = {
  xs: '4px',    // 0.25rem
  sm: '8px',    // 0.5rem
  md: '16px',   // 1rem
  lg: '24px',   // 1.5rem
  xl: '32px',   // 2rem
  '2xl': '48px' // 3rem
}
```

### Page Layout Structure

#### **Layout Components**
```typescript
// Main layout structure
<AppLayout>
  <Sidebar />           // Navigation sidebar
  <MainContent>         // Primary content area
    <PageHeader />      // Page title and actions
    <PageContent />     // Main page content
  </MainContent>
</AppLayout>
```

#### **Responsive Design**
- **Mobile-First**: Base styles for mobile devices
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Flexible Grid**: CSS Grid and Flexbox for layouts
- **Touch-Friendly**: Minimum 44px touch targets

### Navigation Structure

#### **Primary Navigation**
```typescript
const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: 'Home' },
  { path: '/cases', label: 'Cases', icon: 'Folder' },
  { path: '/account', label: 'Account', icon: 'User' }
]
```

#### **Breadcrumb Navigation**
```typescript
// Dynamic breadcrumb generation
Dashboard > Cases > Case Detail > Edit Case
```

#### **Secondary Navigation**
- **Quick Actions**: Floating action buttons
- **Context Menus**: Right-click and dropdown menus
- **Search**: Global search with keyboard shortcuts

### Component Architecture

#### **Component Hierarchy**
```
App
├── Layout
│   ├── Sidebar
│   ├── MainContent
│   └── PageHeader
├── Pages
│   ├── Dashboard
│   ├── Cases
│   ├── CaseDetail
│   └── Auth
└── Shared Components
    ├── UI Components
    ├── Medical Components
    └── Layout Components
```

#### **Component Categories**
1. **Base UI Components**: Button, Input, Card, Modal
2. **Medical Components**: VitalsCard, BodyDiagram, LabResults
3. **Layout Components**: Container, Grid, Section
4. **Interactive Components**: InteractiveVitals, BodyPartSelector

---

## 🗄️ Backend Structure

### Database Architecture

#### **Core Tables**
```sql
-- Users table (managed by Supabase Auth)
users (
  id: uuid PRIMARY KEY,
  email: text UNIQUE,
  full_name: text,
  avatar_url: text,
  created_at: timestamp
)

-- Cases table
cases (
  id: uuid PRIMARY KEY,
  user_id: uuid REFERENCES users(id),
  title: text NOT NULL,
  patient_age: integer,
  patient_gender: text,
  chief_complaint: text,
  clinical_notes: text,
  diagnosis: text,
  learning_points: text,
  status: text DEFAULT 'draft',
  created_at: timestamp DEFAULT now(),
  updated_at: timestamp DEFAULT now()
)

-- Vitals table
vitals (
  id: uuid PRIMARY KEY,
  case_id: uuid REFERENCES cases(id),
  blood_pressure: text,
  heart_rate: integer,
  temperature: decimal,
  respiratory_rate: integer,
  oxygen_saturation: integer,
  recorded_at: timestamp DEFAULT now()
)

-- Lab results table
lab_results (
  id: uuid PRIMARY KEY,
  case_id: uuid REFERENCES cases(id),
  test_name: text,
  result_value: text,
  unit: text,
  reference_range: text,
  status: text,
  recorded_at: timestamp DEFAULT now()
)

-- Radiology studies table
radiology_studies (
  id: uuid PRIMARY KEY,
  case_id: uuid REFERENCES cases(id),
  study_type: text,
  findings: text,
  impression: text,
  image_url: text,
  recorded_at: timestamp DEFAULT now()
)
```

#### **Row Level Security (RLS)**
```sql
-- Enable RLS on all tables
ALTER TABLE cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE vitals ENABLE ROW LEVEL SECURITY;
ALTER TABLE lab_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE radiology_studies ENABLE ROW LEVEL SECURITY;

-- Users can only access their own data
CREATE POLICY "Users can view own cases" ON cases
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own cases" ON cases
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own cases" ON cases
  FOR UPDATE USING (auth.uid() = user_id);
```

### API Endpoints

#### **Authentication Endpoints**
```typescript
// Supabase Auth methods
const auth = {
  signInWithGoogle: () => supabase.auth.signInWithOAuth({ provider: 'google' }),
  signOut: () => supabase.auth.signOut(),
  getSession: () => supabase.auth.getSession(),
  onAuthStateChange: (callback) => supabase.auth.onAuthStateChange(callback)
}
```

#### **Cases API**
```typescript
// Cases CRUD operations
const casesAPI = {
  // Get all cases for current user
  getCases: () => supabase
    .from('cases')
    .select('*')
    .order('created_at', { ascending: false }),

  // Get single case with related data
  getCase: (id: string) => supabase
    .from('cases')
    .select(`
      *,
      vitals (*),
      lab_results (*),
      radiology_studies (*)
    `)
    .eq('id', id)
    .single(),

  // Create new case
  createCase: (caseData: CaseData) => supabase
    .from('cases')
    .insert(caseData)
    .select()
    .single(),

  // Update existing case
  updateCase: (id: string, updates: Partial<CaseData>) => supabase
    .from('cases')
    .update(updates)
    .eq('id', id)
    .select()
    .single(),

  // Delete case
  deleteCase: (id: string) => supabase
    .from('cases')
    .delete()
    .eq('id', id)
}
```

#### **Real-time Subscriptions**
```typescript
// Real-time case updates
const subscribeToCaseUpdates = (caseId: string, callback: Function) => {
  return supabase
    .channel(`case-${caseId}`)
    .on('postgres_changes', 
      { event: '*', schema: 'public', table: 'cases', filter: `id=eq.${caseId}` },
      callback
    )
    .subscribe()
}
```

### Storage Buckets

#### **File Storage Structure**
```typescript
// Supabase Storage buckets
const storage = {
  // Medical images (X-rays, CT scans, etc.)
  medicalImages: 'medical-images',
  
  // User avatars and profile pictures
  userAvatars: 'user-avatars',
  
  // Case attachments and documents
  caseAttachments: 'case-attachments'
}
```

#### **File Upload Functions**
```typescript
const uploadMedicalImage = async (file: File, caseId: string) => {
  const fileName = `${caseId}/${Date.now()}-${file.name}`;
  
  const { data, error } = await supabase.storage
    .from('medical-images')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (error) throw error;
  
  return data.path;
}
```

### Security Measures

#### **Authentication Security**
- **JWT Tokens**: Secure session management
- **OAuth 2.0**: Google authentication integration
- **Session Management**: Automatic token refresh
- **Logout Handling**: Proper session cleanup

#### **Data Security**
- **Row Level Security**: Database-level access control
- **Input Validation**: Zod schema validation
- **SQL Injection Prevention**: Parameterized queries
- **XSS Protection**: Content Security Policy

#### **API Security**
- **Rate Limiting**: Prevent abuse and DDoS
- **CORS Configuration**: Cross-origin request handling
- **Environment Variables**: Secure configuration management
- **Error Handling**: Sanitized error messages

### Hosting Solutions

#### **Supabase Hosting**
- **Database**: Managed PostgreSQL with automatic backups
- **API**: RESTful and GraphQL endpoints
- **Real-time**: WebSocket connections
- **Storage**: Object storage with CDN
- **Edge Functions**: Serverless compute

#### **Frontend Hosting**
- **Netlify**: Primary hosting with automatic deployments
- **Vercel**: Alternative hosting option
- **CDN**: Global content delivery network
- **SSL**: Automatic HTTPS certificates

---

## ✅ In-Scope vs Out-of-Scope

### ✅ In-Scope Features

#### **Core Functionality**
- ✅ User authentication with Google OAuth
- ✅ Case creation, editing, and management
- ✅ Real-time vitals monitoring
- ✅ Interactive body diagram
- ✅ Lab results and radiology management
- ✅ Learning points and educational features
- ✅ Search and filtering capabilities
- ✅ Responsive design for all devices

#### **Technical Features**
- ✅ TypeScript implementation
- ✅ Comprehensive design system
- ✅ Accessibility compliance (WCAG 2.1 AA)
- ✅ Real-time data synchronization
- ✅ Auto-save functionality
- ✅ Form validation and error handling
- ✅ Performance optimization
- ✅ Testing coverage

#### **Medical Features**
- ✅ Medical color semantics
- ✅ Vital signs tracking
- ✅ Body part selection
- ✅ Clinical notes management
- ✅ Diagnostic results display
- ✅ Educational content integration

### ❌ Out-of-Scope Features

#### **Advanced Medical Features**
- ❌ Electronic Health Record (EHR) integration
- ❌ HIPAA compliance certification
- ❌ Medical device integration
- ❌ Prescription management
- ❌ Insurance billing integration
- ❌ Telemedicine functionality

#### **Advanced Technical Features**
- ❌ Offline-first functionality
- ❌ Native mobile applications
- ❌ Advanced analytics and reporting
- ❌ Multi-tenant architecture
- ❌ Advanced role-based access control
- ❌ API rate limiting and monetization

#### **Enterprise Features**
- ❌ Multi-organization support
- ❌ Advanced audit logging
- ❌ Custom branding options
- ❌ White-label solutions
- ❌ Advanced user management
- ❌ Integration with third-party medical systems

---

## 🚀 Development Guidelines

### Code Standards

#### **TypeScript Guidelines**
```typescript
// Strict type definitions
interface CaseData {
  id: string;
  title: string;
  patientAge: number;
  patientGender: 'male' | 'female' | 'other';
  chiefComplaint: string;
  clinicalNotes?: string;
  diagnosis?: string;
  learningPoints?: string;
  status: 'draft' | 'published' | 'archived';
  createdAt: Date;
  updatedAt: Date;
}

// Proper error handling
const handleError = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  return 'An unknown error occurred';
}
```

#### **Component Guidelines**
```typescript
// Functional components with proper typing
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'medical' | 'critical';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  disabled = false
}) => {
  // Component implementation
}
```

#### **Testing Guidelines**
```typescript
// Component testing with Testing Library
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button Component', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Performance Guidelines

#### **Optimization Strategies**
- **Code Splitting**: Lazy load routes and components
- **Memoization**: Use React.memo and useMemo for expensive operations
- **Image Optimization**: Compress and lazy load images
- **Bundle Analysis**: Monitor bundle size and optimize imports

#### **Caching Strategies**
- **Query Caching**: TanStack Query for server state
- **Component Caching**: React.memo for expensive components
- **Asset Caching**: Proper cache headers for static assets

### Accessibility Guidelines

#### **WCAG 2.1 AA Compliance**
- **Keyboard Navigation**: All interactive elements accessible via keyboard
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Color Contrast**: Minimum 4.5:1 contrast ratio
- **Focus Management**: Visible focus indicators

#### **Medical Accessibility**
- **Reduced Motion**: Respect user motion preferences
- **High Contrast Mode**: Support for high contrast displays
- **Font Scaling**: Support for larger text sizes
- **Medical Terminology**: Clear explanations for complex terms

### Deployment Guidelines

#### **Environment Setup**
```bash
# Required environment variables
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_APP_ENV=production
```

#### **Build Process**
```bash
# Development
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Testing
npm run test

# Linting
npm run lint
```

#### **Deployment Checklist**
- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] Storage buckets created
- [ ] Authentication providers configured
- [ ] Build optimization completed
- [ ] Performance testing passed
- [ ] Accessibility testing completed
- [ ] Cross-browser testing completed

---

## 📚 Additional Resources

### Documentation Links
- [Design System Guide](./src/lib/DESIGN_SYSTEM_GUIDE.md)
- [Typography Guide](./src/lib/TYPOGRAPHY_GUIDE.md)
- [Testing Guide](./TESTING_GUIDE.md)
- [Tech Debt Audit](./TECH_DEBT_AUDIT.md)

### External Resources
- [Supabase Documentation](https://supabase.com/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)

---

*This PRD serves as the comprehensive framework for AI development and project management. It provides clear guidelines for implementation, ensures consistency across development phases, and maintains alignment with the project's medical and educational objectives.* 