import * as models from "@shared/models";
import mongoose, { connectToDatabase } from "./mongodb";
import { Types } from 'mongoose';
import connectMongo from "connect-mongo";
import session from "express-session";

// Use connectMongo for session storage
const MongoSessionStore = connectMongo;

export interface IStorage {
  // User management
  getUser(id: string): Promise<models.User | undefined>;
  getUserByUsername(username: string): Promise<models.User | undefined>;
  getUserByEmail(email: string): Promise<models.User | undefined>;
  createUser(user: any): Promise<models.User>;
  
  // Articles
  getArticles(limit?: number): Promise<models.Article[]>;
  getArticle(id: string): Promise<models.Article | undefined>;
  getArticleBySlug(slug: string): Promise<models.Article | undefined>;
  createArticle(data: any): Promise<models.Article>;
  updateArticle(id: string, data: any): Promise<models.Article | undefined>;
  deleteArticle(id: string): Promise<boolean>;
  
  // Videos
  getVideos(limit?: number): Promise<models.Video[]>;
  getVideo(id: string): Promise<models.Video | undefined>;
  getVideoBySlug(slug: string): Promise<models.Video | undefined>;
  createVideo(data: any): Promise<models.Video>;
  updateVideo(id: string, data: any): Promise<models.Video | undefined>;
  deleteVideo(id: string): Promise<boolean>;
  
  // Content management
  // Hero section
  getHeroSection(): Promise<models.Hero | undefined>;
  updateHeroSection(data: any): Promise<models.Hero>;
  
  // Featured section
  getFeaturedSection(): Promise<models.Featured | undefined>;
  updateFeaturedSection(data: any): Promise<models.Featured>;
  
  // Quote section
  getQuoteSection(): Promise<models.Quote | undefined>;
  updateQuoteSection(data: any): Promise<models.Quote>;
  
  // Learning points section
  getLearningPointsSection(): Promise<models.LearningPointsSection | undefined>;
  updateLearningPointsSection(data: any): Promise<models.LearningPointsSection>;
  
  // Learning points
  getLearningPoints(): Promise<models.LearningPoint[]>;
  getLearningPoint(id: string): Promise<models.LearningPoint | undefined>;
  createLearningPoint(data: any): Promise<models.LearningPoint>;
  updateLearningPoint(id: string, data: any): Promise<models.LearningPoint | undefined>;
  deleteLearningPoint(id: string): Promise<boolean>;
  
  // Testimonial section
  getTestimonialSection(): Promise<models.TestimonialSection | undefined>;
  updateTestimonialSection(data: any): Promise<models.TestimonialSection>;
  
  // Testimonials
  getTestimonials(): Promise<models.Testimonial[]>;
  getTestimonial(id: string): Promise<models.Testimonial | undefined>;
  createTestimonial(data: any): Promise<models.Testimonial>;
  updateTestimonial(id: string, data: any): Promise<models.Testimonial | undefined>;
  deleteTestimonial(id: string): Promise<boolean>;
  
  // Book sections
  getBookSections(): Promise<models.BookSection[]>;
  getBookSection(id: string): Promise<models.BookSection | undefined>;
  createBookSection(data: any): Promise<models.BookSection>;
  updateBookSection(id: string, data: any): Promise<models.BookSection | undefined>;
  deleteBookSection(id: string): Promise<boolean>;
  
  // About book section
  getAboutBookSection(): Promise<models.AboutBookSection | undefined>;
  updateAboutBookSection(data: any): Promise<models.AboutBookSection>;
  
  // Author section
  getAuthorSection(): Promise<models.AuthorSection | undefined>;
  updateAuthorSection(data: any): Promise<models.AuthorSection>;
  
  // Footer categories
  getFooterCategories(): Promise<models.FooterCategory[]>;
  getFooterCategory(id: string): Promise<models.FooterCategory | undefined>;
  createFooterCategory(data: any): Promise<models.FooterCategory>;
  updateFooterCategory(id: string, data: any): Promise<models.FooterCategory | undefined>;
  deleteFooterCategory(id: string): Promise<boolean>;
  
  // Footer links
  getFooterLinks(): Promise<models.FooterLink[]>;
  getFooterLink(id: string): Promise<models.FooterLink | undefined>;
  createFooterLink(data: any): Promise<models.FooterLink>;
  updateFooterLink(id: string, data: any): Promise<models.FooterLink | undefined>;
  deleteFooterLink(id: string): Promise<boolean>;
  
  // Social links
  getSocialLinks(): Promise<models.SocialLink[]>;
  getSocialLink(id: string): Promise<models.SocialLink | undefined>;
  createSocialLink(data: any): Promise<models.SocialLink>;
  updateSocialLink(id: string, data: any): Promise<models.SocialLink | undefined>;
  deleteSocialLink(id: string): Promise<boolean>;
  
  // Bonus Section
  getBonusSection(): Promise<models.BonusSection | undefined>;
  updateBonusSection(data: any): Promise<models.BonusSection>;
  
  // Bonus Items
  getBonusItems(): Promise<models.BonusItem[]>;
  getBonusItem(id: string): Promise<models.BonusItem | undefined>;
  createBonusItem(data: any): Promise<models.BonusItem>;
  updateBonusItem(id: string, data: any): Promise<models.BonusItem | undefined>;
  deleteBonusItem(id: string): Promise<boolean>;
  
