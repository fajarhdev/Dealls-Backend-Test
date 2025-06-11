import { Router } from 'express';
import {
  createReimbursement,
  deleteReimbursement,
  getAllReimbursement,
  getReimbursementById,
  getReimbursementByUserIdAndPeriodeId,
  updateReimbursement,
} from '../controllers/reimbursement.controller';
import { jwtVerificationMiddleware } from '../middlewares/jwtVerification.middleware';

const reimbursementRoutes = Router();

reimbursementRoutes.get('/all', jwtVerificationMiddleware, getAllReimbursement);
reimbursementRoutes.get(
  '/:id',
  jwtVerificationMiddleware,
  getReimbursementById,
);
reimbursementRoutes.get(
  '/user/:userId/period/:periodeId',
  jwtVerificationMiddleware,
  getReimbursementByUserIdAndPeriodeId,
);
reimbursementRoutes.post(
  '/create',
  jwtVerificationMiddleware,
  createReimbursement,
);
reimbursementRoutes.put(
  '/update/:id',
  jwtVerificationMiddleware,
  updateReimbursement,
);
reimbursementRoutes.delete(
  '/delete/:id',
  jwtVerificationMiddleware,
  deleteReimbursement,
);

export default reimbursementRoutes;
