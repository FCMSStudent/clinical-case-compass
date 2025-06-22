
import React from "react";
import { useMemo, useCallback, useRef, useEffect, useState } from "react";
import { flushSync } from "react-dom";

// ────────────────────────────────────────────────────────────────────────────────
// PERFORMANCE OPTIMIZATION UTILITIES FOR GLASSY VISIONOS UI
// ────────────────────────────────────────────────────────────────────────────────

/**
 * Advanced memoization with custom comparison
 */
export const useDeepMemo = <T>(factory: () => T, deps: unknown[]): T => {
  const ref = useRef<{ deps: unknown[]; value: T }>();
  
  if (!ref.current || !areEqual(ref.current.deps, deps)) {
    ref.current = { deps, value: factory() };
  }
  
  return ref.current.value;
};

/**
 * Deep equality check for memoization
 */
const areEqual = (a: unknown[], b: unknown[]): boolean => {
  if (a.length !== b.length) return false;
  return a.every((val, index) => {
    if (val === b[index]) return true;
    if (typeof val === "object" && typeof b[index] === "object") {
      return JSON.stringify(val) === JSON.stringify(b[index]);
    }
    return false;
  });
};

/**
 * Lazy loading hook with intersection observer
 */
export const useLazyLoad = (options: IntersectionObserverInit = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const elementRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        setIsVisible(true);
        setHasLoaded(true);
        observer.disconnect();
      }
    }, {
      threshold: 0.1,
      rootMargin: "50px",
      ...options,
    });
    
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    
    return () => observer.disconnect();
  }, [options]);
  
  return { elementRef, isVisible, hasLoaded };
};

/**
 * Virtual scrolling utilities
 */
export const useVirtualScroll = <T>(
  items: T[],
  itemHeight: number,
  containerHeight: number,
  overscan: number = 5
) => {
  const [scrollTop, setScrollTop] = useState(0);
  
  const visibleRange = useMemo(() => {
    const start = Math.floor(scrollTop / itemHeight);
    const end = Math.min(
      start + Math.ceil(containerHeight / itemHeight) + overscan,
      items.length
    );
    
    return {
      start: Math.max(0, start - overscan),
      end,
    };
  }, [scrollTop, itemHeight, containerHeight, items.length, overscan]);
  
  const visibleItems = useMemo(() => {
    return items.slice(visibleRange.start, visibleRange.end);
  }, [items, visibleRange]);
  
  const totalHeight = items.length * itemHeight;
  const offsetY = visibleRange.start * itemHeight;
  
  return {
    visibleItems,
    totalHeight,
    offsetY,
    onScroll: (event: React.UIEvent<HTMLDivElement>) => {
      setScrollTop(event.currentTarget.scrollTop);
    },
  };
};

/**
 * Debounced callback hook
 */
export const useDebounce = <T extends (...args: unknown[]) => unknown>(
  callback: T,
  delay: number
): T => {
  const timeoutRef = useRef<NodeJS.Timeout>();
  
  return useCallback(
    ((...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => callback(...args), delay);
    }) as T,
    [callback, delay]
  );
};

/**
 * Throttled callback hook
 */
export const useThrottle = <T extends (...args: unknown[]) => unknown>(
  callback: T,
  delay: number
): T => {
  const lastRun = useRef(Date.now());
  
  return useCallback(
    ((...args: Parameters<T>) => {
      if (Date.now() - lastRun.current >= delay) {
        callback(...args);
        lastRun.current = Date.now();
      }
    }) as T,
    [callback, delay]
  );
};

/**
 * Image preloading utility
 */
export const useImagePreload = (src: string) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  
  useEffect(() => {
    if (!src) return;
    
    const img = new Image();
    img.onload = () => setIsLoaded(true);
    img.onerror = () => setError(true);
    img.src = src;
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);
  
  return { isLoaded, error };
};

/**
 * Batch state updates for performance
 */
export const useBatchUpdate = () => {
  const batchRef = useRef<(() => void)[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout>();
  
  const batchUpdate = useCallback((update: () => void) => {
    batchRef.current.push(update);
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      const updates = [...batchRef.current];
      batchRef.current = [];
      
      // Use React's batching mechanism
      flushSync(() => {
        updates.forEach(update => update());
      });
    }, 0);
  }, []);
  
  return batchUpdate;
};

/**
 * Memory-efficient list rendering
 */
export const useListOptimization = <T>(
  items: T[],
  keyExtractor: (item: T, index: number) => string | number,
  renderItem: (item: T, index: number) => React.ReactNode
) => {
  const memoizedItems = useMemo(() => {
    return items.map((item, index) => ({
      key: keyExtractor(item, index),
      element: renderItem(item, index),
    }));
  }, [items, keyExtractor, renderItem]);
  
  return memoizedItems;
};

/**
 * Lazy component wrapper with performance optimizations
 */
export const createLazyComponent = <T extends React.ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  fallback?: React.ReactNode
) => {
  const LazyComponent = React.lazy(importFunc);
  
  return (props: React.ComponentProps<T>) => {
    return React.createElement(
      React.Suspense,
      { fallback: fallback || React.createElement('div', null, 'Loading...') },
      React.createElement(LazyComponent, props as React.ComponentProps<T>)
    );
  };
};

