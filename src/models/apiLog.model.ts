import { sequelize } from '../config/database.config';
import { DataTypes, Model } from 'sequelize';

export interface ApiLogAttributes {
  id?: number; // Auto-incremented primary key
  requestId: string; // Unique identifier for the request
  endpoint: string; // API endpoint accessed
  method: string; // HTTP method (GET, POST, etc.)
  statusCode: number; // HTTP status code returned
  ip: string; // IP address of the client making the request
  responseTime: number; // Time taken to process the request in milliseconds
  createdAt?: Date; // Timestamp of when the log was created
  updatedAt?: Date; // Timestamp of when the log was last updated
  deletedAt?: Date; // Timestamp for soft delete, if applicable
  created_by?: number; // ID of the user who created the log
  updated_by?: number; // ID of the user who last updated the log
  deleted_by?: number; // ID of the user who deleted the log
}

export interface ApiLogCreationAttributes
  extends Omit<
    ApiLogAttributes,
    | 'id'
    | 'createdAt'
    | 'updatedAt'
    | 'deletedAt'
    | 'created_by'
    | 'updated_by'
    | 'deleted_by'
  > {}

export class ApiLog
  extends Model<ApiLogAttributes, ApiLogCreationAttributes>
  implements ApiLogAttributes
{
  declare id: number;
  declare requestId: string;
  declare endpoint: string;
  declare method: string;
  declare statusCode: number;
  declare ip: string;
  declare responseTime: number;
  declare createdAt?: Date;
  declare updatedAt?: Date;
  declare deletedAt?: Date;
  declare created_by?: number;
  declare updated_by?: number;
  declare deleted_by?: number;
}

ApiLog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    requestId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Ensures that each request ID is unique
    },
    endpoint: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    method: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    statusCode: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ip: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    responseTime: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'api_logs',
    modelName: 'apiLog',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
);
