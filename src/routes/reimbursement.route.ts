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
import { auditMiddleware } from '../middlewares/audit.middleare';

const reimbursementRoutes = Router();

reimbursementRoutes.get('/all', jwtVerificationMiddleware, auditMiddleware, getAllReimbursement);
reimbursementRoutes.get(
  '/:id',
  jwtVerificationMiddleware,
  auditMiddleware,
  getReimbursementById,
);
reimbursementRoutes.get(
  '/user/:userId/period/:periodeId',
  jwtVerificationMiddleware,
  auditMiddleware,
  getReimbursementByUserIdAndPeriodeId,
);
reimbursementRoutes.post(
  '/create',
  jwtVerificationMiddleware,
  auditMiddleware,
  createReimbursement,
);
reimbursementRoutes.put(
  '/update/:id',
  jwtVerificationMiddleware,
  auditMiddleware,
  updateReimbursement,
);
reimbursementRoutes.delete(
  '/delete/:id',
  jwtVerificationMiddleware,
  auditMiddleware,
  deleteReimbursement,
);

export default reimbursementRoutes;
