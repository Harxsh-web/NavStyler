import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

/**
 * PageTransition component wraps page content with animations
 * for smooth transitions between pages
 */
export function PageTransition({ children, className = "" }: PageTransitionProps) {
  // Animation variants for the page transitions
  const variants = {
    initial: {
      opacity: 0,
      y: 10,
    },
    enter: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.61, 1, 0.88, 1],
      }
    },
    exit: {
      opacity: 0,
      y: 10,
      transition: {
        duration: 0.3,
        ease: [0.37, 0, 0.63, 1],
      }
    }
  };

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