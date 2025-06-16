import { useEffect, useRef } from 'react';

/**
 * Options for the useAutoSave hook.
 */
interface UseAutoSaveOptions<T> {
  data: T;
  /**
   * Function to call when saving data.
   * It is recommended to memoize this function using `useCallback` in the parent component
   * to prevent unnecessary effect re-runs if the function reference changes on every render.
   */
  onSave: () => Promise<void> | void;
  debounceMs?: number;
  enabled?: boolean;
}

export const useAutoSave = <T>({
  data,
  onSave,
  debounceMs = 2000,
  enabled = true,
}: UseAutoSaveOptions<T>) => {
  const timeoutRef = useRef<NodeJS.Timeout>();
  const previousDataRef = useRef(data);

  useEffect(() => {
    if (!enabled) return;

    // Compare current data with previous data
    // Note: JSON.stringify is used for simplicity here. For very large or complex data structures,
    // this might not be the most performant method. Alternative deep comparison libraries
    // could be considered if performance issues arise.
    const hasChanged = JSON.stringify(data) !== JSON.stringify(previousDataRef.current);
    
    if (hasChanged) {
      // Clear existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set new timeout
      timeoutRef.current = setTimeout(() => {
        onSave();
        previousDataRef.current = data;
      }, debounceMs);
    }

    // Cleanup function
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [data, onSave, debounceMs, enabled]);
};
