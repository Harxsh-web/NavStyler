import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

// Hook to use the theme context
function useTheme() {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}

// ThemeProvider component
function ThemeProvider({
  children,
  defaultTheme = "light", // Set default theme to light
  storageKey = "ui-theme",
  ...props
}: ThemeProviderProps) {
  // No need for state as we're always using light theme
  
  // Force light theme on all pages
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const root = window.document.documentElement;
    root.classList.remove("dark");
    root.classList.add("light");
    
    // Store the theme preference
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(storageKey, "light");
      }
    } catch (error) {
      console.error("Error setting localStorage:", error);
    }
  }, [storageKey]);

  // Always provide light theme regardless of what's requested
  const value = {
    theme: "light" as Theme,
    setTheme: () => {
      // Do nothing - we always use light theme
      try {
        if (typeof window !== 'undefined') {
          localStorage.setItem(storageKey, "light");
        }
      } catch (error) {
        console.error("Error setting localStorage:", error);
      }
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export { ThemeProvider, useTheme };