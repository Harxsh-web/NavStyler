import { Router } from 'express';
import { z } from 'zod';
import { insertThemeSettingsSchema } from '@shared/schema';
import { storage } from './storage';
import { isAdmin, isAuthenticated } from './auth';

export const themeRouter = Router();

// Get all theme settings - admin only
themeRouter.get('/', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const themes = await storage.getThemeSettings();
    res.json(themes);
  } catch (error: any) {
    console.error('Error fetching themes:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get active theme - public
themeRouter.get('/active', async (req, res) => {
  try {
    const theme = await storage.getActiveTheme();
    res.json(theme);
  } catch (error: any) {
    console.error('Error fetching active theme:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get theme by ID - admin only
themeRouter.get('/:id', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const themes = await storage.getThemeSettings();
    const theme = themes.find(t => t.id === id);
    
    if (!theme) {
      return res.status(404).json({ error: 'Theme not found' });
    }
    
    res.json(theme);
  } catch (error: any) {
    console.error('Error fetching theme:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create a new theme - admin only
themeRouter.post('/', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const validatedData = insertThemeSettingsSchema.parse(req.body);
    const theme = await storage.createThemeSettings(validatedData);
    res.status(201).json(theme);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        error: 'Invalid theme data', 
        details: error.errors 
      });
    }
    console.error('Error creating theme:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update theme - admin only
themeRouter.patch('/:id', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    // Validate the update data
    const validatedData = insertThemeSettingsSchema.partial().parse(req.body);
    
    console.log(`Updating theme ID ${id} with data:`, validatedData);
    
    // Get the current theme first
    const themes = await storage.getThemeSettings();
    const theme = themes.find(t => t.id === id);
    
    if (!theme) {
      return res.status(404).json({ error: 'Theme not found' });
    }
    
    // Update the theme with merged data
    const updated = await storage.updateThemeSettings(id, validatedData);
    
    if (!updated) {
      return res.status(404).json({ error: 'Theme update failed' });
    }
    
    console.log('Theme updated successfully:', updated);
    
    // If this is the active theme, add some delay before responding to ensure database writes are complete
    if (updated.appliesGlobally) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    res.json(updated);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        error: 'Invalid theme data', 
        details: error.errors 
      });
    }
    console.error('Error updating theme:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete theme - admin only
themeRouter.delete('/:id', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const result = await storage.deleteThemeSettings(id);
    
    if (!result) {
      return res.status(400).json({ 
        error: 'Cannot delete this theme - it may be the only theme or the active theme'
      });
    }
    
    res.status(204).end();
  } catch (error: any) {
    console.error('Error deleting theme:', error);
    res.status(500).json({ error: error.message });
  }
});

// Set a theme as active - admin only
themeRouter.post('/:id/set-active', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const themes = await storage.getThemeSettings();
    const theme = themes.find(t => t.id === id);
    
    if (!theme) {
      return res.status(404).json({ error: 'Theme not found' });
    }
    
    console.log(`Setting theme ID ${id} as active...`);
    
    // Make theme active by setting appliesGlobally to true
    const updated = await storage.updateThemeSettings(id, { 
      appliesGlobally: true,
      // Include all the original theme properties to ensure nothing is lost
      name: theme.name,
      primaryColor: theme.primaryColor,
      secondaryColor: theme.secondaryColor,
      accentColor: theme.accentColor,
      textColor: theme.textColor,
      backgroundColor: theme.backgroundColor,
      fontPrimary: theme.fontPrimary,
      fontSecondary: theme.fontSecondary,
      buttonRadius: theme.buttonRadius,
      buttonStyle: theme.buttonStyle,
      cardStyle: theme.cardStyle,
      layoutStyle: theme.layoutStyle,
      isDarkMode: theme.isDarkMode,
      isHighContrast: theme.isHighContrast,
      headerStyle: theme.headerStyle,
      footerStyle: theme.footerStyle,
      customCss: theme.customCss
    });
    
    if (!updated) {
      return res.status(500).json({ error: 'Failed to update theme' });
    }
    
    console.log('Theme activated successfully:', updated);
    res.json(updated);
  } catch (error: any) {
    console.error('Error setting active theme:', error);
    res.status(500).json({ error: error.message });
  }
});

export default themeRouter;