import { Router, Request, Response, NextFunction } from "express";
import { storage } from "./storage";
import { isAdmin } from "./auth";
import * as schema from "@shared/schema";
import { z } from "zod";

// Extend Express Request interface
declare global {
  namespace Express {
    interface Request {
      validatedBody: any;
    }
  }
}

export const adminRouter = Router();

// Middleware to ensure only admins can access these routes
adminRouter.use(isAdmin);

// Default schema for validation
const defaultSchema = z.object({});

// Helper function to handle validation and errors
const validateRequest = (schema: z.ZodType<any, any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.validatedBody = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.issues });
      }
      next(error);
    }
  };
};

// Landing Section
adminRouter.get("/landing", async (req, res, next) => {
  try {
    const landing = await storage.getLandingSection();
    res.json(landing || {});
  } catch (error) {
    next(error);
  }
});

adminRouter.put("/landing", validateRequest(schema.insertLandingSectionSchema.partial()), async (req, res, next) => {
  try {
    const updated = await storage.updateLandingSection(req.validatedBody);
    res.json(updated);
  } catch (error) {
    next(error);
  }
});

// Hero Section
adminRouter.get("/hero", async (req, res, next) => {
  try {
    const hero = await storage.getHeroSection();
    res.json(hero || {});
  } catch (error) {
    next(error);
  }
});

adminRouter.put("/hero", validateRequest(schema.insertHeroSectionSchema.partial()), async (req, res, next) => {
  try {
    // We don't need mapping anymore since we've standardized on buttonText and buttonUrl
    const heroData = req.validatedBody;
    
    // Validate image URL if provided
    if (heroData.imageUrl && heroData.imageUrl.startsWith('/uploads/')) {
      const fs = require('fs');
      const path = require('path');
      const filePath = path.join(process.cwd(), 'public', heroData.imageUrl.substring(1));
      
      console.log('Verifying file exists at path:', filePath);
      
      // Check if the file exists
      if (!fs.existsSync(filePath)) {
        console.warn(`Image file doesn't exist: ${filePath}`);
        
        // List available files in the uploads directory
        const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
        const files = fs.readdirSync(uploadsDir);
        console.log('Available files in uploads directory:', files);
        
        // If no files, return error
        if (files.length === 0) {
          return res.status(400).json({ error: 'Image file not found and no uploads available' });
        }
        
        // Use the most recent file
        const mostRecentFile = files.sort().pop();
        heroData.imageUrl = `/uploads/${mostRecentFile}`;
        console.log(`Image file not found. Using most recent upload instead: ${heroData.imageUrl}`);
      }
    }
    
    console.log('Updating hero section with data:', heroData);
    
    const updatedHero = await storage.updateHeroSection(heroData);
    res.json(updatedHero);
  } catch (error) {
    next(error);
  }
});

// Featured Section
adminRouter.get("/featured", async (req, res, next) => {
  try {
    const featured = await storage.getFeaturedSection();
    res.json(featured || {});
  } catch (error) {
    next(error);
  }
});

adminRouter.put("/featured", validateRequest(z.object({}).partial()), async (req, res, next) => {
  try {
    const updatedFeatured = await storage.updateFeaturedSection(req.validatedBody);
    res.json(updatedFeatured);
  } catch (error) {
    next(error);
  }
});

// Quote Section
adminRouter.get("/quote", async (req, res, next) => {
  try {
    const quote = await storage.getQuoteSection();
    res.json(quote || {});
  } catch (error) {
    next(error);
  }
});

adminRouter.put("/quote", validateRequest(z.object({}).partial()), async (req, res, next) => {
  try {
    const updatedQuote = await storage.updateQuoteSection(req.validatedBody);
    res.json(updatedQuote);
  } catch (error) {
    next(error);
  }
});

// Learning Points Section
adminRouter.get("/learning-points-section", async (req, res, next) => {
  try {
    const section = await storage.getLearningPointsSection();
    res.json(section || {});
  } catch (error) {
    next(error);
  }
});

