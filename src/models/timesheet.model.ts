import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.config';

export interface TimesheetAttributes {
  id?: number;
  userId: number;
  periode: number;
  type: 'REGULER' | 'OVERTIME';
  checkIn: Date;
  checkOut: Date;
  hours?: number;
  isProcessed?: boolean;
  created_by?: number;
  updated_by?: number;
  deleted_by?: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export interface TimesheetCreationAttributes
  extends Omit<
    TimesheetAttributes,
    | 'id'
    | 'created_at'
    | 'updated_at'
    | 'deleted_at'
  > {}

export class Timesheet
  extends Model<TimesheetAttributes, TimesheetCreationAttributes>
  implements TimesheetAttributes
{
  declare id: number;
  declare userId: number;
  declare periode: number;
  declare type: 'REGULER' | 'OVERTIME';
  declare checkIn: Date;
  declare checkOut: Date;
  declare hours?: number;
  declare isProcessed?: boolean;
  declare created_by?: number;
  declare updated_by?: number;
  declare deleted_by?: number;
  declare created_at?: Date;
  declare updated_at?: Date;
  declare deleted_at?: Date;
}

Timesheet.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    periode: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'attendance_schedules',
        key: 'id',
      },
    },
    type: {
      type: DataTypes.ENUM('REGULER', 'OVERTIME'),
      allowNull: false,
    },
    checkIn: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    checkOut: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    hours: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    isProcessed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
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
    tableName: 'timesheets',
    modelName: 'timesheets',
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  },
);
