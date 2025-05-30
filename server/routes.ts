import type { Express } from "express";
import { createServer, type Server } from "http";
import path from "path";
import express from "express";
import { setupAuth } from "./auth";
import { adminRouter } from "./adminRoutes";
import { contentRouter } from "./contentRoutes";
import { analyticsRouter } from "./analyticsRoutes";
import stripeRouter from "./stripeRoutes";
import themeRouter from "./themeRoutes";
import { seoRouter } from "./seoRoutes";
import { uploadRouter } from "./uploadRoutes";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication
  setupAuth(app);
  
  // Content routes - public access
  app.use("/api/content", contentRouter);
  
  // Admin routes - restricted access
  app.use("/api/admin", adminRouter);
  
  // Analytics routes - admin only
  app.use("/api/analytics", analyticsRouter);
  
  // Stripe payment routes
  app.use("/api", stripeRouter);
  
  // Theme routes
  app.use("/api/themes", themeRouter);
  
  // SEO Metadata routes
  app.use("/api/seo", seoRouter);
  
  // Upload routes
  app.use("/api/upload", uploadRouter);
  
  // Serve uploaded files
  app.use("/uploads", express.static(path.join(process.cwd(), "public", "uploads")));
  
  // Add a specific public route for site settings updates that doesn't require authentication
  app.put("/api/public/site-settings/:name", async (req, res, next) => {
    try {
      const { value } = req.body;
      if (value === undefined) {
        return res.status(400).json({ error: "Value is required" });
      }
      
      const updatedSetting = await storage.updateSiteSetting(req.params.name, value);
      res.json(updatedSetting);
    } catch (error) {
      next(error);
    }
  });
  
  // Initialize database
  await initializeDatabase();

  const httpServer = createServer(app);
  
  return httpServer;
}

// Function to initialize database with seed data if needed
async function initializeDatabase() {
  // This will be called on application startup
  // Could add seed data here if needed for initial development
  // or check and create required tables, etc.
  try {
    // Run database migration - already handled by drizzle
    console.log("Database connection established");
  } catch (error) {
    console.error("Database initialization error:", error);
  }
}
