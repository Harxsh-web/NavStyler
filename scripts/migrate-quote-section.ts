import { pool, query } from "../server/db";

async function main() {
  try {
    console.log("Updating quote_section table...");
    
    // Check if background_color column already exists
    const checkColumnExists = await query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'quote_section' AND column_name = 'background_color';
    `);
    
    if (checkColumnExists.rows.length === 0) {
      // Add background_color column
      await query(`
        ALTER TABLE quote_section
        ADD COLUMN background_color TEXT DEFAULT '#fffcf1';
      `);
      console.log("✅ Added background_color column to quote_section table");
    } else {
      console.log("ℹ️ background_color column already exists");
    }
    
    // Make heading and content fields optional if needed (though probably not needed since we want content to be required)
    const checkHeadingNotNull = await query(`
      SELECT is_nullable 
      FROM information_schema.columns 
      WHERE table_name = 'quote_section' AND column_name = 'heading';
    `);
    
    if (checkHeadingNotNull.rows.length > 0 && checkHeadingNotNull.rows[0].is_nullable === 'NO') {
      await query(`
        ALTER TABLE quote_section
        ALTER COLUMN heading DROP NOT NULL;
      `);
      console.log("✅ Made heading column optional");
    }
    
    // Check if any record exists, create default if not
    const records = await query(`SELECT COUNT(*) FROM quote_section;`);
    if (parseInt(records.rows[0].count) === 0) {
      await query(`
        INSERT INTO quote_section (heading, content, background_color)
        VALUES ($1, $2, $3);
      `, ["Luke Mikic", "Productivity isn't about how much you do, it's about how good you feel about what you're doing.", "#fffcf1"]);
      console.log("✅ Added default quote");
    }
    
    console.log("Migration completed successfully!");
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  } finally {
    // Close the database connection
    await pool.end();
  }
}

main();