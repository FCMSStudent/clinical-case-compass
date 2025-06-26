import { useCallback, useEffect, useRef, RefObject } from 'react';

// Hook for managing reduced motion preferences
export const useReducedMotion = () => {
  const mediaQuery = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)')
    : null;
  
  return mediaQuery?.matches ?? false;
};

// Hook for screen reader announcements
export const useScreenReaderAnnouncements = () => {
  const announce = useCallback((
    message: string, 
    priority: 'polite' | 'assertive' = 'polite',
    delay: number = 100
  ) => {
    if (typeof window === 'undefined') return;

    // Create announcement element
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    announcement.style.width = '1px';
    announcement.style.height = '1px';
    announcement.style.overflow = 'hidden';

    document.body.appendChild(announcement);

    // Add the message after a delay to ensure screen readers pick it up
    setTimeout(() => {
      announcement.textContent = message;
    }, delay);

    // Remove the element after announcement
    setTimeout(() => {
      if (announcement.parentNode) {
        document.body.removeChild(announcement);
      }
    }, delay + 2000);
  }, []);

  return announce;
};

// Hook for keyboard navigation in grids
export const useKeyboardNavigation = (
  gridRef: RefObject<HTMLDivElement>,
  options: {
    enabled?: boolean;
    gridCols?: number;
    onEnter?: (element: HTMLElement) => void;
  } = {}
) => {
  const { enabled = true, gridCols = 4, onEnter } = options;

  useEffect(() => {
    if (!enabled || !gridRef.current) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gridRef.current) return;
      
      const focusableElements = Array.from(
        gridRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ) as HTMLElement[];

      if (focusableElements.length === 0) return;

      const currentElement = document.activeElement as HTMLElement;
      const currentIndex = focusableElements.indexOf(currentElement);

      if (currentIndex === -1) return;

      let nextIndex = currentIndex;

      switch (e.key) {
        case 'ArrowRight':
          e.preventDefault();
          nextIndex = (currentIndex + 1) % focusableElements.length;
          break;
          
        case 'ArrowLeft':
          e.preventDefault();
          nextIndex = currentIndex === 0 ? 
            focusableElements.length - 1 : currentIndex - 1;
          break;
          
        case 'ArrowDown':
          e.preventDefault();
          nextIndex = Math.min(
            currentIndex + gridCols, 
            focusableElements.length - 1
          );
          break;
          
        case 'ArrowUp':
          e.preventDefault();
          nextIndex = Math.max(currentIndex - gridCols, 0);
          break;

        case 'Home':
          e.preventDefault();
          nextIndex = 0;
          break;

        case 'End':
          e.preventDefault();
          nextIndex = focusableElements.length - 1;
          break;

        case 'Enter':
        case ' ':
          if (onEnter && currentElement) {
            e.preventDefault();
            onEnter(currentElement);
          }
          return;

        default:
          return;
      }

      focusableElements[nextIndex]?.focus();
    };

    const gridElement = gridRef.current;
    gridElement.addEventListener('keydown', handleKeyDown);

    return () => {
      gridElement.removeEventListener('keydown', handleKeyDown);
    };
  }, [gridRef, enabled, gridCols, onEnter]);
};

// Hook for focus management
export const useFocusManagement = () => {
  const focusElementRef = useRef<HTMLElement | null>(null);

  const saveFocus = useCallback(() => {
    focusElementRef.current = document.activeElement as HTMLElement;
  }, []);

  const restoreFocus = useCallback(() => {
    if (focusElementRef.current && document.contains(focusElementRef.current)) {
      focusElementRef.current.focus();
    }
  }, []);

  const trapFocus = useCallback((containerRef: RefObject<HTMLElement>) => {
    if (!containerRef.current) return;

    const focusableElements = containerRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>;

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (!firstElement || !lastElement) return;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        restoreFocus();
      }
    };

    document.addEventListener('keydown', handleTabKey);
    document.addEventListener('keydown', handleEscapeKey);

    // Focus first element
    firstElement.focus();

    return () => {
      document.removeEventListener('keydown', handleTabKey);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [restoreFocus]);

  return { saveFocus, restoreFocus, trapFocus };
};

// Hook for live region updates
export const useLiveRegion = () => {
  const liveRegionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Create live region if it doesn't exist
    if (!liveRegionRef.current) {
      const liveRegion = document.createElement('div');
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'false');
      liveRegion.className = 'sr-only';
      liveRegion.id = 'dashboard-live-region';
      document.body.appendChild(liveRegion);
      liveRegionRef.current = liveRegion;
    }

    return () => {
      if (liveRegionRef.current && liveRegionRef.current.parentNode) {
        document.body.removeChild(liveRegionRef.current);
      }
    };
  }, []);

  const updateLiveRegion = useCallback((message: string) => {
    if (liveRegionRef.current) {
      liveRegionRef.current.textContent = message;
    }
  }, []);

  return updateLiveRegion;
};

// Hook for accessible animations
export const useAccessibleAnimation = () => {
  const prefersReducedMotion = useReducedMotion();

  const getAnimationVariants = useCallback((
    normalVariants: any,
    reducedVariants?: any
  ) => {
    if (prefersReducedMotion && reducedVariants) {
      return reducedVariants;
    }
    if (prefersReducedMotion) {
      // Remove or reduce animations
      return {
        ...normalVariants,
        transition: { duration: 0 }
      };
    }
    return normalVariants;
  }, [prefersReducedMotion]);

  const shouldAnimate = !prefersReducedMotion;

  return { getAnimationVariants, shouldAnimate, prefersReducedMotion };
};