import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.config';

export interface RoleAttributes {
  id?: number;
  name: string;
  level: number;
  created_by?: number;
  updated_by?: number;
  deleted_by?: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export interface RoleCreationAttributes
  extends Omit<
    RoleAttributes,
    | 'id'
    | 'created_at'
    | 'updated_at'
    | 'deleted_at'
    | 'created_by'
    | 'updated_by'
    | 'deleted_by'
  > {}

export class Role
  extends Model<RoleAttributes, RoleCreationAttributes>
  implements RoleAttributes
{
  declare id: number;
  declare name: string;
  declare level: number;
  declare created_by?: number;
  declare updated_by?: number;
  declare deleted_by?: number;
  declare created_at?: Date;
  declare updated_at?: Date;
  declare deleted_at?: Date;
}

Role.init(
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
    level: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true, // Ensures that each role level is unique
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
    tableName: 'roles',
    modelName: 'roles',
    timestamps: true,
    paranoid: true, // enables soft deletes
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  },
);
