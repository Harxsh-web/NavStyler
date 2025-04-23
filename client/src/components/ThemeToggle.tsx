import { Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

// Simple light theme icon button - does nothing when clicked as we're always in light mode
export function ThemeToggle() {
  return (
    <Button variant="outline" size="icon" className="relative h-8 w-8 rounded-full">
      <Sun className="h-4 w-4" />
      <span className="sr-only">Light theme</span>
    </Button>
  );
}