import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  usernameDB?: string;
  passwordDB?: string;
  databaseName?: string;
  hostDB?: string;
  portDB?: number;
  dialect?: string;
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  usernameDB: process.env.DB_USERNAME,
  passwordDB: process.env.DB_PASSWORD,
  databaseName: process.env.DB_NAME,
  hostDB: process.env.DB_HOST,
  portDB: Number(process.env.DB_PORT) || 5432,
  dialect: process.env.DB_DIALECT || 'postgres',
};

export default config;
