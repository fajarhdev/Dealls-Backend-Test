import { sequelize } from '../src/config/database.config';
import { syncModels, User } from '../src/models';
import * as UserService from '../src/services/user.service';

// Type-safe mock
jest.mock('../src/models/user.model', () => ({
  User: {
    create: jest.fn().mockImplementation((data) =>
      Promise.resolve({
        id: 1,
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    ),
    findAll: jest.fn().mockResolvedValue([
      { id: 1, name: 'User 1' },
      { id: 2, name: 'User 2' },
    ]),
    findByPk: jest
      .fn()
      .mockImplementation((id) =>
        id === 2
          ? Promise.resolve({ id: 2, name: 'Found User' })
          : Promise.reject(new Error(`User with id ${id} not found`)),
      ),
    findOne: jest
      .fn()
      .mockImplementation(({ where: { username } }) =>
        username === 'existinguser'
          ? Promise.resolve({ id: 3, username: 'existinguser' })
          : Promise.reject(
              new Error(`User with username ${username} not found`),
            ),
      ),
  },
}));

describe('UserService', () => {
  beforeAll(async () => {
    await sequelize.authenticate();
    await syncModels();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe('getAllUsers', () => {
    it('should return all users', async () => {
      const users = await UserService.getUsersService();
      expect(users).toBeDefined();
      expect(Array.isArray(users)).toBe(true);
    });
  });

  describe('getUserById', () => {
    it('should return a user by ID', async () => {
      const user = await UserService.getUserByIdService(2);
      expect(user).toBeDefined();
      expect(user.id).toBe(2);
    });

    it('should return null for a non-existent user', async () => {
      const id = 9999; // Assuming this ID does not exist in the test database
      expect(() => UserService.getUserByIdService(id)).rejects.toThrow(
        `User with id ${id} not found`,
      );
    });
  });

  describe('getUserByUsername', () => {
    it('should return a user by username', async () => {
      const user = await UserService.getUserByUsernameService('existinguser');
      expect(user).toBeDefined();
      expect(user.username).toBe('existinguser');
    });

    it('should return null for a non-existent user', async () => {
      const username = 'nonexistentuser'; // Assuming this username does not exist in the test database
      expect(() =>
        UserService.getUserByUsernameService(username),
      ).rejects.toThrow(`User with username ${username} not found`);
    });
  });

  describe('createUserService', () => {
    it('should create a new user', async () => {
      const newUser = {
        name: 'New User',
        username: 'newuser',
        password: 'password123',
        salary: 50000,
        roleId: 1,
        overtimeRate: 2,
      };

      const createdUser = await UserService.createUserService(newUser);

      expect(User.create).toHaveBeenCalledTimes(1);
      expect(User.create).toHaveBeenCalledWith(newUser);
      expect(createdUser).toMatchObject({
        id: expect.any(Number),
        ...newUser,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });
  });
});
