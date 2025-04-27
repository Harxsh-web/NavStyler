// Database Switcher Script
// This script allows you to switch between PostgreSQL and MongoDB

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Paths to the index files
const POSTGRES_INDEX = path.join(__dirname, 'server', 'index.ts');
const MONGO_INDEX = path.join(__dirname, 'server', 'mongo-index.ts');
const ACTIVE_INDEX = path.join(__dirname, 'server', 'active-index.ts');

// Function to switch to MongoDB
function switchToMongoDB() {
  console.log('Switching to MongoDB...');
  
  try {
    // Create symlink or copy file
    if (fs.existsSync(ACTIVE_INDEX)) {
      fs.unlinkSync(ACTIVE_INDEX);
    }
    
    fs.copyFileSync(MONGO_INDEX, ACTIVE_INDEX);
    console.log('Now using MongoDB as the database.');
    
    // Restart server
    console.log('Restarting server...');
    execSync('npm run dev', { stdio: 'inherit' });
    
    return true;
  } catch (error) {
    console.error('Error switching to MongoDB:', error);
    return false;
  }
}

// Function to switch to PostgreSQL
function switchToPostgres() {
  console.log('Switching to PostgreSQL...');
  
  try {
    // Create symlink or copy file
    if (fs.existsSync(ACTIVE_INDEX)) {
      fs.unlinkSync(ACTIVE_INDEX);
    }
    
    fs.copyFileSync(POSTGRES_INDEX, ACTIVE_INDEX);
    console.log('Now using PostgreSQL as the database.');
    
    // Restart server
    console.log('Restarting server...');
    execSync('npm run dev', { stdio: 'inherit' });
    
    return true;
  } catch (error) {
    console.error('Error switching to PostgreSQL:', error);
    return false;
  }
}

// Main function to handle command line arguments
function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('Usage: node switch-database.js [postgres|mongodb]');
    return;
  }
  
  const dbType = args[0].toLowerCase();
  
  if (dbType === 'postgres' || dbType === 'postgresql') {
    switchToPostgres();
  } else if (dbType === 'mongo' || dbType === 'mongodb') {
    switchToMongoDB();
  } else {
    console.log('Invalid database type. Use "postgres" or "mongodb".');
  }
}

// Run the main function
main();