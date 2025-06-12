import { Router } from 'express';
import {
  getTimesheets,
  getTimesheetById,
  getTimesheetsByUserId,
  getTimesheetsByPeriode,
  createTimesheet,
  updateTimesheet,
  deleteTimesheet,
  getTimesheetsByType,
} from '../controllers/timesheet.controller';
import { jwtVerificationMiddleware } from '../middlewares/jwtVerification.middleware';
import { auditMiddleware } from '../middlewares/audit.middleare';

const timesheetRoute = Router();

timesheetRoute.get('/all', jwtVerificationMiddleware, auditMiddleware, getTimesheets);
timesheetRoute.get('/:id', jwtVerificationMiddleware, auditMiddleware, getTimesheetById);
timesheetRoute.get('/user/:id', jwtVerificationMiddleware, auditMiddleware, getTimesheetsByUserId);
timesheetRoute.get('/periode/:id', jwtVerificationMiddleware, auditMiddleware, getTimesheetsByPeriode);
timesheetRoute.post('/create', jwtVerificationMiddleware, auditMiddleware, createTimesheet);
timesheetRoute.put('/update/:id', jwtVerificationMiddleware, auditMiddleware, updateTimesheet);
timesheetRoute.delete('/delete/:id', jwtVerificationMiddleware, auditMiddleware, deleteTimesheet);
timesheetRoute.get('/type/:type', jwtVerificationMiddleware, auditMiddleware, getTimesheetsByType);

export default timesheetRoute;
