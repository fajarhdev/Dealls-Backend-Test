import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.config';

export interface UserAttributes {
  id?: number;
  name: string;
  salary: number;
  username: string;
  password: string;
  roleId: number;
  overtimeRate: number;
  created_by?: number;
  updated_by?: number;
  deleted_by?: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export interface UserCreationAttributes
  extends Omit<
    UserAttributes,
    | 'id'
    | 'created_at'
    | 'updated_at'
    | 'deleted_at'
    | 'created_by'
    | 'updated_by'
    | 'deleted_by'
  > {}

export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  declare id: number;
  declare name: string;
  declare salary: number;
  declare username: string;
  declare password: string;
  declare roleId: number;
  declare overtimeRate: number;
  declare created_by?: number;
  declare updated_by?: number;
  declare deleted_by?: number;
  declare created_at?: Date;
  declare updated_at?: Date;
  declare deleted_at?: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salary: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'roles', // name of the roles table
        key: 'id',
      },
    },
    overtimeRate: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    updated_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    deleted_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'users',
    modelName: 'users',
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  },
);
