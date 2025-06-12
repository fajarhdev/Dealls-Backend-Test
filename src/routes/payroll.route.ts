import { Router } from 'express';
import {
  getPayslipByUserId,
  getAllPayslips,
  processPayroll,
} from '../controllers/payroll.controller';
import { auditMiddleware } from '../middlewares/audit.middleare';
import { jwtVerificationMiddleware } from '../middlewares/jwtVerification.middleware';

const payrollRoute = Router();

payrollRoute.get('/user/:id/:periodeId', jwtVerificationMiddleware, auditMiddleware, getPayslipByUserId);
payrollRoute.get('/all/:periodeId', jwtVerificationMiddleware, auditMiddleware, getAllPayslips);
payrollRoute.post('/process/:periodeId', jwtVerificationMiddleware, auditMiddleware, processPayroll);

export default payrollRoute;
