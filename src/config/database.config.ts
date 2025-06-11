import { Dialect, Sequelize } from 'sequelize';
import config from './config';

export const sequelize = new Sequelize(
  config.databaseName as string,
  config.usernameDB as string,
  config.passwordDB as string,
  {
    host: config.hostDB,
    port: config.portDB,
    dialect: (config.dialect || 'postgres') as Dialect,
  },
);
