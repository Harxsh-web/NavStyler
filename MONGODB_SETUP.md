# MongoDB Setup Instructions

This document provides instructions for setting up and using MongoDB with this project.

## Prerequisites

- Make sure you have MongoDB installed and running (locally or in the cloud)
- Set the `DATABASE_URL` environment variable to your MongoDB connection string

## Setup Process

### 1. Backup Current Files (PostgreSQL)

Before switching to MongoDB, it's a good idea to create backups of the current PostgreSQL files:

```bash
cp server/index.ts server/pg-index.ts
cp server/storage.ts server/pg-storage.ts
cp server/auth.ts server/pg-auth.ts
cp server/routes.ts server/pg-routes.ts
```

### 2. Switch to MongoDB

Replace the main server files with MongoDB versions:

```bash
cp server/mongo-index.ts server/index.ts
cp server/mongo-storage.ts server/storage.ts
cp server/mongo-auth.ts server/auth.ts
cp server/mongo-routes.ts server/routes.ts
```

### 3. Migrate Data (Optional)

If you want to migrate your existing PostgreSQL data to MongoDB, run:

```bash
NODE_ENV=development tsx scripts/migrate-to-mongodb.ts
```

### 4. Start the Server

Start the application with:

```bash
NODE_ENV=development tsx server/index.ts
```

## Switching Between Databases

You can use the provided script to switch between databases:

```bash
# Switch to MongoDB
NODE_ENV=development tsx scripts/switch-database.ts mongodb

# Switch back to PostgreSQL
NODE_ENV=development tsx scripts/switch-database.ts postgres
```

## MongoDB Environment Variables

The following environment variables should be set in your .env file:

```
DATABASE_URL=mongodb://username:password@host:port/database
SESSION_SECRET=your_session_secret
```

## Troubleshooting

### Connection Issues

If you're having trouble connecting to MongoDB:

1. Verify that MongoDB is running
2. Check your connection string
3. Ensure your MongoDB server allows connections from your application

### Authentication Issues

If you're having trouble with user authentication:

1. The first time you switch to MongoDB, you'll need to create users again
2. You can use the migration script to transfer users from PostgreSQL

### Data Persistence

MongoDB stores data in a different format than PostgreSQL:

1. Document-based vs. relational
2. Uses ObjectId as primary keys instead of serial integers
3. Handles relationships differently (embedded documents vs. foreign keys)

## MongoDB Compass

MongoDB Compass is a great tool for managing your MongoDB database:

1. Download from https://www.mongodb.com/products/compass
2. Connect using your MongoDB connection string
3. View, edit, and manage your collections