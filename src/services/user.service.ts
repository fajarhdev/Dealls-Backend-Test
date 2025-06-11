import { UserCreationAttributes } from '../models/user.model';
import { User } from '../models/user.model';

export const getUsersService = async () => {
  const users = await User.findAll();
  return users;
};

export const getUserByIdService = async (id: number) => {
  const user = await User.findByPk(id);
  if (!user) {
    throw new Error(`User with id ${id} not found`);
  }
  return user;
};

export const createUserService = async (data: UserCreationAttributes) => {
  const user = await User.create(data);
  return user;
};

export const updateUserService = async (
  id: number,
  data: UserCreationAttributes,
) => {
  const user = await getUserByIdService(id);
  return user.update(data);
};

export const deleteUserService = async (id: number) => {
  const user = await getUserByIdService(id);
  await user.destroy();
  return user;
};

// For auth purposes

export const getUserByUsernameService = async (username: string) => {
  const user = await User.findOne({ where: { username } });
  if (!user) {
    throw new Error(`User with username ${username} not found`);
  }
  return user;
};
