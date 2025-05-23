import { z } from "zod";
import { pgTable, serial, text, integer, boolean, timestamp, uniqueIndex, varchar, json, date } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

// ----- Landing Section Schema -----
export const landingSection = pgTable("landing_section", {
  id: serial("id").primaryKey(),
  heading: text("heading").notNull(),
  subheading: text("subheading").notNull(),
  imageUrl: text("image_url"),
  newsletterHeading: text("newsletter_heading"),
  newsletterSubheading: text("newsletter_subheading"),
  newsletterCta: text("newsletter_cta"),
  subscribersCount: text("subscribers_count"),
  reviewsCount: text("reviews_count"),
  backgroundColor: text("background_color").default('#F9F6F3'),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type LandingSection = typeof landingSection.$inferSelect;
export const insertLandingSectionSchema = createInsertSchema(landingSection).omit({
  id: true,
  updatedAt: true,
});
export type InsertLandingSection = z.infer<typeof insertLandingSectionSchema>;

// ----- User Schema -----
export const users = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    username: text("username").notNull(),
    email: text("email").notNull(),
    password: text("password").notNull(),
    isAdmin: boolean("is_admin").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    stripeCustomerId: text("stripe_customer_id"),
    stripeSubscriptionId: text("stripe_subscription_id"),
  },
  (users) => {
    return {
      usernameIdx: uniqueIndex("username_idx").on(users.username),
      emailIdx: uniqueIndex("email_idx").on(users.email),
    };
  }
);

export const insertUserSchema = createInsertSchema(users);
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// ----- Hero Section Schema -----
export const heroSection = pgTable("hero_section", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  subtitle: text("subtitle").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  buttonText: text("button_text").notNull(),
  buttonUrl: text("button_url").notNull(),
  featuredIn: text("featured_in"),
  videoUrl: text("video_url"),
});

export type HeroSection = typeof heroSection.$inferSelect;
export const insertHeroSectionSchema = createInsertSchema(heroSection).omit({
  id: true,
});
export type InsertHeroSection = z.infer<typeof insertHeroSectionSchema>;

// ----- Quote Section Schema -----
export const quoteSection = pgTable("quote_section", {
  id: serial("id").primaryKey(),
  heading: text("heading").notNull(), // This corresponds to the author
  content: text("content").notNull(), // This corresponds to the quote text
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  backgroundColor: text("background_color").default("#fffcf1"),
});

export type QuoteSection = typeof quoteSection.$inferSelect;
export const insertQuoteSectionSchema = createInsertSchema(quoteSection).omit({
  id: true,
});
export type InsertQuoteSection = z.infer<typeof insertQuoteSectionSchema>;

// ----- Learning Points Section Schema -----
export const learningPointsSection = pgTable("learning_points_section", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  subtitle: text("subtitle").notNull(),
  description: text("description").notNull(),
});

export type LearningPointsSection = typeof learningPointsSection.$inferSelect;
export const insertLearningPointsSectionSchema = createInsertSchema(learningPointsSection).omit({
  id: true,
});
export type InsertLearningPointsSection = z.infer<typeof insertLearningPointsSectionSchema>;

// ----- Learning Points Schema -----
export const learningPoints = pgTable("learning_points", {
  id: serial("id").primaryKey(),
  sectionId: integer("section_id")
    .references(() => learningPointsSection.id)
    .notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  iconName: text("icon_name").notNull(),
  order: integer("order").notNull(),
});

export type LearningPoint = typeof learningPoints.$inferSelect;
export const insertLearningPointSchema = createInsertSchema(learningPoints).omit({
  id: true,
});
export type InsertLearningPoint = z.infer<typeof insertLearningPointSchema>;

// ----- Testimonial Section Schema -----
export const testimonialSection = pgTable("testimonial_section", {
  id: serial("id").primaryKey(),
  title: text("title"), // Now optional
  subtitle: text("subtitle"),
  description: text("description"),
  successStory: text("success_story"),
  successStoryName: text("success_story_name").default("Brandon"),
  initialSubs: integer("initial_subs").default(700),
  currentSubs: integer("current_subs").default(10000),
  timeframeSubs: text("timeframe_subs").default("18 months"),
  viewsIncrease: integer("views_increase").default(6300),
  initialViews: integer("initial_views").default(90),
  finalViews: integer("final_views").default(5700),
  workPeriod: text("work_period").default("12 weeks"),
});

export type TestimonialSection = typeof testimonialSection.$inferSelect;
export const insertTestimonialSectionSchema = createInsertSchema(testimonialSection).omit({
  id: true,
});
export type InsertTestimonialSection = z.infer<typeof insertTestimonialSectionSchema>;

