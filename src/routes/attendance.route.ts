import { Router } from 'express';
import {
  getActiveAttendanceSchedule,
  getAllAttendanceSchedule,
  createAttendanceSchedule,
  updateAttendanceSchedule,
  deleteAttendanceSchedule,
} from '../controllers/attendanceSchedule.controller';
import { auditMiddleware } from '../middlewares/audit.middleare';
import { jwtVerificationMiddleware } from '../middlewares/jwtVerification.middleware';

const attendanceScheduleRoute = Router();

attendanceScheduleRoute.get('/active', jwtVerificationMiddleware, auditMiddleware, getActiveAttendanceSchedule);
attendanceScheduleRoute.get('/all', jwtVerificationMiddleware, auditMiddleware, getAllAttendanceSchedule);
attendanceScheduleRoute.post('/create', jwtVerificationMiddleware, auditMiddleware, createAttendanceSchedule);
attendanceScheduleRoute.put('/update/:id', jwtVerificationMiddleware, auditMiddleware, updateAttendanceSchedule);
attendanceScheduleRoute.delete('/delete/:id', jwtVerificationMiddleware, auditMiddleware, deleteAttendanceSchedule);

export default attendanceScheduleRoute;
