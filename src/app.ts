import express from 'express';
import { errorHandler } from './middlewares/errorHandler.middleware';
import { sequelize } from './config/database.config';
import userRoutes from './routes/user.route';
import { syncModels } from './models';
import roleRoutes from './routes/role.route';
import reimbursementRoutes from './routes/reimbursement.route';
import attendanceScheduleRoute from './routes/attendance.route';
import payrollRoute from './routes/payroll.route';
import timesheetRoute from './routes/timesheet.route';
import rateLimit from 'express-rate-limit';
import authRoutes from './routes/auth.route';

const app = express();

// Initialize database connection and sync models
async function initializeDatabase() {
  try {
    // 1. Test connection
    await sequelize.authenticate();
    console.log('Database connection established successfully.');

    // 2. Sync models (add this part)
    await syncModels();
  } catch (error) {
    console.error('Database initialization failed:', error);
    throw error; // This will be caught by the startServer function
  }
}

// Express middleware setup
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/role', roleRoutes);
app.use('/api/reimbursement', reimbursementRoutes);
app.use('/api/attendance', attendanceScheduleRoute);
app.use('/api/payroll', payrollRoute);
app.use('/api/timesheet', timesheetRoute);

// Global error handler (should be after routes)
app.use(errorHandler);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.',
});

app.use(limiter);

// Modified export to support async initialization
export async function createApp() {
  await initializeDatabase();
  return app;
}

// Default export remains for backward compatibility
export default app;