// ----- Testimonials Schema -----
export const testimonials = pgTable("testimonial", {
  id: serial("id").primaryKey(),
  name: text("name"),
  title: text("title"),
  quote: text("quote").notNull(),
  imageUrl: text("image_url"),
  videoUrl: text("video_url"),
  mediaType: text("media_type").default("image").notNull(),
  showMobile: boolean("show_mobile").default(true).notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  subscriberCount: integer("subscriber_count"),
  viewCount: integer("view_count"),
  growthChartUrl: text("growth_chart_url"),
  hasGrowthChart: boolean("has_growth_chart").default(false),
  growthChartData: json("growth_chart_data"),
  annotations: json("annotations"),
  headline: text("headline"),
  subheadline: text("subheadline"),
});

export type Testimonial = typeof testimonials.$inferSelect;
export const insertTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true,
});
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;

// ----- Book Sections Schema -----
export const bookSections = pgTable("book_sections", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  subtitle: text("subtitle").notNull(),
  description: text("description").notNull(),
});

export type BookSection = typeof bookSections.$inferSelect;
export const insertBookSectionSchema = createInsertSchema(bookSections).omit({
  id: true,
});
export type InsertBookSection = z.infer<typeof insertBookSectionSchema>;

// ----- About Book Section Schema -----
export const aboutBookSection = pgTable("about_book_section", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  buttonText: text("button_text").notNull(),
  buttonUrl: text("button_url").notNull(),
  features: text("features").array(),
});

export type AboutBookSection = typeof aboutBookSection.$inferSelect;
export const insertAboutBookSectionSchema = createInsertSchema(aboutBookSection).omit({
  id: true,
});
export type InsertAboutBookSection = z.infer<typeof insertAboutBookSectionSchema>;

// ----- Author Section Schema -----
export const authorSection = pgTable("author_section", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  bio: text("bio").notNull(),
  imageUrl: text("image_url"),
  buttonText: text("button_text"),
  buttonUrl: text("button_url"),
  credentials: text("credentials").array(),
});

export type AuthorSection = typeof authorSection.$inferSelect;
export const insertAuthorSectionSchema = createInsertSchema(authorSection).omit({
  id: true,
});
export type InsertAuthorSection = z.infer<typeof insertAuthorSectionSchema>;

