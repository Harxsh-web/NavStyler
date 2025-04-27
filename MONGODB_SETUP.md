# MongoDB Setup Guide

This document provides instructions for setting up and using MongoDB with this application.

## Prerequisites

- Node.js (v18 or newer)
- MongoDB (local installation or cloud service like MongoDB Atlas)

## MongoDB Configuration

### 1. Set up MongoDB

You can either use a local MongoDB installation or a cloud-based MongoDB service like MongoDB Atlas.

#### Option A: Local MongoDB Installation

1. Install MongoDB on your machine: [MongoDB Installation Guide](https://docs.mongodb.com/manual/installation/)
2. Start MongoDB service:
   ```bash
   mongod --dbpath=/path/to/data/directory
   ```

#### Option B: MongoDB Atlas (Cloud)

1. Create a free MongoDB Atlas account: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Set up a new cluster
3. Create a database user
4. Get your connection string

### 2. Configure Environment Variables

Create or update your `.env` file with MongoDB connection details:

```
# MongoDB Connection
MONGODB_URI=mongodb://username:password@localhost:27017/book_landing_page
# or for MongoDB Atlas
# MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/book_landing_page?retryWrites=true&w=majority

SESSION_SECRET=your_session_secret
```

## Switching Between Databases

This application supports both PostgreSQL and MongoDB. You can switch between them using the provided script.

### Using the Database Switcher Script

```bash
# Switch to MongoDB
node switch-database.js mongodb

# Switch to PostgreSQL
node switch-database.js postgres
```

## Data Migration

If you've been using PostgreSQL and want to migrate your data to MongoDB, use the migration script:

```bash
# Migrate from PostgreSQL to MongoDB
node scripts/migrate-to-mongodb.js
```

## Manual Starting with MongoDB

If you prefer to start the application with MongoDB manually:

```bash
# Start the application with MongoDB
NODE_ENV=development tsx server/mongo-index.ts
```

## MongoDB Models

The MongoDB implementation uses Mongoose for schema definition and data modeling. All models are defined in `shared/models.ts`.

## Troubleshooting

### Connection Issues

If you face connection issues with MongoDB:

1. Verify your connection string in the `.env` file
2. Ensure MongoDB service is running
3. Check for network connectivity (for MongoDB Atlas)
4. Verify authentication credentials

### Data Migration Issues

If data migration fails:

1. Ensure both PostgreSQL and MongoDB are running
2. Check that your PostgreSQL database has the data you want to migrate
3. Verify MongoDB connection string

## Support

For additional support or questions about MongoDB implementation, please contact the development team.