import { Sequelize } from 'sequelize';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import Umzug from 'umzug';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize Sequelize
const sequelize = new Sequelize("WalletDB", "postgres", "0502349611", {
  host: "localhost",
  port: 5432,
  dialect: "postgres",
  logging: console.log,
});

// Import your Sequelize models
const modelsPath = join(__dirname, 'models');

try {
  const modelFiles = await fs.readdir(modelsPath);

  for (const file of modelFiles) {
    if (file.endsWith('.js')) {
      const model = await import(join(modelsPath, file));
      model.default(sequelize, Sequelize.DataTypes); 
    }
  }
} catch (error) {
  console.error('Error reading model files:', error);
}

// Create and run migrations
await sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'); 

const queryInterface = sequelize.getQueryInterface();
const migrationsPath = join(__dirname, 'migrations');

const umzug = new Umzug({
  storage: 'sequelize',
  storageOptions: {
    sequelize: sequelize,
  },
  migrations: {
    params: [queryInterface, Sequelize],
    path: migrationsPath,
  },
});

try {
  await umzug.up();
  console.log('Auto migration complete.');
} catch (error) {
  console.error('Error during auto migration:', error);
} finally {
  // Close the Sequelize connection
  await sequelize.close();
}
