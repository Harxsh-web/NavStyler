import fs from 'fs';
import path from 'path';

const DB_TYPE = process.argv[2]?.toLowerCase();

if (!DB_TYPE || (DB_TYPE !== 'mongodb' && DB_TYPE !== 'postgres')) {
  console.error('Please specify database type: "mongodb" or "postgres"');
  process.exit(1);
}

const SERVER_DIR = path.resolve(__dirname, '../server');

async function switchToMongoDB() {
  console.log('Switching to MongoDB...');
  
  // Create symbolic links or copy files
  await fs.promises.copyFile(
    path.join(SERVER_DIR, 'mongo-index.ts'),
    path.join(SERVER_DIR, 'index.ts')
  );
  
  await fs.promises.copyFile(
    path.join(SERVER_DIR, 'mongo-storage.ts'),
    path.join(SERVER_DIR, 'storage.ts')
  );
  
  await fs.promises.copyFile(
    path.join(SERVER_DIR, 'mongo-auth.ts'),
    path.join(SERVER_DIR, 'auth.ts')
  );
  
  await fs.promises.copyFile(
    path.join(SERVER_DIR, 'mongo-routes.ts'),
    path.join(SERVER_DIR, 'routes.ts')
  );
  
  console.log('Successfully switched to MongoDB!');
}

async function switchToPostgres() {
  console.log('Switching to PostgreSQL...');
  
  // Check if we have backups of original files
  if (!fs.existsSync(path.join(SERVER_DIR, 'pg-index.ts'))) {
    // Create backups of original PostgreSQL files first
    await fs.promises.copyFile(
      path.join(SERVER_DIR, 'index.ts'),
      path.join(SERVER_DIR, 'pg-index.ts')
    );
    
    await fs.promises.copyFile(
      path.join(SERVER_DIR, 'storage.ts'),
      path.join(SERVER_DIR, 'pg-storage.ts')
    );
    
    await fs.promises.copyFile(
      path.join(SERVER_DIR, 'auth.ts'),
      path.join(SERVER_DIR, 'pg-auth.ts')
    );
    
    await fs.promises.copyFile(
      path.join(SERVER_DIR, 'routes.ts'),
      path.join(SERVER_DIR, 'pg-routes.ts')
    );
  }
  
  // Restore PostgreSQL files
  await fs.promises.copyFile(
    path.join(SERVER_DIR, 'pg-index.ts'),
    path.join(SERVER_DIR, 'index.ts')
  );
  
  await fs.promises.copyFile(
    path.join(SERVER_DIR, 'pg-storage.ts'),
    path.join(SERVER_DIR, 'storage.ts')
  );
  
  await fs.promises.copyFile(
    path.join(SERVER_DIR, 'pg-auth.ts'),
    path.join(SERVER_DIR, 'auth.ts')
  );
  
  await fs.promises.copyFile(
    path.join(SERVER_DIR, 'pg-routes.ts'),
    path.join(SERVER_DIR, 'routes.ts')
  );
  
  console.log('Successfully switched to PostgreSQL!');
}

async function main() {
  try {
    // Create backups of current PostgreSQL files if switching to MongoDB for the first time
    if (DB_TYPE === 'mongodb' && !fs.existsSync(path.join(SERVER_DIR, 'pg-index.ts'))) {
      await fs.promises.copyFile(
        path.join(SERVER_DIR, 'index.ts'),
        path.join(SERVER_DIR, 'pg-index.ts')
      );
      
      await fs.promises.copyFile(
        path.join(SERVER_DIR, 'storage.ts'),
        path.join(SERVER_DIR, 'pg-storage.ts')
      );
      
      await fs.promises.copyFile(
        path.join(SERVER_DIR, 'auth.ts'),
        path.join(SERVER_DIR, 'pg-auth.ts')
      );
      
      await fs.promises.copyFile(
        path.join(SERVER_DIR, 'routes.ts'),
        path.join(SERVER_DIR, 'pg-routes.ts')
      );
    }
    
    if (DB_TYPE === 'mongodb') {
      await switchToMongoDB();
    } else {
      await switchToPostgres();
    }
    
    console.log(`Successfully switched to ${DB_TYPE.toUpperCase()}`);
  } catch (error) {
    console.error('Error switching database:', error);
    process.exit(1);
  }
}

main();