  // Guarantee Section
  getGuaranteeSection(): Promise<models.GuaranteeSection | undefined>;
  updateGuaranteeSection(data: any): Promise<models.GuaranteeSection>;
  
  // Scholarship Section
  getScholarshipSection(): Promise<models.ScholarshipSection | undefined>;
  updateScholarshipSection(data: any): Promise<models.ScholarshipSection>;
  
  // YouTube Framework Section
  getYoutubeFrameworkSection(): Promise<models.YoutubeFrameworkSection | undefined>;
  updateYoutubeFrameworkSection(data: any): Promise<models.YoutubeFrameworkSection>;
  
  // Site settings
  getSiteSettings(): Promise<models.SiteSetting[]>;
  getSiteSetting(name: string): Promise<models.SiteSetting | undefined>;
  updateSiteSetting(name: string, value: string): Promise<models.SiteSetting>;
  
  // Theme settings
  getThemeSettings(): Promise<models.ThemeSettings[]>;
  getThemeSettingsByName(name: string): Promise<models.ThemeSettings | undefined>;
  getActiveTheme(): Promise<models.ThemeSettings | undefined>;
  createThemeSettings(data: any): Promise<models.ThemeSettings>;
  updateThemeSettings(id: string, data: any): Promise<models.ThemeSettings | undefined>;
  deleteThemeSettings(id: string): Promise<boolean>;
  
  // Analytics
  getPageViews(start?: Date, end?: Date): Promise<models.PageView[]>;
  getSales(start?: Date, end?: Date): Promise<models.Sale[]>;
  getVisitors(start?: Date, end?: Date): Promise<models.Visitor[]>;
  getContentEngagement(start?: Date, end?: Date): Promise<models.ContentEngagement[]>;
  
  // Session store for authentication
  sessionStore: any;
  
  // Initialize database connection
  initialize(): Promise<void>;
}

export class MongoDBStorage implements IStorage {
  sessionStore: any;
  
  constructor() {
    this.sessionStore = MongoSessionStore.create({
      mongoUrl: process.env.DATABASE_URL,
      ttl: 14 * 24 * 60 * 60, // 14 days session timeout
      autoRemove: 'native',
    });
  }
  
  async initialize(): Promise<void> {
    await connectToDatabase();
    console.log('MongoDB connection initialized');
  }
  
  // User management
  async getUser(id: string): Promise<models.User | undefined> {
    try {
      if (!Types.ObjectId.isValid(id)) return undefined;
      const user = await models.User.findById(id).lean();
      return user || undefined;
    } catch (error) {
      console.error('Error getting user:', error);
      throw error;
    }
  }
  
  async getUserByUsername(username: string): Promise<models.User | undefined> {
    try {
      const user = await models.User.findOne({ username }).lean();
      return user || undefined;
    } catch (error) {
      console.error('Error getting user by username:', error);
      throw error;
    }
  }
  
  async getUserByEmail(email: string): Promise<models.User | undefined> {
    try {
      const user = await models.User.findOne({ email }).lean();
      return user || undefined;
    } catch (error) {
      console.error('Error getting user by email:', error);
      throw error;
    }
  }
  
