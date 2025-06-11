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

export const createRoleService = async (data: RoleCreationAttributes) => {
  const role = await Role.create(data);
  return role;
};

export const updateRoleService = async (
  id: number,
  data: RoleCreationAttributes,
) => {
  const role = await getRoleByIdService(id);
  return role.update(data);
};

export const deleteRoleService = async (id: number) => {
  const role = await getRoleByIdService(id);
  await role.destroy();
  return role;
};
