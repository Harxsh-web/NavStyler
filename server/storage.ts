import * as schema from "@shared/schema";
import { eq } from "drizzle-orm";
import { db } from "./db";
import connectPg from "connect-pg-simple";
import session from "express-session";
import { pool } from "./db";

const PostgresSessionStore = connectPg(session);

export interface IStorage {
  // User management
  getUser(id: number): Promise<schema.User | undefined>;
  getUserByUsername(username: string): Promise<schema.User | undefined>;
  getUserByEmail(email: string): Promise<schema.User | undefined>;
  createUser(user: schema.InsertUser): Promise<schema.User>;
  
  // Content management
  // Hero section
  getHeroSection(): Promise<schema.Hero | undefined>;
  updateHeroSection(data: Partial<schema.InsertHero>): Promise<schema.Hero>;
  
  // Featured section
  getFeaturedSection(): Promise<schema.Featured | undefined>;
  updateFeaturedSection(data: Partial<schema.InsertFeatured>): Promise<schema.Featured>;
  
  // Quote section
  getQuoteSection(): Promise<schema.Quote | undefined>;
  updateQuoteSection(data: Partial<schema.InsertQuote>): Promise<schema.Quote>;
  
  // Learning points section
  getLearningPointsSection(): Promise<schema.LearningPointsSection | undefined>;
  updateLearningPointsSection(data: Partial<schema.InsertLearningPointsSection>): Promise<schema.LearningPointsSection>;
  
  // Learning points
  getLearningPoints(): Promise<schema.LearningPoint[]>;
  getLearningPoint(id: number): Promise<schema.LearningPoint | undefined>;
  createLearningPoint(data: schema.InsertLearningPoint): Promise<schema.LearningPoint>;
  updateLearningPoint(id: number, data: Partial<schema.InsertLearningPoint>): Promise<schema.LearningPoint | undefined>;
  deleteLearningPoint(id: number): Promise<boolean>;
  
  // Testimonial section
  getTestimonialSection(): Promise<schema.TestimonialSection | undefined>;
  updateTestimonialSection(data: Partial<schema.InsertTestimonialSection>): Promise<schema.TestimonialSection>;
  
  // Testimonials
  getTestimonials(): Promise<schema.Testimonial[]>;
  getTestimonial(id: number): Promise<schema.Testimonial | undefined>;
  createTestimonial(data: schema.InsertTestimonial): Promise<schema.Testimonial>;
  updateTestimonial(id: number, data: Partial<schema.InsertTestimonial>): Promise<schema.Testimonial | undefined>;
  deleteTestimonial(id: number): Promise<boolean>;
  
  // Book sections
  getBookSections(): Promise<schema.BookSection[]>;
  getBookSection(id: number): Promise<schema.BookSection | undefined>;
  createBookSection(data: schema.InsertBookSection): Promise<schema.BookSection>;
  updateBookSection(id: number, data: Partial<schema.InsertBookSection>): Promise<schema.BookSection | undefined>;
  deleteBookSection(id: number): Promise<boolean>;
  
  // About book section
  getAboutBookSection(): Promise<schema.AboutBookSection | undefined>;
  updateAboutBookSection(data: Partial<schema.InsertAboutBookSection>): Promise<schema.AboutBookSection>;
  
  // Author section
  getAuthorSection(): Promise<schema.AuthorSection | undefined>;
  updateAuthorSection(data: Partial<schema.InsertAuthorSection>): Promise<schema.AuthorSection>;
  
  // Footer categories
  getFooterCategories(): Promise<schema.FooterCategory[]>;
  getFooterCategory(id: number): Promise<schema.FooterCategory | undefined>;
  createFooterCategory(data: schema.InsertFooterCategory): Promise<schema.FooterCategory>;
  updateFooterCategory(id: number, data: Partial<schema.InsertFooterCategory>): Promise<schema.FooterCategory | undefined>;
  deleteFooterCategory(id: number): Promise<boolean>;
  
  // Footer links
  getFooterLinks(): Promise<schema.FooterLink[]>;
  getFooterLink(id: number): Promise<schema.FooterLink | undefined>;
  createFooterLink(data: schema.InsertFooterLink): Promise<schema.FooterLink>;
  updateFooterLink(id: number, data: Partial<schema.InsertFooterLink>): Promise<schema.FooterLink | undefined>;
  deleteFooterLink(id: number): Promise<boolean>;
  
