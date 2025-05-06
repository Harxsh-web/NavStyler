import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { pgTable, serial, text, integer, boolean, timestamp } from 'drizzle-orm/pg-core';
import { migrate } from 'drizzle-orm/neon-serverless/migrator';
import dotenv from 'dotenv';
import ws from 'ws';

neonConfig.webSocketConstructor = ws;

dotenv.config();

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL not set');
  }

  console.log('Starting testimonial section migration...');
  
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const db = drizzle(pool);

  // Add the new columns to the testimonial_section table
  try {
    console.log('Adding new columns to testimonial_section table...');
    
    await db.execute(`
      ALTER TABLE testimonial_section 
      ADD COLUMN IF NOT EXISTS success_story TEXT,
      ADD COLUMN IF NOT EXISTS success_story_name TEXT DEFAULT 'Brandon',
      ADD COLUMN IF NOT EXISTS initial_subs INTEGER DEFAULT 700,
      ADD COLUMN IF NOT EXISTS current_subs INTEGER DEFAULT 10000,
      ADD COLUMN IF NOT EXISTS timeframe_subs TEXT DEFAULT '18 months',
      ADD COLUMN IF NOT EXISTS views_increase INTEGER DEFAULT 6300,
      ADD COLUMN IF NOT EXISTS initial_views INTEGER DEFAULT 90,
      ADD COLUMN IF NOT EXISTS final_views INTEGER DEFAULT 5700,
      ADD COLUMN IF NOT EXISTS work_period TEXT DEFAULT '12 weeks'
    `);
    
    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }

  await pool.end();
}

main().catch(console.error);