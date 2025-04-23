/**
 * Utility function for smooth scrolling to a target element
 * This provides more control than the CSS scroll-behavior: smooth
 */
export function smoothScrollTo(
  targetId: string,
  options: {
    offset?: number;
    duration?: number;
    callback?: () => void;
  } = {}
): void {
  const { 
    offset = 100, 
    duration = 500,
    callback 
  } = options;
  
  const targetElement = document.getElementById(targetId);
  
  if (!targetElement) {
    console.warn(`Element with id "${targetId}" not found`);
    return;
  }
  
  const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime: number | null = null;
  
  function animation(currentTime: number) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const easeInOut = progress => progress < 0.5
      ? 2 * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 2) / 2;
    
    window.scrollTo(0, startPosition + distance * easeInOut(progress));
    
    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    } else if (callback) {
      callback();
    }
  }
  
  requestAnimationFrame(animation);
}

/**
 * Hook up all anchor links on the page to use smooth scrolling
 * Use this in your main layout component
 */
export function setupSmoothScrolling(): void {
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    const anchor = target.closest('a');
    
    if (!anchor) return;
    
    const href = anchor.getAttribute('href');
    
    if (!href || !href.startsWith('#')) return;
    
    const targetId = href.substring(1);
    
    if (!targetId) return;
    
    event.preventDefault();
    
    smoothScrollTo(targetId, {
      offset: 100,
      duration: 800
    });
  });
}

export default {
  smoothScrollTo,
  setupSmoothScrolling
};