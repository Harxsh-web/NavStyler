import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { queryClient, apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { useLocalStorage } from '../hooks/use-local-storage';

// Theme settings type from backend schema
export interface ThemeSettings {
  id: number;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  textColor: string;
  backgroundColor: string;
  fontPrimary: string;
  fontSecondary: string;
  buttonRadius: string;
  buttonStyle: string;
  cardStyle: string;
  layoutStyle: string;
  isDarkMode: boolean;
  isHighContrast: boolean;
  headerStyle: string;
  footerStyle: string;
  customCss?: string;
  appliesGlobally: boolean;
  updatedAt: Date;
}

// Properties that we can update
export type ThemeSettingsUpdate = Partial<Omit<ThemeSettings, 'id' | 'updatedAt'>>;

interface ThemeContextType {
  // Current active theme
  theme: ThemeSettings | null;
  isLoading: boolean;
  error: Error | null;
  
  // All available themes (for admin)
  themes: ThemeSettings[];
  themesLoading: boolean;
  themesError: Error | null;
  
  // Actions
  createTheme: (data: ThemeSettingsUpdate) => Promise<ThemeSettings>;
  updateTheme: (id: number, data: ThemeSettingsUpdate) => Promise<ThemeSettings | undefined>;
  deleteTheme: (id: number) => Promise<boolean>;
  setActiveTheme: (id: number) => Promise<ThemeSettings | undefined>;
  
  // CSS variables generated from theme
  cssVariables: Record<string, string>;
  
  // Dark mode controls
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const defaultTheme: ThemeSettings = {
  id: 0,
  name: 'Default',
  primaryColor: '#4f46e5',
  secondaryColor: '#0ea5e9', 
  accentColor: '#f59e0b',
  textColor: '#111827',
  backgroundColor: '#e6f1fe', // Changed from white to light blue
  fontPrimary: 'Inter',
  fontSecondary: 'Merriweather',
  buttonRadius: '0.5rem',
  buttonStyle: 'filled',
  cardStyle: 'shadow',
  layoutStyle: 'modern',
  isDarkMode: false,
  isHighContrast: false,
  headerStyle: 'default',
  footerStyle: 'standard',
  customCss: '',
  appliesGlobally: true,
  updatedAt: new Date(),
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeSettingsProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const [cssVariables, setCssVariables] = useState<Record<string, string>>({});
  const [isDarkMode, setIsDarkMode] = useLocalStorage<boolean>('dark-mode', false);
  
  // Fetch the active theme
  const { 
    data: theme, 
    error, 
    isLoading,
    refetch: refetchTheme
  } = useQuery<ThemeSettings | null, Error>({
    queryKey: ['/api/themes/active'],
    queryFn: async () => {
      try {
        const res = await fetch('/api/themes/active');
        if (!res.ok) {
          if (res.status === 404) {
            return null;
          }
          throw new Error('Failed to fetch active theme');
        }
        return await res.json();
      } catch (err) {
        console.error('Error fetching theme:', err);
        return null;
      }
    },
    staleTime: 0, // Always refetch the theme when requested
  });
  
  // Fetch all themes (for admin panel)
  const { 
    data: themes = [], 
    error: themesError, 
    isLoading: themesLoading,
    refetch: refetchThemes
  } = useQuery<ThemeSettings[], Error>({
    queryKey: ['/api/themes'],
    queryFn: async () => {
      try {
        const res = await fetch('/api/themes');
        if (!res.ok) {
          throw new Error('Failed to fetch themes');
        }
        return await res.json();
      } catch (err) {
        console.error('Error fetching themes:', err);
        return [];
      }
    },
    staleTime: 0, // Always refetch themes when requested
  });
  
  // Create a new theme
  const createTheme = async (data: ThemeSettingsUpdate): Promise<ThemeSettings> => {
    const res = await apiRequest('POST', '/api/themes', data);
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Failed to create theme');
    }
    
    const newTheme = await res.json();
    
    // If this is set as the active theme, update our data immediately
    if (newTheme.appliesGlobally) {
      queryClient.setQueryData(['/api/themes/active'], newTheme);
      updateCssVariables(newTheme);
      refetchTheme();
    }
    
    // Update theme list
    refetchThemes();
    
    toast({
      title: 'Theme created',
      description: `Theme "${newTheme.name}" has been created successfully.`,
    });
    
    return newTheme;
  };
  
  // Update a theme
  const updateTheme = async (id: number, data: ThemeSettingsUpdate): Promise<ThemeSettings | undefined> => {
    const res = await apiRequest('PATCH', `/api/themes/${id}`, data);
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Failed to update theme');
    }
    
    const updatedTheme = await res.json();
    
    // If this is the active theme, update it immediately
    if (updatedTheme.appliesGlobally) {
      queryClient.setQueryData(['/api/themes/active'], updatedTheme);
      updateCssVariables(updatedTheme);
      
      // Force refetch to ensure we have the latest data
      refetchTheme();
    }
    
    // Update theme list
    refetchThemes();
    
    toast({
      title: 'Theme updated',
      description: `Theme "${updatedTheme.name}" has been updated successfully.`,
    });
    
    return updatedTheme;
  };
  
  // Delete a theme
  const deleteTheme = async (id: number): Promise<boolean> => {
    const res = await apiRequest('DELETE', `/api/themes/${id}`);
    if (!res.ok) {
      if (res.status !== 204) {
        const error = await res.json();
        throw new Error(error.message || 'Failed to delete theme');
      }
    }
    
    // Force refetch of all themes
    refetchThemes();
    
    toast({
      title: 'Theme deleted',
      description: 'The theme has been deleted successfully.',
    });
    
    return true;
  };
  
  // Set a theme as active
  const setActiveTheme = async (id: number): Promise<ThemeSettings | undefined> => {
    const res = await apiRequest('POST', `/api/themes/${id}/set-active`);
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Failed to set active theme');
    }
    
    const updatedTheme = await res.json();
    
    // Update theme data immediately
    queryClient.setQueryData(['/api/themes/active'], updatedTheme);
    updateCssVariables(updatedTheme);
    
    // Force refetch to ensure we have the latest data
    refetchTheme();
    refetchThemes();
    
    toast({
      title: 'Theme activated',
      description: `Theme "${updatedTheme.name}" is now the active theme.`,
    });
    
    return updatedTheme;
  };
  
  // Update CSS variables when the theme changes
  useEffect(() => {
    if (theme) {
      updateCssVariables(theme);
    } else if (!isLoading) {
      updateCssVariables(defaultTheme);
    }
  }, [theme, isLoading]);
  
  // Apply CSS variables to the document root
  useEffect(() => {
    const root = document.documentElement;
    
    Object.entries(cssVariables).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });
    
    // Store CSS variables in localStorage for immediate reload support
    localStorage.setItem('theme-css-variables', JSON.stringify(cssVariables));
    
    return () => {
      // Clean up when unmounting (not really needed for root variables)
      Object.keys(cssVariables).forEach(property => {
        root.style.removeProperty(property);
      });
    };
  }, [cssVariables]);
  
  // Load cached CSS variables on initial load for faster visual display
  useEffect(() => {
    const cachedVariables = localStorage.getItem('theme-css-variables');
    if (cachedVariables) {
      try {
        const variables = JSON.parse(cachedVariables);
        const root = document.documentElement;
        
        // Apply cached variables for immediate display
        Object.entries(variables).forEach(([property, value]) => {
          root.style.setProperty(property, value as string);
        });
        
        // Special handling for background color - ensure it's blue if not specifically set
        if (!variables['--background'] || variables['--background'] === '#ffffff') {
          root.style.setProperty('--background', '#e6f1fe');
          // Update the cache to persist this change
          const updatedVariables = {...variables, '--background': '#e6f1fe'};
          localStorage.setItem('theme-css-variables', JSON.stringify(updatedVariables));
        }
      } catch (err) {
        console.error('Error parsing cached theme variables:', err);
        // On error, clear the cache to prevent persistent issues
        localStorage.removeItem('theme-css-variables');
      }
    }
  }, []);
  
  // Convert theme settings to CSS variables
  const updateCssVariables = (theme: ThemeSettings) => {
    // Clear the localStorage cache to prevent stale values
    localStorage.removeItem('theme-css-variables');
    
    // Ensure background color is always blue, never white
    const backgroundColor = theme.backgroundColor === '#ffffff' ? '#e6f1fe' : theme.backgroundColor;
    
    const variables: Record<string, string> = {
      '--primary': theme.primaryColor,
      '--secondary': theme.secondaryColor,
      '--accent': theme.accentColor,
      '--text': theme.textColor,
      '--background': backgroundColor,
      '--font-primary': theme.fontPrimary,
      '--font-secondary': theme.fontSecondary,
      '--button-radius': theme.buttonRadius,
      '--card-style': theme.cardStyle,
    };
    
    console.log('Updating theme with background color:', backgroundColor);
    setCssVariables(variables);
  };
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    
    // Apply dark mode classes and update CSS variables
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
      const darkVariables = {
        ...cssVariables,
        '--background': '#121212',
        '--text': '#ffffff',
      };
      
      // Apply dark mode variables
      const root = document.documentElement;
      Object.entries(darkVariables).forEach(([property, value]) => {
        root.style.setProperty(property, value);
      });
      
      // Save dark mode variables to localStorage
      localStorage.setItem('theme-css-variables', JSON.stringify(darkVariables));
    } else {
      document.documentElement.classList.remove('dark');
      
      // Restore light mode variables
      if (theme) {
        updateCssVariables(theme);
      } else {
        updateCssVariables(defaultTheme);
      }
    }
  };
  
  // Apply dark mode setting on initial load
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      const darkVariables = {
        ...cssVariables,
        '--background': '#121212',
        '--text': '#ffffff',
      };
      
      // Apply dark mode variables
      const root = document.documentElement;
      Object.entries(darkVariables).forEach(([property, value]) => {
        root.style.setProperty(property, value);
      });
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider
      value={{
        theme: theme || null,
        isLoading,
        error: error || null,
        themes,
        themesLoading,
        themesError: themesError || null,
        createTheme,
        updateTheme,
        deleteTheme,
        setActiveTheme,
        cssVariables,
        isDarkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeSettings() {
  const context = useContext(ThemeContext);
  if (context === null) {
    throw new Error('useThemeSettings must be used within a ThemeSettingsProvider');
  }
  return context;
}