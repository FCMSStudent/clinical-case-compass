# Performance Optimization Guide

## Overview

This guide provides comprehensive strategies for optimizing the performance of the Clinical Case Compass application, covering both build-time and runtime optimizations.

## Table of Contents

1. [Bundle Optimization](#bundle-optimization)
2. [Runtime Performance](#runtime-performance)
3. [Asset Optimization](#asset-optimization)
4. [Monitoring & Metrics](#monitoring--metrics)
5. [Performance Budget](#performance-budget)
6. [Best Practices](#best-practices)

## Bundle Optimization

### Code Splitting

#### Route-Level Splitting

All major routes are lazy-loaded to reduce initial bundle size:

```typescript
// App.tsx - Implemented lazy loading
const Dashboard = React.lazy(() => import("@/features/dashboard/Dashboard"));
const Cases = React.lazy(() => import("@/features/cases/Cases"));
const CaseDetail = React.lazy(() => import("@/features/cases/CaseDetail"));

// Usage with Suspense
<Suspense fallback={<PageLoadingFallback />}>
  <Dashboard />
</Suspense>
```

#### Feature-Level Splitting

Split heavy features into separate chunks:

```typescript
// Heavy chart component
const AdvancedCharts = React.lazy(() => 
  import("@/features/analytics/AdvancedCharts")
);

// Heavy form builder
const FormBuilder = React.lazy(() => 
  import("@/features/cases/FormBuilder")
);
```

#### Dynamic Imports

Use dynamic imports for conditional features:

```typescript
const loadChartLibrary = async () => {
  if (shouldLoadCharts) {
    const { Chart } = await import('recharts');
    return Chart;
  }
  return null;
};
```

### Vite Configuration

Our optimized Vite configuration includes:

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['@radix-ui/react-*'],
          'form-vendor': ['react-hook-form', '@hookform/resolvers', 'zod'],
          'chart-vendor': ['recharts'],
          'animation-vendor': ['framer-motion'],
          // Feature chunks
          'auth-feature': ['./src/features/auth'],
          'cases-feature': ['./src/features/cases'],
          'dashboard-feature': ['./src/features/dashboard']
        }
      }
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    // Enable minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: mode === 'production',
      },
    },
  },
});
```

### Tree Shaking

#### Import Optimization

```typescript
// ❌ Imports entire library
import * as _ from 'lodash';

// ✅ Import only what you need
import { debounce } from 'lodash-es';

// ❌ Imports entire icon library
import * as Icons from 'lucide-react';

// ✅ Import specific icons
import { Search, Filter, Plus } from 'lucide-react';
```

#### Conditional Bundle Loading

```typescript
// Only load heavy dependencies when needed
const loadPdfLibrary = () => {
  return import('jspdf').then(module => module.default);
};

const generatePdf = async () => {
  const jsPDF = await loadPdfLibrary();
  // Use jsPDF...
};
```

## Runtime Performance

### React Optimization

#### Component Memoization

```typescript
// Expensive list component
const CaseList = React.memo(({ cases, onCaseSelect }) => {
  return (
    <div>
      {cases.map(case => (
        <CaseCard key={case.id} case={case} onClick={onCaseSelect} />
      ))}
    </div>
  );
});

// Compare props for complex objects
const CaseCard = React.memo(({ case, onClick }) => {
  // Component implementation
}, (prevProps, nextProps) => {
  return prevProps.case.id === nextProps.case.id &&
         prevProps.case.updated_at === nextProps.case.updated_at;
});
```

#### Hook Optimization

```typescript
// ✅ Memoize expensive calculations
const expensiveValue = useMemo(() => {
  return heavyCalculation(data);
}, [data]);

// ✅ Memoize callback functions
const handleCaseSelect = useCallback((caseId: string) => {
  onCaseSelect(caseId);
}, [onCaseSelect]);

// ✅ Optimize object dependencies
const searchConfig = useMemo(() => ({
  fields: ['title', 'description'],
  limit: 20,
}), []); // Empty dependency array since config is static
```

#### State Management

```typescript
// ✅ Split state for better updates
const [cases, setCases] = useState([]);
const [loading, setLoading] = useState(false);
const [filters, setFilters] = useState({});

// Instead of:
// ❌ Single state object causes unnecessary re-renders
const [state, setState] = useState({
  cases: [],
  loading: false,
  filters: {}
});
```

### Virtual Scrolling

For large lists, implement virtual scrolling:

```typescript
import { FixedSizeList as List } from 'react-window';

const VirtualizedCaseList = ({ cases }) => {
  const Row = ({ index, style }) => (
    <div style={style}>
      <CaseCard case={cases[index]} />
    </div>
  );

  return (
    <List
      height={600}
      itemCount={cases.length}
      itemSize={120}
      itemData={cases}
    >
      {Row}
    </List>
  );
};
```

### Debouncing and Throttling

```typescript
import { useMemo } from 'react';
import { debounce } from 'lodash-es';

