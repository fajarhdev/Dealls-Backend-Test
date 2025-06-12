import { Router } from 'express';
import {
  createRole,
  deleteRole,
  getAllRoles,
  getRole,
  updateRole,
} from '../controllers/role.controller';
import { auditMiddleware } from '../middlewares/audit.middleare';
import { jwtVerificationMiddleware } from '../middlewares/jwtVerification.middleware';

const roleRoutes = Router();

roleRoutes.get('/all', jwtVerificationMiddleware, auditMiddleware, getAllRoles);
roleRoutes.get('/:id', jwtVerificationMiddleware, auditMiddleware, getRole);
roleRoutes.post('/create', jwtVerificationMiddleware, auditMiddleware, createRole);
roleRoutes.put('/update/:id', jwtVerificationMiddleware, auditMiddleware, updateRole);
roleRoutes.delete('/delete/:id', jwtVerificationMiddleware, auditMiddleware, deleteRole);

export default roleRoutes;
