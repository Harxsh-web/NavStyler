import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./mongo-auth";
import { adminRouter } from "./mongo-adminRoutes";
import { contentRouter } from "./mongo-contentRoutes";
import { analyticsRouter } from "./mongo-analyticsRoutes";
import { stripeRouter } from "./mongo-stripeRoutes";
import { themeRouter } from "./mongo-themeRoutes";

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
