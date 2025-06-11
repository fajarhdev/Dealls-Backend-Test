import { Router } from 'express';
import {
  createRole,
  deleteRole,
  getAllRoles,
  getRole,
  updateRole,
} from '../controllers/role.controller';

const roleRoutes = Router();

roleRoutes.get('/all', getAllRoles);
roleRoutes.get('/:id', getRole);
roleRoutes.post('/create', createRole);
roleRoutes.put('/update/:id', updateRole);
roleRoutes.delete('/delete/:id', deleteRole);

export default roleRoutes;
