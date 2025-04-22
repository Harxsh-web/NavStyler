import { Router } from "express";
import { storage } from "./storage";

export const contentRouter = Router();

// Get all content for home page
contentRouter.get("/content", async (req, res, next) => {
  try {
    const [
      hero,
      featured,
      quote,
      learningPointsSection,
      learningPoints,
      testimonialSection,
      testimonials,
      bookSections,
      aboutBook,
      author,
      footerCategories,
      footerLinks,
      socialLinks,
      siteSettings
    ] = await Promise.all([
      storage.getHeroSection(),
      storage.getFeaturedSection(),
      storage.getQuoteSection(),
      storage.getLearningPointsSection(),
      storage.getLearningPoints(),
      storage.getTestimonialSection(),
      storage.getTestimonials(),
      storage.getBookSections(),
      storage.getAboutBookSection(),
      storage.getAuthorSection(),
      storage.getFooterCategories(),
      storage.getFooterLinks(),
      storage.getSocialLinks(),
      storage.getSiteSettings()
    ]);

    // Filter testimonials for mobile view
    const mobileTestimonials = testimonials.filter(t => t.showMobile);
    
    // Organize footer links by category
    const footerLinksByCategory = footerCategories.map(category => {
      const links = footerLinks.filter(link => link.categoryId === category.id);
      return {
        ...category,
        links
      };
    });

    // Convert site settings to a key-value object
    const siteSettingsMap = siteSettings.reduce((acc, setting) => {
      acc[setting.name] = setting.value;
      return acc;
    }, {} as Record<string, string>);

    res.json({
      hero,
      featured,
      quote,
      learningPointsSection,
      learningPoints,
      testimonialSection,
      testimonials,
      mobileTestimonials,
      bookSections,
      aboutBook,
      author,
      footerCategories,
      footerLinks,
      footerLinksByCategory,
      socialLinks,
      siteSettings: siteSettingsMap
    });
  } catch (error) {
    next(error);
  }
});

// Individual content endpoints
contentRouter.get("/hero", async (req, res, next) => {
  try {
    const hero = await storage.getHeroSection();
    res.json(hero || {});
  } catch (error) {
    next(error);
  }
});

contentRouter.get("/featured", async (req, res, next) => {
  try {
    const featured = await storage.getFeaturedSection();
    res.json(featured || {});
  } catch (error) {
    next(error);
  }
});

contentRouter.get("/quote", async (req, res, next) => {
  try {
    const quote = await storage.getQuoteSection();
    res.json(quote || {});
  } catch (error) {
    next(error);
  }
});

contentRouter.get("/learning-points", async (req, res, next) => {
  try {
    const [section, points] = await Promise.all([
      storage.getLearningPointsSection(),
      storage.getLearningPoints()
    ]);
    res.json({
      section: section || {},
      points
    });
  } catch (error) {
    next(error);
  }
});

contentRouter.get("/testimonials", async (req, res, next) => {
  try {
    const [section, testimonials] = await Promise.all([
      storage.getTestimonialSection(),
      storage.getTestimonials()
    ]);
    
    // Filter for mobile if requested
    let filteredTestimonials = testimonials;
    if (req.query.mobile === 'true') {
      filteredTestimonials = testimonials.filter(t => t.showMobile);
    }
    
    res.json({
      section: section || {},
      testimonials: filteredTestimonials
    });
  } catch (error) {
    next(error);
  }
});

contentRouter.get("/book-sections", async (req, res, next) => {
  try {
    const sections = await storage.getBookSections();
    res.json(sections);
  } catch (error) {
    next(error);
  }
});

contentRouter.get("/about-book", async (req, res, next) => {
  try {
    const aboutBook = await storage.getAboutBookSection();
    res.json(aboutBook || {});
  } catch (error) {
    next(error);
  }
});

contentRouter.get("/author", async (req, res, next) => {
  try {
    const author = await storage.getAuthorSection();
    res.json(author || {});
  } catch (error) {
    next(error);
  }
});

contentRouter.get("/footer", async (req, res, next) => {
  try {
    const [categories, links, socialLinks] = await Promise.all([
      storage.getFooterCategories(),
      storage.getFooterLinks(),
      storage.getSocialLinks()
    ]);
    
    // Organize links by category
    const linksByCategory = categories.map(category => {
      const categoryLinks = links.filter(link => link.categoryId === category.id);
      return {
        ...category,
        links: categoryLinks
      };
    });
    
    res.json({
      categories,
      links,
      linksByCategory,
      socialLinks
    });
  } catch (error) {
    next(error);
  }
});

contentRouter.get("/site-settings", async (req, res, next) => {
  try {
    const settings = await storage.getSiteSettings();
    
    // Convert to key-value object
    const settingsMap = settings.reduce((acc, setting) => {
      acc[setting.name] = setting.value;
      return acc;
    }, {} as Record<string, string>);
    
    res.json(settingsMap);
  } catch (error) {
    next(error);
  }
});