const SearchInput = ({ onSearch }) => {
  const debouncedSearch = useMemo(
    () => debounce(onSearch, 300),
    [onSearch]
  );

  return (
    <input
      type="text"
      onChange={(e) => debouncedSearch(e.target.value)}
      placeholder="Search cases..."
    />
  );
};
```

## Asset Optimization

### Image Optimization

#### Modern Formats

```typescript
// Use WebP with fallback
const OptimizedImage = ({ src, alt, ...props }) => (
  <picture>
    <source srcSet={`${src}.webp`} type="image/webp" />
    <source srcSet={`${src}.jpg`} type="image/jpeg" />
    <img src={`${src}.jpg`} alt={alt} {...props} />
  </picture>
);
```

#### Responsive Images

```typescript
const ResponsiveImage = ({ baseSrc, alt }) => (
  <img
    srcSet={`
      ${baseSrc}-400w.jpg 400w,
      ${baseSrc}-800w.jpg 800w,
      ${baseSrc}-1200w.jpg 1200w
    `}
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
    src={`${baseSrc}-800w.jpg`}
    alt={alt}
  />
);
```

#### Lazy Loading

```typescript
const LazyImage = ({ src, alt, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);

  return (
    <div ref={ref => {
      if (ref && !isInView) {
        const observer = new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
        observer.observe(ref);
      }
    }}>
      {isInView && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          style={{ opacity: isLoaded ? 1 : 0 }}
          {...props}
        />
      )}
    </div>
  );
};
```

### Font Optimization

```css
/* Preload critical fonts */
<link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossorigin>

/* Optimize font loading */
@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter-var.woff2') format('woff2');
  font-display: swap; /* Improves loading performance */
  font-weight: 100 900;
}
```

## Monitoring & Metrics

### Core Web Vitals

Track essential performance metrics:

```typescript
// Performance monitoring utility
export const performanceMonitor = {
  // Largest Contentful Paint
  observeLCP: () => {
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log('LCP:', lastEntry.startTime);
    }).observe({ entryTypes: ['largest-contentful-paint'] });
  },

  // First Input Delay
  observeFID: () => {
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        console.log('FID:', entry.processingStart - entry.startTime);
      });
    }).observe({ entryTypes: ['first-input'] });
  },

  // Cumulative Layout Shift
  observeCLS: () => {
    let clsValue = 0;
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      console.log('CLS:', clsValue);
    }).observe({ entryTypes: ['layout-shift'] });
  }
};
```

### Bundle Analysis

```bash
# Analyze bundle size
npm run build:analyze

# Monitor bundle growth
npx bundlesize

# Lighthouse CI for automated testing
npx @lhci/cli autorun
```

### Runtime Performance

```typescript
// Performance profiling in development
const ProfiledComponent = ({ children }) => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const startTime = performance.now();
      
      return () => {
        const endTime = performance.now();
        console.log(`Component render time: ${endTime - startTime}ms`);
      };
    }
  });

  return children;
};
```

## Performance Budget

### Bundle Size Targets

- **Initial Bundle**: < 200KB (gzipped)
- **Route Chunks**: < 100KB (gzipped)
- **Vendor Chunks**: < 150KB (gzipped)
- **Asset Files**: < 500KB total

### Runtime Targets

- **Time to Interactive**: < 3.5s
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

### Configuration

```json
// bundlesize configuration
{
  "bundlesize": [
    {
      "path": "./dist/assets/*.js",
      "maxSize": "200kb"
    },
    {
      "path": "./dist/assets/*.css",
      "maxSize": "50kb"
    }
  ]
}
```

## Best Practices

### Development

1. **Profile Early**: Use React DevTools Profiler during development
2. **Measure Impact**: Test performance before and after changes
3. **Monitor Bundle**: Regularly check bundle size growth
4. **Use Lighthouse**: Run audits on every major change
5. **Optimize Imports**: Review and optimize import statements

### Component Design

1. **Single Responsibility**: Keep components focused
2. **Prop Optimization**: Minimize prop drilling
3. **State Locality**: Keep state close to where it's used
4. **Event Handlers**: Memoize callbacks when needed
5. **Conditional Rendering**: Avoid rendering unnecessary components

### Data Fetching

```typescript
// Optimize data fetching
const useCasesQuery = (filters) => {
  return useQuery({
    queryKey: ['cases', filters],
    queryFn: () => fetchCases(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    enabled: !!filters, // Only fetch when filters exist
  });
};
```

### Performance Testing

```bash
# Build and analyze
npm run build
npm run build:analyze

# Test performance
npm run test:performance

# Lighthouse audit
npx lighthouse http://localhost:3000 --output html --output-path ./lighthouse-report.html
```

## Troubleshooting

### Common Issues

1. **Large Bundle Size**
   - Check for duplicate dependencies
   - Analyze chunk distribution
   - Remove unused imports

2. **Slow Runtime Performance**
   - Profile component renders
   - Check for unnecessary re-renders
   - Optimize expensive calculations

3. **Memory Leaks**
   - Clean up event listeners
   - Cancel pending requests
   - Clear timers and intervals

### Debugging Tools

1. **React DevTools Profiler**
2. **Chrome DevTools Performance tab**
3. **Webpack Bundle Analyzer**
4. **Lighthouse**
5. **WebPageTest**

---

This performance guide should be regularly updated as new optimization techniques become available. Regular performance audits are essential for maintaining optimal user experience.