import { db, pool } from "../server/db";
import { connectToDatabase } from "../server/mongodb";
import * as models from "../shared/models";
import dotenv from "dotenv";

dotenv.config();

async function migrateUsers() {
  console.log("Migrating users...");
  const pgUsers = await db.query(`SELECT * FROM users`);
  
  for (const user of pgUsers.rows) {
    const existingUser = await models.User.findOne({ username: user.username });
    if (!existingUser) {
      await models.User.create({
        username: user.username,
        email: user.email,
        password: user.password,
        isAdmin: user.is_admin,
        stripeCustomerId: user.stripe_customer_id,
        stripeSubscriptionId: user.stripe_subscription_id,
        createdAt: user.created_at,
        updatedAt: user.updated_at
      });
      console.log(`Migrated user: ${user.username}`);
    } else {
      console.log(`User ${user.username} already exists in MongoDB`);
    }
  }
}

async function migrateHeroSection() {
  console.log("Migrating hero section...");
  const pgHero = await db.query(`SELECT * FROM hero_section`);
  
  if (pgHero.rows.length > 0) {
    const hero = pgHero.rows[0];
    const existingHero = await models.Hero.findOne();
    
    if (!existingHero) {
      await models.Hero.create({
        title: hero.title,
        subtitle: hero.subtitle,
        buttonText: hero.cta_text || hero.button_text,
        buttonUrl: hero.cta_link || hero.button_url,
        imageUrl: hero.image_url,
        updatedAt: hero.updated_at
      });
      console.log("Migrated hero section");
    } else {
      console.log("Hero section already exists in MongoDB");
    }
  }
}

async function migrateFeaturedSection() {
  console.log("Migrating featured section...");
  const pgFeatured = await db.query(`SELECT * FROM featured_section`);
  
  if (pgFeatured.rows.length > 0) {
    const featured = pgFeatured.rows[0];
    const existingFeatured = await models.Featured.findOne();
    
    if (!existingFeatured) {
      await models.Featured.create({
        heading: featured.heading,
        subheading: featured.subheading,
        logoUrls: featured.logo_urls,
        updatedAt: featured.updated_at
      });
      console.log("Migrated featured section");
    } else {
      console.log("Featured section already exists in MongoDB");
    }
  }
}

async function migrateQuoteSection() {
  console.log("Migrating quote section...");
  const pgQuote = await db.query(`SELECT * FROM quote_section`);
  
  if (pgQuote.rows.length > 0) {
    const quote = pgQuote.rows[0];
    const existingQuote = await models.Quote.findOne();
    
    if (!existingQuote) {
      await models.Quote.create({
        heading: quote.heading,
        content: quote.content,
        updatedAt: quote.updated_at
      });
      console.log("Migrated quote section");
    } else {
      console.log("Quote section already exists in MongoDB");
    }
  }
}

async function migrateLearningPointsSection() {
  console.log("Migrating learning points section...");
  const pgLPSection = await db.query(`SELECT * FROM learning_points_section`);
  
  if (pgLPSection.rows.length > 0) {
    const section = pgLPSection.rows[0];
    const existingSection = await models.LearningPointsSection.findOne();
    
    if (!existingSection) {
      await models.LearningPointsSection.create({
        title: section.title,
        subtitle: section.subtitle,
        backgroundColor: section.background_color,
        updatedAt: section.updated_at
      });
      console.log("Migrated learning points section");
    } else {
      console.log("Learning points section already exists in MongoDB");
    }
  }
}

async function migrateLearningPoints() {
  console.log("Migrating learning points...");
  const pgPoints = await db.query(`SELECT * FROM learning_point`);
  
  for (const point of pgPoints.rows) {
    const existingPoint = await models.LearningPoint.findOne({ 
      number: point.number,
      text: point.text
    });
    
    if (!existingPoint) {
      await models.LearningPoint.create({
        number: point.number,
        text: point.text,
        sectionId: point.section_id,
        showMobile: point.show_mobile,
        updatedAt: point.updated_at
      });
      console.log(`Migrated learning point #${point.number}`);
    } else {
      console.log(`Learning point #${point.number} already exists in MongoDB`);
    }
  }
}

