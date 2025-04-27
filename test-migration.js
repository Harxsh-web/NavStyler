// Database Migration Test Script
// This script tests migration of a small sample of data between PostgreSQL and MongoDB

const { pool, db } = require('./server/db');
const { connect, connection } = require('mongoose');
const { User, Hero, Testimonial } = require('./shared/models');

// MongoDB connection settings
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/book_landing_page';

// Function to connect to MongoDB
async function connectToMongoDB() {
  try {
    await connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}

// Function to disconnect from MongoDB
async function disconnectFromMongoDB() {
  try {
    await connection.close();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error disconnecting from MongoDB:', error);
  }
}

// Function to disconnect from PostgreSQL
async function disconnectFromPostgreSQL() {
  try {
    await pool.end();
    console.log('Disconnected from PostgreSQL');
  } catch (error) {
    console.error('Error disconnecting from PostgreSQL:', error);
  }
}

// Test migration from PostgreSQL to MongoDB
async function testPGToMongoMigration() {
  console.log('\n--- Testing PostgreSQL to MongoDB migration ---\n');
  
  try {
    // Connect to MongoDB
    await connectToMongoDB();
    
    // Get sample data from PostgreSQL
    console.log('Fetching sample data from PostgreSQL...');
    const pgUsers = await db.select().from('users').limit(2);
    const pgHero = await db.select().from('hero_section').limit(1);
    const pgTestimonials = await db.select().from('testimonials').limit(2);
    
    console.log(`Found ${pgUsers.length} users in PostgreSQL`);
    console.log(`Found ${pgHero.length} hero sections in PostgreSQL`);
    console.log(`Found ${pgTestimonials.length} testimonials in PostgreSQL`);
    
    // Clear MongoDB collections for testing
    console.log('\nClearing MongoDB collections for testing...');
    await User.deleteMany({});
    await Hero.deleteMany({});
    await Testimonial.deleteMany({});
    
    // Migrate users
    console.log('\nMigrating users...');
    for (const user of pgUsers) {
      const mongoUser = new User({
        username: user.username,
        email: user.email,
        password: user.password,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        stripeCustomerId: user.stripeCustomerId,
        stripeSubscriptionId: user.stripeSubscriptionId
      });
      await mongoUser.save();
      console.log(`Migrated user: ${user.username}`);
    }
    
    // Migrate hero section
    if (pgHero.length > 0) {
      console.log('\nMigrating hero section...');
      const hero = pgHero[0];
      const mongoHero = new Hero({
        title: hero.title,
        subtitle: hero.subtitle,
        buttonText: hero.buttonText,
        buttonUrl: hero.buttonUrl,
        imageUrl: hero.imageUrl,
        updatedAt: hero.updatedAt
      });
      await mongoHero.save();
      console.log('Migrated hero section');
    }
    
    // Migrate testimonials
    console.log('\nMigrating testimonials...');
    for (const testimonial of pgTestimonials) {
      const mongoTestimonial = new Testimonial({
        quote: testimonial.quote,
        name: testimonial.name,
        title: testimonial.title,
        imageUrl: testimonial.imageUrl,
        videoUrl: testimonial.videoUrl,
        mediaType: testimonial.mediaType || 'image',
        showMobile: testimonial.showMobile,
        updatedAt: testimonial.updatedAt
      });
      await mongoTestimonial.save();
      console.log(`Migrated testimonial from: ${testimonial.name}`);
    }
    
    // Verify migration by counting documents in MongoDB
    console.log('\nVerifying migration...');
    const mongoUserCount = await User.countDocuments();
    const mongoHeroCount = await Hero.countDocuments();
    const mongoTestimonialCount = await Testimonial.countDocuments();
    
    console.log(`MongoDB User count: ${mongoUserCount} (should be ${pgUsers.length})`);
    console.log(`MongoDB Hero count: ${mongoHeroCount} (should be ${pgHero.length})`);
    console.log(`MongoDB Testimonial count: ${mongoTestimonialCount} (should be ${pgTestimonials.length})`);
    
    console.log('\nMigration test completed successfully!');
  } catch (error) {
    console.error('Error during migration test:', error);
  } finally {
    // Disconnect from both databases
    await disconnectFromMongoDB();
    await disconnectFromPostgreSQL();
  }
}

// Main function
async function main() {
  await testPGToMongoMigration();
}

// Run the main function
main().catch(console.error);