import { useEffect } from 'react';

/**
 * A custom hook that adds smooth scrolling behavior for anchor links
 * @param options - ScrollBehavior options
 */
export function useSmoothScroll(options: { 
  offset?: number;  // Offset from the top (useful for fixed headers)
  behavior?: ScrollBehavior;  // 'auto', 'smooth', etc.
} = {}) {
  const { 
    offset = 100,  // Default offset for fixed header
    behavior = 'smooth'  // Default to smooth scrolling
  } = options;

  useEffect(() => {
    // Handler for click events on anchor links
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Find the closest anchor element
      const link = target.closest('a');
      
      // Check if it's an anchor link on the same page
      if (link && 
          link.href.includes('#') && 
          (link.host === window.location.host)) {
        
        const hash = link.hash;
        
        // If there's a hash and we can find the element
        if (hash && hash !== '#') {
          try {
            const targetElement = document.querySelector(hash);
            
            if (targetElement) {
              e.preventDefault();
              
              const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
              
              // Scroll to the element with offset
              window.scrollTo({
                top: targetPosition - offset,
                behavior: behavior,
              });
              
              // Optionally update the URL hash
              history.pushState(null, '', hash);
            }
          } catch (error) {
            console.error('Error during smooth scroll:', error);
          }
        }
      }
    };

    // Add the event listener
    document.addEventListener('click', handleClick);
    
    // Cleanup
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [offset, behavior]);
}