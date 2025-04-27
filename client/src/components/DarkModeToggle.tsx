import { Moon, Sun } from 'lucide-react';
import { useThemeSettings } from '@/hooks/use-theme-settings';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';

export function DarkModeToggle({ variant = 'default' }: { variant?: 'default' | 'minimal' }) {
  const { isDarkMode, toggleDarkMode } = useThemeSettings();

  if (variant === 'minimal') {
    return (
      <Toggle 
        aria-label="Toggle dark mode"
        className="w-10 h-10 p-0"
        pressed={isDarkMode}
        onPressedChange={toggleDarkMode}
      >
        {isDarkMode ? (
          <Sun className="h-4 w-4 text-yellow-500" />
        ) : (
          <Moon className="h-4 w-4 text-slate-700" />
        )}
      </Toggle>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleDarkMode}
      className="transition-all duration-300"
    >
      {isDarkMode ? (
        <Sun className="h-5 w-5 text-yellow-500" />
      ) : (
        <Moon className="h-5 w-5 text-slate-700" />
      )}
      <span className="sr-only">Toggle dark mode</span>
    </Button>
  );
}