  // Social links
  getSocialLinks(): Promise<schema.SocialLink[]>;
  getSocialLink(id: number): Promise<schema.SocialLink | undefined>;
  createSocialLink(data: schema.InsertSocialLink): Promise<schema.SocialLink>;
  updateSocialLink(id: number, data: Partial<schema.InsertSocialLink>): Promise<schema.SocialLink | undefined>;
  deleteSocialLink(id: number): Promise<boolean>;
  
  // Site settings
  getSiteSettings(): Promise<schema.SiteSetting[]>;
  getSiteSetting(name: string): Promise<schema.SiteSetting | undefined>;
  updateSiteSetting(name: string, value: string): Promise<schema.SiteSetting>;
  
  // Session store for authentication
  sessionStore: any;
}

export class DatabaseStorage implements IStorage {
  sessionStore: any;

  constructor() {
    this.sessionStore = new PostgresSessionStore({ 
      pool, 
      createTableIfMissing: true 
    });
  }

  // User management
  async getUser(id: number): Promise<schema.User | undefined> {
    const [user] = await db.select().from(schema.users).where(eq(schema.users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<schema.User | undefined> {
    const [user] = await db.select().from(schema.users).where(eq(schema.users.username, username));
    return user;
  }
  
  async getUserByEmail(email: string): Promise<schema.User | undefined> {
    const [user] = await db.select().from(schema.users).where(eq(schema.users.email, email));
    return user;
  }

  async createUser(insertUser: schema.InsertUser): Promise<schema.User> {
    const [user] = await db.insert(schema.users).values(insertUser).returning();
    return user;
  }

  // Hero section
  async getHeroSection(): Promise<schema.Hero | undefined> {
    const [hero] = await db.select().from(schema.heroSection).limit(1);
    return hero;
  }

  async updateHeroSection(data: Partial<schema.InsertHero>): Promise<schema.Hero> {
    const existing = await this.getHeroSection();
    if (existing) {
      const [updated] = await db.update(schema.heroSection)
        .set({ ...data, updatedAt: new Date() })
        .where(eq(schema.heroSection.id, existing.id))
        .returning();
      return updated;
    } else {
      const [newHero] = await db.insert(schema.heroSection)
        .values(data as schema.InsertHero)
        .returning();
      return newHero;
    }
  }

  // Featured section
  async getFeaturedSection(): Promise<schema.Featured | undefined> {
    const [featured] = await db.select().from(schema.featuredSection).limit(1);
    return featured;
  }

  async updateFeaturedSection(data: Partial<schema.InsertFeatured>): Promise<schema.Featured> {
    const existing = await this.getFeaturedSection();
    if (existing) {
      const [updated] = await db.update(schema.featuredSection)
        .set({ ...data, updatedAt: new Date() })
        .where(eq(schema.featuredSection.id, existing.id))
        .returning();
      return updated;
    } else {
      const [newFeatured] = await db.insert(schema.featuredSection)
        .values(data as schema.InsertFeatured)
        .returning();
      return newFeatured;
    }
  }

  // Quote section
  async getQuoteSection(): Promise<schema.Quote | undefined> {
    const [quote] = await db.select().from(schema.quoteSection).limit(1);
    return quote;
  }

  async updateQuoteSection(data: Partial<schema.InsertQuote>): Promise<schema.Quote> {
    const existing = await this.getQuoteSection();
    if (existing) {
      const [updated] = await db.update(schema.quoteSection)
        .set({ ...data, updatedAt: new Date() })
        .where(eq(schema.quoteSection.id, existing.id))
        .returning();
      return updated;
    } else {
      const [newQuote] = await db.insert(schema.quoteSection)
        .values(data as schema.InsertQuote)
        .returning();
      return newQuote;
    }
  }

  // Learning points section
  async getLearningPointsSection(): Promise<schema.LearningPointsSection | undefined> {
    const [section] = await db.select().from(schema.learningPointsSection).limit(1);
    return section;
  }

  async updateLearningPointsSection(data: Partial<schema.InsertLearningPointsSection>): Promise<schema.LearningPointsSection> {
    const existing = await this.getLearningPointsSection();
    if (existing) {
      const [updated] = await db.update(schema.learningPointsSection)
        .set({ ...data, updatedAt: new Date() })
        .where(eq(schema.learningPointsSection.id, existing.id))
        .returning();
      return updated;
    } else {
      const [newSection] = await db.insert(schema.learningPointsSection)
        .values(data as schema.InsertLearningPointsSection)
        .returning();
      return newSection;
    }
  }

  // Learning points
  async getLearningPoints(): Promise<schema.LearningPoint[]> {
    return db.select().from(schema.learningPoint).orderBy(schema.learningPoint.number);
  }

  async getLearningPoint(id: number): Promise<schema.LearningPoint | undefined> {
    const [point] = await db.select().from(schema.learningPoint).where(eq(schema.learningPoint.id, id));
    return point;
  }

  async createLearningPoint(data: schema.InsertLearningPoint): Promise<schema.LearningPoint> {
    const [point] = await db.insert(schema.learningPoint).values(data).returning();
    return point;
  }

  async updateLearningPoint(id: number, data: Partial<schema.InsertLearningPoint>): Promise<schema.LearningPoint | undefined> {
    const [updated] = await db.update(schema.learningPoint)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(schema.learningPoint.id, id))
      .returning();
    return updated;
  }

  async deleteLearningPoint(id: number): Promise<boolean> {
    const result = await db.delete(schema.learningPoint).where(eq(schema.learningPoint.id, id));
    return !!result;
  }

  // Testimonial section
  async getTestimonialSection(): Promise<schema.TestimonialSection | undefined> {
    const [section] = await db.select().from(schema.testimonialSection).limit(1);
    return section;
  }

  async updateTestimonialSection(data: Partial<schema.InsertTestimonialSection>): Promise<schema.TestimonialSection> {
    const existing = await this.getTestimonialSection();
    if (existing) {
      const [updated] = await db.update(schema.testimonialSection)
        .set({ ...data, updatedAt: new Date() })
        .where(eq(schema.testimonialSection.id, existing.id))
        .returning();
      return updated;
    } else {
      const [newSection] = await db.insert(schema.testimonialSection)
        .values(data as schema.InsertTestimonialSection)
        .returning();
      return newSection;
    }
  }

  // Testimonials
  async getTestimonials(): Promise<schema.Testimonial[]> {
    return db.select().from(schema.testimonial);
  }

  async getTestimonial(id: number): Promise<schema.Testimonial | undefined> {
    const [testimonial] = await db.select().from(schema.testimonial).where(eq(schema.testimonial.id, id));
    return testimonial;
  }

  async createTestimonial(data: schema.InsertTestimonial): Promise<schema.Testimonial> {
    const [testimonial] = await db.insert(schema.testimonial).values(data).returning();
    return testimonial;
  }

  async updateTestimonial(id: number, data: Partial<schema.InsertTestimonial>): Promise<schema.Testimonial | undefined> {
    const [updated] = await db.update(schema.testimonial)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(schema.testimonial.id, id))
      .returning();
    return updated;
  }

  async deleteTestimonial(id: number): Promise<boolean> {
    const result = await db.delete(schema.testimonial).where(eq(schema.testimonial.id, id));
    return !!result;
  }

  // Book sections
  async getBookSections(): Promise<schema.BookSection[]> {
    return db.select().from(schema.bookSection).orderBy(schema.bookSection.orderIndex);
  }

  async getBookSection(id: number): Promise<schema.BookSection | undefined> {
    const [section] = await db.select().from(schema.bookSection).where(eq(schema.bookSection.id, id));
    return section;
  }

  async createBookSection(data: schema.InsertBookSection): Promise<schema.BookSection> {
    const [section] = await db.insert(schema.bookSection).values(data).returning();
    return section;
  }

  async updateBookSection(id: number, data: Partial<schema.InsertBookSection>): Promise<schema.BookSection | undefined> {
    const [updated] = await db.update(schema.bookSection)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(schema.bookSection.id, id))
      .returning();
    return updated;
  }

