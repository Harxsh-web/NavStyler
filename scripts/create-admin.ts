import { db } from '../server/db';
import { users } from '../shared/schema';
import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';
import { eq } from 'drizzle-orm';

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString('hex');
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString('hex')}.${salt}`;
}

async function createAdmin() {
  try {
    // Check if admin user already exists using eq for the where clause
    const adminUser = await db.select().from(users).where(eq(users.isAdmin, true)).limit(1);
    
    if (adminUser.length > 0) {
      console.log('Admin user already exists.');
      process.exit(0);
    }
    
    // Create default admin user
    const email = 'admin@example.com';
    const password = 'admin123';
    
    const hashedPassword = await hashPassword(password);
    
    const [user] = await db.insert(users).values({
      username: email,
      email: email,
      password: hashedPassword,
      isAdmin: true,
    }).returning();
    
    console.log('Admin user created successfully!');
    console.log('Email:', email);
    console.log('Password:', password);
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
}

createAdmin();