async function migrateTestimonialSection() {
  console.log("Migrating testimonial section...");
  const pgTSection = await db.query(`SELECT * FROM testimonial_section`);
  
  if (pgTSection.rows.length > 0) {
    const section = pgTSection.rows[0];
    const existingSection = await models.TestimonialSection.findOne();
    
    if (!existingSection) {
      await models.TestimonialSection.create({
        title: section.title,
        updatedAt: section.updated_at
      });
      console.log("Migrated testimonial section");
    } else {
      console.log("Testimonial section already exists in MongoDB");
    }
  }
}

async function migrateTestimonials() {
  console.log("Migrating testimonials...");
  const pgTestimonials = await db.query(`SELECT * FROM testimonial`);
  
  for (const testimonial of pgTestimonials.rows) {
    const existingTestimonial = await models.Testimonial.findOne({ 
      quote: testimonial.quote,
      name: testimonial.name
    });
    
    if (!existingTestimonial) {
      await models.Testimonial.create({
        quote: testimonial.quote,
        name: testimonial.name,
        title: testimonial.title,
        imageUrl: testimonial.image_url,
        videoUrl: testimonial.video_url,
        mediaType: testimonial.media_type || 'image',
        showMobile: testimonial.show_mobile,
        updatedAt: testimonial.updated_at
      });
      console.log(`Migrated testimonial from ${testimonial.name}`);
    } else {
      console.log(`Testimonial from ${testimonial.name} already exists in MongoDB`);
    }
  }
}

async function migrateBookSections() {
  console.log("Migrating book sections...");
  const pgBookSections = await db.query(`SELECT * FROM book_section`);
  
  for (const section of pgBookSections.rows) {
    const existingSection = await models.BookSection.findOne({ 
      title: section.title,
      orderIndex: section.order_index
    });
    
    if (!existingSection) {
      await models.BookSection.create({
        orderIndex: section.order_index,
        title: section.title,
        subtitle: section.subtitle,
        content: section.content,
        updatedAt: section.updated_at
      });
      console.log(`Migrated book section: ${section.title}`);
    } else {
      console.log(`Book section ${section.title} already exists in MongoDB`);
    }
  }
}

async function migrateAboutBookSection() {
  console.log("Migrating about book section...");
  const pgAboutBook = await db.query(`SELECT * FROM about_book_section`);
  
  if (pgAboutBook.rows.length > 0) {
    const aboutBook = pgAboutBook.rows[0];
    const existingAboutBook = await models.AboutBookSection.findOne();
    
    if (!existingAboutBook) {
      await models.AboutBookSection.create({
        title: aboutBook.title,
        bookCoverConfig: aboutBook.book_cover_config,
        updatedAt: aboutBook.updated_at
      });
      console.log("Migrated about book section");
    } else {
      console.log("About book section already exists in MongoDB");
    }
  }
}

async function migrateAuthorSection() {
  console.log("Migrating author section...");
  const pgAuthor = await db.query(`SELECT * FROM author_section`);
  
  if (pgAuthor.rows.length > 0) {
    const author = pgAuthor.rows[0];
    const existingAuthor = await models.AuthorSection.findOne();
    
    if (!existingAuthor) {
      await models.AuthorSection.create({
        title: author.title,
        name: author.author_name,
        bio: author.bio,
        bioShort: author.bio_short,
        imageUrl: author.image_url,
        updatedAt: author.updated_at
      });
      console.log("Migrated author section");
    } else {
      console.log("Author section already exists in MongoDB");
    }
  }
}

async function migrateFooterCategories() {
  console.log("Migrating footer categories...");
  const pgCategories = await db.query(`SELECT * FROM footer_category`);
  
  // Map to store old ID to new MongoDB ID mapping for relationship linking
  const categoryIdMap = new Map();
  
  for (const category of pgCategories.rows) {
    const existingCategory = await models.FooterCategory.findOne({ 
      name: category.name
    });
    
    if (!existingCategory) {
      const newCategory = await models.FooterCategory.create({
        name: category.name,
        orderIndex: category.order_index,
        updatedAt: category.updated_at
      });
      categoryIdMap.set(category.id, newCategory._id);
      console.log(`Migrated footer category: ${category.name}`);
    } else {
      categoryIdMap.set(category.id, existingCategory._id);
      console.log(`Footer category ${category.name} already exists in MongoDB`);
    }
  }
  
  return categoryIdMap;
}

