import { sequelize } from '../src/config/database.config';
import { syncModels } from '../src/models';
import { JwtPayload } from '../src/models/jwtPayload.model';
import * as TimesheetService from '../src/services/timesheet.service';

// Mock the attendance schedule service
jest.mock('../src/services/attendanceSchedule.service', () => ({
  getActiveAttendanceScheduleService: jest.fn().mockResolvedValue({
    id: 1,
    name: 'Active Schedule',
    periodeStart: new Date(),
    periodeEnd: new Date(new Date().setDate(new Date().getDate() + 7)),
    isActive: true,
  }),
}));

jest.mock('../src/models/timesheet.model', () => ({
  Timesheet: {
    findAll: jest.fn().mockResolvedValue([
      {
        id: 1,
        userId: 1,
        periode: 1,
        type: 'REGULER' as const,
        checkIn: new Date(),
        checkOut: new Date(),
        hours: 8,
        isProcessed: false,
      },
      {
        id: 2,
        userId: 2,
        periode: 1,
        type: 'OVERTIME' as const,
        checkIn: new Date(),
        checkOut: new Date(),
        hours: 4,
        isProcessed: false,
      },
    ]),
    findByPk: jest.fn().mockImplementation((id) => {
      if (id === 1) {
        return Promise.resolve({
          id: 1,
          userId: 1,
          periode: 1,
          type: 'REGULER' as const,
          checkIn: new Date(),
          checkOut: new Date(),
          hours: 8,
          isProcessed: false,
        });
      }
      return Promise.reject(new Error(`Timesheet with id ${id} not found`));
    }),
    create: jest.fn().mockImplementation((data) => Promise.resolve(data)),
    findOne: jest.fn().mockImplementation(({ where }) => {
      // Simulate no timesheet exists for today, so validation passes
      return Promise.resolve(null);
    }),
  },
}));

describe('timesheet service', () => {
  beforeAll(async () => {
    // Setup code before running tests, such as initializing the database connection
    await sequelize.authenticate();
    await syncModels();
    console.log('Database connection established and models synchronized.');
  });

  afterAll(() => {
    // Cleanup code after all tests have run, such as closing the database connection
    sequelize.close();
    console.log('Database connection closed.');
  });

  describe('get all timesheets', () => {
    it('should create a new timesheet entry', async () => {
      const timesheets = await TimesheetService.getTimesheetsService();
      expect(timesheets).toBeDefined();
      expect(Array.isArray(timesheets)).toBe(true);
      expect(timesheets.length).toBeGreaterThan(0);
    });
  });

  describe('get timesheet by ID', () => {
    it('should return a timesheet by ID', async () => {
      const timesheet = await TimesheetService.getTimesheetByIdService(1);
      expect(timesheet).toBeDefined();
      expect(timesheet.id).toBe(1);
    });

    it('should throw an error for non-existent ID', async () => {
      await expect(
        TimesheetService.getTimesheetByIdService(999),
      ).rejects.toThrow('Timesheet with id 999 not found');
    });
  });

  describe('create timesheet', () => {
    it('should create a new timesheet entry', async () => {
      const newTimesheet = {
        userId: 1,
        periode: 1,
        type: 'REGULER' as const,
        checkIn: new Date(),
        checkOut: new Date(),
        hours: 8,
        isProcessed: false,
      };

      // Mock JWT payload to simulate user authentication
      const jwtPayload = { 
        userId: 1,
        username: 'testuser',
        role: 1,
       } as JwtPayload; // Simulate a JWT payload with user ID
      const createdTimesheet =
        await TimesheetService.createTimesheetService(newTimesheet, jwtPayload);
      expect(createdTimesheet).toBeDefined();
      expect(createdTimesheet.userId).toBe(jwtPayload.userId);
      expect(createdTimesheet.periode).toBe(newTimesheet.periode);
      expect(createdTimesheet.hours).toBe(newTimesheet.hours);
    });
  });
});
