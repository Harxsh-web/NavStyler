import { Schema, model, Document, Model } from 'mongoose';
import { z } from 'zod';

// Types for Mongoose models
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
}

export interface IHero extends Document {
  title: string;
  subtitle: string;
  buttonText?: string;
  buttonUrl?: string;
  imageUrl?: string;
  updatedAt: Date;
}

export interface IFeatured extends Document {
  heading: string;
  subheading?: string;
  logoUrls?: string[];
  updatedAt: Date;
}

export interface IQuote extends Document {
  heading?: string;
  content?: string;
  updatedAt: Date;
}

export interface ILearningPointsSection extends Document {
  title: string;
  subtitle?: string;
  backgroundColor?: string;
  updatedAt: Date;
}

export interface ILearningPoint extends Document {
  number: number;
  text: string;
  sectionId?: number;
  showMobile?: boolean;
  updatedAt: Date;
}

export interface ITestimonialSection extends Document {
  title: string;
  updatedAt: Date;
}

export interface ITestimonial extends Document {
  quote: string;
  name: string;
  title?: string;
  imageUrl?: string;
  videoUrl?: string;
  mediaType: 'image' | 'video';
  showMobile: boolean;
  updatedAt: Date;
}

export interface IBookSection extends Document {
  orderIndex: number;
  title: string;
  subtitle?: string;
  content: string;
  updatedAt: Date;
}

export interface IAboutBookSection extends Document {
  title: string;
  bookCoverConfig?: any;
  updatedAt: Date;
}

export interface IAuthorSection extends Document {
  title?: string;
  name?: string;
  bio?: string;
  bioShort?: string;
  imageUrl?: string;
  updatedAt: Date;
}

export interface IFooterCategory extends Document {
  name: string;
  orderIndex: number;
  updatedAt: Date;
}

export interface IFooterLink extends Document {
  categoryId: Schema.Types.ObjectId;
  text: string;
  url: string;
  orderIndex: number;
  updatedAt: Date;
}

export interface ISocialLink extends Document {
  platform: string;
  url: string;
  iconName: string;
  active: boolean;
  updatedAt: Date;
}

export interface ISiteSetting extends Document {
  name: string;
  value: string;
  updatedAt: Date;
}

