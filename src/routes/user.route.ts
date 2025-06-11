import { Router } from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/user.controller';

const userRoutes = Router();

userRoutes.get('/all', getUsers);
userRoutes.get('/:id', getUserById);
userRoutes.post('/create', createUser);
userRoutes.put('/update/:id', updateUser);
userRoutes.delete('/delete/:id', deleteUser);

export default userRoutes;
