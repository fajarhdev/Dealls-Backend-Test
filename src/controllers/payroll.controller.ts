import { NextFunction, Request, Response } from 'express';
import {
  getPayslipByUserIdService,
  getAllPayslipsService,
  processPayrollService,
} from '../services/payroll.service';

export const getPayslipByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = Number(req.params.id);
    const periodeId = Number(req.params.periodeId);
    const payslip = await getPayslipByUserIdService(userId, periodeId);
    res.status(200).json(payslip);
  } catch (error) {
    next(error);
  }
};

export const getAllPayslips = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const periodeId = Number(req.params.periodeId);
    const payslips = await getAllPayslipsService(periodeId);
    res.status(200).json(payslips);
  } catch (error) {
    next(error);
  }
};

export const processPayroll = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const periodeId = Number(req.params.periodeId);
    const result = await processPayrollService(periodeId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