async function migrateFooterLinks(categoryIdMap: Map<number, string>) {
  console.log("Migrating footer links...");
  const pgLinks = await db.query(`SELECT * FROM footer_link`);
  
  for (const link of pgLinks.rows) {
    const newCategoryId = categoryIdMap.get(link.category_id);
    
    if (!newCategoryId) {
      console.log(`Skipping footer link ${link.text} - category ID ${link.category_id} not found`);
      continue;
    }
    
    const existingLink = await models.FooterLink.findOne({ 
      text: link.text,
      url: link.url,
      categoryId: newCategoryId
    });
    
    if (!existingLink) {
      await models.FooterLink.create({
        categoryId: newCategoryId,
        text: link.text,
        url: link.url,
        orderIndex: link.order_index,
        updatedAt: link.updated_at
      });
      console.log(`Migrated footer link: ${link.text}`);
    } else {
      console.log(`Footer link ${link.text} already exists in MongoDB`);
    }
  }
}

async function migrateSocialLinks() {
  console.log("Migrating social links...");
  const pgSocialLinks = await db.query(`SELECT * FROM social_link`);
  
  for (const link of pgSocialLinks.rows) {
    const existingLink = await models.SocialLink.findOne({ 
      platform: link.platform,
      url: link.url
    });
    
    if (!existingLink) {
      await models.SocialLink.create({
        platform: link.platform,
        url: link.url,
        iconName: link.icon_name,
        active: link.active,
        updatedAt: link.updated_at
      });
      console.log(`Migrated social link: ${link.platform}`);
    } else {
      console.log(`Social link ${link.platform} already exists in MongoDB`);
    }
  }
}

async function migrateSiteSettings() {
  console.log("Migrating site settings...");
  const pgSettings = await db.query(`SELECT * FROM site_setting`);
  
  for (const setting of pgSettings.rows) {
    const existingSetting = await models.SiteSetting.findOne({ 
      name: setting.name
    });
    
    if (!existingSetting) {
      await models.SiteSetting.create({
        name: setting.name,
        value: setting.value,
        updatedAt: setting.updated_at
      });
      console.log(`Migrated site setting: ${setting.name}`);
    } else {
      console.log(`Site setting ${setting.name} already exists in MongoDB`);
    }
  }
}

async function migrateThemeSettings() {
  console.log("Migrating theme settings...");
  const pgThemes = await db.query(`SELECT * FROM theme_settings`);
  
  for (const theme of pgThemes.rows) {
    const existingTheme = await models.ThemeSettings.findOne({ 
      name: theme.name
    });
    
    if (!existingTheme) {
      await models.ThemeSettings.create({
        name: theme.name,
        primaryColor: theme.primary_color,
        secondaryColor: theme.secondary_color,
        accentColor: theme.accent_color,
        textColor: theme.text_color,
        backgroundColor: theme.background_color,
        fontPrimary: theme.font_primary,
        fontSecondary: theme.font_secondary,
        buttonRadius: theme.button_radius,
        buttonStyle: theme.button_style,
        cardStyle: theme.card_style,
        layoutStyle: theme.layout_style,
        isDarkMode: theme.is_dark_mode,
        isHighContrast: theme.is_high_contrast,
        headerStyle: theme.header_style,
        footerStyle: theme.footer_style,
        customCss: theme.custom_css,
        appliesGlobally: theme.applies_globally,
        updatedAt: theme.updated_at
      });
      console.log(`Migrated theme: ${theme.name}`);
    } else {
      console.log(`Theme ${theme.name} already exists in MongoDB`);
    }
  }
}

async function migrateArticles() {
  console.log("Migrating articles...");
  const pgArticles = await db.query(`SELECT * FROM article`);
  
  for (const article of pgArticles.rows) {
    const existingArticle = await models.Article.findOne({ 
      slug: article.slug
    });
    
    if (!existingArticle) {
      await models.Article.create({
        title: article.title,
        slug: article.slug,
        excerpt: article.excerpt,
        content: article.content,
        imageUrl: article.image_url,
        backgroundColor: article.background_color,
        isPublished: article.is_published,
        publishedAt: article.published_at,
        updatedAt: article.updated_at
      });
      console.log(`Migrated article: ${article.title}`);
    } else {
      console.log(`Article ${article.title} already exists in MongoDB`);
    }
  }
}

