import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.config';

export interface AttendanceScheduleAttributes {
  id?: number;
  name: string;
  periodeStart: Date;
  periodeEnd: Date;
  isActive?: boolean;
  created_by?: number;
  updated_by?: number;
  deleted_by?: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export interface AttendanceScheduleCreationAttributes
  extends Omit<
    AttendanceScheduleAttributes,
    | 'id'
    | 'created_at'
    | 'updated_at'
    | 'deleted_at'
    | 'created_by'
    | 'updated_by'
    | 'deleted_by'
  > {}

export class AttendanceSchedule
  extends Model<
    AttendanceScheduleAttributes,
    AttendanceScheduleCreationAttributes
  >
  implements AttendanceScheduleAttributes
{
  declare id: number;
  declare name: string;
  declare periodeStart: Date;
  declare periodeEnd: Date;
  declare isActive?: boolean;
  declare created_by?: number;
  declare updated_by?: number;
  declare deleted_by?: number;
  declare created_at?: Date;
  declare updated_at?: Date;
  declare deleted_at?: Date;
}

AttendanceSchedule.init(
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
    periodeStart: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    periodeEnd: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
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
    modelName: 'attandance_schedules',
    tableName: 'attendance_schedules',
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  },
);
