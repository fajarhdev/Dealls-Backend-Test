import { NextFunction, Request, Response } from 'express';
import { loginService, signupService } from '../services/auth.service';

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { username, password } = req.body;

  try {
    const result = await loginService(username, password);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const body = req.body;
  try {
    const result = await signupService(body);
    res.json(result);
  } catch (error) {
    next(error);
  }
};
