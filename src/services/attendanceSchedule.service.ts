import { get } from 'http';
import {
  AttendanceSchedule,
  AttendanceScheduleCreationAttributes,
} from '../models/attendanceSchedule.model';
import { JwtPayload } from '../models/jwtPayload.model';

export const createAttendanceScheduleService = async (
  data: AttendanceScheduleCreationAttributes,
  jwtPayload?: JwtPayload
) => {
  data.created_by = jwtPayload?.userId;
  data.updated_by = jwtPayload?.userId;

  // Check if there is an active attendance schedule
  const activeAttendanceSchedule = await AttendanceSchedule.findOne({
    where: { isActive: true },
  });

  if (activeAttendanceSchedule) {
    throw new Error(`Active attendance schedule already exists`);
  }

  data.isActive = true; // Set the new schedule as active

  // Create a new attendance schedule
  const attendanceSchedule = await AttendanceSchedule.create(data);
  return attendanceSchedule;
};

export const getActiveAttendanceScheduleService = async () => {
  // Get the active attendance schedule
  const attendanceSchedule = await AttendanceSchedule.findOne({
    where: { isActive: true },
  });

  if (!attendanceSchedule) {
    throw new Error(`No active attendance schedule found`);
  }

  return attendanceSchedule;
};

export const getAllAttendanceSchedulesService = async () => {
  // Get all attendance schedules
  const attendanceSchedules = await AttendanceSchedule.findAll({
    order: [['created_at', 'DESC']],
  });

  if (attendanceSchedules.length === 0) {
    throw new Error(`No attendance schedules found`);
  }

  return attendanceSchedules;
};

export const updateAttendanceScheduleService = async (
  id: number,
  data: AttendanceScheduleCreationAttributes,
  jwtPayload?: JwtPayload
) => {

  data.updated_by = jwtPayload?.userId;
  
  // Get the attendance schedule by ID
  const attendanceSchedule = await AttendanceSchedule.findByPk(id);

  if (!attendanceSchedule) {
    throw new Error(`Attendance schedule with id ${id} not found`);
  }

  // Update the attendance schedule
  return attendanceSchedule.update(data);
};

export const deleteAttendanceScheduleService = async (id: number) => {
  // Get the attendance schedule by ID
  const attendanceSchedule = await AttendanceSchedule.findByPk(id);

  if (!attendanceSchedule) {
    throw new Error(`Attendance schedule with id ${id} not found`);
  }

  // Delete the attendance schedule
  await attendanceSchedule.destroy();
  return attendanceSchedule;
};