  async deleteBookSection(id: number): Promise<boolean> {
    const result = await db.delete(schema.bookSection).where(eq(schema.bookSection.id, id));
    return !!result;
  }

  // About book section
  async getAboutBookSection(): Promise<schema.AboutBookSection | undefined> {
    const [aboutBook] = await db.select().from(schema.aboutBookSection).limit(1);
    return aboutBook;
  }

  async updateAboutBookSection(data: Partial<schema.InsertAboutBookSection>): Promise<schema.AboutBookSection> {
    const existing = await this.getAboutBookSection();
    if (existing) {
      const [updated] = await db.update(schema.aboutBookSection)
        .set({ ...data, updatedAt: new Date() })
        .where(eq(schema.aboutBookSection.id, existing.id))
        .returning();
      return updated;
    } else {
      const [newSection] = await db.insert(schema.aboutBookSection)
        .values(data as schema.InsertAboutBookSection)
        .returning();
      return newSection;
    }
  }

  // Author section
  async getAuthorSection(): Promise<schema.AuthorSection | undefined> {
    const [author] = await db.select().from(schema.authorSection).limit(1);
    return author;
  }

  async updateAuthorSection(data: Partial<schema.InsertAuthorSection>): Promise<schema.AuthorSection> {
    const existing = await this.getAuthorSection();
    if (existing) {
      const [updated] = await db.update(schema.authorSection)
        .set({ ...data, updatedAt: new Date() })
        .where(eq(schema.authorSection.id, existing.id))
        .returning();
      return updated;
    } else {
      const [newSection] = await db.insert(schema.authorSection)
        .values(data as schema.InsertAuthorSection)
        .returning();
      return newSection;
    }
  }

