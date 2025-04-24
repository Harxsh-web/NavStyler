import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useLocation } from "wouter";
import { TransitionType } from "@/components/PageTransition";

interface PageTransitionContextType {
  previousRoute: string | null;
  currentRoute: string;
  transitionDirection: "forward" | "backward" | null;
  determineTransitionType: (route: string) => TransitionType;
}

const PageTransitionContext = createContext<PageTransitionContextType | null>(null);

// Define which routes should use which transition types
const ROUTE_TRANSITIONS: Record<string, TransitionType> = {
  "/": "fade",
  "/auth": "slide-up",
  "/admin": "slide-left",
  "/checkout": "slide-left",
  "/payment-success": "scale",
  "/admin/analytics": "slide-left",
  "/not-found": "fade",
};

// Define route relationships for navigation direction
const ROUTE_RELATIONSHIPS: Record<string, { parent: string; children: string[] }> = {
  "/": {
    parent: "",
    children: ["/auth", "/checkout", "/admin"],
  },
  "/auth": {
    parent: "/",
    children: [],
  },
  "/admin": {
    parent: "/",
    children: ["/admin/analytics"],
  },
  "/admin/analytics": {
    parent: "/admin",
    children: [],
  },
  "/checkout": {
    parent: "/",
    children: ["/payment-success"],
  },
  "/payment-success": {
    parent: "/checkout",
    children: [],
  },
};

export const PageTransitionProvider = ({ children }: { children: ReactNode }) => {
  const [location] = useLocation();
  const [previousRoute, setPreviousRoute] = useState<string | null>(null);
  const [transitionDirection, setTransitionDirection] = useState<"forward" | "backward" | null>(null);

  useEffect(() => {
    if (previousRoute && previousRoute !== location) {
      // Determine if we're going forward or backward
      const previousRelationship = ROUTE_RELATIONSHIPS[previousRoute];
      const currentRelationship = ROUTE_RELATIONSHIPS[location];

      if (previousRelationship?.children.includes(location)) {
        setTransitionDirection("forward");
      } else if (currentRelationship?.parent === previousRoute) {
        setTransitionDirection("forward");
      } else if (previousRelationship?.parent === location) {
        setTransitionDirection("backward");
      } else {
        // If relationship isn't defined, just go with default transitions
        setTransitionDirection(null);
      }
    }

    setPreviousRoute(location);
  }, [location, previousRoute]);

  const determineTransitionType = (route: string): TransitionType => {
    // Get the default transition for this route
    const defaultTransition = ROUTE_TRANSITIONS[route] || "fade";

    // If we have a transition direction, we might modify the transition
    if (transitionDirection === "backward") {
      // Reverse the direction of slide transitions
      if (defaultTransition === "slide-left") return "slide-right";
      if (defaultTransition === "slide-right") return "slide-left";
      if (defaultTransition === "slide-up") return "slide-down";
      if (defaultTransition === "slide-down") return "slide-up";
    }

    return defaultTransition;
  };

  return (
    <PageTransitionContext.Provider
      value={{
        previousRoute,
        currentRoute: location,
        transitionDirection,
        determineTransitionType,
      }}
    >
      {children}
    </PageTransitionContext.Provider>
  );
};

export const usePageTransition = () => {
  const context = useContext(PageTransitionContext);
  if (!context) {
    throw new Error("usePageTransition must be used within a PageTransitionProvider");
  }
  return context;
};