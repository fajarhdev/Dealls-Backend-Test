import { User } from '../models';
import { UserCreationAttributes } from '../models/user.model';
import { generateToken } from '../utils/jwtAuth.utils';
import { createUserService, getUserByUsernameService } from './user.service';

export const loginService = async (username: string, password: string) => {
  try {
    const findUser = await getUserByUsernameService(username);
    if (findUser.password !== password) {
      throw new Error('Invalid password');
    }

    // Object payload to be included in the JWT
    const payload = {
      userId: findUser.id,
      username: findUser.username,
      role: findUser.roleId,
    };

    // Generate JWT
    const token = generateToken(payload);

    return { token };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Login failed: ${error.message}`);
    } else {
      throw new Error('Login failed: Unknown error');
    }
  }
};

export const signupService = async (data: UserCreationAttributes) => {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({
      where: { username: data.username },
    });
    if (existingUser) {
      throw new Error('Username already exists');
    }

    // Create new user
    const newUser = await createUserService(data);

    return newUser;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Signup failed: ${error.message}`);
    } else {
      throw new Error('Signup failed: Unknown error');
    }
  }
};