  // Footer categories
  async getFooterCategories(): Promise<schema.FooterCategory[]> {
    return db.select().from(schema.footerCategory).orderBy(schema.footerCategory.orderIndex);
  }

  async getFooterCategory(id: number): Promise<schema.FooterCategory | undefined> {
    const [category] = await db.select().from(schema.footerCategory).where(eq(schema.footerCategory.id, id));
    return category;
  }

  async createFooterCategory(data: schema.InsertFooterCategory): Promise<schema.FooterCategory> {
    const [category] = await db.insert(schema.footerCategory).values(data).returning();
    return category;
  }

  async updateFooterCategory(id: number, data: Partial<schema.InsertFooterCategory>): Promise<schema.FooterCategory | undefined> {
    const [updated] = await db.update(schema.footerCategory)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(schema.footerCategory.id, id))
      .returning();
    return updated;
  }

  async deleteFooterCategory(id: number): Promise<boolean> {
    const result = await db.delete(schema.footerCategory).where(eq(schema.footerCategory.id, id));
    return !!result;
  }

  // Footer links
  async getFooterLinks(): Promise<schema.FooterLink[]> {
    return db.select().from(schema.footerLink).orderBy(schema.footerLink.orderIndex);
  }

  async getFooterLink(id: number): Promise<schema.FooterLink | undefined> {
    const [link] = await db.select().from(schema.footerLink).where(eq(schema.footerLink.id, id));
    return link;
  }

  async createFooterLink(data: schema.InsertFooterLink): Promise<schema.FooterLink> {
    const [link] = await db.insert(schema.footerLink).values(data).returning();
    return link;
  }

  async updateFooterLink(id: number, data: Partial<schema.InsertFooterLink>): Promise<schema.FooterLink | undefined> {
    const [updated] = await db.update(schema.footerLink)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(schema.footerLink.id, id))
      .returning();
    return updated;
  }

  async deleteFooterLink(id: number): Promise<boolean> {
    const result = await db.delete(schema.footerLink).where(eq(schema.footerLink.id, id));
    return !!result;
  }

  // Social links
  async getSocialLinks(): Promise<schema.SocialLink[]> {
    return db.select().from(schema.socialLink).where(eq(schema.socialLink.active, true));
  }

  async getSocialLink(id: number): Promise<schema.SocialLink | undefined> {
    const [link] = await db.select().from(schema.socialLink).where(eq(schema.socialLink.id, id));
    return link;
  }

  async createSocialLink(data: schema.InsertSocialLink): Promise<schema.SocialLink> {
    const [link] = await db.insert(schema.socialLink).values(data).returning();
    return link;
  }

  async updateSocialLink(id: number, data: Partial<schema.InsertSocialLink>): Promise<schema.SocialLink | undefined> {
    const [updated] = await db.update(schema.socialLink)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(schema.socialLink.id, id))
      .returning();
    return updated;
  }

  async deleteSocialLink(id: number): Promise<boolean> {
    const result = await db.delete(schema.socialLink).where(eq(schema.socialLink.id, id));
    return !!result;
  }

  // Site settings
  async getSiteSettings(): Promise<schema.SiteSetting[]> {
    return db.select().from(schema.siteSetting);
  }

  async getSiteSetting(name: string): Promise<schema.SiteSetting | undefined> {
    const [setting] = await db.select().from(schema.siteSetting).where(eq(schema.siteSetting.name, name));
    return setting;
  }

  async updateSiteSetting(name: string, value: string): Promise<schema.SiteSetting> {
    const existing = await this.getSiteSetting(name);
    if (existing) {
      const [updated] = await db.update(schema.siteSetting)
        .set({ value, updatedAt: new Date() })
        .where(eq(schema.siteSetting.name, name))
        .returning();
      return updated;
    } else {
      const [newSetting] = await db.insert(schema.siteSetting)
        .values({ name, value })
        .returning();
      return newSetting;
    }
  }
}

export const storage = new DatabaseStorage();
