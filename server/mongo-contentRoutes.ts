import { Router } from "express";
import { storage } from "./mongo-storage";

export const contentRouter = Router();

// Content endpoints for public consumption
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



contentRouter.get("/testimonial-section", async (req, res, next) => {
  try {
    const section = await storage.getTestimonialSection();
    res.json(section || {});
  } catch (error) {
    next(error);
  }
});

contentRouter.get("/testimonials", async (req, res, next) => {
  try {
    const testimonials = await storage.getTestimonials();
    res.json(testimonials);
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

contentRouter.get("/footer-categories", async (req, res, next) => {
  try {
    const categories = await storage.getFooterCategories();
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

contentRouter.get("/footer-links", async (req, res, next) => {
  try {
    const links = await storage.getFooterLinks();
    res.json(links);
  } catch (error) {
    next(error);
  }
});

contentRouter.get("/social-links", async (req, res, next) => {
  try {
    const links = await storage.getSocialLinks();
    res.json(links);
  } catch (error) {
    next(error);
  }
});

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

contentRouter.get("/guarantee-section", async (req, res, next) => {
  try {
    const guaranteeSection = await storage.getGuaranteeSection();
    res.json(guaranteeSection || {});
  } catch (error) {
    next(error);
  }
});

contentRouter.get("/scholarship-section", async (req, res, next) => {
  try {
    const scholarshipSection = await storage.getScholarshipSection();
    res.json(scholarshipSection || {});
  } catch (error) {
    next(error);
  }
});

contentRouter.get("/youtube-framework-section", async (req, res, next) => {
  try {
    const youtubeFrameworkSection = await storage.getYoutubeFrameworkSection();
    res.json(youtubeFrameworkSection || {});
  } catch (error) {
    next(error);
  }
});

contentRouter.get("/site-settings", async (req, res, next) => {
  try {
    const settings = await storage.getSiteSettings();
    res.json(settings);
  } catch (error) {
    next(error);
  }
});

// Article and Video content
contentRouter.get("/articles", async (req, res, next) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
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

contentRouter.get("/videos", async (req, res, next) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
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