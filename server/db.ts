import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

// Required for Neon serverless to work with Node.js
neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle({ client: pool, schema });

// Helper for direct SQL queries
export const query = async (text: string, params: any[] = []) => {
  try {
    return await pool.query(text, params);
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
};