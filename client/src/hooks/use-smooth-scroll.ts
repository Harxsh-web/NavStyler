import { useEffect } from 'react';
import { setupSmoothScrolling } from '@/lib/smoothScroll';

interface SmoothScrollOptions {
  offset?: number;
  behavior?: ScrollBehavior;
}

/**
 * Hook to enable smooth scrolling for anchor links
 * This combines both CSS-based smooth scrolling and our custom implementation
 */
export function useSmoothScroll(options: SmoothScrollOptions = {}) {
  // Convert options.behavior to a dependency-safe string value for the dependency array
  const behaviorValue = options.behavior || '';
  
  useEffect(() => {
    // Set up CSS-based smooth scrolling if specified
    if (options.behavior === 'smooth') {
      document.documentElement.style.scrollBehavior = 'smooth';
    }

    // Set up our custom JS-based smooth scrolling
    setupSmoothScrolling();

    // Clean up
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, [behaviorValue]); // Use the stable reference
}

export default useSmoothScroll;