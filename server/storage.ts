import * as schema from "@shared/schema";
import { eq, desc } from "drizzle-orm";
import { db, query } from "./db";
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
  
  // Articles
  getArticles(limit?: number): Promise<schema.Article[]>;
  getArticle(id: number): Promise<schema.Article | undefined>;
  getArticleBySlug(slug: string): Promise<schema.Article | undefined>;
  createArticle(data: schema.InsertArticle): Promise<schema.Article>;
  updateArticle(id: number, data: Partial<schema.InsertArticle>): Promise<schema.Article | undefined>;
  deleteArticle(id: number): Promise<boolean>;
  
  // Videos
  getVideos(limit?: number): Promise<schema.Video[]>;
  getVideo(id: number): Promise<schema.Video | undefined>;
  getVideoBySlug(slug: string): Promise<schema.Video | undefined>;
  createVideo(data: schema.InsertVideo): Promise<schema.Video>;
  updateVideo(id: number, data: Partial<schema.InsertVideo>): Promise<schema.Video | undefined>;
  deleteVideo(id: number): Promise<boolean>;
  
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
  getSiteSettings(): Promise<schema.SiteSettings[]>;
  getSiteSetting(id: number): Promise<schema.SiteSettings | undefined>;
  updateSiteSettings(id: number, data: Partial<schema.InsertSiteSettings>): Promise<schema.SiteSettings | undefined>;
  createSiteSettings(data: schema.InsertSiteSettings): Promise<schema.SiteSettings>;
  
  // SEO Metadata
  getAllSeoMetadata(): Promise<schema.SeoMetadata[]>;
  getSeoMetadata(id: number): Promise<schema.SeoMetadata | undefined>;
  getSeoMetadataByPage(pagePath: string): Promise<schema.SeoMetadata | undefined>;
  getDefaultSeoMetadata(): Promise<schema.SeoMetadata | undefined>;
  createSeoMetadata(data: schema.InsertSeoMetadata): Promise<schema.SeoMetadata>;
  updateSeoMetadata(id: number, data: Partial<schema.InsertSeoMetadata>): Promise<schema.SeoMetadata | undefined>;
  deleteSeoMetadata(id: number): Promise<boolean>;
  unsetDefaultSeoMetadata(): Promise<void>;
  
  // Theme settings
  getThemeSettings(): Promise<schema.ThemeSettings[]>;
  getThemeSettingsByName(name: string): Promise<schema.ThemeSettings | undefined>;
  getActiveTheme(): Promise<schema.ThemeSettings | undefined>;
  createThemeSettings(data: schema.InsertThemeSettings): Promise<schema.ThemeSettings>;
  updateThemeSettings(id: number, data: Partial<schema.InsertThemeSettings>): Promise<schema.ThemeSettings | undefined>;
  deleteThemeSettings(id: number): Promise<boolean>;
  
  // Bonus section
  getBonusSection(): Promise<schema.BonusSection | undefined>;
  updateBonusSection(data: Partial<schema.InsertBonusSection>): Promise<schema.BonusSection>;
  
  // Bonus items
  getBonusItems(): Promise<schema.BonusItem[]>;
  getBonusItem(id: number): Promise<schema.BonusItem | undefined>;
  createBonusItem(data: schema.InsertBonusItem): Promise<schema.BonusItem>;
  updateBonusItem(id: number, data: Partial<schema.InsertBonusItem>): Promise<schema.BonusItem | undefined>;
  deleteBonusItem(id: number): Promise<boolean>;
  
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
    try {
      const result = await query(
        `SELECT id, username, email, password, is_admin as "isAdmin", created_at as "createdAt"
         FROM users WHERE id = $1`,
        [id]
      );
      return result.rows[0] as schema.User | undefined;
    } catch (error) {
      console.error('Error in getUser:', error);
      return undefined;
    }
  }

  async getUserByUsername(username: string): Promise<schema.User | undefined> {
    try {
      const result = await query(
        `SELECT id, username, email, password, is_admin as "isAdmin", created_at as "createdAt"
         FROM users WHERE username = $1`,
        [username]
      );
      return result.rows[0] as schema.User | undefined;
    } catch (error) {
      console.error('Error in getUserByUsername:', error);
      return undefined;
    }
  }
  
  async getUserByEmail(email: string): Promise<schema.User | undefined> {
    try {
      const result = await query(
        `SELECT id, username, email, password, is_admin as "isAdmin", created_at as "createdAt"
         FROM users WHERE email = $1`,
        [email]
      );
      return result.rows[0] as schema.User | undefined;
    } catch (error) {
      console.error('Error in getUserByEmail:', error);
      return undefined;
    }
  }

  async createUser(insertUser: schema.InsertUser): Promise<schema.User> {
    try {
      const result = await query(
        `INSERT INTO users(username, email, password, is_admin)
         VALUES($1, $2, $3, $4)
         RETURNING id, username, email, password, is_admin as "isAdmin", created_at as "createdAt"`,
        [
          insertUser.username,
          insertUser.email,
          insertUser.password,
          insertUser.isAdmin || false
        ]
      );
      return result.rows[0] as schema.User;
    } catch (error) {
      console.error('Error in createUser:', error);
      throw error;
    }
  }
  
  // Articles
  async getArticles(limit: number = 10): Promise<schema.Article[]> {
    try {
      const result = await query(
        `SELECT * FROM article WHERE is_published = true ORDER BY published_at DESC LIMIT $1`,
        [limit]
      );
      return result.rows as schema.Article[];
    } catch (error) {
      console.error('Error fetching articles:', error);
      return [];
    }
  }
  
  async getArticle(id: number): Promise<schema.Article | undefined> {
    const [article] = await db.select()
      .from(schema.article)
      .where(eq(schema.article.id, id));
    return article;
  }
  
  async getArticleBySlug(slug: string): Promise<schema.Article | undefined> {
    const [article] = await db.select()
      .from(schema.article)
      .where(eq(schema.article.slug, slug));
    return article;
  }
  
  async createArticle(data: schema.InsertArticle): Promise<schema.Article> {
    const [article] = await db.insert(schema.article).values(data).returning();
    return article;
  }
  
  async updateArticle(id: number, data: Partial<schema.InsertArticle>): Promise<schema.Article | undefined> {
    const [updated] = await db.update(schema.article)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(schema.article.id, id))
      .returning();
    return updated;
  }
  
  async deleteArticle(id: number): Promise<boolean> {
    const result = await db.delete(schema.article).where(eq(schema.article.id, id));
    return !!result;
  }
  
  // Videos
  async getVideos(limit: number = 10): Promise<schema.Video[]> {
    try {
      const result = await query(
        `SELECT * FROM video WHERE is_published = true ORDER BY published_at DESC LIMIT $1`,
        [limit]
      );
      return result.rows as schema.Video[];
    } catch (error) {
      console.error('Error fetching videos:', error);
      return [];
    }
  }
  
  async getVideo(id: number): Promise<schema.Video | undefined> {
    const [video] = await db.select()
      .from(schema.video)
      .where(eq(schema.video.id, id));
    return video;
  }
  
  async getVideoBySlug(slug: string): Promise<schema.Video | undefined> {
    const [video] = await db.select()
      .from(schema.video)
      .where(eq(schema.video.slug, slug));
    return video;
  }
  
  async createVideo(data: schema.InsertVideo): Promise<schema.Video> {
    const [video] = await db.insert(schema.video).values(data).returning();
    return video;
  }
  
  async updateVideo(id: number, data: Partial<schema.InsertVideo>): Promise<schema.Video | undefined> {
    const [updated] = await db.update(schema.video)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(schema.video.id, id))
      .returning();
    return updated;
  }
  
  async deleteVideo(id: number): Promise<boolean> {
    const result = await db.delete(schema.video).where(eq(schema.video.id, id));
    return !!result;
  }

  // Hero section
  async getHeroSection(): Promise<schema.Hero | undefined> {
    try {
      // Using a direct query to ensure field mappings are correct
      const result = await query(
        `SELECT id, title, subtitle, cta_text as "buttonText", cta_link as "buttonUrl", 
         image_url as "imageUrl", updated_at as "updatedAt"
         FROM hero_section LIMIT 1`
      );
      return result.rows[0] as schema.Hero | undefined;
    } catch (error) {
      console.error('Error in getHeroSection:', error);
      return undefined;
    }
  }

  async updateHeroSection(data: Partial<schema.InsertHero>): Promise<schema.Hero> {
    try {
      const existing = await this.getHeroSection();
      
      console.log('Updating hero section with data:', data);
      
      // Add additional debug logging for button fields
      console.log('Button values for update:', {
        buttonText: data.buttonText || existing?.buttonText,
        buttonUrl: data.buttonUrl || existing?.buttonUrl
      });
      
      if (existing) {
        // Use direct query to ensure field mappings are accurate
        const result = await query(
          `UPDATE hero_section 
           SET title = $1, subtitle = $2, cta_text = $3, cta_link = $4, image_url = $5, updated_at = NOW()
           WHERE id = $6
           RETURNING id, title, subtitle, cta_text as "buttonText", cta_link as "buttonUrl", 
           image_url as "imageUrl", updated_at as "updatedAt"`,
          [
            data.title ?? existing.title,
            data.subtitle ?? existing.subtitle,
            data.buttonText ?? existing.buttonText, 
            data.buttonUrl ?? existing.buttonUrl,
            data.imageUrl ?? existing.imageUrl,
            existing.id
          ]
        );
        
        console.log('Hero section updated successfully:', result.rows[0]);
        
        return result.rows[0] as schema.Hero;
      } else {
        const result = await query(
          `INSERT INTO hero_section (title, subtitle, cta_text, cta_link, image_url)
           VALUES ($1, $2, $3, $4, $5)
           RETURNING id, title, subtitle, cta_text as "buttonText", cta_link as "buttonUrl", 
           image_url as "imageUrl", updated_at as "updatedAt"`,
          [
            data.title || '',
            data.subtitle || '',
            data.buttonText || 'Get the Book',
            data.buttonUrl || 'https://chatgpt.com',
            data.imageUrl || ''
          ]
        );
        
        console.log('New hero section created:', result.rows[0]);
        
        return result.rows[0] as schema.Hero;
      }
    } catch (error) {
      console.error('Error updating hero section:', error);
      throw error;
    }
  }

  // Featured section
  async getFeaturedSection(): Promise<schema.Featured | undefined> {
    try {
      const result = await query(
        `SELECT id, heading, subheading, logo_urls as "logoUrls", updated_at as "updatedAt"
         FROM featured_section LIMIT 1`
      );
      return result.rows[0] as schema.Featured | undefined;
    } catch (error) {
      console.error('Error in getFeaturedSection:', error);
      return undefined;
    }
  }

  async updateFeaturedSection(data: Partial<schema.InsertFeatured>): Promise<schema.Featured> {
    try {
      const existing = await this.getFeaturedSection();
      
      console.log('Updating featured section with data:', data);
      
      if (existing) {
        // Using direct query for more reliable field mapping
        const result = await query(
          `UPDATE featured_section 
           SET heading = $1, subheading = $2, logo_urls = $3, updated_at = NOW()
           WHERE id = $4
           RETURNING id, heading, subheading, logo_urls as "logoUrls", updated_at as "updatedAt"`,
          [
            data.heading ?? existing.heading,
            data.subheading ?? existing.subheading,
            data.logoUrls ? JSON.stringify(data.logoUrls) : existing.logoUrls,
            existing.id
          ]
        );
        
        console.log('Featured section updated successfully:', result.rows[0]);
        
        return result.rows[0] as schema.Featured;
      } else {
        const result = await query(
          `INSERT INTO featured_section (heading, subheading, logo_urls)
           VALUES ($1, $2, $3)
           RETURNING id, heading, subheading, logo_urls as "logoUrls", updated_at as "updatedAt"`,
          [
            data.heading || '',
            data.subheading || '',
            data.logoUrls ? JSON.stringify(data.logoUrls) : '[]'
          ]
        );
        
        console.log('New featured section created:', result.rows[0]);
        
        return result.rows[0] as schema.Featured;
      }
    } catch (error) {
      console.error('Error updating featured section:', error);
      throw error;
    }
  }

  // Quote section
  async getQuoteSection(): Promise<schema.Quote | undefined> {
    try {
      const result = await db.execute(
        `SELECT id, heading, content as "quoteText", updated_at as "updatedAt"
         FROM quote_section LIMIT 1`
      );
      return result.rows[0] as schema.Quote | undefined;
    } catch (error) {
      console.error('Error in getQuoteSection:', error);
      return undefined;
    }
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
    try {
      const result = await query(
        `SELECT id, quote, name, title, image_url as "imageUrl", 
         video_url as "videoUrl", media_type as "mediaType", 
         show_mobile as "showMobile", updated_at as "updatedAt"
         FROM testimonial`
      );
      return result.rows as schema.Testimonial[];
    } catch (error) {
      console.error('Error in getTestimonials:', error);
      return [];
    }
  }

  async getTestimonial(id: number): Promise<schema.Testimonial | undefined> {
    try {
      const result = await query(
        `SELECT id, quote, name, title, image_url as "imageUrl", 
         video_url as "videoUrl", media_type as "mediaType", 
         show_mobile as "showMobile", updated_at as "updatedAt"
         FROM testimonial WHERE id = $1`,
        [id]
      );
      return result.rows[0] as schema.Testimonial | undefined;
    } catch (error) {
      console.error(`Error in getTestimonial(${id}):`, error);
      return undefined;
    }
  }

  async createTestimonial(data: schema.InsertTestimonial): Promise<schema.Testimonial> {
    try {
      const result = await query(
        `INSERT INTO testimonial (name, quote, title, image_url, video_url, media_type, show_mobile)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         RETURNING id, quote, name, title, image_url as "imageUrl", 
         video_url as "videoUrl", media_type as "mediaType", 
         show_mobile as "showMobile", updated_at as "updatedAt"`,
        [
          data.name,
          data.quote, 
          data.title || '',
          data.imageUrl || '',
          data.videoUrl || '',
          data.mediaType || 'image',
          data.showMobile ?? true
        ]
      );
      
      console.log('New testimonial created:', result.rows[0]);
      
      return result.rows[0] as schema.Testimonial;
    } catch (error) {
      console.error('Error creating testimonial:', error);
      throw error;
    }
  }

  async updateTestimonial(id: number, data: Partial<schema.InsertTestimonial>): Promise<schema.Testimonial | undefined> {
    try {
      const existing = await this.getTestimonial(id);
      
      if (!existing) {
        return undefined;
      }
      
      console.log('Updating testimonial with data:', data);
      
      const result = await query(
        `UPDATE testimonial 
         SET name = $1, quote = $2, title = $3, image_url = $4, 
         video_url = $5, media_type = $6, show_mobile = $7, updated_at = NOW()
         WHERE id = $8
         RETURNING id, quote, name, title, image_url as "imageUrl", 
         video_url as "videoUrl", media_type as "mediaType", 
         show_mobile as "showMobile", updated_at as "updatedAt"`,
        [
          data.name ?? existing.name,
          data.quote ?? existing.quote,
          data.title ?? existing.title,
          data.imageUrl ?? existing.imageUrl,
          data.videoUrl ?? existing.videoUrl,
          data.mediaType ?? existing.mediaType,
          data.showMobile ?? existing.showMobile,
          id
        ]
      );
      
      if (result.rows.length === 0) {
        return undefined;
      }
      
      console.log('Testimonial updated successfully:', result.rows[0]);
      
      return result.rows[0] as schema.Testimonial;
    } catch (error) {
      console.error(`Error updating testimonial ${id}:`, error);
      throw error;
    }
  }

  async deleteTestimonial(id: number): Promise<boolean> {
    try {
      console.log('Deleting testimonial with ID:', id);
      const result = await query(
        `DELETE FROM testimonial WHERE id = $1 RETURNING id`,
        [id]
      );
      return result.rowCount > 0;
    } catch (error) {
      console.error(`Error deleting testimonial ${id}:`, error);
      throw error;
    }
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
    try {
      const result = await query(
        `SELECT id, author_name as "name", bio, bio_short as "bioShort", 
         image_url as "imageUrl", title, updated_at as "updatedAt"
         FROM author_section LIMIT 1`
      );
      return result.rows[0] as schema.AuthorSection | undefined;
    } catch (error) {
      console.error('Error in getAuthorSection:', error);
      return undefined;
    }
  }

  async updateAuthorSection(data: Partial<schema.InsertAuthorSection>): Promise<schema.AuthorSection> {
    try {
      const existing = await this.getAuthorSection();
      
      console.log('Updating author section with data:', data);
      
      if (existing) {
        // Use direct query to ensure field mappings are accurate
        const result = await query(
          `UPDATE author_section 
           SET title = $1, author_name = $2, bio = $3, bio_short = $4, image_url = $5, updated_at = NOW()
           WHERE id = $6
           RETURNING id, title, author_name as "name", bio, bio_short as "bioShort", 
           image_url as "imageUrl", updated_at as "updatedAt"`,
          [
            data.title ?? existing.title,
            data.name ?? existing.name,
            data.bio ?? existing.bio,
            data.bioShort ?? existing.bioShort,
            data.imageUrl ?? existing.imageUrl,
            existing.id
          ]
        );
        
        console.log('Author section updated successfully:', result.rows[0]);
        
        return result.rows[0] as schema.AuthorSection;
      } else {
        const result = await query(
          `INSERT INTO author_section (title, author_name, bio, bio_short, image_url)
           VALUES ($1, $2, $3, $4, $5)
           RETURNING id, title, author_name as "name", bio, bio_short as "bioShort", 
           image_url as "imageUrl", updated_at as "updatedAt"`,
          [
            data.title || '',
            data.name || 'Luke Mikic',
            data.bio || '',
            data.bioShort || '',
            data.imageUrl || ''
          ]
        );
        
        console.log('New author section created:', result.rows[0]);
        
        return result.rows[0] as schema.AuthorSection;
      }
    } catch (error) {
      console.error('Error updating author section:', error);
      throw error;
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
    try {
      return await db.select().from(schema.socialLinks);
    } catch (error) {
      console.error('Error in getSocialLinks:', error);
      return [];
    }
  }

  async getSocialLink(id: number): Promise<schema.SocialLink | undefined> {
    const [link] = await db.select().from(schema.socialLinks).where(eq(schema.socialLinks.id, id));
    return link;
  }

  async createSocialLink(data: schema.InsertSocialLink): Promise<schema.SocialLink> {
    const [link] = await db.insert(schema.socialLinks).values(data).returning();
    return link;
  }

  async updateSocialLink(id: number, data: Partial<schema.InsertSocialLink>): Promise<schema.SocialLink | undefined> {
    const [updated] = await db.update(schema.socialLinks)
      .set(data)
      .where(eq(schema.socialLinks.id, id))
      .returning();
    return updated;
  }

  async deleteSocialLink(id: number): Promise<boolean> {
    const result = await db.delete(schema.socialLinks).where(eq(schema.socialLinks.id, id));
    return !!result;
  }

  // Site settings
  async getSiteSettings(): Promise<schema.SiteSettings[]> {
    return db.select().from(schema.siteSettings);
  }

  async getSiteSetting(id: number): Promise<schema.SiteSettings | undefined> {
    const [settings] = await db.select().from(schema.siteSettings).where(eq(schema.siteSettings.id, id));
    return settings;
  }
  
  async createSiteSettings(data: schema.InsertSiteSettings): Promise<schema.SiteSettings> {
    const [settings] = await db.insert(schema.siteSettings).values(data).returning();
    return settings;
  }

  async updateSiteSettings(id: number, data: Partial<schema.InsertSiteSettings>): Promise<schema.SiteSettings | undefined> {
    const [updated] = await db.update(schema.siteSettings)
      .set({...data, updatedAt: new Date()})
      .where(eq(schema.siteSettings.id, id))
      .returning();
    return updated;
  }
  
  // Theme settings
  async getThemeSettings(): Promise<schema.ThemeSettings[]> {
    return db.select().from(schema.themeSettings);
  }
  
  async getThemeSettingsByName(name: string): Promise<schema.ThemeSettings | undefined> {
    const [theme] = await db.select()
      .from(schema.themeSettings)
      .where(eq(schema.themeSettings.name, name));
    return theme;
  }
  
  async getActiveTheme(): Promise<schema.ThemeSettings | undefined> {
    try {
      // Get the active theme (marked as appliesGlobally)
      const [theme] = await db.select()
        .from(schema.themeSettings)
        .where(eq(schema.themeSettings.appliesGlobally, true))
        .limit(1);
      
      // If no active theme exists, create a default one
      if (!theme) {
        return this.createThemeSettings({ 
          name: 'Default', 
          appliesGlobally: true 
        } as schema.InsertThemeSettings);
      }
      
      return theme;
    } catch (error) {
      console.error('Error getting active theme:', error);
      return undefined;
    }
  }
  
  async createThemeSettings(data: schema.InsertThemeSettings): Promise<schema.ThemeSettings> {
    // If this theme is set as global, make sure to clear any other global themes
    if (data.appliesGlobally) {
      await db.update(schema.themeSettings)
        .set({ appliesGlobally: false })
        .where(eq(schema.themeSettings.appliesGlobally, true));
    }
    
    const [theme] = await db.insert(schema.themeSettings)
      .values(data)
      .returning();
    return theme;
  }
  
  async updateThemeSettings(id: number, data: Partial<schema.InsertThemeSettings>): Promise<schema.ThemeSettings | undefined> {
    try {
      // If this theme is being set as global, make sure to clear any other global themes
      if (data.appliesGlobally) {
        await db.update(schema.themeSettings)
          .set({ appliesGlobally: false })
          .where(eq(schema.themeSettings.appliesGlobally, true));
      }
      
      // For making sure we're keeping any existing properties intact
      const [existingTheme] = await db.select()
        .from(schema.themeSettings)
        .where(eq(schema.themeSettings.id, id));
      
      if (!existingTheme) {
        console.error(`Theme not found with id ${id}`);
        return undefined;
      }
      
      // Merge existing with updates (keeping nulls where needed)
      const mergedData = {
        ...existingTheme,
        ...data,
        updatedAt: new Date()
      };
      
      // Execute update
      const [updated] = await db.update(schema.themeSettings)
        .set(mergedData)
        .where(eq(schema.themeSettings.id, id))
        .returning();
      
      console.log('Theme updated successfully:', updated);
      return updated;
    } catch (error) {
      console.error('Error updating theme settings:', error);
      return undefined;
    }
  }
  
  async deleteThemeSettings(id: number): Promise<boolean> {
    // Check if this is the only theme or the active global theme
    const themes = await this.getThemeSettings();
    const theme = themes.find(t => t.id === id);
    
    // Don't allow deletion if it's the only theme or if it's the global theme
    if (themes.length <= 1 || (theme && theme.appliesGlobally)) {
      return false;
    }
    
    const result = await db.delete(schema.themeSettings)
      .where(eq(schema.themeSettings.id, id));
    return !!result;
  }

  // Bonus section
  async getBonusSection(): Promise<schema.BonusSection | undefined> {
    try {
      const result = await query(
        `SELECT id, title, subtitle, background_color as "backgroundColor", updated_at as "updatedAt"
         FROM bonus_section LIMIT 1`
      );
      return result.rows[0] as schema.BonusSection | undefined;
    } catch (error) {
      console.error('Error in getBonusSection:', error);
      return undefined;
    }
  }

  async updateBonusSection(data: Partial<schema.InsertBonusSection>): Promise<schema.BonusSection> {
    try {
      const existing = await this.getBonusSection();
      
      if (existing) {
        const result = await query(
          `UPDATE bonus_section 
           SET title = $1, subtitle = $2, background_color = $3, updated_at = NOW()
           WHERE id = $4
           RETURNING id, title, subtitle, background_color as "backgroundColor", updated_at as "updatedAt"`,
          [
            data.title ?? existing.title,
            data.subtitle ?? existing.subtitle,
            data.backgroundColor ?? existing.backgroundColor,
            existing.id
          ]
        );
        
        return result.rows[0] as schema.BonusSection;
      } else {
        const result = await query(
          `INSERT INTO bonus_section (title, subtitle, background_color)
           VALUES ($1, $2, $3)
           RETURNING id, title, subtitle, background_color as "backgroundColor", updated_at as "updatedAt"`,
          [
            data.title || 'Wait, did you say free bonuses?',
            data.subtitle || "Yup. We've decided to bundle in a bunch of free bonuses, just for fun:",
            data.backgroundColor || '#E6F1FE'
          ]
        );
        
        return result.rows[0] as schema.BonusSection;
      }
    } catch (error) {
      console.error('Error updating bonus section:', error);
      throw error;
    }
  }

  // Bonus items
  async getBonusItems(): Promise<schema.BonusItem[]> {
    try {
      const result = await query(
        `SELECT id, section_id as "sectionId", title, description, icon_name as "iconName", 
         button_text as "buttonText", button_url as "buttonUrl", background_color as "backgroundColor",
         order_index as "orderIndex", updated_at as "updatedAt"
         FROM bonus_item ORDER BY order_index ASC`
      );
      return result.rows as schema.BonusItem[];
    } catch (error) {
      console.error('Error in getBonusItems:', error);
      return [];
    }
  }

  async getBonusItem(id: number): Promise<schema.BonusItem | undefined> {
    try {
      const result = await query(
        `SELECT id, section_id as "sectionId", title, description, icon_name as "iconName", 
         button_text as "buttonText", button_url as "buttonUrl", background_color as "backgroundColor",
         order_index as "orderIndex", updated_at as "updatedAt"
         FROM bonus_item WHERE id = $1`,
        [id]
      );
      return result.rows[0] as schema.BonusItem | undefined;
    } catch (error) {
      console.error('Error in getBonusItem:', error);
      return undefined;
    }
  }

  async createBonusItem(data: schema.InsertBonusItem): Promise<schema.BonusItem> {
    try {
      const result = await query(
        `INSERT INTO bonus_item (section_id, title, description, icon_name, button_text, button_url, background_color, order_index)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         RETURNING id, section_id as "sectionId", title, description, icon_name as "iconName", 
         button_text as "buttonText", button_url as "buttonUrl", background_color as "backgroundColor",
         order_index as "orderIndex", updated_at as "updatedAt"`,
        [
          data.sectionId,
          data.title,
          data.description,
          data.iconName || 'Gift',
          data.buttonText,
          data.buttonUrl,
          data.backgroundColor || '#FFE382',
          data.orderIndex || 0
        ]
      );
      return result.rows[0] as schema.BonusItem;
    } catch (error) {
      console.error('Error in createBonusItem:', error);
      throw error;
    }
  }

  async updateBonusItem(id: number, data: Partial<schema.InsertBonusItem>): Promise<schema.BonusItem | undefined> {
    try {
      const existing = await this.getBonusItem(id);
      
      if (!existing) {
        return undefined;
      }
      
      const result = await query(
        `UPDATE bonus_item
         SET section_id = $1, title = $2, description = $3, icon_name = $4, 
         button_text = $5, button_url = $6, background_color = $7, order_index = $8, updated_at = NOW()
         WHERE id = $9
         RETURNING id, section_id as "sectionId", title, description, icon_name as "iconName", 
         button_text as "buttonText", button_url as "buttonUrl", background_color as "backgroundColor",
         order_index as "orderIndex", updated_at as "updatedAt"`,
        [
          data.sectionId ?? existing.sectionId,
          data.title ?? existing.title,
          data.description ?? existing.description,
          data.iconName ?? existing.iconName,
          data.buttonText ?? existing.buttonText,
          data.buttonUrl ?? existing.buttonUrl,
          data.backgroundColor ?? existing.backgroundColor,
          data.orderIndex ?? existing.orderIndex,
          id
        ]
      );
      
      return result.rows[0] as schema.BonusItem;
    } catch (error) {
      console.error('Error in updateBonusItem:', error);
      throw error;
    }
  }

  async deleteBonusItem(id: number): Promise<boolean> {
    try {
      const result = await query('DELETE FROM bonus_item WHERE id = $1', [id]);
      return result.rowCount > 0;
    } catch (error) {
      console.error('Error in deleteBonusItem:', error);
      return false;
    }
  }

  // Guarantee Section
  async getGuaranteeSection(): Promise<any | undefined> {
    try {
      const result = await query(
        `SELECT id, title, subtitle, content, background_color as "backgroundColor", updated_at as "updatedAt"
         FROM guarantee_section LIMIT 1`
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error in getGuaranteeSection:', error);
      return undefined;
    }
  }

  async updateGuaranteeSection(data: any): Promise<any> {
    try {
      const existing = await this.getGuaranteeSection();
      
      if (existing) {
        const result = await query(
          `UPDATE guarantee_section 
           SET title = $1, subtitle = $2, content = $3, background_color = $4, updated_at = NOW()
           WHERE id = $5
           RETURNING id, title, subtitle, content, background_color as "backgroundColor", updated_at as "updatedAt"`,
          [
            data.title ?? existing.title,
            data.subtitle ?? existing.subtitle,
            data.content ?? existing.content,
            data.backgroundColor ?? existing.backgroundColor,
            existing.id
          ]
        );
        
        return result.rows[0];
      } else {
        const result = await query(
          `INSERT INTO guarantee_section (title, subtitle, content, background_color)
           VALUES ($1, $2, $3, $4)
           RETURNING id, title, subtitle, content, background_color as "backgroundColor", updated_at as "updatedAt"`,
          [
            data.title || 'Our 100% Satisfaction Guarantee & Money-Back Promise',
            data.subtitle || 'We want the investment in this course to be an absolute no-brainer for you – if you\'re actually going to do the work 😉',
            data.content || '"Do the work" technically involves completing the core modules. If you\'ve done that and for whatever reason aren\'t 100% happy with your experience, drop us an email (within 30 days of purchasing the course) and we\'ll happily refund your entire payment.',
            data.backgroundColor || '#F9F9F7'
          ]
        );
        
        return result.rows[0];
      }
    } catch (error) {
      console.error('Error updating guarantee section:', error);
      throw error;
    }
  }

  // ----- Scholarship Section Methods -----
  async getScholarshipSection(): Promise<schema.ScholarshipSection | undefined> {
    try {
      const result = await query(
        `SELECT id, title, subtitle, description, image_url as "imageUrl", requirements, 
         application_process as "applicationProcess", button_text as "buttonText", 
         button_url as "buttonUrl", background_color as "backgroundColor"
         FROM scholarship_section LIMIT 1`
      );
      return result.rows[0] as schema.ScholarshipSection;
    } catch (error) {
      console.error('Error in getScholarshipSection:', error);
      return undefined;
    }
  }

  async updateScholarshipSection(data: Partial<schema.InsertScholarshipSection>): Promise<schema.ScholarshipSection> {
    try {
      // Check if section exists
      const existing = await this.getScholarshipSection();
      
      if (!existing) {
        // Create if doesn't exist
        const result = await query(
          `INSERT INTO scholarship_section 
           (title, subtitle, description, image_url, requirements, application_process, button_text, button_url, background_color) 
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
           RETURNING id, title, subtitle, description, image_url as "imageUrl", requirements, 
           application_process as "applicationProcess", button_text as "buttonText", 
           button_url as "buttonUrl", background_color as "backgroundColor"`,
          [
            data.title || 'Can\'t Afford The $995?',
            data.subtitle || 'Scholarship Application',
            data.description || 'If you truly cannot afford the full price but are committed to building your YouTube channel, I\'m offering scholarships based on need and dedication.',
            data.imageUrl || '/student-scholarship.jpg',
            data.requirements || [],
            data.applicationProcess || [],
            data.buttonText || 'Apply for Scholarship',
            data.buttonUrl || '#scholarship-application',
            data.backgroundColor || 'bg-amber-50'
          ]
        );
        
        return result.rows[0] as schema.ScholarshipSection;
      } else {
        // Update if exists
        const result = await query(
          `UPDATE scholarship_section SET 
           title = COALESCE($1, title),
           subtitle = COALESCE($2, subtitle),
           description = COALESCE($3, description),
           image_url = COALESCE($4, image_url),
           requirements = COALESCE($5, requirements),
           application_process = COALESCE($6, application_process),
           button_text = COALESCE($7, button_text),
           button_url = COALESCE($8, button_url),
           background_color = COALESCE($9, background_color)
           WHERE id = $10
           RETURNING id, title, subtitle, description, image_url as "imageUrl", requirements, 
           application_process as "applicationProcess", button_text as "buttonText", 
           button_url as "buttonUrl", background_color as "backgroundColor"`,
          [
            data.title || null,
            data.subtitle || null,
            data.description || null,
            data.imageUrl || null,
            data.requirements || null,
            data.applicationProcess || null,
            data.buttonText || null,
            data.buttonUrl || null,
            data.backgroundColor || null,
            existing.id
          ]
        );
        
        return result.rows[0] as schema.ScholarshipSection;
      }
    } catch (error) {
      console.error('Error in updateScholarshipSection:', error);
      throw error;
    }
  }

  // ----- YouTube Framework Section Methods -----
  async getYoutubeFrameworkSection(): Promise<schema.YoutubeFrameworkSection | undefined> {
    try {
      const result = await query(
        `SELECT id, title, subtitle, description, steps, final_note as "finalNote", 
         button_text as "buttonText", button_url as "buttonUrl", background_color as "backgroundColor"
         FROM youtube_framework_section LIMIT 1`
      );
      return result.rows[0] as schema.YoutubeFrameworkSection;
    } catch (error) {
      console.error('Error in getYoutubeFrameworkSection:', error);
      return undefined;
    }
  }

  async updateYoutubeFrameworkSection(data: Partial<schema.InsertYoutubeFrameworkSection>): Promise<schema.YoutubeFrameworkSection> {
    try {
      // Check if section exists
      const existing = await this.getYoutubeFrameworkSection();
      
      if (!existing) {
        // Create if doesn't exist
        const result = await query(
          `INSERT INTO youtube_framework_section 
           (title, subtitle, description, steps, final_note, button_text, button_url, background_color) 
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
           RETURNING id, title, subtitle, description, steps, final_note as "finalNote", 
           button_text as "buttonText", button_url as "buttonUrl", background_color as "backgroundColor"`,
          [
            data.title || 'My Simple 3 Step YouTube Framework',
            data.subtitle || 'How I Grew My Channel to 4,000,000 Subscribers',
            data.description || 'This is the exact framework I used to grow my YouTube channel from 0 to over 4 million subscribers.',
            data.steps || JSON.stringify([
              { 
                number: 1, 
                title: "Find Your Validated Content Angle", 
                description: "Learn how to identify content topics people are actively searching for."
              },
              { 
                number: 2, 
                title: "Create Value-First Content", 
                description: "Master my step-by-step process for creating content that genuinely helps viewers."
              },
              { 
                number: 3, 
                title: "Build Simple Systems for Growth", 
                description: "Implement my proven framework for consistently growing your channel."
              }
            ]),
            data.finalNote || 'This framework is what I teach my students who have gone on to build 6 and 7-figure YouTube channels.',
            data.buttonText || 'Get The Full Framework',
            data.buttonUrl || '#buy',
            data.backgroundColor || 'bg-gray-50'
          ]
        );
        
        return result.rows[0] as schema.YoutubeFrameworkSection;
      } else {
        // Update if exists
        const result = await query(
          `UPDATE youtube_framework_section SET 
           title = COALESCE($1, title),
           subtitle = COALESCE($2, subtitle),
           description = COALESCE($3, description),
           steps = COALESCE($4, steps),
           final_note = COALESCE($5, final_note),
           button_text = COALESCE($6, button_text),
           button_url = COALESCE($7, button_url),
           background_color = COALESCE($8, background_color)
           WHERE id = $9
           RETURNING id, title, subtitle, description, steps, final_note as "finalNote", 
           button_text as "buttonText", button_url as "buttonUrl", background_color as "backgroundColor"`,
          [
            data.title || null,
            data.subtitle || null,
            data.description || null,
            data.steps ? JSON.stringify(data.steps) : null,
            data.finalNote || null,
            data.buttonText || null,
            data.buttonUrl || null,
            data.backgroundColor || null,
            existing.id
          ]
        );
        
        return result.rows[0] as schema.YoutubeFrameworkSection;
      }
    } catch (error) {
      console.error('Error in updateYoutubeFrameworkSection:', error);
      throw error;
    }
  }

  // Questions section methods
  async getQuestionsSection(): Promise<schema.QuestionsSection | undefined> {
    try {
      const result = await query(
        `SELECT id, title, subtitle, contact_text as "contactText", contact_email as "contactEmail",
         description, background_color as "backgroundColor"
         FROM questions_section LIMIT 1`
      );
      return result.rows[0] as schema.QuestionsSection;
    } catch (error) {
      console.error('Error in getQuestionsSection:', error);
      return undefined;
    }
  }

  async updateQuestionsSection(data: Partial<schema.InsertQuestionsSection>): Promise<schema.QuestionsSection> {
    try {
      // Check if section exists
      const existing = await this.getQuestionsSection();
      
      if (!existing) {
        // Create if doesn't exist
        const result = await query(
          `INSERT INTO questions_section 
           (title, subtitle, contact_text, contact_email, description, background_color) 
           VALUES ($1, $2, $3, $4, $5, $6) 
           RETURNING id, title, subtitle, contact_text as "contactText", contact_email as "contactEmail", 
           description, background_color as "backgroundColor"`,
          [
            data.title || 'Questions?',
            data.subtitle || 'Still not sure or just want to chat?',
            data.contactText || 'Contact us at',
            data.contactEmail || 'support@lukemikic.com',
            data.description || 'If you\'ve got any questions about whether the course is right for you, drop us an email and we\'ll get back to you as soon as possible.',
            data.backgroundColor || 'bg-white'
          ]
        );
        
        return result.rows[0] as schema.QuestionsSection;
      } else {
        // Update if exists
        const result = await query(
          `UPDATE questions_section SET 
           title = COALESCE($1, title),
           subtitle = COALESCE($2, subtitle),
           contact_text = COALESCE($3, contact_text),
           contact_email = COALESCE($4, contact_email),
           description = COALESCE($5, description),
           background_color = COALESCE($6, background_color)
           WHERE id = $7
           RETURNING id, title, subtitle, contact_text as "contactText", contact_email as "contactEmail", 
           description, background_color as "backgroundColor"`,
          [
            data.title || null,
            data.subtitle || null,
            data.contactText || null,
            data.contactEmail || null,
            data.description || null,
            data.backgroundColor || null,
            existing.id
          ]
        );
        
        return result.rows[0] as schema.QuestionsSection;
      }
    } catch (error) {
      console.error('Error in updateQuestionsSection:', error);
      throw error;
    }
  }

  // ----- SEO Metadata Methods -----
  async getAllSeoMetadata(): Promise<schema.SeoMetadata[]> {
    try {
      const result = await db.select().from(schema.seoMetadata).orderBy(desc(schema.seoMetadata.isDefault));
      return result;
    } catch (error) {
      console.error('Error in getAllSeoMetadata:', error);
      return [];
    }
  }

  async getSeoMetadata(id: number): Promise<schema.SeoMetadata | undefined> {
    try {
      const [result] = await db.select().from(schema.seoMetadata).where(eq(schema.seoMetadata.id, id));
      return result;
    } catch (error) {
      console.error(`Error in getSeoMetadata(${id}):`, error);
      return undefined;
    }
  }

  async getSeoMetadataByPage(pagePath: string): Promise<schema.SeoMetadata | undefined> {
    try {
      const [result] = await db.select().from(schema.seoMetadata).where(eq(schema.seoMetadata.pagePath, pagePath));
      return result;
    } catch (error) {
      console.error(`Error in getSeoMetadataByPage(${pagePath}):`, error);
      return undefined;
    }
  }

  async getDefaultSeoMetadata(): Promise<schema.SeoMetadata | undefined> {
    try {
      const [result] = await db.select().from(schema.seoMetadata).where(eq(schema.seoMetadata.isDefault, true));
      return result;
    } catch (error) {
      console.error('Error in getDefaultSeoMetadata:', error);
      return undefined;
    }
  }

  async createSeoMetadata(data: schema.InsertSeoMetadata): Promise<schema.SeoMetadata> {
    try {
      const [result] = await db.insert(schema.seoMetadata).values(data).returning();
      return result;
    } catch (error) {
      console.error('Error in createSeoMetadata:', error);
      throw error;
    }
  }

  async updateSeoMetadata(id: number, data: Partial<schema.InsertSeoMetadata>): Promise<schema.SeoMetadata | undefined> {
    try {
      const [result] = await db.update(schema.seoMetadata)
        .set(data)
        .where(eq(schema.seoMetadata.id, id))
        .returning();
      return result;
    } catch (error) {
      console.error(`Error in updateSeoMetadata(${id}):`, error);
      throw error;
    }
  }

  async deleteSeoMetadata(id: number): Promise<boolean> {
    try {
      const result = await db.delete(schema.seoMetadata).where(eq(schema.seoMetadata.id, id));
      return true;
    } catch (error) {
      console.error(`Error in deleteSeoMetadata(${id}):`, error);
      return false;
    }
  }

  async unsetDefaultSeoMetadata(): Promise<void> {
    try {
      await db.update(schema.seoMetadata)
        .set({ isDefault: false })
        .where(eq(schema.seoMetadata.isDefault, true));
    } catch (error) {
      console.error('Error in unsetDefaultSeoMetadata:', error);
      throw error;
    }
  }
}

export const storage = new DatabaseStorage();
