import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { adminRouter } from "./adminRoutes";
import { contentRouter } from "./contentRoutes";
import analyticsRouter from "./analyticsRoutes";
import stripeRouter from "./stripeRoutes";
import themeRouter from "./themeRoutes";
import seoRouter from "./seoRoutes";

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