  async createUser(userData: any): Promise<models.User> {
    try {
      const newUser = new models.User(userData);
      await newUser.save();
      return newUser.toObject();
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }
  
  async updateUser(id: string, data: any): Promise<models.User | undefined> {
    try {
      if (!Types.ObjectId.isValid(id)) return undefined;
      const updatedUser = await models.User.findByIdAndUpdate(
        id,
        { ...data, updatedAt: new Date() },
        { new: true }
      ).lean();
      return updatedUser || undefined;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }
  
  // Articles
  async getArticles(limit: number = 10): Promise<models.Article[]> {
    try {
      const articles = await models.Article.find()
        .sort({ publishedAt: -1 })
        .limit(limit)
        .lean();
      return articles;
    } catch (error) {
      console.error('Error getting articles:', error);
      throw error;
    }
  }
  
  async getArticle(id: string): Promise<models.Article | undefined> {
    try {
      if (!Types.ObjectId.isValid(id)) return undefined;
      const article = await models.Article.findById(id).lean();
      return article || undefined;
    } catch (error) {
      console.error('Error getting article:', error);
      throw error;
    }
  }
  
  async getArticleBySlug(slug: string): Promise<models.Article | undefined> {
    try {
      const article = await models.Article.findOne({ slug }).lean();
      return article || undefined;
    } catch (error) {
      console.error('Error getting article by slug:', error);
      throw error;
    }
  }
  
  async createArticle(data: any): Promise<models.Article> {
    try {
      const newArticle = new models.Article({
        ...data,
        publishedAt: new Date(),
        updatedAt: new Date()
      });
      await newArticle.save();
      return newArticle.toObject();
    } catch (error) {
      console.error('Error creating article:', error);
      throw error;
    }
  }
  
  async updateArticle(id: string, data: any): Promise<models.Article | undefined> {
    try {
      if (!Types.ObjectId.isValid(id)) return undefined;
      const updatedArticle = await models.Article.findByIdAndUpdate(
        id,
        { ...data, updatedAt: new Date() },
        { new: true }
      ).lean();
      return updatedArticle || undefined;
    } catch (error) {
      console.error('Error updating article:', error);
      throw error;
    }
  }
  
  async deleteArticle(id: string): Promise<boolean> {
    try {
      if (!Types.ObjectId.isValid(id)) return false;
      const result = await models.Article.deleteOne({ _id: id });
      return result.deletedCount === 1;
    } catch (error) {
      console.error('Error deleting article:', error);
      throw error;
    }
  }
  
  // Videos
  async getVideos(limit: number = 10): Promise<models.Video[]> {
    try {
      const videos = await models.Video.find()
        .sort({ publishedAt: -1 })
        .limit(limit)
        .lean();
      return videos;
    } catch (error) {
      console.error('Error getting videos:', error);
      throw error;
    }
  }
  
  async getVideo(id: string): Promise<models.Video | undefined> {
    try {
      if (!Types.ObjectId.isValid(id)) return undefined;
      const video = await models.Video.findById(id).lean();
      return video || undefined;
    } catch (error) {
      console.error('Error getting video:', error);
      throw error;
    }
  }
  
  async getVideoBySlug(slug: string): Promise<models.Video | undefined> {
    try {
      const video = await models.Video.findOne({ slug }).lean();
      return video || undefined;
    } catch (error) {
      console.error('Error getting video by slug:', error);
      throw error;
    }
  }
  
  async createVideo(data: any): Promise<models.Video> {
    try {
      const newVideo = new models.Video({
        ...data,
        publishedAt: new Date(),
        updatedAt: new Date()
      });
      await newVideo.save();
      return newVideo.toObject();
    } catch (error) {
      console.error('Error creating video:', error);
      throw error;
    }
  }
  
  async updateVideo(id: string, data: any): Promise<models.Video | undefined> {
    try {
      if (!Types.ObjectId.isValid(id)) return undefined;
      const updatedVideo = await models.Video.findByIdAndUpdate(
        id,
        { ...data, updatedAt: new Date() },
        { new: true }
      ).lean();
      return updatedVideo || undefined;
    } catch (error) {
      console.error('Error updating video:', error);
      throw error;
    }
  }
  
  async deleteVideo(id: string): Promise<boolean> {
    try {
      if (!Types.ObjectId.isValid(id)) return false;
      const result = await models.Video.deleteOne({ _id: id });
      return result.deletedCount === 1;
    } catch (error) {
      console.error('Error deleting video:', error);
      throw error;
    }
  }
  
  // Hero Section
  async getHeroSection(): Promise<models.Hero | undefined> {
    try {
      const hero = await models.Hero.findOne().lean();
      return hero || undefined;
    } catch (error) {
      console.error('Error getting hero section:', error);
      throw error;
    }
  }
  
  async updateHeroSection(data: any): Promise<models.Hero> {
    try {
      console.log('Updating hero section with data:', data);
      
      // Extract button values to debug
      if (data.buttonText || data.buttonUrl) {
        console.log('Button values for update:', {
          buttonText: data.buttonText,
          buttonUrl: data.buttonUrl
        });
      }
      
      const updatedData = { ...data, updatedAt: new Date() };
      
      // Use findOneAndUpdate with upsert to create if not exists
      const updatedHero = await models.Hero.findOneAndUpdate(
        {}, // empty filter to match any document
        updatedData,
        { 
          new: true, // return the updated document
          upsert: true, // create if not exists
          setDefaultsOnInsert: true // apply schema defaults on insert
        }
      ).lean();
      
      console.log('Hero section updated successfully:', updatedHero);
      return updatedHero;
    } catch (error) {
      console.error('Error updating hero section:', error);
      throw error;
    }
  }
  
  // Featured Section
  async getFeaturedSection(): Promise<models.Featured | undefined> {
    try {
      const featured = await models.Featured.findOne().lean();
      return featured || undefined;
    } catch (error) {
      console.error('Error getting featured section:', error);
      throw error;
    }
  }
  
  async updateFeaturedSection(data: any): Promise<models.Featured> {
    try {
      const updatedFeatured = await models.Featured.findOneAndUpdate(
        {},
        { ...data, updatedAt: new Date() },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      ).lean();
      return updatedFeatured;
    } catch (error) {
      console.error('Error updating featured section:', error);
      throw error;
    }
  }
  
  // Quote Section
  async getQuoteSection(): Promise<models.Quote | undefined> {
    try {
      const quote = await models.Quote.findOne().lean();
      return quote || undefined;
    } catch (error) {
      console.error('Error getting quote section:', error);
      throw error;
    }
  }
  
  async updateQuoteSection(data: any): Promise<models.Quote> {
    try {
      const updatedQuote = await models.Quote.findOneAndUpdate(
        {},
        { ...data, updatedAt: new Date() },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      ).lean();
      return updatedQuote;
    } catch (error) {
      console.error('Error updating quote section:', error);
      throw error;
    }
  }
  
  // Learning Points Section
  async getLearningPointsSection(): Promise<models.LearningPointsSection | undefined> {
    try {
      const section = await models.LearningPointsSection.findOne().lean();
      return section || undefined;
    } catch (error) {
      console.error('Error getting learning points section:', error);
      throw error;
    }
  }
  
  async updateLearningPointsSection(data: any): Promise<models.LearningPointsSection> {
    try {
      const updatedSection = await models.LearningPointsSection.findOneAndUpdate(
        {},
        { ...data, updatedAt: new Date() },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      ).lean();
      return updatedSection;
    } catch (error) {
      console.error('Error updating learning points section:', error);
      throw error;
    }
  }
  
  // Learning Points
  async getLearningPoints(): Promise<models.LearningPoint[]> {
    try {
      const points = await models.LearningPoint.find().sort({ number: 1 }).lean();
      return points;
    } catch (error) {
      console.error('Error getting learning points:', error);
      throw error;
    }
  }
  
  async getLearningPoint(id: string): Promise<models.LearningPoint | undefined> {
    try {
      if (!Types.ObjectId.isValid(id)) return undefined;
      const point = await models.LearningPoint.findById(id).lean();
      return point || undefined;
    } catch (error) {
      console.error('Error getting learning point:', error);
      throw error;
    }
  }
  
  async createLearningPoint(data: any): Promise<models.LearningPoint> {
    try {
      const newPoint = new models.LearningPoint({
        ...data,
        updatedAt: new Date()
      });
      await newPoint.save();
      return newPoint.toObject();
    } catch (error) {
      console.error('Error creating learning point:', error);
      throw error;
    }
  }
  
  async updateLearningPoint(id: string, data: any): Promise<models.LearningPoint | undefined> {
    try {
      if (!Types.ObjectId.isValid(id)) return undefined;
      const updatedPoint = await models.LearningPoint.findByIdAndUpdate(
        id,
        { ...data, updatedAt: new Date() },
        { new: true }
      ).lean();
      return updatedPoint || undefined;
    } catch (error) {
      console.error('Error updating learning point:', error);
      throw error;
    }
  }
  
  async deleteLearningPoint(id: string): Promise<boolean> {
    try {
      if (!Types.ObjectId.isValid(id)) return false;
      const result = await models.LearningPoint.deleteOne({ _id: id });
      return result.deletedCount === 1;
    } catch (error) {
      console.error('Error deleting learning point:', error);
      throw error;
    }
  }
  
  // Testimonial Section
  async getTestimonialSection(): Promise<models.TestimonialSection | undefined> {
    try {
      const section = await models.TestimonialSection.findOne().lean();
      return section || undefined;
    } catch (error) {
      console.error('Error getting testimonial section:', error);
      throw error;
    }
  }
  
  async updateTestimonialSection(data: any): Promise<models.TestimonialSection> {
    try {
      const updatedSection = await models.TestimonialSection.findOneAndUpdate(
        {},
        { ...data, updatedAt: new Date() },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      ).lean();
      return updatedSection;
    } catch (error) {
      console.error('Error updating testimonial section:', error);
      throw error;
    }
  }
  
  // Testimonials
  async getTestimonials(): Promise<models.Testimonial[]> {
    try {
      const testimonials = await models.Testimonial.find().lean();
      return testimonials;
    } catch (error) {
      console.error('Error getting testimonials:', error);
      throw error;
    }
  }
  
  async getTestimonial(id: string): Promise<models.Testimonial | undefined> {
    try {
      if (!Types.ObjectId.isValid(id)) return undefined;
      const testimonial = await models.Testimonial.findById(id).lean();
      return testimonial || undefined;
    } catch (error) {
      console.error('Error getting testimonial:', error);
      throw error;
    }
  }
  
  async createTestimonial(data: any): Promise<models.Testimonial> {
    try {
      const newTestimonial = new models.Testimonial({
        ...data,
        updatedAt: new Date()
      });
      await newTestimonial.save();
      return newTestimonial.toObject();
    } catch (error) {
      console.error('Error creating testimonial:', error);
      throw error;
    }
  }
  
  async updateTestimonial(id: string, data: any): Promise<models.Testimonial | undefined> {
    try {
      if (!Types.ObjectId.isValid(id)) return undefined;
      const updatedTestimonial = await models.Testimonial.findByIdAndUpdate(
        id,
        { ...data, updatedAt: new Date() },
        { new: true }
      ).lean();
      return updatedTestimonial || undefined;
    } catch (error) {
      console.error('Error updating testimonial:', error);
      throw error;
    }
  }
  
  async deleteTestimonial(id: string): Promise<boolean> {
    try {
      if (!Types.ObjectId.isValid(id)) return false;
      const result = await models.Testimonial.deleteOne({ _id: id });
      return result.deletedCount === 1;
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      throw error;
    }
  }
  
  // Book Sections
  async getBookSections(): Promise<models.BookSection[]> {
    try {
      const sections = await models.BookSection.find().sort({ orderIndex: 1 }).lean();
      return sections;
    } catch (error) {
      console.error('Error getting book sections:', error);
      throw error;
    }
  }
  
  async getBookSection(id: string): Promise<models.BookSection | undefined> {
    try {
      if (!Types.ObjectId.isValid(id)) return undefined;
      const section = await models.BookSection.findById(id).lean();
      return section || undefined;
    } catch (error) {
      console.error('Error getting book section:', error);
      throw error;
    }
  }
  
  async createBookSection(data: any): Promise<models.BookSection> {
    try {
      const newSection = new models.BookSection({
        ...data,
        updatedAt: new Date()
      });
      await newSection.save();
      return newSection.toObject();
    } catch (error) {
      console.error('Error creating book section:', error);
      throw error;
    }
  }
  
  async updateBookSection(id: string, data: any): Promise<models.BookSection | undefined> {
    try {
      if (!Types.ObjectId.isValid(id)) return undefined;
      const updatedSection = await models.BookSection.findByIdAndUpdate(
        id,
        { ...data, updatedAt: new Date() },
        { new: true }
      ).lean();
      return updatedSection || undefined;
    } catch (error) {
      console.error('Error updating book section:', error);
      throw error;
    }
  }
  
  async deleteBookSection(id: string): Promise<boolean> {
    try {
      if (!Types.ObjectId.isValid(id)) return false;
      const result = await models.BookSection.deleteOne({ _id: id });
      return result.deletedCount === 1;
    } catch (error) {
      console.error('Error deleting book section:', error);
      throw error;
    }
  }
  
  // About Book Section
  async getAboutBookSection(): Promise<models.AboutBookSection | undefined> {
    try {
      const aboutBook = await models.AboutBookSection.findOne().lean();
      return aboutBook || undefined;
    } catch (error) {
      console.error('Error getting about book section:', error);
      throw error;
    }
  }
  
  async updateAboutBookSection(data: any): Promise<models.AboutBookSection> {
    try {
      const updatedAboutBook = await models.AboutBookSection.findOneAndUpdate(
        {},
        { ...data, updatedAt: new Date() },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      ).lean();
      return updatedAboutBook;
    } catch (error) {
      console.error('Error updating about book section:', error);
      throw error;
    }
  }
  
  // Author Section
  async getAuthorSection(): Promise<models.AuthorSection | undefined> {
    try {
      const author = await models.AuthorSection.findOne().lean();
      return author || undefined;
    } catch (error) {
      console.error('Error getting author section:', error);
      throw error;
    }
  }
  
  async updateAuthorSection(data: any): Promise<models.AuthorSection> {
    try {
      const updatedAuthor = await models.AuthorSection.findOneAndUpdate(
        {},
        { ...data, updatedAt: new Date() },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      ).lean();
      return updatedAuthor;
    } catch (error) {
      console.error('Error updating author section:', error);
      throw error;
    }
  }
  
  // Bonus Section
  async getBonusSection(): Promise<models.BonusSection | undefined> {
    try {
      const bonusSection = await models.BonusSection.findOne().lean();
      return bonusSection || undefined;
    } catch (error) {
      console.error('Error getting bonus section:', error);
      throw error;
    }
  }
  
  async updateBonusSection(data: any): Promise<models.BonusSection> {
    try {
      const updatedBonusSection = await models.BonusSection.findOneAndUpdate(
        {},
        { ...data, updatedAt: new Date() },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      ).lean();
      
      if (!updatedBonusSection) {
        // If for some reason it failed to create, create one with defaults
        const newBonusSection = new models.BonusSection({
          title: data.title || 'Wait, did you say free bonuses?',
          subtitle: data.subtitle || "Yup. We've decided to bundle in a bunch of free bonuses, just for fun:",
          backgroundColor: data.backgroundColor || '#E6F1FE',
          updatedAt: new Date()
        });
        await newBonusSection.save();
        return newBonusSection.toObject();
      }
      
      return updatedBonusSection;
    } catch (error) {
      console.error('Error updating bonus section:', error);
      throw error;
    }
  }
  
  // Bonus Items
  async getBonusItems(): Promise<models.BonusItem[]> {
    try {
      const bonusItems = await models.BonusItem.find().sort({ orderIndex: 1 }).lean();
      return bonusItems;
    } catch (error) {
      console.error('Error getting bonus items:', error);
      throw error;
    }
  }
  
  async getBonusItem(id: string): Promise<models.BonusItem | undefined> {
    try {
      if (!Types.ObjectId.isValid(id)) return undefined;
      const bonusItem = await models.BonusItem.findById(id).lean();
      return bonusItem || undefined;
    } catch (error) {
      console.error('Error getting bonus item:', error);
      throw error;
    }
  }
  
  async createBonusItem(data: any): Promise<models.BonusItem> {
    try {
      const newBonusItem = new models.BonusItem({
        ...data,
        updatedAt: new Date()
      });
      await newBonusItem.save();
      return newBonusItem.toObject();
    } catch (error) {
      console.error('Error creating bonus item:', error);
      throw error;
    }
  }
  
  async updateBonusItem(id: string, data: any): Promise<models.BonusItem | undefined> {
    try {
      if (!Types.ObjectId.isValid(id)) return undefined;
      const updatedBonusItem = await models.BonusItem.findByIdAndUpdate(
        id,
        { ...data, updatedAt: new Date() },
        { new: true }
      ).lean();
      return updatedBonusItem || undefined;
    } catch (error) {
      console.error('Error updating bonus item:', error);
      throw error;
    }
  }
  
  async deleteBonusItem(id: string): Promise<boolean> {
    try {
      if (!Types.ObjectId.isValid(id)) return false;
      const result = await models.BonusItem.deleteOne({ _id: id });
      return result.deletedCount === 1;
    } catch (error) {
      console.error('Error deleting bonus item:', error);
      throw error;
    }
  }
  
  // Guarantee Section
  async getGuaranteeSection(): Promise<models.GuaranteeSection | undefined> {
    try {
      const guaranteeSection = await models.GuaranteeSection.findOne().lean();
      return guaranteeSection || undefined;
    } catch (error) {
      console.error('Error getting guarantee section:', error);
      throw error;
    }
  }
  
  async updateGuaranteeSection(data: any): Promise<models.GuaranteeSection> {
    try {
      const updatedGuaranteeSection = await models.GuaranteeSection.findOneAndUpdate(
        {},
        { ...data, updatedAt: new Date() },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      ).lean();
      
      if (!updatedGuaranteeSection) {
        // If for some reason it failed to create, create one with defaults
        const newGuaranteeSection = new models.GuaranteeSection({
          title: data.title || 'Our 100% Satisfaction Guarantee & Money-Back Promise',
          subtitle: data.subtitle || 'We want the investment in this course to be an absolute no-brainer for you – if you\'re actually going to do the work 😉',
          content: data.content || '"Do the work" technically involves completing the core modules. If you\'ve done that and for whatever reason aren\'t 100% happy with your experience, drop us an email (within 30 days of purchasing the course) and we\'ll happily refund your entire payment.',
          backgroundColor: data.backgroundColor || '#F9F9F7',
          updatedAt: new Date()
        });
        await newGuaranteeSection.save();
        return newGuaranteeSection.toObject();
      }
      
      return updatedGuaranteeSection;
    } catch (error) {
      console.error('Error updating guarantee section:', error);
      throw error;
    }
  }
  
  // Scholarship Section
  async getScholarshipSection(): Promise<models.ScholarshipSection | undefined> {
    try {
      const scholarshipSection = await models.ScholarshipSection.findOne().lean();
      return scholarshipSection || undefined;
    } catch (error) {
      console.error('Error getting scholarship section:', error);
      throw error;
    }
  }
  
  async updateScholarshipSection(data: any): Promise<models.ScholarshipSection> {
    try {
      const updatedScholarshipSection = await models.ScholarshipSection.findOneAndUpdate(
        {},
        { ...data, updatedAt: new Date() },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      ).lean();
      
      if (!updatedScholarshipSection) {
        // If for some reason it failed to create, create one with defaults
        const newScholarshipSection = new models.ScholarshipSection({
          title: data.title || 'Apply for a Scholarship',
          subtitle: data.subtitle || 'We offer scholarships to those who need support',
          description: data.description || 'If financial constraints are holding you back, you may be eligible for our scholarship program.',
          backgroundColor: data.backgroundColor || '#F0F9FF',
          updatedAt: new Date()
        });
        await newScholarshipSection.save();
        return newScholarshipSection.toObject();
      }
      
      return updatedScholarshipSection;
    } catch (error) {
      console.error('Error updating scholarship section:', error);
      throw error;
    }
  }
  
  // YouTube Framework Section
  async getYoutubeFrameworkSection(): Promise<models.YoutubeFrameworkSection | undefined> {
    try {
      const youtubeFrameworkSection = await models.YoutubeFrameworkSection.findOne().lean();
      return youtubeFrameworkSection || undefined;
    } catch (error) {
      console.error('Error getting youtube framework section:', error);
      throw error;
    }
  }
  
  async updateYoutubeFrameworkSection(data: any): Promise<models.YoutubeFrameworkSection> {
    try {
      const updatedYoutubeFrameworkSection = await models.YoutubeFrameworkSection.findOneAndUpdate(
        {},
        { ...data, updatedAt: new Date() },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      ).lean();
      
      if (!updatedYoutubeFrameworkSection) {
        // If for some reason it failed to create, create one with defaults
        const newYoutubeFrameworkSection = new models.YoutubeFrameworkSection({
          title: data.title || 'My Simple 3 Step YouTube Framework',
          subtitle: data.subtitle || 'Learn how to build a successful YouTube channel',
          description: data.description || 'I\'ve developed a simple but effective framework for creating YouTube content that drives views and builds an audience.',
          backgroundColor: data.backgroundColor || '#FFF9EC',
          updatedAt: new Date()
        });
        await newYoutubeFrameworkSection.save();
        return newYoutubeFrameworkSection.toObject();
      }
      
      return updatedYoutubeFrameworkSection;
    } catch (error) {
      console.error('Error updating youtube framework section:', error);
      throw error;
    }
  }
  
  // Footer Categories
  async getFooterCategories(): Promise<models.FooterCategory[]> {
    try {
      const categories = await models.FooterCategory.find().sort({ orderIndex: 1 }).lean();
      return categories;
    } catch (error) {
      console.error('Error getting footer categories:', error);
      throw error;
    }
  }
  
  async getFooterCategory(id: string): Promise<models.FooterCategory | undefined> {
    try {
      if (!Types.ObjectId.isValid(id)) return undefined;
      const category = await models.FooterCategory.findById(id).lean();
      return category || undefined;
    } catch (error) {
      console.error('Error getting footer category:', error);
      throw error;
    }
  }
  
  async createFooterCategory(data: any): Promise<models.FooterCategory> {
    try {
      const newCategory = new models.FooterCategory({
        ...data,
        updatedAt: new Date()
      });
      await newCategory.save();
      return newCategory.toObject();
    } catch (error) {
      console.error('Error creating footer category:', error);
      throw error;
    }
  }
  
  async updateFooterCategory(id: string, data: any): Promise<models.FooterCategory | undefined> {
    try {
      if (!Types.ObjectId.isValid(id)) return undefined;
      const updatedCategory = await models.FooterCategory.findByIdAndUpdate(
        id,
        { ...data, updatedAt: new Date() },
        { new: true }
      ).lean();
      return updatedCategory || undefined;
    } catch (error) {
      console.error('Error updating footer category:', error);
      throw error;
    }
  }
  
  async deleteFooterCategory(id: string): Promise<boolean> {
    try {
      if (!Types.ObjectId.isValid(id)) return false;
      const result = await models.FooterCategory.deleteOne({ _id: id });
      return result.deletedCount === 1;
    } catch (error) {
      console.error('Error deleting footer category:', error);
      throw error;
    }
  }
  
  // Footer Links
  async getFooterLinks(): Promise<models.FooterLink[]> {
    try {
      const links = await models.FooterLink.find().sort({ orderIndex: 1 }).lean();
      return links;
    } catch (error) {
      console.error('Error getting footer links:', error);
      throw error;
    }
  }
  
  async getFooterLink(id: string): Promise<models.FooterLink | undefined> {
    try {
      if (!Types.ObjectId.isValid(id)) return undefined;
      const link = await models.FooterLink.findById(id).lean();
      return link || undefined;
    } catch (error) {
      console.error('Error getting footer link:', error);
      throw error;
    }
  }
  
  async createFooterLink(data: any): Promise<models.FooterLink> {
    try {
      const newLink = new models.FooterLink({
        ...data,
        updatedAt: new Date()
      });
      await newLink.save();
      return newLink.toObject();
    } catch (error) {
      console.error('Error creating footer link:', error);
      throw error;
    }
  }
  
  async updateFooterLink(id: string, data: any): Promise<models.FooterLink | undefined> {
    try {
      if (!Types.ObjectId.isValid(id)) return undefined;
      const updatedLink = await models.FooterLink.findByIdAndUpdate(
        id,
        { ...data, updatedAt: new Date() },
        { new: true }
      ).lean();
      return updatedLink || undefined;
    } catch (error) {
      console.error('Error updating footer link:', error);
      throw error;
    }
  }
  
  async deleteFooterLink(id: string): Promise<boolean> {
    try {
      if (!Types.ObjectId.isValid(id)) return false;
      const result = await models.FooterLink.deleteOne({ _id: id });
      return result.deletedCount === 1;
    } catch (error) {
      console.error('Error deleting footer link:', error);
      throw error;
    }
  }
  
  // Social Links
  async getSocialLinks(): Promise<models.SocialLink[]> {
    try {
      const links = await models.SocialLink.find({ active: true }).lean();
      return links;
    } catch (error) {
      console.error('Error getting social links:', error);
      throw error;
    }
  }
  
  async getSocialLink(id: string): Promise<models.SocialLink | undefined> {
    try {
      if (!Types.ObjectId.isValid(id)) return undefined;
      const link = await models.SocialLink.findById(id).lean();
      return link || undefined;
    } catch (error) {
      console.error('Error getting social link:', error);
      throw error;
    }
  }
  
  async createSocialLink(data: any): Promise<models.SocialLink> {
    try {
      const newLink = new models.SocialLink({
        ...data,
        updatedAt: new Date()
      });
      await newLink.save();
      return newLink.toObject();
    } catch (error) {
      console.error('Error creating social link:', error);
      throw error;
    }
  }
  
  async updateSocialLink(id: string, data: any): Promise<models.SocialLink | undefined> {
    try {
      if (!Types.ObjectId.isValid(id)) return undefined;
      const updatedLink = await models.SocialLink.findByIdAndUpdate(
        id,
        { ...data, updatedAt: new Date() },
        { new: true }
      ).lean();
      return updatedLink || undefined;
    } catch (error) {
      console.error('Error updating social link:', error);
      throw error;
    }
  }
  
  async deleteSocialLink(id: string): Promise<boolean> {
    try {
      if (!Types.ObjectId.isValid(id)) return false;
      const result = await models.SocialLink.deleteOne({ _id: id });
      return result.deletedCount === 1;
    } catch (error) {
      console.error('Error deleting social link:', error);
      throw error;
    }
  }
  
  // Site Settings
  async getSiteSettings(): Promise<models.SiteSetting[]> {
    try {
      const settings = await models.SiteSetting.find().lean();
      return settings;
    } catch (error) {
      console.error('Error getting site settings:', error);
      throw error;
    }
  }
  
  async getSiteSetting(name: string): Promise<models.SiteSetting | undefined> {
    try {
      const setting = await models.SiteSetting.findOne({ name }).lean();
      return setting || undefined;
    } catch (error) {
      console.error('Error getting site setting:', error);
      throw error;
    }
  }
  
  async updateSiteSetting(name: string, value: string): Promise<models.SiteSetting> {
    try {
      const updatedSetting = await models.SiteSetting.findOneAndUpdate(
        { name },
        { name, value, updatedAt: new Date() },
        { new: true, upsert: true }
      ).lean();
      return updatedSetting;
    } catch (error) {
      console.error('Error updating site setting:', error);
      throw error;
    }
  }
  
  // Theme Settings
  async getThemeSettings(): Promise<models.ThemeSettings[]> {
    try {
      const themes = await models.ThemeSettings.find().lean();
      return themes;
    } catch (error) {
      console.error('Error getting theme settings:', error);
      throw error;
    }
  }
  
  async getThemeSettingsByName(name: string): Promise<models.ThemeSettings | undefined> {
    try {
      const theme = await models.ThemeSettings.findOne({ name }).lean();
      return theme || undefined;
    } catch (error) {
      console.error('Error getting theme settings by name:', error);
      throw error;
    }
  }
  
  async getActiveTheme(): Promise<models.ThemeSettings | undefined> {
    try {
      const theme = await models.ThemeSettings.findOne({ appliesGlobally: true }).lean();
      return theme || undefined;
    } catch (error) {
      console.error('Error getting active theme:', error);
      throw error;
    }
  }
  
  async createThemeSettings(data: any): Promise<models.ThemeSettings> {
    try {
      // If making a new theme the default, unset any existing default
      if (data.appliesGlobally) {
        await models.ThemeSettings.updateMany(
          { appliesGlobally: true },
          { $set: { appliesGlobally: false } }
        );
      }
      
      const newTheme = new models.ThemeSettings({
        ...data,
        updatedAt: new Date()
      });
      await newTheme.save();
      return newTheme.toObject();
    } catch (error) {
      console.error('Error creating theme settings:', error);
      throw error;
    }
  }
  
  async updateThemeSettings(id: string, data: any): Promise<models.ThemeSettings | undefined> {
    try {
      if (!Types.ObjectId.isValid(id)) return undefined;
      
      // If making this theme the default, unset any existing default
      if (data.appliesGlobally) {
        await models.ThemeSettings.updateMany(
          { appliesGlobally: true, _id: { $ne: id } },
          { $set: { appliesGlobally: false } }
        );
      }
      
      const updatedTheme = await models.ThemeSettings.findByIdAndUpdate(
        id,
        { ...data, updatedAt: new Date() },
        { new: true }
      ).lean();
      return updatedTheme || undefined;
    } catch (error) {
      console.error('Error updating theme settings:', error);
      throw error;
    }
  }
  
  async deleteThemeSettings(id: string): Promise<boolean> {
    try {
      if (!Types.ObjectId.isValid(id)) return false;
      
      // Check if this is the global theme
      const theme = await models.ThemeSettings.findById(id);
      if (theme?.appliesGlobally) {
        throw new Error("Cannot delete the active global theme");
      }
      
      const result = await models.ThemeSettings.deleteOne({ _id: id });
      return result.deletedCount === 1;
    } catch (error) {
      console.error('Error deleting theme settings:', error);
      throw error;
    }
  }
  
  // Analytics
  async getPageViews(start?: Date, end?: Date): Promise<models.PageView[]> {
    try {
      let query: any = {};
      if (start || end) {
        query = { date: {} };
        if (start) query.date['$gte'] = start;
        if (end) query.date['$lte'] = end;
      }
      
      const pageViews = await models.PageView.find(query).sort({ date: 1 }).lean();
      return pageViews;
    } catch (error) {
      console.error('Error getting page views:', error);
      throw error;
    }
  }
  
  async getSales(start?: Date, end?: Date): Promise<models.Sale[]> {
    try {
      let query: any = {};
      if (start || end) {
        query = { date: {} };
        if (start) query.date['$gte'] = start;
        if (end) query.date['$lte'] = end;
      }
      
      const sales = await models.Sale.find(query).sort({ date: 1 }).lean();
      return sales;
    } catch (error) {
      console.error('Error getting sales:', error);
      throw error;
    }
  }
  
  async createSale(data: any): Promise<models.Sale> {
    try {
      const newSale = new models.Sale(data);
      await newSale.save();
      return newSale.toObject();
    } catch (error) {
      console.error('Error creating sale:', error);
      throw error;
    }
  }
  
  async getVisitors(start?: Date, end?: Date): Promise<models.Visitor[]> {
    try {
      let query: any = {};
      if (start || end) {
        query = { date: {} };
        if (start) query.date['$gte'] = start;
        if (end) query.date['$lte'] = end;
      }
      
      const visitors = await models.Visitor.find(query).sort({ date: 1 }).lean();
      return visitors;
    } catch (error) {
      console.error('Error getting visitors:', error);
      throw error;
    }
  }
  
  async getContentEngagement(start?: Date, end?: Date): Promise<models.ContentEngagement[]> {
    try {
      let query: any = {};
      if (start || end) {
        query = { date: {} };
        if (start) query.date['$gte'] = start;
        if (end) query.date['$lte'] = end;
      }
      
      const engagements = await models.ContentEngagement.find(query).sort({ date: 1 }).lean();
      return engagements;
    } catch (error) {
      console.error('Error getting content engagement:', error);
      throw error;
    }
  }
}

export const storage = new MongoDBStorage();