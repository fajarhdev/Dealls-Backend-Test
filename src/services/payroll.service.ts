import { AttendanceSchedule } from '../models/attendanceSchedule.model';
import { Timesheet } from '../models/timesheet.model';
import { getTimesheetsByPeriodeService } from './timesheet.service';
import { getUserByIdService, getUsersService } from './user.service';
import { Reimbursement } from '../models/reimbursement.model';
import { getReimbursementByUserIdAndPeriodeIdService } from './reimbursement.service';
import { Op } from 'sequelize';
import { JwtPayload } from '../models/jwtPayload.model';

interface Payslip {
  userId: number;
  periodeId: number;
  userName: string;
  periode: string;
  timesheet: timesheetData[];
  overtime: OvertimeData[];
  reimbursement: ReimbursementData[];
  takeHomePay: number;
}

interface timesheetData {
  periodeId: number;
  periode: string;
  checkIn: Date;
  checkOut: Date;
  hours: number;
}

interface OvertimeData {
  periodeId: number;
  periode: string;
  checkIn: Date;
  checkOut: Date;
  hours: number;
  totalPayOT: number;
}

interface ReimbursementData {
  periodeId?: number;
  periode?: string;
  amount?: number;
  description?: string;
  status?: string;
}

export const processPayrollService = async (periodeId: number, jwtPayload?: JwtPayload) => {

  const updateBy = jwtPayload?.userId;
  // Get the timesheet period
  const periode = await AttendanceSchedule.findOne({
    where: { id: periodeId, isActive: true },
  });

  if (!periode) {
    throw new Error(`Period with id ${periodeId} not found`);
  }

  // Check timesheets for the given periode
  const timesheets = await getTimesheetsByPeriodeService(periode.id);

  if (!timesheets || timesheets.length === 0) {
    throw new Error(`No timesheets found for periode with id ${periode.id}`);
  }

  const updateTimesheets = await Timesheet.update(
    { isProcessed: true },
    {
      where: {
        periode: periode.id,
      },
    },
  );

  if (!updateTimesheets) {
    throw new Error(
      `Failed to update timesheets for periode with id ${periode.id}`,
    );
  }

  const updateReimbursement = await Reimbursement.update(
    { isProcessed: true },
    {
      where: {
        created_at: {
          [Op.gte]: periode.periodeStart,
          [Op.lte]: periode.periodeEnd,
        },
      },
    },
  );

  if (!updateReimbursement) {
    throw new Error(
      `Failed to update reimbursement for periode with id ${periode.id}`,
    );
  }

  const updateAttendanceSchedule = await AttendanceSchedule.update(
    { isActive: false,
      updated_by: updateBy,
     },
    { where: { id: periode.id } },
  );

  if (!updateAttendanceSchedule) {
    throw new Error(
      `Failed to update attendance schedule with id ${periode.id}`,
    );
  }
};

export const getPayslipByUserIdService = async (
  userId: number,
  periodeId: number,
) => {
  // Get the timesheet period
  const periode = await AttendanceSchedule.findOne({
    where: { id: periodeId },
  });

  if (!periode) {
    throw new Error(`Period with id ${periodeId} not found`);
  }

  // Get the user by ID
  const user = await getUserByIdService(userId);

  if (!user) {
    throw new Error(`User with id ${userId} not found`);
  }

  // Get the timesheets for the user in the given period
  const timesheets = await Timesheet.findAll({
    where: {
      userId: user.id,
      periode: periode.id,
    },
  });

  if (!timesheets || timesheets.length === 0) {
    throw new Error(
      `No timesheets found for user with id ${userId} in periode ${periodeId}`,
    );
  }

  let data: Payslip[] = [];
  let timesheetData: timesheetData[] = [];
  let reimbursementData: ReimbursementData[] = [];
  let overtimeData: OvertimeData[] = [];

  // Filltering timesheet data and insert to timesheetData array
  timesheets.forEach((timesheet) => {
    timesheetData.push({
      periodeId: periode.id,
      periode: periode.name,
      checkIn: timesheet.checkIn,
      checkOut: timesheet.checkOut,
      hours: timesheet.hours || 0,
    });
  });

  // Filltering overtimem data and insert to overtimeData array and also calculate total overtime hours
  timesheets.forEach((timesheet) => {
    if (timesheet.type === 'OVERTIME') {
      overtimeData.push({
        periodeId: periode.id,
        periode: periode.name,
        checkIn: timesheet.checkIn,
        checkOut: timesheet.checkOut,
        hours: timesheet.hours || 0,
        totalPayOT:
          (timesheet.hours || 0) * ((user.overtimeRate || 0) * user.salary),
      });
    }
  });

  const reimbursements = await getReimbursementByUserIdAndPeriodeIdService(
    user.id,
    periode.id,
  );

  reimbursements.forEach((reimbursement) => {
    reimbursementData.push({
      periodeId: reimbursement.periodeId,
      periode: periode.name,
      amount: reimbursement.amount,
      description: reimbursement.detail,
      status: reimbursement.status,
    });
  });

  // Calculate take home pay
  const totalOvertimePay = overtimeData.reduce(
    (acc, curr) => acc + (curr.totalPayOT || 0),
    0,
  );
  const totalReimbursement = reimbursementData.reduce(
    (acc, curr) => acc + (curr.amount || 0),
    0,
  );
  const baseSalary =
    user.salary *
    (timesheetData.reduce((acc, curr) => acc + curr.hours, 0) / 160); // Assuming 160 hours in a month
  const takeHomePay = baseSalary + totalOvertimePay + totalReimbursement;

  data.push({
    userId: user.id,
    periodeId: periode.id,
    userName: user.name,
    periode: periode.name,
    timesheet: timesheetData,
    overtime: overtimeData,
    reimbursement: reimbursementData,
    takeHomePay: takeHomePay || 0,
  });
  // Return the payslip data
  return data;
};

export const getAllPayslipsService = async (periodeId: number) => {
  // Get the timesheet period
  const periode = await AttendanceSchedule.findOne({
    where: { id: periodeId },
  });

  if (!periode) {
    throw new Error(`Period with id ${periodeId} not found`);
  }

  // Get all users
  const users = await getUsersService();

  if (!users || users.length === 0) {
    throw new Error(`No users found`);
  }

  let data: { summary: { totalTakeHomePay: number }; payslips: Payslip[] } = {
    summary: { totalTakeHomePay: 0 },
    payslips: [],
  };

  let totalTakeHomePay = 0;

  for (const user of users) {
    const payslip = await getPayslipByUserIdService(user.id, periode.id);
    if (payslip && payslip.length > 0) {
      data.payslips.push(...payslip);
      totalTakeHomePay += payslip[0].takeHomePay || 0;
    }
  }

  data.summary.totalTakeHomePay = totalTakeHomePay;

  return data;
};
