import { Router } from "express";
import { isAdmin, isAuthenticated } from "./mongo-auth";
import { storage } from "./mongo-storage";
import * as models from "@shared/models";
import { z } from "zod";

export const themeRouter = Router();

// Middleware for protected routes
function adminRequired(req: any, res: any, next: any) {
  if (req.method !== "GET") {
    return isAdmin(req, res, next);
  }
  next();
}

// Middleware for request validation
function validateRequest(schema: z.ZodType<any, any>) {
  return (req: any, res: any, next: any) => {
    try {
      req.validatedBody = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          error: "Validation error",
          details: error.errors,
        });
      } else {
        next(error);
      }
    }
  };
}

// Apply middleware
themeRouter.use(isAuthenticated, adminRequired);

// Get all themes
themeRouter.get("/", async (req, res, next) => {
  try {
    const themes = await storage.getThemeSettings();
    res.json(themes);
  } catch (error) {
    next(error);
  }
});

// Get active theme (no auth required)
themeRouter.get("/active", async (req, res, next) => {
  try {
    const theme = await storage.getActiveTheme();
    if (!theme) {
      return res.status(404).json({ error: "No active theme found" });
    }
    res.json(theme);
  } catch (error) {
    next(error);
  }
});

// Get theme by ID
themeRouter.get("/:id", async (req, res, next) => {
  try {
    const theme = await storage.getThemeSettingsByName(req.params.id);
    if (!theme) {
      return res.status(404).json({ error: "Theme not found" });
    }
    res.json(theme);
  } catch (error) {
    next(error);
  }
});

// Create new theme
themeRouter.post("/", validateRequest(models.themeSettingsZodSchema), async (req, res, next) => {
  try {
    const newTheme = await storage.createThemeSettings(req.validatedBody);
    res.status(201).json(newTheme);
  } catch (error) {
    next(error);
  }
});

// Update theme
themeRouter.put("/:id", validateRequest(models.themeSettingsZodSchema.partial()), async (req, res, next) => {
  try {
    const updatedTheme = await storage.updateThemeSettings(req.params.id, req.validatedBody);
    if (!updatedTheme) {
      return res.status(404).json({ error: "Theme not found" });
    }
    res.json(updatedTheme);
  } catch (error) {
    next(error);
  }
});

// Delete theme
themeRouter.delete("/:id", async (req, res, next) => {
  try {
    const success = await storage.deleteThemeSettings(req.params.id);
    if (!success) {
      return res.status(404).json({ error: "Theme not found" });
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});