adminRouter.put("/learning-points-section", validateRequest(schema.insertLearningPointsSectionSchema.partial()), async (req, res, next) => {
  try {
    const updatedSection = await storage.updateLearningPointsSection(req.validatedBody);
    res.json(updatedSection);
  } catch (error) {
    next(error);
  }
});

// Learning Points
adminRouter.get("/learning-points", async (req, res, next) => {
  try {
    const points = await storage.getLearningPoints();
    res.json(points);
  } catch (error) {
    next(error);
  }
});

adminRouter.get("/learning-points/:id", async (req, res, next) => {
  try {
    const point = await storage.getLearningPoint(parseInt(req.params.id));
    if (!point) {
      return res.status(404).json({ error: "Learning point not found" });
    }
    res.json(point);
  } catch (error) {
    next(error);
  }
});

adminRouter.post("/learning-points", validateRequest(defaultSchema), async (req, res, next) => {
  try {
    const newPoint = await storage.createLearningPoint(req.validatedBody);
    res.status(201).json(newPoint);
  } catch (error) {
    next(error);
  }
});

adminRouter.put("/learning-points/:id", validateRequest(schema.insertLearningPointSchema.partial()), async (req, res, next) => {
  try {
    const updatedPoint = await storage.updateLearningPoint(parseInt(req.params.id), req.validatedBody);
    if (!updatedPoint) {
      return res.status(404).json({ error: "Learning point not found" });
    }
    res.json(updatedPoint);
  } catch (error) {
    next(error);
  }
});

