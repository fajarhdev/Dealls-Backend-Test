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

const timesheetRoute = Router();

timesheetRoute.get('/all', getTimesheets);
timesheetRoute.get('/:id', getTimesheetById);
timesheetRoute.get('/user/:id', getTimesheetsByUserId);
timesheetRoute.get('/periode/:id', getTimesheetsByPeriode);
timesheetRoute.post('/create', createTimesheet);
timesheetRoute.put('/update/:id', updateTimesheet);
timesheetRoute.delete('/delete/:id', deleteTimesheet);
timesheetRoute.get('/type/:type', getTimesheetsByType);

export default timesheetRoute;