/**
 * Web Worker utilities for heavy computations
 */
export const useWebWorker = <T, R>(
  workerScript: string,
  data: T
): { result: R | null; loading: boolean; error: Error | null } => {
  const [result, setResult] = useState<R | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const workerRef = useRef<Worker | null>(null);
  
  useEffect(() => {
    if (typeof Window === "undefined") return;
    
    workerRef.current = new Worker(workerScript);
    
    workerRef.current.onmessage = (event) => {
      setResult(event.data);
      setLoading(false);
    };
    
    workerRef.current.onerror = (event) => {
      setError(new Error(event.message));
      setLoading(false);
    };
    
    return () => {
      workerRef.current?.terminate();
    };
  }, [workerScript]);
  
  useEffect(() => {
    if (workerRef.current && data) {
      setLoading(true);
      setError(null);
      workerRef.current.postMessage(data);
    }
  }, [data]);
  
  return { result, loading, error };
};

/**
 * Resource pooling for better memory management
 */
export class ResourcePool<T> {
  private pool: T[] = [];
  private factory: () => T;
  private maxSize: number;
  
  constructor(factory: () => T, maxSize: number = 10) {
    this.factory = factory;
    this.maxSize = maxSize;
  }
  
  acquire(): T {
    return this.pool.pop() || this.factory();
  }
  
  release(resource: T): void {
    if (this.pool.length < this.maxSize) {
      this.pool.push(resource);
    }
  }
  
  clear(): void {
    this.pool = [];
  }
}

/**
 * Performance monitoring hook
 */
export const usePerformanceMonitor = (componentName: string) => {
  const renderCount = useRef(0);
  const lastRenderTime = useRef(performance.now());
  
  useEffect(() => {
    renderCount.current++;
    const now = performance.now();
    const renderTime = now - lastRenderTime.current;
    
    if (process.env.NODE_ENV === "development") {
      console.log(`${componentName} rendered ${renderCount.current} times in ${renderTime.toFixed(2)}ms`);
    }
    
    lastRenderTime.current = now;
  });
  
  return {
    renderCount: renderCount.current,
    getRenderTime: () => performance.now() - lastRenderTime.current,
  };
};

/**
 * Optimized event listener management
 */
export const useOptimizedEventListener = <K extends keyof WindowEventMap>(
  eventType: K,
  handler: (event: WindowEventMap[K]) => void,
  options?: AddEventListenerOptions
) => {
  const handlerRef = useRef(handler);
  handlerRef.current = handler;
  
  useEffect(() => {
    const wrappedHandler = (event: WindowEventMap[K]) => {
      handlerRef.current(event);
    };
    
    window.addEventListener(eventType, wrappedHandler, options);
    return () => window.removeEventListener(eventType, wrappedHandler, options);
  }, [eventType, options]);
};

/**
 * Cache management for expensive computations
 */
export class ComputationCache<K, V> {
  private cache = new Map<K, { value: V; timestamp: number }>();
  private maxAge: number;
  private maxSize: number;
  
  constructor(maxAge: number = 5 * 60 * 1000, maxSize: number = 100) {
    this.maxAge = maxAge;
    this.maxSize = maxSize;
  }
  
  get(key: K): V | undefined {
    const entry = this.cache.get(key);
    if (!entry) return undefined;
    
    if (Date.now() - entry.timestamp > this.maxAge) {
      this.cache.delete(key);
      return undefined;
    }
    
    return entry.value;
  }
  
  set(key: K, value: V): void {
    // Evict oldest entries if cache is full
    if (this.cache.size >= this.maxSize) {
      const oldestKey = this.cache.keys().next().value;
      if (oldestKey !== undefined) {
        this.cache.delete(oldestKey);
      }
    }
    
    this.cache.set(key, { value, timestamp: Date.now() });
  }
  
  clear(): void {
    this.cache.clear();
  }
  
  size(): number {
    return this.cache.size;
  }
}

/**
 * Hook for using computation cache
 */
export const useComputationCache = <K, V>(
  key: K,
  compute: () => V,
  dependencies: unknown[] = []
): V => {
  const cacheRef = useRef<ComputationCache<K, V>>();
  
  if (!cacheRef.current) {
    cacheRef.current = new ComputationCache();
  }
  
  // Always compute the value with useMemo
  const computedValue = useMemo(() => {
    const cachedValue = cacheRef.current!.get(key);
    if (cachedValue !== undefined) {
      return cachedValue;
    }
    
    const newValue = compute();
    cacheRef.current!.set(key, newValue);
    return newValue;
  }, [key, ...dependencies]);
  
  return computedValue;
};

/**
 * Virtualization hook for large lists (preferred)
 */
export const useVirtualization = <T>(
  items: T[],
  itemHeight: number,
  containerHeight: number,
  overscan: number = 5
) => {
  return useVirtualScroll(items, itemHeight, containerHeight, overscan);
};
