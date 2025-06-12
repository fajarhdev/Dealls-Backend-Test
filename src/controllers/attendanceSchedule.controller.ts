import { NextFunction, Request, Response } from 'express';
import {
  createAttendanceScheduleService,
  deleteAttendanceScheduleService,
  getActiveAttendanceScheduleService,
  getAllAttendanceSchedulesService,
  updateAttendanceScheduleService,
} from '../services/attendanceSchedule.service';

export const getAllAttendanceSchedule = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const attendanceSchedules = await getAllAttendanceSchedulesService();
    res.status(200).json(attendanceSchedules);
  } catch (error) {
    next(error);
  }
};

export const getActiveAttendanceSchedule = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const attendanceSchedules = await getActiveAttendanceScheduleService();
    res.status(200).json(attendanceSchedules);
  } catch (error) {
    next(error);
  }
};

export const createAttendanceSchedule = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const attendanceSchedule = await createAttendanceScheduleService(req.body, req.jwtPayload);
    res.status(201).json(attendanceSchedule);
  } catch (error) {
    next(error);
  }
};

export const updateAttendanceSchedule = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const scheduleId = Number(req.params.id);
    const body = req.body;
    const attendanceSchedule = await updateAttendanceScheduleService(
      scheduleId,
      body,
      req.jwtPayload,
    );
    res.status(200).json(attendanceSchedule);
  } catch (error) {
    next(error);
  }
};

export const deleteAttendanceSchedule = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const scheduleId = Number(req.params.id);
    const attendanceSchedule =
      await deleteAttendanceScheduleService(scheduleId);
    res.status(200).json(attendanceSchedule);
  } catch (error) {
    next(error);
  }
};
