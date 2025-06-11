import { Router } from 'express';
import {
  getPayslipByUserId,
  getAllPayslips,
  processPayroll,
} from '../controllers/payroll.controller';

const payrollRoute = Router();

payrollRoute.get('/payslip/user/:id/:periodeId', getPayslipByUserId);
payrollRoute.get('/payslip/all/:periodeId', getAllPayslips);
payrollRoute.post('/payslip/process/:periodeId', processPayroll);

export default payrollRoute;
