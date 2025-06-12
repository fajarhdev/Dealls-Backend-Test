import { Op } from 'sequelize';
import {
  Timesheet,
  TimesheetCreationAttributes,
} from '../models/timesheet.model';
import { User } from '../models/user.model';
import { getActiveAttendanceScheduleService } from './attendanceSchedule.service';
import { JwtPayload } from '../models/jwtPayload.model';

export const getTimesheetsService = async () => {
  const timesheets = await Timesheet.findAll({
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'username'],
      },
    ],
  });
  return timesheets;
};

export const getTimesheetByIdService = async (id: number) => {
  const timesheet = await Timesheet.findByPk(id, {
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'username'],
      },
    ],
  });
  if (!timesheet) {
    throw new Error(`Timesheet with id ${id} not found`);
  }
  return timesheet;
};

export const createTimesheetService = async (
  data: TimesheetCreationAttributes,
  jwtPayload?: JwtPayload
) => {
  data.created_by = jwtPayload?.userId;
  data.updated_by = jwtPayload?.userId;
  if (jwtPayload?.userId === undefined) {
    throw new Error('User ID is required to create a timesheet');
  }
  data.userId = jwtPayload.userId;

  // Check if today is not weekend
  const today = new Date();
  const dayOfWeek = today.getDay();
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    throw new Error('Cannot create timesheet on weekend');
  }

  // Check if timesheet for today already exists
  const existingTimesheet = await Timesheet.findOne({
    where: {
      userId: data.userId,
      checkIn: {
        [Op.gte]: new Date(today.setHours(0, 0, 0, 0)), // Start of today
        [Op.lt]: new Date(today.setHours(23, 59, 59, 999)), // End of today
      },
    },
  });

  if (existingTimesheet) {
    throw new Error('Timesheet for today already exists');
  }

  const periode = await getActiveAttendanceScheduleService();
  if (!periode) {
    throw new Error('No active attendance schedule found');
  }

  data.periode = periode.id;

  // Create new timesheet
  const timesheet = await Timesheet.create(data);
  return timesheet;
};

export const updateTimesheetService = async (
  id: number,
  data: TimesheetCreationAttributes,
  jwtPayload?: JwtPayload
) => {

  data.updated_by = jwtPayload?.userId;

  // Check if periode is active
  const activeSchedule = await getActiveAttendanceScheduleService();
  if (!activeSchedule) {
    throw new Error('No active attendance schedule found');
  }

  if (data.periode !== activeSchedule.id) {
    throw new Error('Cannot update timesheet to inactive periode');
  }

  const timesheet = await getTimesheetByIdService(id);
  return timesheet.update(data);
};

export const deleteTimesheetService = async (id: number) => {
  // Check if periode is active
  const activeSchedule = await getActiveAttendanceScheduleService();
  if (!activeSchedule) {
    throw new Error('No active attendance schedule found');
  }

  const timesheet = await getTimesheetByIdService(id);

  if (activeSchedule.id !== timesheet.periode) {
    throw new Error('Cannot delete timesheet from inactive periode');
  }

  await timesheet.destroy();
  return timesheet;
};

export const getTimesheetsByUserIdService = async (userId: number) => {
  const timesheets = await Timesheet.findAll({
    where: { userId },
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'username'],
      },
    ],
  });
  return timesheets;
};

export const getTimesheetsByPeriodeService = async (periode: number) => {
  const timesheets = await Timesheet.findAll({
    where: { periode },
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'username'],
      },
    ],
  });
  return timesheets;
};

export const getTimesheetsByTypeService = async (
  type: 'REGULER' | 'OVERTIME',
) => {
  const timesheets = await Timesheet.findAll({
    where: { type },
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'username'],
      },
    ],
  });
  return timesheets;
};

// Overtime section

export const createOvertimeService = async (
  data: TimesheetCreationAttributes,
) => {
  // Check if user is allowed to create overtime by check if they have checked out

  // Check rules for overtime creation
  const today = new Date();
  const dayOfWeek = today.getDay();
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    const existingTimesheet = await Timesheet.findOne({
      where: {
        userId: data.userId,
        checkIn: {
          [Op.gte]: new Date(today.setHours(0, 0, 0, 0)), // Start of today
          [Op.lt]: new Date(today.setHours(23, 59, 59, 999)), // End of today
        },
      },
    });

    if (existingTimesheet?.checkOut === null) {
      throw new Error('User must check out before creating overtime');
    }
  }

  // Check if overtime is already created for today
  const existingOvertime = await Timesheet.findAll({
    where: {
      userId: data.userId,
      type: 'OVERTIME',
      checkIn: {
        [Op.gte]: new Date(today.setHours(0, 0, 0, 0)), // Start of today
        [Op.lt]: new Date(today.setHours(23, 59, 59, 999)), // End of today
      },
    },
  });

  let hours = 0;
  if (existingOvertime.length > 0) {
    existingOvertime.map((overtime) => {
      hours += overtime.hours || 0;
    });
  }

  if (hours >= 3) {
    throw new Error(
      'Overtime for today has reached the maximum limit of 3 hours',
    );
  }

  // Create new overtime entry
  const createOvertime = await Timesheet.create(data);

  return createOvertime;
};

export const updateOvertimeService = async (
  id: number,
  data: TimesheetCreationAttributes,
) => {
  // Check if periode is active
  const activeSchedule = await getActiveAttendanceScheduleService();
  if (!activeSchedule) {
    throw new Error('No active attendance schedule found');
  }

  if (data.periode !== activeSchedule.id) {
    throw new Error('Cannot update timesheet to inactive periode');
  }

  const timesheet = await getTimesheetByIdService(id);
  return timesheet.update(data);
};

export const deleteOvertimeService = async (id: number) => {
  // Check if periode is active
  const activeSchedule = await getActiveAttendanceScheduleService();
  if (!activeSchedule) {
    throw new Error('No active attendance schedule found');
  }

  const timesheet = await getTimesheetByIdService(id);

  if (activeSchedule.id !== timesheet.periode) {
    throw new Error('Cannot delete timesheet from inactive periode');
  }

  await timesheet.destroy();
  return timesheet;
};
