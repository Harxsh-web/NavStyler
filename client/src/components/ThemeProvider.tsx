import React, { createContext, useContext, useEffect } from "react";

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
  theme: "light",
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

// ThemeProvider component that always forces light theme
function ThemeProvider({
  children,
  storageKey = "ui-theme",
  ...props
}: ThemeProviderProps) {
  
  // Apply light theme immediately and on mount
  useEffect(() => {
    // Apply light theme to the document
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.add("light");
    
    // Store light theme in localStorage
    try {
      localStorage.setItem(storageKey, "light");
    } catch (error) {
      console.error("Error setting localStorage:", error);
    }
    
    // Force light theme on media change
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    };
    
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [storageKey]);

  // Our context value never changes - always light theme
  const value: ThemeProviderState = {
    theme: "light",
    setTheme: () => {
      // Always set to light theme regardless of input
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      try {
        localStorage.setItem(storageKey, "light");
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