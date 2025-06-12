import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.config';
import { JwtPayload } from './jwtPayload.model';

export interface ReimbursementAttributes {
  id?: number;
  userId: number; //TODO: AMBIL DARI JWT
  name: string;
  detail?: string;
  amount: number;
  file?: string;
  status?: 'PENDING' | 'APPROVED' | 'REJECTED';
  periodeId?: number;
  isProcessed?: boolean;
  jwtPayload?: JwtPayload;
  created_by?: number;
  updated_by?: number;
  deleted_by?: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export interface ReimbursementCreationAttributes
  extends Omit<
    ReimbursementAttributes,
    | 'id'
    | 'created_at'
    | 'updated_at'
    | 'deleted_at'
  > {}

export class Reimbursement
  extends Model<ReimbursementAttributes, ReimbursementCreationAttributes>
  implements ReimbursementAttributes
{
  declare id: number;
  declare userId: number;
  declare name: string;
  declare detail?: string;
  declare amount: number;
  declare file?: string;
  declare status?: 'PENDING' | 'APPROVED' | 'REJECTED';
  declare periodeId?: number;
  declare isProcessed?: boolean;
  declare created_by?: number;
  declare updated_by?: number;
  declare deleted_by?: number;
  declare created_at?: Date;
  declare updated_at?: Date;
  declare deleted_at?: Date;
}

Reimbursement.init(
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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    detail: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    file: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('PENDING', 'APPROVED', 'REJECTED'),
      allowNull: false,
      defaultValue: 'PENDING',
    },
    periodeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'attendance_schedules',
        key: 'id',
      },
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
    tableName: 'reimbursements',
    modelName: 'reimbursements',
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  },
);
