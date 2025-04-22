import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table for authentication
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  isAdmin: boolean("is_admin").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Hero section content
export const heroSection = pgTable("hero_section", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  subtitle: text("subtitle"),
  imageUrl: text("image_url"),
  ctaText: text("cta_text"),
  ctaLink: text("cta_link"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Featured in section
export const featuredSection = pgTable("featured_section", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  logoUrls: json("logo_urls").$type<string[]>().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Quote section with productivity and joy
export const quoteSection = pgTable("quote_section", {
  id: serial("id").primaryKey(),
  heading: text("heading").notNull(),
  content: text("content").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Book learning points
export const learningPoint = pgTable("learning_point", {
  id: serial("id").primaryKey(),
  sectionId: integer("section_id").notNull(),
  number: integer("number").notNull(),
  text: text("text").notNull(),
  showMobile: boolean("show_mobile").default(true).notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Learning points section
export const learningPointsSection = pgTable("learning_points_section", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  videoUrl: text("video_url"),
  subtitle: text("subtitle"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Testimonials
export const testimonial = pgTable("testimonial", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title"),
  quote: text("quote").notNull(),
  imageUrl: text("image_url"),
  showMobile: boolean("show_mobile").default(true).notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Testimonials section
export const testimonialSection = pgTable("testimonial_section", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Book sections (Intro, Part 1, Part 2, Part 3)
export const bookSection = pgTable("book_section", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  subtitle: text("subtitle").notNull(),
  content: text("content").notNull(),
  orderIndex: integer("order_index").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// About book section
export const aboutBookSection = pgTable("about_book_section", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  bookCoverConfig: json("book_cover_config").$type<Record<string, string>>().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Author section
export const authorSection = pgTable("author_section", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  authorName: text("author_name").notNull(),
  bio: text("bio").notNull(),
  bioShort: text("bio_short"),
  imageUrl: text("image_url"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Footer links
export const footerLink = pgTable("footer_link", {
  id: serial("id").primaryKey(),
  categoryId: integer("category_id").notNull(),
  text: text("text").notNull(),
  url: text("url").notNull(),
  orderIndex: integer("order_index").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Footer link categories
export const footerCategory = pgTable("footer_category", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  orderIndex: integer("order_index").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Social media links
export const socialLink = pgTable("social_link", {
  id: serial("id").primaryKey(),
  platform: text("platform").notNull(),
  url: text("url").notNull(),
  iconName: text("icon_name").notNull(),
  active: boolean("active").default(true).notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Site settings
export const siteSetting = pgTable("site_setting", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  value: text("value").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Schema for inserting users
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true, 
  password: true,
  isAdmin: true,
});

// Schema for inserting hero section
export const insertHeroSchema = createInsertSchema(heroSection).omit({
  id: true,
  updatedAt: true,
});

// Schema for inserting featured section
export const insertFeaturedSchema = createInsertSchema(featuredSection).omit({
  id: true,
  updatedAt: true,
});

// Schema for inserting quote section
export const insertQuoteSchema = createInsertSchema(quoteSection).omit({
  id: true,
  updatedAt: true,
});

// Schema for inserting learning points section
export const insertLearningPointsSectionSchema = createInsertSchema(learningPointsSection).omit({
  id: true,
  updatedAt: true,
});

// Schema for inserting learning points
export const insertLearningPointSchema = createInsertSchema(learningPoint).omit({
  id: true,
  updatedAt: true,
});

// Schema for inserting testimonial section
export const insertTestimonialSectionSchema = createInsertSchema(testimonialSection).omit({
  id: true,
  updatedAt: true,
});

// Schema for inserting testimonials
export const insertTestimonialSchema = createInsertSchema(testimonial).omit({
  id: true,
  updatedAt: true,
});

// Schema for inserting book sections
export const insertBookSectionSchema = createInsertSchema(bookSection).omit({
  id: true,
  updatedAt: true,
});

// Schema for inserting about book section
export const insertAboutBookSectionSchema = createInsertSchema(aboutBookSection).omit({
  id: true,
  updatedAt: true,
});

// Schema for inserting author section
export const insertAuthorSectionSchema = createInsertSchema(authorSection).omit({
  id: true,
  updatedAt: true,
});

// Schema for inserting footer categories
export const insertFooterCategorySchema = createInsertSchema(footerCategory).omit({
  id: true,
  updatedAt: true,
});

// Schema for inserting footer links
export const insertFooterLinkSchema = createInsertSchema(footerLink).omit({
  id: true,
  updatedAt: true,
});

// Schema for inserting social links
export const insertSocialLinkSchema = createInsertSchema(socialLink).omit({
  id: true,
  updatedAt: true,
});

// Schema for inserting site settings
export const insertSiteSettingSchema = createInsertSchema(siteSetting).omit({
  id: true,
  updatedAt: true,
});

// Export types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertHero = z.infer<typeof insertHeroSchema>;
export type Hero = typeof heroSection.$inferSelect;

export type InsertFeatured = z.infer<typeof insertFeaturedSchema>;
export type Featured = typeof featuredSection.$inferSelect;

export type InsertQuote = z.infer<typeof insertQuoteSchema>;
export type Quote = typeof quoteSection.$inferSelect;

export type InsertLearningPointsSection = z.infer<typeof insertLearningPointsSectionSchema>;
export type LearningPointsSection = typeof learningPointsSection.$inferSelect;

export type InsertLearningPoint = z.infer<typeof insertLearningPointSchema>;
export type LearningPoint = typeof learningPoint.$inferSelect;

export type InsertTestimonialSection = z.infer<typeof insertTestimonialSectionSchema>;
export type TestimonialSection = typeof testimonialSection.$inferSelect;

export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Testimonial = typeof testimonial.$inferSelect;

export type InsertBookSection = z.infer<typeof insertBookSectionSchema>;
export type BookSection = typeof bookSection.$inferSelect;

export type InsertAboutBookSection = z.infer<typeof insertAboutBookSectionSchema>;
export type AboutBookSection = typeof aboutBookSection.$inferSelect;

export type InsertAuthorSection = z.infer<typeof insertAuthorSectionSchema>;
export type AuthorSection = typeof authorSection.$inferSelect;

export type InsertFooterCategory = z.infer<typeof insertFooterCategorySchema>;
export type FooterCategory = typeof footerCategory.$inferSelect;

export type InsertFooterLink = z.infer<typeof insertFooterLinkSchema>;
export type FooterLink = typeof footerLink.$inferSelect;

export type InsertSocialLink = z.infer<typeof insertSocialLinkSchema>;
export type SocialLink = typeof socialLink.$inferSelect;

export type InsertSiteSetting = z.infer<typeof insertSiteSettingSchema>;
export type SiteSetting = typeof siteSetting.$inferSelect;
