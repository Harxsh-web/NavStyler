import { Router } from "express";
import { storage } from "./storage";

export const contentRouter = Router();

// Get all content for home page
contentRouter.get("/content", async (req, res, next) => {
  try {
    const [
      landing,
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
      siteSettings,
      bonusSection,
      bonusItems,
      guaranteeSection,
      scholarshipSection,
      youtubeFrameworkSection
    ] = await Promise.all([
      storage.getLandingSection(),
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
      storage.getSiteSettings(),
      storage.getBonusSection(),
      storage.getBonusItems(),
      storage.getGuaranteeSection(),
      storage.getScholarshipSection(),
      storage.getYoutubeFrameworkSection()
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
      landing,
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
      siteSettings: siteSettingsMap,
      bonusSection,
      bonusItems,
      guaranteeSection,
      scholarshipSection,
      youtubeFrameworkSection
    });
  } catch (error) {
    next(error);
  }
});

// Individual content endpoints
contentRouter.get("/landing", async (req, res, next) => {
  try {
    const landing = await storage.getLandingSection();
    res.json(landing || {});
  } catch (error) {
    next(error);
  }
});

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
    const testimonials = await storage.getTestimonials();
    
    // Filter for mobile if requested
    let filteredTestimonials = testimonials;
    if (req.query.mobile === 'true') {
      filteredTestimonials = testimonials.filter(t => t.showMobile);
    }
    
    res.json(filteredTestimonials);
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

// Articles routes
contentRouter.get("/articles", async (req, res, next) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const articles = await storage.getArticles(limit);
    res.json(articles);
  } catch (error) {
    next(error);
  }
});

contentRouter.get("/articles/:slug", async (req, res, next) => {
  try {
    const article = await storage.getArticleBySlug(req.params.slug);
    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }
    res.json(article);
  } catch (error) {
    next(error);
  }
});

// Videos routes
contentRouter.get("/videos", async (req, res, next) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const videos = await storage.getVideos(limit);
    res.json(videos);
  } catch (error) {
    next(error);
  }
});

contentRouter.get("/videos/:slug", async (req, res, next) => {
  try {
    const video = await storage.getVideoBySlug(req.params.slug);
    if (!video) {
      return res.status(404).json({ error: "Video not found" });
    }
    res.json(video);
  } catch (error) {
    next(error);
  }
});

// Bonus section routes
contentRouter.get("/bonus-section", async (req, res, next) => {
  try {
    const bonusSection = await storage.getBonusSection();
    res.json(bonusSection || {});
  } catch (error) {
    next(error);
  }
});

contentRouter.get("/bonus-items", async (req, res, next) => {
  try {
    const bonusItems = await storage.getBonusItems();
    res.json(bonusItems);
  } catch (error) {
    next(error);
  }
});

// Guarantee section route
contentRouter.get("/guarantee-section", async (req, res, next) => {
  try {
    const guaranteeSection = await storage.getGuaranteeSection();
    res.json(guaranteeSection || {});
  } catch (error) {
    next(error);
  }
});

// Scholarship section route
contentRouter.get("/scholarship-section", async (req, res, next) => {
  try {
    const scholarshipSection = await storage.getScholarshipSection();
    res.json(scholarshipSection || {});
  } catch (error) {
    next(error);
  }
});

// YouTube Framework section route
contentRouter.get("/youtube-framework-section", async (req, res, next) => {
  try {
    const youtubeFrameworkSection = await storage.getYoutubeFrameworkSection();
    res.json(youtubeFrameworkSection || {});
  } catch (error) {
    next(error);
  }
});

// Questions section route
contentRouter.get("/questions-section", async (req, res, next) => {
  try {
    const questionsSection = await storage.getQuestionsSection();
    res.json(questionsSection || {});
  } catch (error) {
    next(error);
  }
});

// Social links route
contentRouter.get("/social-links", async (req, res, next) => {
  try {
    const socialLinks = await storage.getSocialLinks();
    res.json(socialLinks);
  } catch (error) {
    next(error);
  }
});

// Milestones route - public access
contentRouter.get("/milestones", async (req, res, next) => {
  try {
    const milestones = await storage.getMilestones();
    res.json(milestones);
  } catch (error) {
    next(error);
  }
});