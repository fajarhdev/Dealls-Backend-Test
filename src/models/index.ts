import { ApiLog } from './apiLog.model';
import { AttendanceSchedule } from './attendanceSchedule.model';
import { Reimbursement } from './reimbursement.model';
import { Role } from './role.model';
import { Timesheet } from './timesheet.model';
import { User } from './user.model';

export async function syncModels() {
  try {
    // Define associations
    User.hasMany(Timesheet, { foreignKey: 'userId' });
    Timesheet.belongsTo(User, { foreignKey: 'userId' });
    Role.hasMany(User, { foreignKey: 'roleId' });
    User.belongsTo(Role, { foreignKey: 'roleId' });
    AttendanceSchedule.hasMany(Timesheet, {
      foreignKey: 'attendanceScheduleId',
    });
    Timesheet.belongsTo(AttendanceSchedule, {
      foreignKey: 'attendanceScheduleId',
    });
    Reimbursement.belongsTo(User, { foreignKey: 'userId', as: 'user' });
    User.hasMany(Reimbursement, { foreignKey: 'userId', as: 'reimbursements' });

    // Sync all models
    await Role.sync();
    await User.sync();
    await AttendanceSchedule.sync();
    await Reimbursement.sync();
    await Timesheet.sync();
    await ApiLog.sync();

    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Error synchronizing models:', error);
  }
}

export { User, Role, AttendanceSchedule, Reimbursement, Timesheet, ApiLog };
