import { JwtPayload } from '../models/jwtPayload.model';
import {
  Reimbursement,
  ReimbursementCreationAttributes,
} from '../models/reimbursement.model';
import { User } from '../models/user.model';
import { getActiveAttendanceScheduleService } from './attendanceSchedule.service';

export const getReimbursementsService = async () => {
  const reimbursements = await Reimbursement.findAll({
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'username'],
      },
    ],
  });
  return reimbursements;
};

export const getReimbursementByIdService = async (id: number) => {
  const reimbursement = await Reimbursement.findByPk(id, {
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'username'],
      },
    ],
  });
  if (!reimbursement) {
    throw new Error(`Reimbursement with id ${id} not found`);
  }
  return reimbursement;
};

export const getReimbursementByUserIdAndPeriodeIdService = async (
  userId: number,
  periodeId: number,
) => {
  const reimbursements = await Reimbursement.findAll({
    where: {
      userId,
      periodeId,
    },
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'username'],
      },
    ],
  });
  return reimbursements;
};

export const createReimbursementService = async (
  data: ReimbursementCreationAttributes,
  jwtPayload?: JwtPayload,
) => {
  // Check active periode
  const activePeriode = await getActiveAttendanceScheduleService();
  if (!activePeriode) {
    throw new Error('No active attendance schedule found');
  }

  data.periodeId = activePeriode.id;
  data.userId = Number(jwtPayload?.userId);
  console.log('Creating reimbursement with data:', data);
  const reimbursement = await Reimbursement.create(data);
  return reimbursement;
};

export const updateReimbursementService = async (
  id: number,
  data: ReimbursementCreationAttributes,
) => {
  const reimbursement = await getReimbursementByIdService(id);

  // Check if the periode is active
  const activePeriode = await getActiveAttendanceScheduleService();
  if (activePeriode.id !== reimbursement.periodeId) {
    throw new Error('Cannot update reimbursement for a non-active periode');
  }
  // Update the reimbursement
  return reimbursement.update(data);
};

export const deleteReimbursementService = async (id: number) => {
  const reimbursement = await getReimbursementByIdService(id);
  // Check if the periode is active
  const activePeriode = await getActiveAttendanceScheduleService();
  if (activePeriode.id !== reimbursement.periodeId) {
    throw new Error('Cannot update reimbursement for a non-active periode');
  }
  await reimbursement.destroy();
  return reimbursement;
};
