import { NextFunction, Request, Response } from 'express';
import {
  createReimbursementService,
  deleteReimbursementService,
  getReimbursementByIdService,
  getReimbursementByUserIdAndPeriodeIdService,
  getReimbursementsService,
  updateReimbursementService,
} from '../services/reimbursement.service';
import { getActiveAttendanceScheduleService } from '../services/attendanceSchedule.service';

export const getAllReimbursement = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reimbursements = await getReimbursementsService();
    res.status(200).json(reimbursements);
  } catch (error) {
    next(error);
  }
};

export const getReimbursementById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reimbursementId = req.params.id;
    const reimbursement = await getReimbursementByIdService(
      Number(reimbursementId),
    );
    res.status(200).json(reimbursement);
  } catch (error) {
    next(error);
  }
};

export const getReimbursementByUserIdAndPeriodeId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = Number(req.params.userId);
    const periodeId = Number(req.params.periodeId);
    const reimbursements = await getReimbursementByUserIdAndPeriodeIdService(
      userId,
      periodeId,
    );
    res.status(200).json(reimbursements);
  } catch (error) {
    next(error);
  }
};

export const createReimbursement = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reimbursement = await createReimbursementService(req.body, req.jwtPayload);
    res.status(201).json(reimbursement);
  } catch (error) {
    next(error);
  }
};

export const updateReimbursement = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reimbursementId = Number(req.params.id);
    const reimbursement = await updateReimbursementService(
      reimbursementId,
      req.body,
      req.jwtPayload
    );
    res.status(200).json(reimbursement);
  } catch (error) {
    next(error);
  }
};

export const deleteReimbursement = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reimbursementId = Number(req.params.id);
    await deleteReimbursementService(reimbursementId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
