import { Router } from 'express';
import { z } from 'zod';
import { insertSeoMetadataSchema } from '@shared/schema';
import { storage } from './storage';
import { isAdmin, isAuthenticated } from './auth';

export const seoRouter = Router();

// Get all SEO metadata - admin only
seoRouter.get('/', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const metadata = await storage.getSeoMetadata();
    res.json(metadata);
  } catch (error: any) {
    console.error('Error fetching SEO metadata:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get SEO metadata by page path - public
seoRouter.get('/page/:path(*)', async (req, res) => {
  try {
    // URL decode the path parameter
    const pagePath = decodeURIComponent(req.params.path);
    let metadata = await storage.getSeoMetadataByPage(pagePath);
    
    // If no metadata exists for this page, use the default
    if (!metadata) {
      metadata = await storage.getDefaultSeoMetadata();
    }
    
    // If still no metadata, return a 404
    if (!metadata) {
      return res.status(404).json({ error: 'No SEO metadata found for this page' });
    }
    
    res.json(metadata);
  } catch (error: any) {
    console.error('Error fetching SEO metadata for page:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get default SEO metadata - public
seoRouter.get('/default', async (req, res) => {
  try {
    const metadata = await storage.getDefaultSeoMetadata();
    
    if (!metadata) {
      return res.status(404).json({ error: 'No default SEO metadata found' });
    }
    
    res.json(metadata);
  } catch (error: any) {
    console.error('Error fetching default SEO metadata:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get SEO metadata by ID - admin only
seoRouter.get('/:id', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const metadata = await storage.getSeoMetadata(id);
    
    if (!metadata || metadata.length === 0) {
      return res.status(404).json({ error: 'SEO metadata not found' });
    }
    
    res.json(metadata[0]);
  } catch (error: any) {
    console.error('Error fetching SEO metadata:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create new SEO metadata - admin only
seoRouter.post('/', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const validatedData = insertSeoMetadataSchema.parse(req.body);
    const metadata = await storage.createSeoMetadata(validatedData);
    res.status(201).json(metadata);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        error: 'Invalid SEO metadata', 
        details: error.errors 
      });
    }
    console.error('Error creating SEO metadata:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update SEO metadata - admin only
seoRouter.patch('/:id', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    // Validate the update data
    const validatedData = insertSeoMetadataSchema.partial().parse(req.body);
    
    console.log(`Updating SEO metadata ID ${id} with data:`, validatedData);
    
    const updated = await storage.updateSeoMetadata(id, validatedData);
    
    if (!updated) {
      return res.status(404).json({ error: 'SEO metadata not found' });
    }
    
    res.json(updated);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        error: 'Invalid SEO metadata', 
        details: error.errors 
      });
    }
    console.error('Error updating SEO metadata:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete SEO metadata - admin only
seoRouter.delete('/:id', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const result = await storage.deleteSeoMetadata(id);
    
    if (!result) {
      return res.status(400).json({ 
        error: 'Cannot delete this SEO metadata - it may be the default'
      });
    }
    
    res.status(204).end();
  } catch (error: any) {
    console.error('Error deleting SEO metadata:', error);
    res.status(500).json({ error: error.message });
  }
});

export default seoRouter;