adminRouter.delete("/learning-points/:id", async (req, res, next) => {
  try {
    const success = await storage.deleteLearningPoint(parseInt(req.params.id));
    if (!success) {
      return res.status(404).json({ error: "Learning point not found" });
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

// Testimonial Section
adminRouter.get("/testimonial-section", async (req, res, next) => {
  try {
    const section = await storage.getTestimonialSection();
    res.json(section || {});
  } catch (error) {
    next(error);
  }
});

adminRouter.put("/testimonial-section", validateRequest(schema.insertTestimonialSectionSchema.partial()), async (req, res, next) => {
  try {
    const updatedSection = await storage.updateTestimonialSection(req.validatedBody);
    res.json(updatedSection);
  } catch (error) {
    next(error);
  }
});

// Testimonials
adminRouter.get("/testimonials", async (req, res, next) => {
  try {
    const testimonials = await storage.getTestimonials();
    res.json(testimonials);
  } catch (error) {
    next(error);
  }
});

adminRouter.get("/testimonials/:id", async (req, res, next) => {
  try {
    const testimonial = await storage.getTestimonial(parseInt(req.params.id));
    if (!testimonial) {
      return res.status(404).json({ error: "Testimonial not found" });
    }
    res.json(testimonial);
  } catch (error) {
    next(error);
  }
});

adminRouter.post("/testimonials", validateRequest(schema.insertTestimonialSchema), async (req, res, next) => {
  try {
    const newTestimonial = await storage.createTestimonial(req.validatedBody);
    res.status(201).json(newTestimonial);
  } catch (error) {
    next(error);
  }
});

adminRouter.put("/testimonials/:id", validateRequest(schema.insertTestimonialSchema.partial()), async (req, res, next) => {
  try {
    const updatedTestimonial = await storage.updateTestimonial(parseInt(req.params.id), req.validatedBody);
    if (!updatedTestimonial) {
      return res.status(404).json({ error: "Testimonial not found" });
    }
    res.json(updatedTestimonial);
  } catch (error) {
    next(error);
  }
});

adminRouter.delete("/testimonials/:id", async (req, res, next) => {
  try {
    const success = await storage.deleteTestimonial(parseInt(req.params.id));
    if (!success) {
      return res.status(404).json({ error: "Testimonial not found" });
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

// Book Sections
adminRouter.get("/book-sections", async (req, res, next) => {
  try {
    const sections = await storage.getBookSections();
    res.json(sections);
  } catch (error) {
    next(error);
  }
});

adminRouter.get("/book-sections/:id", async (req, res, next) => {
  try {
    const section = await storage.getBookSection(parseInt(req.params.id));
    if (!section) {
      return res.status(404).json({ error: "Book section not found" });
    }
    res.json(section);
  } catch (error) {
    next(error);
  }
});

adminRouter.post("/book-sections", validateRequest(schema.insertBookSectionSchema), async (req, res, next) => {
  try {
    const newSection = await storage.createBookSection(req.validatedBody);
    res.status(201).json(newSection);
  } catch (error) {
    next(error);
  }
});

adminRouter.put("/book-sections/:id", validateRequest(schema.insertBookSectionSchema.partial()), async (req, res, next) => {
  try {
    const updatedSection = await storage.updateBookSection(parseInt(req.params.id), req.validatedBody);
    if (!updatedSection) {
      return res.status(404).json({ error: "Book section not found" });
    }
    res.json(updatedSection);
  } catch (error) {
    next(error);
  }
});

adminRouter.delete("/book-sections/:id", async (req, res, next) => {
  try {
    const success = await storage.deleteBookSection(parseInt(req.params.id));
    if (!success) {
      return res.status(404).json({ error: "Book section not found" });
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

// About Book Section
adminRouter.get("/about-book", async (req, res, next) => {
  try {
    const aboutBook = await storage.getAboutBookSection();
    res.json(aboutBook || {});
  } catch (error) {
    next(error);
  }
});

adminRouter.put("/about-book", validateRequest(schema.insertAboutBookSectionSchema.partial()), async (req, res, next) => {
  try {
    const updatedAboutBook = await storage.updateAboutBookSection(req.validatedBody);
    res.json(updatedAboutBook);
  } catch (error) {
    next(error);
  }
});

// Author Section
adminRouter.get("/author", async (req, res, next) => {
  try {
    const author = await storage.getAuthorSection();
    res.json(author || {});
  } catch (error) {
    next(error);
  }
});

adminRouter.put("/author", validateRequest(schema.insertAuthorSectionSchema.partial()), async (req, res, next) => {
  try {
    const updatedAuthor = await storage.updateAuthorSection(req.validatedBody);
    res.json(updatedAuthor);
  } catch (error) {
    next(error);
  }
});

// Footer Categories
adminRouter.get("/footer-categories", async (req, res, next) => {
  try {
    const categories = await storage.getFooterCategories();
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

adminRouter.get("/footer-categories/:id", async (req, res, next) => {
  try {
    const category = await storage.getFooterCategory(parseInt(req.params.id));
    if (!category) {
      return res.status(404).json({ error: "Footer category not found" });
    }
    res.json(category);
  } catch (error) {
    next(error);
  }
});

adminRouter.post("/footer-categories", validateRequest(schema.insertFooterCategorySchema), async (req, res, next) => {
  try {
    const newCategory = await storage.createFooterCategory(req.validatedBody);
    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
});

adminRouter.put("/footer-categories/:id", validateRequest(schema.insertFooterCategorySchema.partial()), async (req, res, next) => {
  try {
    const updatedCategory = await storage.updateFooterCategory(parseInt(req.params.id), req.validatedBody);
    if (!updatedCategory) {
      return res.status(404).json({ error: "Footer category not found" });
    }
    res.json(updatedCategory);
  } catch (error) {
    next(error);
  }
});

adminRouter.delete("/footer-categories/:id", async (req, res, next) => {
  try {
    const success = await storage.deleteFooterCategory(parseInt(req.params.id));
    if (!success) {
      return res.status(404).json({ error: "Footer category not found" });
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

// Footer Links
adminRouter.get("/footer-links", async (req, res, next) => {
  try {
    const links = await storage.getFooterLinks();
    res.json(links);
  } catch (error) {
    next(error);
  }
});

adminRouter.get("/footer-links/:id", async (req, res, next) => {
  try {
    const link = await storage.getFooterLink(parseInt(req.params.id));
    if (!link) {
      return res.status(404).json({ error: "Footer link not found" });
    }
    res.json(link);
  } catch (error) {
    next(error);
  }
});

adminRouter.post("/footer-links", validateRequest(schema.insertFooterLinkSchema), async (req, res, next) => {
  try {
    const newLink = await storage.createFooterLink(req.validatedBody);
    res.status(201).json(newLink);
  } catch (error) {
    next(error);
  }
});

adminRouter.put("/footer-links/:id", validateRequest(schema.insertFooterLinkSchema.partial()), async (req, res, next) => {
  try {
    const updatedLink = await storage.updateFooterLink(parseInt(req.params.id), req.validatedBody);
    if (!updatedLink) {
      return res.status(404).json({ error: "Footer link not found" });
    }
    res.json(updatedLink);
  } catch (error) {
    next(error);
  }
});

adminRouter.delete("/footer-links/:id", async (req, res, next) => {
  try {
    const success = await storage.deleteFooterLink(parseInt(req.params.id));
    if (!success) {
      return res.status(404).json({ error: "Footer link not found" });
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

// Social Links
adminRouter.get("/social-links", async (req, res, next) => {
  try {
    const links = await storage.getSocialLinks();
    res.json(links);
  } catch (error) {
    next(error);
  }
});

adminRouter.get("/social-links/:id", async (req, res, next) => {
  try {
    const link = await storage.getSocialLink(parseInt(req.params.id));
    if (!link) {
      return res.status(404).json({ error: "Social link not found" });
    }
    res.json(link);
  } catch (error) {
    next(error);
  }
});

adminRouter.post("/social-links", validateRequest(schema.insertSocialLinkSchema), async (req, res, next) => {
  try {
    const newLink = await storage.createSocialLink(req.validatedBody);
    res.status(201).json(newLink);
  } catch (error) {
    next(error);
  }
});

adminRouter.put("/social-links/:id", validateRequest(schema.insertSocialLinkSchema.partial()), async (req, res, next) => {
  try {
    const updatedLink = await storage.updateSocialLink(parseInt(req.params.id), req.validatedBody);
    if (!updatedLink) {
      return res.status(404).json({ error: "Social link not found" });
    }
    res.json(updatedLink);
  } catch (error) {
    next(error);
  }
});

adminRouter.delete("/social-links/:id", async (req, res, next) => {
  try {
    const success = await storage.deleteSocialLink(parseInt(req.params.id));
    if (!success) {
      return res.status(404).json({ error: "Social link not found" });
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

// Site Settings
adminRouter.get("/site-settings", async (req, res, next) => {
  try {
    const settings = await storage.getSiteSettings();
    res.json(settings);
  } catch (error) {
    next(error);
  }
});

adminRouter.get("/site-settings/:name", async (req, res, next) => {
  try {
    const setting = await storage.getSiteSetting(req.params.name);
    if (!setting) {
      return res.status(404).json({ error: "Site setting not found" });
    }
    res.json(setting);
  } catch (error) {
    next(error);
  }
});

adminRouter.put("/site-settings/:name", async (req, res, next) => {
  try {
    const { value } = req.body;
    if (typeof value !== 'string') {
      return res.status(400).json({ error: "Value must be a string" });
    }
    
    const updatedSetting = await storage.updateSiteSetting(req.params.name, value);
    res.json(updatedSetting);
  } catch (error) {
    next(error);
  }
});

// Articles management
adminRouter.get("/articles", async (req, res, next) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
    const articles = await storage.getArticles(limit);
    res.json(articles);
  } catch (error) {
    next(error);
  }
});

adminRouter.get("/articles/:id", async (req, res, next) => {
  try {
    const articleId = parseInt(req.params.id);
    const article = await storage.getArticle(articleId);
    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }
    res.json(article);
  } catch (error) {
    next(error);
  }
});

adminRouter.post("/articles", validateRequest(schema.insertArticleSchema), async (req, res, next) => {
  try {
    const article = await storage.createArticle(req.validatedBody);
    res.status(201).json(article);
  } catch (error) {
    next(error);
  }
});

adminRouter.put("/articles/:id", validateRequest(schema.insertArticleSchema.partial()), async (req, res, next) => {
  try {
    const articleId = parseInt(req.params.id);
    const article = await storage.updateArticle(articleId, req.validatedBody);
    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }
    res.json(article);
  } catch (error) {
    next(error);
  }
});

adminRouter.delete("/articles/:id", async (req, res, next) => {
  try {
    const articleId = parseInt(req.params.id);
    const success = await storage.deleteArticle(articleId);
    if (!success) {
      return res.status(404).json({ error: "Article not found" });
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

// Videos management
adminRouter.get("/videos", async (req, res, next) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
    const videos = await storage.getVideos(limit);
    res.json(videos);
  } catch (error) {
    next(error);
  }
});

adminRouter.get("/videos/:id", async (req, res, next) => {
  try {
    const videoId = parseInt(req.params.id);
    const video = await storage.getVideo(videoId);
    if (!video) {
      return res.status(404).json({ error: "Video not found" });
    }
    res.json(video);
  } catch (error) {
    next(error);
  }
});

adminRouter.post("/videos", validateRequest(schema.insertVideoSchema), async (req, res, next) => {
  try {
    const video = await storage.createVideo(req.validatedBody);
    res.status(201).json(video);
  } catch (error) {
    next(error);
  }
});

adminRouter.put("/videos/:id", validateRequest(schema.insertVideoSchema.partial()), async (req, res, next) => {
  try {
    const videoId = parseInt(req.params.id);
    const video = await storage.updateVideo(videoId, req.validatedBody);
    if (!video) {
      return res.status(404).json({ error: "Video not found" });
    }
    res.json(video);
  } catch (error) {
    next(error);
  }
});

adminRouter.delete("/videos/:id", async (req, res, next) => {
  try {
    const videoId = parseInt(req.params.id);
    const success = await storage.deleteVideo(videoId);
    if (!success) {
      return res.status(404).json({ error: "Video not found" });
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

// Bonus section routes
adminRouter.put("/bonus-section", validateRequest(schema.insertBonusSectionSchema.partial()), async (req, res, next) => {
  try {
    const updatedSection = await storage.updateBonusSection(req.validatedBody);
    res.json(updatedSection);
  } catch (error) {
    next(error);
  }
});

// Guarantee section route
adminRouter.put("/guarantee-section", async (req, res, next) => {
  try {
    const updatedSection = await storage.updateGuaranteeSection(req.body);
    res.json(updatedSection);
  } catch (error) {
    next(error);
  }
});

adminRouter.post("/bonus-items", validateRequest(schema.insertBonusItemSchema), async (req, res, next) => {
  try {
    const newItem = await storage.createBonusItem(req.validatedBody);
    res.status(201).json(newItem);
  } catch (error) {
    next(error);
  }
});

adminRouter.put("/bonus-items/:id", validateRequest(schema.insertBonusItemSchema.partial()), async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const updatedItem = await storage.updateBonusItem(id, req.validatedBody);
    
    if (!updatedItem) {
      return res.status(404).json({ error: "Bonus item not found" });
    }
    
    res.json(updatedItem);
  } catch (error) {
    next(error);
  }
});

adminRouter.delete("/bonus-items/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const success = await storage.deleteBonusItem(id);
    
    if (!success) {
      return res.status(404).json({ error: "Bonus item not found" });
    }
    
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

// Scholarship Section
adminRouter.get("/scholarship", async (req, res, next) => {
  try {
    const scholarshipSection = await storage.getScholarshipSection();
    res.json(scholarshipSection || {});
  } catch (error) {
    next(error);
  }
});

adminRouter.put(
  "/scholarship",
  validateRequest(schema.insertScholarshipSectionSchema.partial()),
  async (req, res, next) => {
    try {
      const updatedSection = await storage.updateScholarshipSection(req.validatedBody);
      res.json(updatedSection);
    } catch (error) {
      next(error);
    }
  }
);

// YouTube Framework Section
adminRouter.get("/youtube-framework", async (req, res, next) => {
  try {
    const youtubeFrameworkSection = await storage.getYoutubeFrameworkSection();
    res.json(youtubeFrameworkSection || {});
  } catch (error) {
    next(error);
  }
});

adminRouter.put(
  "/youtube-framework",
  validateRequest(schema.insertYoutubeFrameworkSectionSchema.partial()),
  async (req, res, next) => {
    try {
      const updatedSection = await storage.updateYoutubeFrameworkSection(req.validatedBody);
      res.json(updatedSection);
    } catch (error) {
      next(error);
    }
  }
);