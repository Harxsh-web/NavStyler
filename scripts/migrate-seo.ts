import { db, pool } from "../server/db";
import { seoMetadata, themeSettings } from "../shared/schema";
import { sql } from "drizzle-orm";

/**
 * This script migrates the database to add the SEO metadata table and update the theme_settings table.
 * Run this script using: npx tsx scripts/migrate-seo.ts
 */
async function main() {
  try {
    console.log("Starting database migration for SEO metadata and theme settings...");

    // First, check if the seo_metadata table exists
    const checkSeoTable = await db.execute(sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public'
        AND table_name = 'seo_metadata'
      );
    `);
    
    // Create the seo_metadata table if it doesn't exist
    if (!checkSeoTable.rows[0].exists) {
      console.log("Creating seo_metadata table...");
      await db.execute(sql`
        CREATE TABLE "seo_metadata" (
          "id" SERIAL PRIMARY KEY,
          "meta_title" TEXT NOT NULL,
          "meta_description" TEXT NOT NULL,
          "og_title" TEXT,
          "og_description" TEXT,
          "og_image_url" TEXT,
          "twitter_title" TEXT,
          "twitter_description" TEXT,
          "twitter_image_url" TEXT,
          "canonical_url" TEXT,
          "keywords" TEXT,
          "structured_data" TEXT,
          "page_path" TEXT NOT NULL DEFAULT '/',
          "is_default" BOOLEAN DEFAULT false
        );
      `);
      console.log("Successfully created seo_metadata table");

      // Add default SEO metadata
      console.log("Adding default SEO metadata...");
      await db.insert(seoMetadata).values({
        metaTitle: "Feel-Good Productivity - Luke Mikic",
        metaDescription: "Discover how to achieve success without burning out. In his book 'Feel-Good Productivity', Luke Mikic shares practical strategies for sustainable productivity with joy.",
        ogTitle: "Feel-Good Productivity - Achieve Success Without Burnout",
        ogDescription: "Learn how to be productive while enjoying the process. Luke Mikic's book provides practical advice for sustainable success.",
        ogImageUrl: "/images/book-cover.jpg",
        twitterTitle: "Feel-Good Productivity by Luke Mikic",
        twitterDescription: "Discover the secret to sustainable productivity with joy. Get Luke Mikic's new book!",
        twitterImageUrl: "/images/book-cover-twitter.jpg",
        keywords: "productivity, happiness, success, work-life balance, burnout prevention, luke mikic",
        pagePath: "/",
        isDefault: true
      });
      console.log("Successfully added default SEO metadata");
    } else {
      console.log("SEO metadata table already exists, skipping creation");
    }

    // Check if the theme_settings table exists
    const checkThemeTable = await db.execute(sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public'
        AND table_name = 'theme_settings'
      );
    `);

    // Create or update the theme_settings table
    if (!checkThemeTable.rows[0].exists) {
      console.log("Creating theme_settings table...");
      await db.execute(sql`
        CREATE TABLE "theme_settings" (
          "id" SERIAL PRIMARY KEY,
          "name" TEXT NOT NULL,
          "primary_color" TEXT NOT NULL DEFAULT '#4f46e5',
          "secondary_color" TEXT NOT NULL DEFAULT '#0ea5e9',
          "accent_color" TEXT NOT NULL DEFAULT '#f59e0b',
          "text_color" TEXT NOT NULL DEFAULT '#111827',
          "background_color" TEXT NOT NULL DEFAULT '#ffffff',
          "font_primary" TEXT NOT NULL DEFAULT 'Inter',
          "font_secondary" TEXT NOT NULL DEFAULT 'Merriweather',
          "button_radius" TEXT NOT NULL DEFAULT '0.5rem',
          "button_style" TEXT NOT NULL DEFAULT 'filled',
          "card_style" TEXT NOT NULL DEFAULT 'shadow',
          "layout_style" TEXT NOT NULL DEFAULT 'modern',
          "is_dark_mode" BOOLEAN DEFAULT false NOT NULL,
          "is_high_contrast" BOOLEAN DEFAULT false NOT NULL,
          "header_style" TEXT NOT NULL DEFAULT 'default',
          "footer_style" TEXT NOT NULL DEFAULT 'standard',
          "custom_css" TEXT,
          "applies_globally" BOOLEAN DEFAULT false NOT NULL
        );
      `);
      console.log("Successfully created theme_settings table");

      // Add default theme settings
      console.log("Adding default theme settings...");
      await db.insert(themeSettings).values({
        name: "Default Theme",
        primaryColor: "#4f46e5",
        secondaryColor: "#0ea5e9",
        accentColor: "#f59e0b",
        textColor: "#111827",
        backgroundColor: "#ffffff",
        fontPrimary: "Inter",
        fontSecondary: "Merriweather",
        buttonRadius: "0.5rem",
        buttonStyle: "filled",
        cardStyle: "shadow",
        layoutStyle: "modern",
        isDarkMode: false,
        isHighContrast: false,
        headerStyle: "default",
        footerStyle: "standard",
        appliesGlobally: true
      });
      console.log("Successfully added default theme settings");
    } else {
      // Table exists, check if we need to update the schema
      console.log("Theme settings table exists, checking if it needs updates...");
      
      // Check if font_family column exists
      const checkFontFamilyColumn = await db.execute(sql`
        SELECT EXISTS (
          SELECT FROM information_schema.columns 
          WHERE table_schema = 'public'
          AND table_name = 'theme_settings'
          AND column_name = 'font_family'
        );
      `);
      
      if (checkFontFamilyColumn.rows[0].exists) {
        console.log("Updating theme_settings table to replace font_family with font_primary and font_secondary...");
        
        // First, get the current font family value to preserve it
        const currentFontFamily = await db.execute(sql`
          SELECT font_family FROM theme_settings LIMIT 1;
        `);
        
        const fontValue = currentFontFamily.rows[0]?.font_family || 'Inter';
        
        // Add the new columns
        await db.execute(sql`
          ALTER TABLE "theme_settings" 
          ADD COLUMN "font_primary" TEXT NOT NULL DEFAULT 'Inter',
          ADD COLUMN "font_secondary" TEXT NOT NULL DEFAULT 'Merriweather';
        `);
        
        // Copy the old font_family value to both new columns
        await db.execute(sql`
          UPDATE "theme_settings" 
          SET "font_primary" = ${fontValue}, 
              "font_secondary" = ${fontValue};
        `);
        
        // Drop the old column
        await db.execute(sql`
          ALTER TABLE "theme_settings" 
          DROP COLUMN "font_family";
        `);
        
        console.log("Successfully updated theme_settings table");
      } else {
        console.log("Theme settings table already has the updated columns");
      }
      
      // Check for other new columns and add them if they don't exist
      const columnsToCheck = [
        { name: "button_radius", default: "'0.5rem'" },
        { name: "button_style", default: "'filled'" },
        { name: "card_style", default: "'shadow'" },
        { name: "layout_style", default: "'modern'" },
        { name: "is_dark_mode", default: "false" },
        { name: "is_high_contrast", default: "false" },
        { name: "header_style", default: "'default'" },
        { name: "footer_style", default: "'standard'" },
        { name: "custom_css", default: "NULL" },
        { name: "applies_globally", default: "false" }
      ];
      
      for (const column of columnsToCheck) {
        const checkColumnExists = await db.execute(sql`
          SELECT EXISTS (
            SELECT FROM information_schema.columns 
            WHERE table_schema = 'public'
            AND table_name = 'theme_settings'
            AND column_name = ${column.name}
          );
        `);
        
        if (!checkColumnExists.rows[0].exists) {
          console.log(`Adding ${column.name} column to theme_settings table...`);
          
          let dataType = "TEXT";
          if (column.name === "is_dark_mode" || column.name === "is_high_contrast" || column.name === "applies_globally") {
            dataType = "BOOLEAN";
          }
          
          let notNull = "";
          if (column.name !== "custom_css") {
            notNull = "NOT NULL";
          }
          
          await db.execute(sql.raw(`
            ALTER TABLE "theme_settings" 
            ADD COLUMN "${column.name}" ${dataType} DEFAULT ${column.default} ${notNull};
          `));
          
          console.log(`Successfully added ${column.name} column`);
        }
      }
    }
    
    console.log("Migration completed successfully");
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    await pool.end();
  }
}

main();