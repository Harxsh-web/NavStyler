import express, { Request, Response, NextFunction } from "express";
import { log, setupVite, serveStatic } from "./vite";
import { registerRoutes } from "./mongo-routes";
import { ZodError } from "zod";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

async function main() {
  const app = express();
  
  // Middleware setup
  app.use(cors());
  app.use(express.json());
  
  // Setup routes and return HTTP server
  const server = await registerRoutes(app);
  
  // Vite development server setup
  await setupVite(app, server);
  
  // Serve static files in production
  if (process.env.NODE_ENV === "production") {
    serveStatic(app);
  }
  
  // Global error handler
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    log(`Error: ${err.message}`, "error");
    
    if (err instanceof ZodError) {
      return res.status(400).json({
        error: "Validation error",
        details: err.errors,
      });
    }
    
    res.status(err.status || 500).json({
      error: err.message || "Something went wrong",
    });
  });
  
  // Start the server
  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => {
    log(`serving on port ${PORT}`);
  });
}

main().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});