export interface IPageView extends Document {
  path: string;
  date: Date;
  count: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISale extends Document {
  date: Date;
  amount: number;
  productType: string;
  stripePaymentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IVisitor extends Document {
  date: Date;
  count: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IContentEngagement extends Document {
  date: Date;
  contentType: string;
  contentId: number;
  engagementScore: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IThemeSettings extends Document {
  name: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  textColor: string;
  backgroundColor: string;
  fontPrimary: string;
  fontSecondary: string;
  buttonRadius: string;
  buttonStyle: string;
  cardStyle: string;
  layoutStyle: string;
  isDarkMode: boolean;
  isHighContrast: boolean;
  headerStyle: string;
  footerStyle: string;
  customCss?: string;
  appliesGlobally: boolean;
  updatedAt: Date;
}

export interface IArticle extends Document {
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  imageUrl?: string;
  backgroundColor?: string;
  isPublished: boolean;
  publishedAt: Date;
  updatedAt: Date;
}

export interface IVideo extends Document {
  title: string;
  slug: string;
  description?: string;
  thumbnailUrl?: string;
  videoUrl: string;
  isPublished: boolean;
  publishedAt: Date;
  updatedAt: Date;
}

// Mongoose Schemas
const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  stripeCustomerId: { type: String },
  stripeSubscriptionId: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const heroSchema = new Schema<IHero>({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  buttonText: { type: String },
  buttonUrl: { type: String },
  imageUrl: { type: String },
  updatedAt: { type: Date, default: Date.now }
});

const featuredSchema = new Schema<IFeatured>({
  heading: { type: String, required: true },
  subheading: { type: String },
  logoUrls: { type: [String] },
  updatedAt: { type: Date, default: Date.now }
});

const quoteSchema = new Schema<IQuote>({
  heading: { type: String },
  content: { type: String },
  updatedAt: { type: Date, default: Date.now }
});

const learningPointsSectionSchema = new Schema<ILearningPointsSection>({
  title: { type: String, required: true },
  subtitle: { type: String },
  backgroundColor: { type: String },
  updatedAt: { type: Date, default: Date.now }
});

const learningPointSchema = new Schema<ILearningPoint>({
  number: { type: Number, required: true },
  text: { type: String, required: true },
  sectionId: { type: Number },
  showMobile: { type: Boolean, default: true },
  updatedAt: { type: Date, default: Date.now }
});

const testimonialSectionSchema = new Schema<ITestimonialSection>({
  title: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now }
});

const testimonialSchema = new Schema<ITestimonial>({
  quote: { type: String, required: true },
  name: { type: String, required: true },
  title: { type: String },
  imageUrl: { type: String },
  videoUrl: { type: String },
  mediaType: { type: String, enum: ['image', 'video'], default: 'image' },
  showMobile: { type: Boolean, default: true },
  updatedAt: { type: Date, default: Date.now }
});

const bookSectionSchema = new Schema<IBookSection>({
  orderIndex: { type: Number, required: true },
  title: { type: String, required: true },
  subtitle: { type: String },
  content: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now }
});

const aboutBookSectionSchema = new Schema<IAboutBookSection>({
  title: { type: String, required: true },
  bookCoverConfig: { type: Schema.Types.Mixed },
  updatedAt: { type: Date, default: Date.now }
});

const authorSectionSchema = new Schema<IAuthorSection>({
  title: { type: String },
  name: { type: String },
  bio: { type: String },
  bioShort: { type: String },
  imageUrl: { type: String },
  updatedAt: { type: Date, default: Date.now }
});

const footerCategorySchema = new Schema<IFooterCategory>({
  name: { type: String, required: true },
  orderIndex: { type: Number, default: 0 },
  updatedAt: { type: Date, default: Date.now }
});

const footerLinkSchema = new Schema<IFooterLink>({
  categoryId: { type: Schema.Types.ObjectId, ref: 'FooterCategory', required: true },
  text: { type: String, required: true },
  url: { type: String, required: true },
  orderIndex: { type: Number, default: 0 },
  updatedAt: { type: Date, default: Date.now }
});

const socialLinkSchema = new Schema<ISocialLink>({
  platform: { type: String, required: true },
  url: { type: String, required: true },
  iconName: { type: String, required: true },
  active: { type: Boolean, default: true },
  updatedAt: { type: Date, default: Date.now }
});

const siteSettingSchema = new Schema<ISiteSetting>({
  name: { type: String, required: true, unique: true },
  value: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now }
});

const pageViewSchema = new Schema<IPageView>({
  path: { type: String, required: true },
  date: { type: Date, required: true },
  count: { type: Number, required: true, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const saleSchema = new Schema<ISale>({
  date: { type: Date, required: true },
  amount: { type: Number, required: true },
  productType: { type: String, required: true },
  stripePaymentId: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const visitorSchema = new Schema<IVisitor>({
  date: { type: Date, required: true },
  count: { type: Number, required: true, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const contentEngagementSchema = new Schema<IContentEngagement>({
  date: { type: Date, required: true },
  contentType: { type: String, required: true },
  contentId: { type: Number, required: true },
  engagementScore: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const themeSettingsSchema = new Schema<IThemeSettings>({
  name: { type: String, required: true, unique: true },
  primaryColor: { type: String, default: '#4f46e5' },
  secondaryColor: { type: String, default: '#0ea5e9' },
  accentColor: { type: String, default: '#f59e0b' },
  textColor: { type: String, default: '#111827' },
  backgroundColor: { type: String, default: '#ffffff' },
  fontPrimary: { type: String, default: 'Inter' },
  fontSecondary: { type: String, default: 'Merriweather' },
  buttonRadius: { type: String, default: '0.5rem' },
  buttonStyle: { type: String, default: 'filled' },
  cardStyle: { type: String, default: 'shadow' },
  layoutStyle: { type: String, default: 'modern' },
  isDarkMode: { type: Boolean, default: false },
  isHighContrast: { type: Boolean, default: false },
  headerStyle: { type: String, default: 'default' },
  footerStyle: { type: String, default: 'standard' },
  customCss: { type: String },
  appliesGlobally: { type: Boolean, default: true },
  updatedAt: { type: Date, default: Date.now }
});

const articleSchema = new Schema<IArticle>({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String },
  content: { type: String, required: true },
  imageUrl: { type: String },
  backgroundColor: { type: String },
  isPublished: { type: Boolean, default: false },
  publishedAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const videoSchema = new Schema<IVideo>({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String },
  thumbnailUrl: { type: String },
  videoUrl: { type: String, required: true },
  isPublished: { type: Boolean, default: false },
  publishedAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Create or get existing models
function getModel<T extends Document>(modelName: string, schema: Schema): Model<T> {
  try {
    return model<T>(modelName);
  } catch (error) {
    // If model doesn't exist, create it
    return model<T>(modelName, schema);
  }
}

// Export models
export const User = getModel<IUser>('User', userSchema);
export const Hero = getModel<IHero>('Hero', heroSchema);
export const Featured = getModel<IFeatured>('Featured', featuredSchema);
export const Quote = getModel<IQuote>('Quote', quoteSchema);
export const LearningPointsSection = getModel<ILearningPointsSection>('LearningPointsSection', learningPointsSectionSchema);
export const LearningPoint = getModel<ILearningPoint>('LearningPoint', learningPointSchema);
export const TestimonialSection = getModel<ITestimonialSection>('TestimonialSection', testimonialSectionSchema);
export const Testimonial = getModel<ITestimonial>('Testimonial', testimonialSchema);
export const BookSection = getModel<IBookSection>('BookSection', bookSectionSchema);
export const AboutBookSection = getModel<IAboutBookSection>('AboutBookSection', aboutBookSectionSchema);
export const AuthorSection = getModel<IAuthorSection>('AuthorSection', authorSectionSchema);
export const FooterCategory = getModel<IFooterCategory>('FooterCategory', footerCategorySchema);
export const FooterLink = getModel<IFooterLink>('FooterLink', footerLinkSchema);
export const SocialLink = getModel<ISocialLink>('SocialLink', socialLinkSchema);
export const SiteSetting = getModel<ISiteSetting>('SiteSetting', siteSettingSchema);
export const PageView = getModel<IPageView>('PageView', pageViewSchema);
export const Sale = getModel<ISale>('Sale', saleSchema);
export const Visitor = getModel<IVisitor>('Visitor', visitorSchema);
export const ContentEngagement = getModel<IContentEngagement>('ContentEngagement', contentEngagementSchema);
export const ThemeSettings = getModel<IThemeSettings>('ThemeSettings', themeSettingsSchema);
export const Article = getModel<IArticle>('Article', articleSchema);
export const Video = getModel<IVideo>('Video', videoSchema);

// Create Zod schemas for validation
export const userZodSchema = z.object({
  username: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  isAdmin: z.boolean().optional().default(false),
  stripeCustomerId: z.string().optional(),
  stripeSubscriptionId: z.string().optional()
});

export const heroZodSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  buttonText: z.string().optional(),
  buttonUrl: z.string().optional(),
  imageUrl: z.string().optional()
});

export const featuredZodSchema = z.object({
  heading: z.string(),
  subheading: z.string().optional(),
  logoUrls: z.array(z.string()).optional()
});

export const quoteZodSchema = z.object({
  heading: z.string().optional(),
  content: z.string().optional()
});

export const learningPointsSectionZodSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  backgroundColor: z.string().optional()
});

export const learningPointZodSchema = z.object({
  number: z.number(),
  text: z.string(),
  sectionId: z.number().optional(),
  showMobile: z.boolean().optional().default(true)
});

export const testimonialSectionZodSchema = z.object({
  title: z.string()
});

export const testimonialZodSchema = z.object({
  quote: z.string(),
  name: z.string(),
  title: z.string().optional(),
  imageUrl: z.string().optional(),
  videoUrl: z.string().optional(),
  mediaType: z.enum(['image', 'video']).default('image'),
  showMobile: z.boolean().optional().default(true)
});

export const bookSectionZodSchema = z.object({
  orderIndex: z.number(),
  title: z.string(),
  subtitle: z.string().optional(),
  content: z.string()
});

export const aboutBookSectionZodSchema = z.object({
  title: z.string(),
  bookCoverConfig: z.any().optional()
});

export const authorSectionZodSchema = z.object({
  title: z.string().optional(),
  name: z.string().optional(),
  bio: z.string().optional(),
  bioShort: z.string().optional(),
  imageUrl: z.string().optional()
});

export const footerCategoryZodSchema = z.object({
  name: z.string(),
  orderIndex: z.number().optional().default(0)
});

export const footerLinkZodSchema = z.object({
  categoryId: z.string(),
  text: z.string(),
  url: z.string(),
  orderIndex: z.number().optional().default(0)
});

export const socialLinkZodSchema = z.object({
  platform: z.string(),
  url: z.string(),
  iconName: z.string(),
  active: z.boolean().optional().default(true)
});

export const siteSettingZodSchema = z.object({
  name: z.string(),
  value: z.string()
});

export const themeSettingsZodSchema = z.object({
  name: z.string(),
  primaryColor: z.string().optional().default('#4f46e5'),
  secondaryColor: z.string().optional().default('#0ea5e9'),
  accentColor: z.string().optional().default('#f59e0b'),
  textColor: z.string().optional().default('#111827'),
  backgroundColor: z.string().optional().default('#ffffff'),
  fontPrimary: z.string().optional().default('Inter'),
  fontSecondary: z.string().optional().default('Merriweather'),
  buttonRadius: z.string().optional().default('0.5rem'),
  buttonStyle: z.string().optional().default('filled'),
  cardStyle: z.string().optional().default('shadow'),
  layoutStyle: z.string().optional().default('modern'),
  isDarkMode: z.boolean().optional().default(false),
  isHighContrast: z.boolean().optional().default(false),
  headerStyle: z.string().optional().default('default'),
  footerStyle: z.string().optional().default('standard'),
  customCss: z.string().optional(),
  appliesGlobally: z.boolean().optional().default(true)
});

export const articleZodSchema = z.object({
  title: z.string(),
  slug: z.string(),
  excerpt: z.string().optional(),
  content: z.string(),
  imageUrl: z.string().optional(),
  backgroundColor: z.string().optional(),
  isPublished: z.boolean().optional().default(false)
});

export const videoZodSchema = z.object({
  title: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  thumbnailUrl: z.string().optional(),
  videoUrl: z.string(),
  isPublished: z.boolean().optional().default(false)
});

// Re-export types for compatibility with the old schema
export type User = IUser;
export type Hero = IHero;
export type Featured = IFeatured;
export type Quote = IQuote;
export type LearningPointsSection = ILearningPointsSection;
export type LearningPoint = ILearningPoint;
export type TestimonialSection = ITestimonialSection;
export type Testimonial = ITestimonial;
export type BookSection = IBookSection;
export type AboutBookSection = IAboutBookSection;
export type AuthorSection = IAuthorSection;
export type FooterCategory = IFooterCategory;
export type FooterLink = IFooterLink;
export type SocialLink = ISocialLink;
export type SiteSetting = ISiteSetting;
export type PageView = IPageView;
export type Sale = ISale;
export type Visitor = IVisitor;
export type ContentEngagement = IContentEngagement;
export type ThemeSettings = IThemeSettings;
export type Article = IArticle;
export type Video = IVideo;

// For compatibility with the insert schemas from drizzle-zod
export const insertUserSchema = userZodSchema;
export const insertHeroSchema = heroZodSchema;
export const insertFeaturedSchema = featuredZodSchema;
export const insertQuoteSchema = quoteZodSchema;
export const insertLearningPointsSectionSchema = learningPointsSectionZodSchema;
export const insertLearningPointSchema = learningPointZodSchema;
export const insertTestimonialSectionSchema = testimonialSectionZodSchema;
export const insertTestimonialSchema = testimonialZodSchema;
export const insertBookSectionSchema = bookSectionZodSchema;
export const insertAboutBookSectionSchema = aboutBookSectionZodSchema;
export const insertAuthorSectionSchema = authorSectionZodSchema;
export const insertFooterCategorySchema = footerCategoryZodSchema;
export const insertFooterLinkSchema = footerLinkZodSchema;
export const insertSocialLinkSchema = socialLinkZodSchema;
export const insertSiteSettingSchema = siteSettingZodSchema;
export const insertThemeSettingsSchema = themeSettingsZodSchema;
export const insertArticleSchema = articleZodSchema;
export const insertVideoSchema = videoZodSchema;