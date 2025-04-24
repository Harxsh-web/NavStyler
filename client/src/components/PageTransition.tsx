import { motion } from "framer-motion";
import { ReactNode } from "react";
import { useLocation } from "wouter";
import { usePageTransition } from "@/hooks/use-page-transition";

export type TransitionType = 
  | "fade"
  | "slide-up"
  | "slide-down"
  | "slide-left"
  | "slide-right"
  | "scale"
  | "rotate"
  | "flip";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
  transitionType?: TransitionType;
}

/**
 * PageTransition component wraps page content with animations
 * for smooth transitions between pages based on route
 */
export function PageTransition({ 
  children, 
  className = "",
  transitionType 
}: PageTransitionProps) {
  const [location] = useLocation();
  // Use our custom transition context to get intelligent transition effects
  const { determineTransitionType, transitionDirection } = usePageTransition();

  // Choose transition type based on context if not explicitly provided
  let determinedTransitionType = transitionType;
  
  if (!determinedTransitionType) {
    // If we're going backwards in navigation, the context will provide a reversed transition
    determinedTransitionType = determineTransitionType(location);
    console.log(`Transitioning to ${location} with type ${determinedTransitionType} (${transitionDirection})`);
  }
  
  // Define animation variants for different transition types
  const getVariants = (type: TransitionType) => {
    switch (type) {
      case "fade":
        return {
          initial: { opacity: 0 },
          enter: { 
            opacity: 1,
            transition: { duration: 0.4, ease: [0.61, 1, 0.88, 1] }
          },
          exit: { 
            opacity: 0,
            transition: { duration: 0.3, ease: [0.37, 0, 0.63, 1] }
          }
        };
        
      case "slide-up":
        return {
          initial: { opacity: 0, y: 20 },
          enter: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.4, ease: [0.61, 1, 0.88, 1] }
          },
          exit: { 
            opacity: 0, 
            y: 20,
            transition: { duration: 0.3, ease: [0.37, 0, 0.63, 1] }
          }
        };
        
      case "slide-down":
        return {
          initial: { opacity: 0, y: -20 },
          enter: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.4, ease: [0.61, 1, 0.88, 1] }
          },
          exit: { 
            opacity: 0, 
            y: -20,
            transition: { duration: 0.3, ease: [0.37, 0, 0.63, 1] }
          }
        };
        
      case "slide-left":
        return {
          initial: { opacity: 0, x: 20 },
          enter: { 
            opacity: 1, 
            x: 0,
            transition: { duration: 0.4, ease: [0.61, 1, 0.88, 1] }
          },
          exit: { 
            opacity: 0, 
            x: -20,
            transition: { duration: 0.3, ease: [0.37, 0, 0.63, 1] }
          }
        };
        
      case "slide-right":
        return {
          initial: { opacity: 0, x: -20 },
          enter: { 
            opacity: 1, 
            x: 0,
            transition: { duration: 0.4, ease: [0.61, 1, 0.88, 1] }
          },
          exit: { 
            opacity: 0, 
            x: 20,
            transition: { duration: 0.3, ease: [0.37, 0, 0.63, 1] }
          }
        };
        
      case "scale":
        return {
          initial: { opacity: 0, scale: 0.9 },
          enter: { 
            opacity: 1, 
            scale: 1,
            transition: { duration: 0.4, ease: [0.61, 1, 0.88, 1] }
          },
          exit: { 
            opacity: 0, 
            scale: 0.95,
            transition: { duration: 0.3, ease: [0.37, 0, 0.63, 1] }
          }
        };
        
      case "rotate":
        return {
          initial: { opacity: 0, rotate: -5 },
          enter: { 
            opacity: 1, 
            rotate: 0,
            transition: { duration: 0.4, ease: [0.61, 1, 0.88, 1] }
          },
          exit: { 
            opacity: 0, 
            rotate: 5,
            transition: { duration: 0.3, ease: [0.37, 0, 0.63, 1] }
          }
        };
        
      case "flip":
        return {
          initial: { opacity: 0, rotateY: 90 },
          enter: { 
            opacity: 1, 
            rotateY: 0,
            transition: { duration: 0.5, ease: [0.61, 1, 0.88, 1] }
          },
          exit: { 
            opacity: 0, 
            rotateY: -90,
            transition: { duration: 0.4, ease: [0.37, 0, 0.63, 1] }
          }
        };
        
      default:
        return {
          initial: { opacity: 0 },
          enter: { 
            opacity: 1,
            transition: { duration: 0.4 }
          },
          exit: { 
            opacity: 0,
            transition: { duration: 0.3 }
          }
        };
    }
  };

  const variants = getVariants(determinedTransitionType);

  return (
    <motion.div
      initial="initial"
      animate="enter"
      exit="exit"
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}