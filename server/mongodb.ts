import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Use the DATABASE_URL from environment variables (this will be the MongoDB URI)
const MONGODB_URI = process.env.DATABASE_URL || 'mongodb://localhost:27017/book-landing-page';

export async function connectToDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB successfully');
    return mongoose.connection;
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
}

export default mongoose;