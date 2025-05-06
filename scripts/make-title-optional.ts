import { pool, query } from "../server/db";

async function makeTestimonialSectionTitleOptional() {
  try {
    console.log("Making testimonial section title optional...");
    
    // Alter the column to remove not null constraint
    await query(`
      ALTER TABLE testimonial_section
      ALTER COLUMN title DROP NOT NULL;
    `);
    
    console.log("✅ Successfully made testimonial section title optional");
  } catch (error) {
    console.error("❌ Error making testimonial section title optional:", error);
    throw error;
  }
}

async function main() {
  try {
    await makeTestimonialSectionTitleOptional();
    console.log("Migration completed successfully!");
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  } finally {
    // Close the database connection
    pool.end();
  }
}

main();