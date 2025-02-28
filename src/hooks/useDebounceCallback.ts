import { useCallback, useEffect, useRef } from 'react';

/**
 * Custom hook for debouncing a callback function.
 * @param callback - The function to debounce.
 * @param delay - The debounce delay in milliseconds.
 * @returns A debounced version of the callback function.
 */
const useDebouncedCallback = (
  callback: (...args: unknown[]) => void,
  delay: number,
) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedCallback = useCallback(
    (...args: unknown[]) => {
      // Clear the previous timeout if it exists
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set a new timeout
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay],
  );

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedCallback;
};

export default useDebouncedCallback;
