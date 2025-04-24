import { sql } from "drizzle-orm";
import { text, integer, boolean, timestamp, pgTable, serial, primaryKey, varchar, jsonb, date, numeric } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  isAdmin: boolean("is_admin").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  // For Stripe integration
  stripeCustomerId: text("stripe_customer_id"),
  stripeSubscriptionId: text("stripe_subscription_id"),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export const insertUserSchema = createInsertSchema(users);

// Articles
export const article = pgTable("article", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt"),
  content: text("content").notNull(),
  imageUrl: text("image_url"),
  backgroundColor: text("background_color"),
  isPublished: boolean("is_published").default(false).notNull(),
  publishedAt: timestamp("published_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Article = typeof article.$inferSelect;
export type InsertArticle = typeof article.$inferInsert;
export const insertArticleSchema = createInsertSchema(article);

// Videos
export const video = pgTable("video", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  thumbnailUrl: text("thumbnail_url"),
  videoUrl: text("video_url").notNull(),
  isPublished: boolean("is_published").default(false).notNull(),
  publishedAt: timestamp("published_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Video = typeof video.$inferSelect;
export type InsertVideo = typeof video.$inferInsert;
export const insertVideoSchema = createInsertSchema(video);

// Hero Section
export const heroSection = pgTable("hero_section", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  subtitle: text("subtitle").notNull(),
  buttonText: text("button_text"),
  buttonUrl: text("button_url"),
  imageUrl: text("image_url"),
  backgroundColor: text("background_color"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Hero = typeof heroSection.$inferSelect;
export type InsertHero = typeof heroSection.$inferInsert;
export const insertHeroSchema = createInsertSchema(heroSection);

// Featured Section
export const featuredSection = pgTable("featured_section", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  logoUrls: text("logo_urls").array(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Featured = typeof featuredSection.$inferSelect;
export type InsertFeatured = typeof featuredSection.$inferInsert;
export const insertFeaturedSchema = createInsertSchema(featuredSection);

// Quote Section
export const quoteSection = pgTable("quote_section", {
  id: serial("id").primaryKey(),
  quoteText: text("quote_text").notNull(),
  authorName: text("author_name").notNull(),
  authorRole: text("author_role"),
  authorImageUrl: text("author_image_url"),
  backgroundColor: text("background_color"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Quote = typeof quoteSection.$inferSelect;
export type InsertQuote = typeof quoteSection.$inferInsert;
export const insertQuoteSchema = createInsertSchema(quoteSection);

// Learning Points Section
export const learningPointsSection = pgTable("learning_points_section", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  subtitle: text("subtitle"),
  backgroundColor: text("background_color"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type LearningPointsSection = typeof learningPointsSection.$inferSelect;
export type InsertLearningPointsSection = typeof learningPointsSection.$inferInsert;
export const insertLearningPointsSectionSchema = createInsertSchema(learningPointsSection);

// Learning Points
export const learningPoint = pgTable("learning_point", {
  id: serial("id").primaryKey(),
  number: integer("number").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  iconName: text("icon_name"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type LearningPoint = typeof learningPoint.$inferSelect;
export type InsertLearningPoint = typeof learningPoint.$inferInsert;
export const insertLearningPointSchema = createInsertSchema(learningPoint);

// Testimonial Section
export const testimonialSection = pgTable("testimonial_section", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type TestimonialSection = typeof testimonialSection.$inferSelect;
export type InsertTestimonialSection = typeof testimonialSection.$inferInsert;
export const insertTestimonialSectionSchema = createInsertSchema(testimonialSection);

// Testimonials
export const testimonial = pgTable("testimonial", {
  id: serial("id").primaryKey(),
  quote: text("quote").notNull(),
  name: text("name").notNull(),
  title: text("title"), // Job title or role
  imageUrl: text("image_url"),
  videoUrl: text("video_url"),
  mediaType: text("media_type").default("image").notNull(), // 'image', 'video'
  showMobile: boolean("show_mobile").default(true).notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Testimonial = typeof testimonial.$inferSelect;
export type InsertTestimonial = typeof testimonial.$inferInsert;
export const insertTestimonialSchema = createInsertSchema(testimonial);

// Book Sections
export const bookSection = pgTable("book_section", {
  id: serial("id").primaryKey(),
  orderIndex: integer("order_index").notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  imageUrl: text("image_url"),
  backgroundColor: text("background_color"),
  buttonText: text("button_text"),
  buttonUrl: text("button_url"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type BookSection = typeof bookSection.$inferSelect;
export type InsertBookSection = typeof bookSection.$inferInsert;
export const insertBookSectionSchema = createInsertSchema(bookSection);

// About Book Section
export const aboutBookSection = pgTable("about_book_section", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  subtitle: text("subtitle"),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  backgroundColor: text("background_color"),
  buttonText: text("button_text"),
  buttonUrl: text("button_url"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type AboutBookSection = typeof aboutBookSection.$inferSelect;
export type InsertAboutBookSection = typeof aboutBookSection.$inferInsert;
export const insertAboutBookSectionSchema = createInsertSchema(aboutBookSection);

// Author Section
export const authorSection = pgTable("author_section", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  bio: text("bio").notNull(),
  imageUrl: text("image_url"),
  backgroundColor: text("background_color"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type AuthorSection = typeof authorSection.$inferSelect;
export type InsertAuthorSection = typeof authorSection.$inferInsert;
export const insertAuthorSectionSchema = createInsertSchema(authorSection);

// Footer Categories
export const footerCategory = pgTable("footer_category", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  orderIndex: integer("order_index").default(0).notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type FooterCategory = typeof footerCategory.$inferSelect;
export type InsertFooterCategory = typeof footerCategory.$inferInsert;
export const insertFooterCategorySchema = createInsertSchema(footerCategory);

// Footer Links
export const footerLink = pgTable("footer_link", {
  id: serial("id").primaryKey(),
  categoryId: integer("category_id").notNull().references(() => footerCategory.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  url: text("url").notNull(),
  orderIndex: integer("order_index").default(0).notNull(),
  isExternal: boolean("is_external").default(false).notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type FooterLink = typeof footerLink.$inferSelect;
export type InsertFooterLink = typeof footerLink.$inferInsert;
export const insertFooterLinkSchema = createInsertSchema(footerLink);

// Social Links
export const socialLink = pgTable("social_link", {
  id: serial("id").primaryKey(),
  platform: text("platform").notNull(),
  url: text("url").notNull(),
  icon: text("icon").notNull(),
  orderIndex: integer("order_index").default(0).notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type SocialLink = typeof socialLink.$inferSelect;
export type InsertSocialLink = typeof socialLink.$inferInsert;
export const insertSocialLinkSchema = createInsertSchema(socialLink);

// Site Settings
export const siteSetting = pgTable("site_setting", {
  name: text("name").primaryKey(),
  value: text("value").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type SiteSetting = typeof siteSetting.$inferSelect;
export type InsertSiteSetting = typeof siteSetting.$inferInsert;
export const insertSiteSettingSchema = createInsertSchema(siteSetting);

// Analytics - Page Views
export const pageView = pgTable("page_view", {
  id: serial("id").primaryKey(),
  path: text("path").notNull(),
  date: date("date").notNull(),
  count: integer("count").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type PageView = typeof pageView.$inferSelect;
export type InsertPageView = typeof pageView.$inferInsert;
export const insertPageViewSchema = createInsertSchema(pageView);

// Analytics - Sales
export const sale = pgTable("sale", {
  id: serial("id").primaryKey(),
  date: date("date").notNull(),
  amount: numeric("amount").notNull(),
  productType: text("product_type").notNull(), // 'physical', 'ebook', 'audiobook'
  stripePaymentId: text("stripe_payment_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Sale = typeof sale.$inferSelect;
export type InsertSale = typeof sale.$inferInsert;
export const insertSaleSchema = createInsertSchema(sale);

// Analytics - Visitors
export const visitor = pgTable("visitor", {
  id: serial("id").primaryKey(),
  date: date("date").notNull(),
  count: integer("count").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Visitor = typeof visitor.$inferSelect;
export type InsertVisitor = typeof visitor.$inferInsert;
export const insertVisitorSchema = createInsertSchema(visitor);

// Analytics - Content Engagement
export const contentEngagement = pgTable("content_engagement", {
  id: serial("id").primaryKey(),
  date: date("date").notNull(),
  contentType: text("content_type").notNull(), // 'article', 'video'
  contentId: integer("content_id").notNull(),
  engagementScore: numeric("engagement_score").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type ContentEngagement = typeof contentEngagement.$inferSelect;
export type InsertContentEngagement = typeof contentEngagement.$inferInsert;
export const insertContentEngagementSchema = createInsertSchema(contentEngagement);

// Theme Settings
export const themeSettings = pgTable("theme_settings", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  primaryColor: text("primary_color").default("#4f46e5").notNull(), // Indigo
  secondaryColor: text("secondary_color").default("#0ea5e9").notNull(), // Sky blue
  accentColor: text("accent_color").default("#f59e0b").notNull(), // Amber
  textColor: text("text_color").default("#111827").notNull(), // Near black
  backgroundColor: text("background_color").default("#ffffff").notNull(), // White
  fontPrimary: text("font_primary").default("Inter").notNull(),
  fontSecondary: text("font_secondary").default("Merriweather").notNull(),
  buttonRadius: text("button_radius").default("0.5rem").notNull(),
  buttonStyle: text("button_style").default("filled").notNull(), // filled, outline, ghost
  cardStyle: text("card_style").default("shadow").notNull(), // shadow, border, flat
  layoutStyle: text("layout_style").default("modern").notNull(), // modern, classic, minimal
  isDarkMode: boolean("is_dark_mode").default(false).notNull(),
  isHighContrast: boolean("is_high_contrast").default(false).notNull(),
  headerStyle: text("header_style").default("default").notNull(), // default, centered, minimal
  footerStyle: text("footer_style").default("standard").notNull(), // standard, simple, detailed
  customCss: text("custom_css"),
  appliesGlobally: boolean("applies_globally").default(true).notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type ThemeSettings = typeof themeSettings.$inferSelect;
export type InsertThemeSettings = typeof themeSettings.$inferInsert;
export const insertThemeSettingsSchema = createInsertSchema(themeSettings);