async function migrateVideos() {
  console.log("Migrating videos...");
  const pgVideos = await db.query(`SELECT * FROM video`);
  
  for (const video of pgVideos.rows) {
    const existingVideo = await models.Video.findOne({ 
      slug: video.slug
    });
    
    if (!existingVideo) {
      await models.Video.create({
        title: video.title,
        slug: video.slug,
        description: video.description,
        thumbnailUrl: video.thumbnail_url,
        videoUrl: video.video_url,
        isPublished: video.is_published,
        publishedAt: video.published_at,
        updatedAt: video.updated_at
      });
      console.log(`Migrated video: ${video.title}`);
    } else {
      console.log(`Video ${video.title} already exists in MongoDB`);
    }
  }
}

async function migrateAnalytics() {
  console.log("Migrating analytics data...");
  
  // Migrate page views
  const pgPageViews = await db.query(`SELECT * FROM page_view`);
  for (const view of pgPageViews.rows) {
    const existingView = await models.PageView.findOne({ 
      path: view.path,
      date: view.date
    });
    
    if (!existingView) {
      await models.PageView.create({
        path: view.path,
        date: view.date,
        count: view.count,
        createdAt: view.created_at,
        updatedAt: view.updated_at
      });
      console.log(`Migrated page view for ${view.path} on ${view.date}`);
    }
  }
  
  // Migrate sales
  const pgSales = await db.query(`SELECT * FROM sale`);
  for (const sale of pgSales.rows) {
    const existingSale = await models.Sale.findOne({ 
      date: sale.date,
      stripePaymentId: sale.stripe_payment_id
    });
    
    if (!existingSale && sale.stripe_payment_id) {
      await models.Sale.create({
        date: sale.date,
        amount: sale.amount,
        productType: sale.product_type,
        stripePaymentId: sale.stripe_payment_id,
        createdAt: sale.created_at,
        updatedAt: sale.updated_at
      });
      console.log(`Migrated sale from ${sale.date}`);
    }
  }
  
  // Migrate visitors
  const pgVisitors = await db.query(`SELECT * FROM visitor`);
  for (const visitor of pgVisitors.rows) {
    const existingVisitor = await models.Visitor.findOne({ 
      date: visitor.date
    });
    
    if (!existingVisitor) {
      await models.Visitor.create({
        date: visitor.date,
        count: visitor.count,
        createdAt: visitor.created_at,
        updatedAt: visitor.updated_at
      });
      console.log(`Migrated visitor count for ${visitor.date}`);
    }
  }
  
  // Migrate content engagement
  const pgEngagement = await db.query(`SELECT * FROM content_engagement`);
  for (const engagement of pgEngagement.rows) {
    const existingEngagement = await models.ContentEngagement.findOne({ 
      date: engagement.date,
      contentType: engagement.content_type,
      contentId: engagement.content_id
    });
    
    if (!existingEngagement) {
      await models.ContentEngagement.create({
        date: engagement.date,
        contentType: engagement.content_type,
        contentId: engagement.content_id,
        engagementScore: engagement.engagement_score,
        createdAt: engagement.created_at,
        updatedAt: engagement.updated_at
      });
      console.log(`Migrated ${engagement.content_type} engagement for ID ${engagement.content_id}`);
    }
  }
}

async function migratePGToMongoDB() {
  try {
    // Connect to MongoDB
    await connectToDatabase();
    console.log("Connected to MongoDB");
    
    // Perform migrations in sequence
    await migrateUsers();
    await migrateHeroSection();
    await migrateFeaturedSection();
    await migrateQuoteSection();
    await migrateLearningPointsSection();
    await migrateLearningPoints();
    await migrateTestimonialSection();
    await migrateTestimonials();
    await migrateBookSections();
    await migrateAboutBookSection();
    await migrateAuthorSection();
    const categoryIdMap = await migrateFooterCategories();
    await migrateFooterLinks(categoryIdMap);
    await migrateSocialLinks();
    await migrateSiteSettings();
    await migrateThemeSettings();
    await migrateArticles();
    await migrateVideos();
    await migrateAnalytics();
    
    console.log("Migration completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  } finally {
    // Close PostgreSQL connection
    await pool.end();
  }
}

// Run the migration
migratePGToMongoDB();