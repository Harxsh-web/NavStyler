import { Link } from "wouter";
import { TransitionType } from "./PageTransition";

interface TransitionLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  transitionType?: TransitionType;
  onClick?: () => void;
}

/**
 * TransitionLink works like a regular Link but passes transition information
 * to the page transition context for more control over animations
 */
export function TransitionLink({
  href,
  children,
  className = "",
  transitionType,
  onClick,
}: TransitionLinkProps) {
  // We can set data attributes to pass information to our page transition system
  const handleClick = (e: React.MouseEvent) => {
    if (transitionType) {
      // Set a data attribute on the body to pass the transition type
      document.body.dataset.transitionType = transitionType;
    }
    
    if (onClick) {
      onClick();
    }
  };

  return (
    <Link 
      href={href} 
      onClick={handleClick}
      className={className}
    >
      {children}
    </Link>
  );
}