import { Router } from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/user.controller';
import { jwtVerificationMiddleware } from '../middlewares/jwtVerification.middleware';
import { auditMiddleware } from '../middlewares/audit.middleare';

const userRoutes = Router();

userRoutes.get('/all', jwtVerificationMiddleware, auditMiddleware, getUsers);
userRoutes.get('/:id', jwtVerificationMiddleware, auditMiddleware, getUserById);
userRoutes.post('/create', jwtVerificationMiddleware, auditMiddleware, createUser);
userRoutes.put('/update/:id', jwtVerificationMiddleware, auditMiddleware, updateUser);
userRoutes.delete('/delete/:id', jwtVerificationMiddleware, auditMiddleware, deleteUser);

export default userRoutes;
