import { JwtPayload } from '../models/jwtPayload.model';
import { RoleCreationAttributes } from '../models/role.model';
import { Role } from '../models/role.model';

export const getRolesService = async () => {
  const roles = await Role.findAll();
  return roles;
};

export const getRoleByIdService = async (id: number) => {
  const role = await Role.findByPk(id);
  if (!role) {
    throw new Error(`Role with id ${id} not found`);
  }
  return role;
};

export const createRoleService = async (data: RoleCreationAttributes, jwtPayload?: JwtPayload) => {
  data.created_by = jwtPayload?.userId;
  data.updated_by = jwtPayload?.userId;
  const role = await Role.create(data);
  return role;
};

export const updateRoleService = async (
  id: number,
  data: RoleCreationAttributes,
  jwtPayload?: JwtPayload,
) => {
  const role = await getRoleByIdService(id);
  data.updated_by = jwtPayload?.userId;
  return role.update(data);
};

export const deleteRoleService = async (id: number) => {
  const role = await getRoleByIdService(id);
  await role.destroy();
  return role;
};
