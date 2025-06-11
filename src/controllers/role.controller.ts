import { NextFunction, Request, Response } from 'express';
import {
  createRoleService,
  deleteRoleService,
  getRoleByIdService,
  getRolesService,
  updateRoleService,
} from '../services/role.service';

export const getAllRoles = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const roles = await getRolesService();
    res.status(200).json(roles);
  } catch (error) {
    next(error);
  }
};

export const getRole = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const roleId = req.params.id;
    const role = await getRoleByIdService(Number(roleId));
    res.status(200).json(role);
  } catch (error) {
    next(error);
  }
};

export const createRole = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const newRole = req.body;
    const role = await createRoleService(newRole);
    res.status(201).json(role);
  } catch (error) {
    next(error);
  }
};

export const updateRole = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const roleId = req.params.id;
    const updatedRole = req.body;
    const role = await updateRoleService(Number(roleId), updatedRole);
    res.status(200).json(role);
  } catch (error) {
    console.error('Error updating role:', error);
    next(error);
  }
};

export const deleteRole = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const roleId = req.params.id;
    await deleteRoleService(Number(roleId));
    res.status(204).send(); // No content to return
  } catch (error) {
    console.error('Error deleting role:', error);
    next(error);
  }
};
