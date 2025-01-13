import entities from './src/users/entities';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';
config();

const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  entities,
  migrations: ['src/database/migrations/*-migration.ts'],
  logging: true,
});

export default AppDataSource;