// ----- Footer Categories Schema -----
export const footerCategories = pgTable("footer_categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  order_index: integer("order_index").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type FooterCategory = typeof footerCategories.$inferSelect;
export const insertFooterCategorySchema = createInsertSchema(footerCategories).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type InsertFooterCategory = z.infer<typeof insertFooterCategorySchema>;

// ----- Footer Links Schema -----
export const footerLinks = pgTable("footer_links", {
  id: serial("id").primaryKey(),
  categoryId: integer("category_id")
    .references(() => footerCategories.id)
    .notNull(),
  label: text("label").notNull(),
  url: text("url").notNull(),
  order_index: integer("order_index").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type FooterLink = typeof footerLinks.$inferSelect;
export const insertFooterLinkSchema = createInsertSchema(footerLinks).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type InsertFooterLink = z.infer<typeof insertFooterLinkSchema>;

// ----- Social Links Schema -----
export const socialLinks = pgTable("social_links", {
  id: serial("id").primaryKey(),
  platform: text("platform").notNull(),
  url: text("url").notNull(),
  order_index: integer("order_index").notNull().default(0),
  icon_name: text("icon_name"),
  active: boolean("active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type SocialLink = typeof socialLinks.$inferSelect;
export const insertSocialLinkSchema = createInsertSchema(socialLinks).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type InsertSocialLink = z.infer<typeof insertSocialLinkSchema>;

// ----- Site Settings Schema -----
export const siteSettings = pgTable("site_settings", {
  id: serial("id").primaryKey(),
  siteName: text("site_name").notNull(),
  siteDescription: text("site_description").notNull(),
  contactEmail: text("contact_email").notNull(),
  copyrightText: text("copyright_text").notNull(),
  logoUrl: text("logo_url"),
  faviconUrl: text("favicon_url"),
  siteTagline: text("site_tagline"),
  enablePreorders: boolean("enable_preorders").default(true),
  preorderUrl: text("preorder_url"),
  maintenanceMode: boolean("maintenance_mode").default(false),
});

// ----- SEO Metadata Schema -----
export const seoMetadata = pgTable("seo_metadata", {
  id: serial("id").primaryKey(),
  metaTitle: text("meta_title").notNull(),
  metaDescription: text("meta_description").notNull(),
  ogTitle: text("og_title"),
  ogDescription: text("og_description"),
  ogImageUrl: text("og_image_url"),
  twitterTitle: text("twitter_title"),
  twitterDescription: text("twitter_description"),
  twitterImageUrl: text("twitter_image_url"),
  canonicalUrl: text("canonical_url"),
  keywords: text("keywords"),
  structuredData: text("structured_data"),
  pagePath: text("page_path").notNull().default("/"),
  isDefault: boolean("is_default").default(false),
});

export type SeoMetadata = typeof seoMetadata.$inferSelect;
export const insertSeoMetadataSchema = createInsertSchema(seoMetadata).omit({
  id: true,
});
export type InsertSeoMetadata = z.infer<typeof insertSeoMetadataSchema>;

export type SiteSettings = typeof siteSettings.$inferSelect;
export const insertSiteSettingsSchema = createInsertSchema(siteSettings).omit({
  id: true,
});
export type InsertSiteSettings = z.infer<typeof insertSiteSettingsSchema>;

// ----- Theme Settings Schema -----
export const themeSettings = pgTable("theme_settings", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  primaryColor: text("primary_color").notNull().default("#4f46e5"),
  secondaryColor: text("secondary_color").notNull().default("#0ea5e9"),
  accentColor: text("accent_color").notNull().default("#f59e0b"),
  textColor: text("text_color").notNull().default("#111827"),
  backgroundColor: text("background_color").notNull().default("#ffffff"),
  fontPrimary: text("font_primary").notNull().default("Inter"),
  fontSecondary: text("font_secondary").notNull().default("Merriweather"),
  buttonRadius: text("button_radius").notNull().default("0.5rem"),
  buttonStyle: text("button_style").notNull().default("filled"),
  cardStyle: text("card_style").notNull().default("shadow"),
  layoutStyle: text("layout_style").notNull().default("modern"),
  isDarkMode: boolean("is_dark_mode").default(false).notNull(),
  isHighContrast: boolean("is_high_contrast").default(false).notNull(),
  headerStyle: text("header_style").notNull().default("default"),
  footerStyle: text("footer_style").notNull().default("standard"),
  customCss: text("custom_css"),
  appliesGlobally: boolean("applies_globally").default(false).notNull(),
});

export type ThemeSettings = typeof themeSettings.$inferSelect;
export const insertThemeSettingsSchema = createInsertSchema(themeSettings).omit({
  id: true,
});
export type InsertThemeSettings = z.infer<typeof insertThemeSettingsSchema>;

// ----- Articles Schema -----
export const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull(),
  content: text("content").notNull(),
  excerpt: text("excerpt").notNull(),
  coverImageUrl: text("cover_image_url"),
  authorId: integer("author_id")
    .references(() => users.id)
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  publishedAt: timestamp("published_at"),
  tags: text("tags").array(),
  status: text("status").notNull().default("draft"),
});

export type Article = typeof articles.$inferSelect;
export const insertArticleSchema = createInsertSchema(articles).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type InsertArticle = z.infer<typeof insertArticleSchema>;

// ----- Videos Schema -----
export const videos = pgTable("videos", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  videoUrl: text("video_url").notNull(),
  thumbnailUrl: text("thumbnail_url"),
  authorId: integer("author_id")
    .references(() => users.id)
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  publishedAt: timestamp("published_at"),
  tags: text("tags").array(),
  status: text("status").notNull().default("draft"),
});

export type Video = typeof videos.$inferSelect;
export const insertVideoSchema = createInsertSchema(videos).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type InsertVideo = z.infer<typeof insertVideoSchema>;

// ----- Analytics Schema -----
export const pageView = pgTable("page_view", {
  id: serial("id").primaryKey(),
  date: date("date").notNull(),
  path: text("path").notNull(),
  count: integer("count").notNull(),
});

export type PageView = typeof pageView.$inferSelect;
export const insertPageViewSchema = createInsertSchema(pageView).omit({
  id: true,
});
export type InsertPageView = z.infer<typeof insertPageViewSchema>;

export const visitor = pgTable("visitor", {
  id: serial("id").primaryKey(),
  date: date("date").notNull(),
  count: integer("count").notNull(),
  source: text("source").notNull(),
});

export type Visitor = typeof visitor.$inferSelect;
export const insertVisitorSchema = createInsertSchema(visitor).omit({
  id: true,
});
export type InsertVisitor = z.infer<typeof insertVisitorSchema>;

// ----- Newsletter Subscribers Schema -----
export const subscribers = pgTable("subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  name: text("name"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  status: text("status").default("active").notNull(),
  source: text("source").default("website").notNull(),
});

export type Subscriber = typeof subscribers.$inferSelect;
export const insertSubscriberSchema = createInsertSchema(subscribers).omit({
  id: true,
  createdAt: true,
});
export type InsertSubscriber = z.infer<typeof insertSubscriberSchema>;

// ----- Bonus Section Schema -----
export const bonusSection = pgTable("bonus_section", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  subtitle: text("subtitle"),
  backgroundColor: text("background_color"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type BonusSection = typeof bonusSection.$inferSelect;
export const insertBonusSectionSchema = createInsertSchema(bonusSection).omit({
  id: true,
});
export type InsertBonusSection = z.infer<typeof insertBonusSectionSchema>;

// ----- Bonus Items Schema -----
export const bonusItems = pgTable("bonus_item", {
  id: serial("id").primaryKey(),
  sectionId: integer("section_id")
    .references(() => bonusSection.id)
    .notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  iconName: text("icon_name"),
  buttonText: text("button_text"),
  buttonUrl: text("button_url"),
  backgroundColor: text("background_color"),
  orderIndex: integer("order_index"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type BonusItem = typeof bonusItems.$inferSelect;
export const insertBonusItemSchema = createInsertSchema(bonusItems).omit({
  id: true,
});
export type InsertBonusItem = z.infer<typeof insertBonusItemSchema>;

// ----- Guarantee Section Schema -----
export const guaranteeSection = pgTable("guarantee_section", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  paragraphs: text("paragraphs").array(),
  buttonText: text("button_text"),
  buttonUrl: text("button_url"),
  backgroundColor: text("background_color"),
});

export type GuaranteeSection = typeof guaranteeSection.$inferSelect;
export const insertGuaranteeSectionSchema = createInsertSchema(guaranteeSection).omit({
  id: true,
});
export type InsertGuaranteeSection = z.infer<typeof insertGuaranteeSectionSchema>;

// ----- Scholarship Section Schema -----
export const scholarshipSection = pgTable("scholarship_section", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  requirements: text("requirements").array(),
  applicationProcess: text("application_process").array(),
  buttonText: text("button_text"),
  buttonUrl: text("button_url"),
  backgroundColor: text("background_color"),
});

export type ScholarshipSection = typeof scholarshipSection.$inferSelect;
export const insertScholarshipSectionSchema = createInsertSchema(scholarshipSection).omit({
  id: true,
});
export type InsertScholarshipSection = z.infer<typeof insertScholarshipSectionSchema>;

// ----- YouTube Framework Section Schema -----
export const youtubeFrameworkSection = pgTable("youtube_framework_section", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  subtitle: text("subtitle"),
  description: text("description").notNull(),
  steps: json("steps").notNull(),
  finalNote: text("final_note"),
  buttonText: text("button_text"),
  buttonUrl: text("button_url"),
  backgroundColor: text("background_color"),
});

export type YoutubeFrameworkSection = typeof youtubeFrameworkSection.$inferSelect;
export const insertYoutubeFrameworkSectionSchema = createInsertSchema(youtubeFrameworkSection).omit({
  id: true,
});
export type InsertYoutubeFrameworkSection = z.infer<typeof insertYoutubeFrameworkSectionSchema>;

// ----- Questions Section Schema -----
export const questionsSection = pgTable("questions_section", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  subtitle: text("subtitle"),
  contactText: text("contact_text"),
  contactEmail: text("contact_email"),
  description: text("description"),
  backgroundColor: text("background_color"),
});

export type QuestionsSection = typeof questionsSection.$inferSelect;
export const insertQuestionsSectionSchema = createInsertSchema(questionsSection).omit({
  id: true,
});
export type InsertQuestionsSection = z.infer<typeof insertQuestionsSectionSchema>;

// ----- Milestones Schema -----
export const milestones = pgTable("milestones", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  dateReached: timestamp("date_reached"),
  targetDate: timestamp("target_date"),
  iconName: text("icon_name"),
  order: integer("order").default(0),
  completed: boolean("completed").default(false),
  progress: integer("progress").default(0), // 0-100 percentage
  color: text("color").default("#4f46e5"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type Milestone = typeof milestones.$inferSelect;
export const insertMilestoneSchema = createInsertSchema(milestones).omit({
  id: true,
});
export type InsertMilestone = z.infer<typeof insertMilestoneSchema>;