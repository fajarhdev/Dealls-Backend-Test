import { Request, Response, NextFunction } from 'express';
import {
  createTimesheetService,
  deleteTimesheetService,
  getTimesheetByIdService,
  getTimesheetsByPeriodeService,
  getTimesheetsByTypeService,
  getTimesheetsByUserIdService,
  getTimesheetsService,
  updateTimesheetService,
} from '../services/timesheet.service';

export const getTimesheets = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const timesheets = await getTimesheetsService();
    res.status(200).json(timesheets);
  } catch (error) {
    next(error);
  }
};

export const getTimesheetById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const timesheetId = Number(req.params.id);
    const timesheet = await getTimesheetByIdService(timesheetId);
    res.status(200).json(timesheet);
  } catch (error) {
    next(error);
  }
};

export const getTimesheetsByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = Number(req.params.id);
    const timesheets = await getTimesheetsByUserIdService(userId);
    res.status(200).json(timesheets);
  } catch (error) {
    next(error);
  }
};

export const getTimesheetsByPeriode = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const periode = Number(req.params.periode);
    const timesheets = await getTimesheetsByPeriodeService(periode);
    res.status(200).json(timesheets);
  } catch (error) {
    next(error);
  }
};

export const getTimesheetsByType = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const type = req.params.type as 'REGULER' | 'OVERTIME';
    const timesheets = await getTimesheetsByTypeService(type);
    res.status(200).json(timesheets);
  } catch (error) {
    next(error);
  }
};

export const createTimesheet = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const timesheet = await createTimesheetService(req.body);
    res.status(201).json(timesheet);
  } catch (error) {
    next(error);
  }
};

export const updateTimesheet = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const timesheetId = Number(req.params.id);
    const updatedTimesheet = await updateTimesheetService(
      timesheetId,
      req.body,
    );
    res.status(200).json(updatedTimesheet);
  } catch (error) {
    next(error);
  }
};

export const deleteTimesheet = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const timesheetId = Number(req.params.id);
    const deletedTimesheet = await deleteTimesheetService(timesheetId);
    res.status(200).json(deletedTimesheet);
  } catch (error) {
    next(error);
  }
};
