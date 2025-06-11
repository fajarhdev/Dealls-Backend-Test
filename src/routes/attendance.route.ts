import { Router } from 'express';
import {
  getActiveAttendanceSchedule,
  getAllAttendanceSchedule,
  createAttendanceSchedule,
  updateAttendanceSchedule,
  deleteAttendanceSchedule,
} from '../controllers/attendanceSchedule.controller';

const attendanceScheduleRoute = Router();

attendanceScheduleRoute.get('/active', getActiveAttendanceSchedule);
attendanceScheduleRoute.get('/all', getAllAttendanceSchedule);
attendanceScheduleRoute.post('/create', createAttendanceSchedule);
attendanceScheduleRoute.put('/update/:id', updateAttendanceSchedule);
attendanceScheduleRoute.delete('/delete/:id', deleteAttendanceSchedule);

export default attendanceScheduleRoute;
