import { Router } from "express";
import { storage } from "./storage";
import { isAdmin, isAuthenticated } from "./auth";
import { insertSeoMetadataSchema } from "@shared/schema";
import { z } from "zod";

export const seoRouter = Router();

// Get all SEO metadata (admin only)
seoRouter.get("/", isAuthenticated, isAdmin, async (req, res) => {
  try {
    const allMetadata = await storage.getAllSeoMetadata();
    res.json(allMetadata);
  } catch (error: any) {
    console.error("Error fetching SEO metadata:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get default SEO metadata (public)
seoRouter.get("/default", async (req, res) => {
  try {
    const defaultMetadata = await storage.getDefaultSeoMetadata();
    if (!defaultMetadata) {
      return res.status(404).json({ error: "Default SEO metadata not found" });
    }
    res.json(defaultMetadata);
  } catch (error: any) {
    console.error("Error fetching default SEO metadata:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get SEO metadata for a specific page (public)
seoRouter.get("/page/:path", async (req, res) => {
  try {
    const pagePath = decodeURIComponent(req.params.path);
    const metadata = await storage.getSeoMetadataByPage(pagePath);
    
    if (!metadata) {
      // If no specific metadata for this page, return default
      const defaultMetadata = await storage.getDefaultSeoMetadata();
      if (!defaultMetadata) {
        return res.status(404).json({ error: "SEO metadata not found" });
      }
      return res.json(defaultMetadata);
    }
    
    res.json(metadata);
  } catch (error: any) {
    console.error("Error fetching SEO metadata for page:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get SEO metadata by ID (admin only)
seoRouter.get("/:id", isAuthenticated, isAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }
    
    const metadata = await storage.getSeoMetadata(id);
    if (!metadata) {
      return res.status(404).json({ error: "SEO metadata not found" });
    }
    
    res.json(metadata);
  } catch (error: any) {
    console.error("Error fetching SEO metadata by ID:", error);
    res.status(500).json({ error: error.message });
  }
});

// Create new SEO metadata (admin only)
seoRouter.post("/", isAuthenticated, isAdmin, async (req, res) => {
  try {
    // Validate request body
    const validatedData = insertSeoMetadataSchema.parse(req.body);
    
    // If setting this as default, unset any existing default
    if (validatedData.isDefault) {
      await storage.unsetDefaultSeoMetadata();
    }
    
    // Create new metadata
    const newMetadata = await storage.createSeoMetadata(validatedData);
    res.status(201).json(newMetadata);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error("Error creating SEO metadata:", error);
    res.status(500).json({ error: error.message });
  }
});

// Update SEO metadata (admin only)
seoRouter.patch("/:id", isAuthenticated, isAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }
    
    // Validate request body (partial update allowed)
    const partialSchema = insertSeoMetadataSchema.partial();
    const validatedData = partialSchema.parse(req.body);
    
    // If setting this as default, unset any existing default
    if (validatedData.isDefault) {
      await storage.unsetDefaultSeoMetadata();
    }
    
    // Update metadata
    const updatedMetadata = await storage.updateSeoMetadata(id, validatedData);
    if (!updatedMetadata) {
      return res.status(404).json({ error: "SEO metadata not found" });
    }
    
    res.json(updatedMetadata);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error("Error updating SEO metadata:", error);
    res.status(500).json({ error: error.message });
  }
});

// Delete SEO metadata (admin only)
seoRouter.delete("/:id", isAuthenticated, isAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }
    
    // Check if metadata exists and is not default
    const metadata = await storage.getSeoMetadata(id);
    if (!metadata) {
      return res.status(404).json({ error: "SEO metadata not found" });
    }
    
    if (metadata.isDefault) {
      return res.status(400).json({ error: "Cannot delete default SEO metadata" });
    }
    
    // Delete metadata
    await storage.deleteSeoMetadata(id);
    res.status(204).send();
  } catch (error: any) {
    console.error("Error deleting SEO metadata:", error);
    res.status(500).json({ error: error.message });
  }
});

// Remove default export