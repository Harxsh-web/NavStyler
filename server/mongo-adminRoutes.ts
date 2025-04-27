import { Router } from "express";
import { isAdmin, isAuthenticated } from "./mongo-auth";
import { storage } from "./mongo-storage";
import { z } from "zod";
import * as models from "@shared/models";

export const adminRouter = Router();

// Authentication middleware
adminRouter.use(isAuthenticated);
adminRouter.use(isAdmin);

// Validation middleware for request bodies
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

// Hero Section
adminRouter.get("/hero", async (req, res, next) => {
  try {
    const hero = await storage.getHeroSection();
    res.json(hero || {});
  } catch (error) {
    next(error);
  }
});

adminRouter.put("/hero", validateRequest(models.heroZodSchema.partial()), async (req, res, next) => {
  try {
    const heroData = req.validatedBody;
    
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

adminRouter.put("/featured", validateRequest(models.featuredZodSchema.partial()), async (req, res, next) => {
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

adminRouter.put("/quote", validateRequest(models.quoteZodSchema.partial()), async (req, res, next) => {
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

adminRouter.put("/learning-points-section", validateRequest(models.learningPointsSectionZodSchema.partial()), async (req, res, next) => {
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
    const point = await storage.getLearningPoint(req.params.id);
    if (!point) {
      return res.status(404).json({ error: "Learning point not found" });
    }
    res.json(point);
  } catch (error) {
    next(error);
  }
});

adminRouter.post("/learning-points", validateRequest(models.learningPointZodSchema), async (req, res, next) => {
  try {
    const newPoint = await storage.createLearningPoint(req.validatedBody);
    res.status(201).json(newPoint);
  } catch (error) {
    next(error);
  }
});

adminRouter.put("/learning-points/:id", validateRequest(models.learningPointZodSchema.partial()), async (req, res, next) => {
  try {
    const updatedPoint = await storage.updateLearningPoint(req.params.id, req.validatedBody);
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
    const success = await storage.deleteLearningPoint(req.params.id);
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

adminRouter.put("/testimonial-section", validateRequest(models.testimonialSectionZodSchema.partial()), async (req, res, next) => {
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
    const testimonial = await storage.getTestimonial(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ error: "Testimonial not found" });
    }
    res.json(testimonial);
  } catch (error) {
    next(error);
  }
});

adminRouter.post("/testimonials", validateRequest(models.testimonialZodSchema), async (req, res, next) => {
  try {
    const newTestimonial = await storage.createTestimonial(req.validatedBody);
    res.status(201).json(newTestimonial);
  } catch (error) {
    next(error);
  }
});

adminRouter.put("/testimonials/:id", validateRequest(models.testimonialZodSchema.partial()), async (req, res, next) => {
  try {
    const updatedTestimonial = await storage.updateTestimonial(req.params.id, req.validatedBody);
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
    const success = await storage.deleteTestimonial(req.params.id);
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
    const section = await storage.getBookSection(req.params.id);
    if (!section) {
      return res.status(404).json({ error: "Book section not found" });
    }
    res.json(section);
  } catch (error) {
    next(error);
  }
});

adminRouter.post("/book-sections", validateRequest(models.bookSectionZodSchema), async (req, res, next) => {
  try {
    const newSection = await storage.createBookSection(req.validatedBody);
    res.status(201).json(newSection);
  } catch (error) {
    next(error);
  }
});

adminRouter.put("/book-sections/:id", validateRequest(models.bookSectionZodSchema.partial()), async (req, res, next) => {
  try {
    const updatedSection = await storage.updateBookSection(req.params.id, req.validatedBody);
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
    const success = await storage.deleteBookSection(req.params.id);
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

adminRouter.put("/about-book", validateRequest(models.aboutBookSectionZodSchema.partial()), async (req, res, next) => {
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

adminRouter.put("/author", validateRequest(models.authorSectionZodSchema.partial()), async (req, res, next) => {
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
    const category = await storage.getFooterCategory(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "Footer category not found" });
    }
    res.json(category);
  } catch (error) {
    next(error);
  }
});

adminRouter.post("/footer-categories", validateRequest(models.footerCategoryZodSchema), async (req, res, next) => {
  try {
    const newCategory = await storage.createFooterCategory(req.validatedBody);
    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
});

adminRouter.put("/footer-categories/:id", validateRequest(models.footerCategoryZodSchema.partial()), async (req, res, next) => {
  try {
    const updatedCategory = await storage.updateFooterCategory(req.params.id, req.validatedBody);
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
    const success = await storage.deleteFooterCategory(req.params.id);
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
    const link = await storage.getFooterLink(req.params.id);
    if (!link) {
      return res.status(404).json({ error: "Footer link not found" });
    }
    res.json(link);
  } catch (error) {
    next(error);
  }
});

adminRouter.post("/footer-links", validateRequest(models.footerLinkZodSchema), async (req, res, next) => {
  try {
    const newLink = await storage.createFooterLink(req.validatedBody);
    res.status(201).json(newLink);
  } catch (error) {
    next(error);
  }
});

adminRouter.put("/footer-links/:id", validateRequest(models.footerLinkZodSchema.partial()), async (req, res, next) => {
  try {
    const updatedLink = await storage.updateFooterLink(req.params.id, req.validatedBody);
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
    const success = await storage.deleteFooterLink(req.params.id);
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
    const link = await storage.getSocialLink(req.params.id);
    if (!link) {
      return res.status(404).json({ error: "Social link not found" });
    }
    res.json(link);
  } catch (error) {
    next(error);
  }
});

adminRouter.post("/social-links", validateRequest(models.socialLinkZodSchema), async (req, res, next) => {
  try {
    const newLink = await storage.createSocialLink(req.validatedBody);
    res.status(201).json(newLink);
  } catch (error) {
    next(error);
  }
});

adminRouter.put("/social-links/:id", validateRequest(models.socialLinkZodSchema.partial()), async (req, res, next) => {
  try {
    const updatedLink = await storage.updateSocialLink(req.params.id, req.validatedBody);
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
    const success = await storage.deleteSocialLink(req.params.id);
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
    if (value === undefined) {
      return res.status(400).json({ error: "Value is required" });
    }
    
    const updatedSetting = await storage.updateSiteSetting(req.params.name, value);
    res.json(updatedSetting);
  } catch (error) {
    next(error);
  }
});