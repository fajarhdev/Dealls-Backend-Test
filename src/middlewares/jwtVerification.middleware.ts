import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JwtPayload } from '../models/jwtPayload.model';

// Extend Express Request interface to include jwtPayload
declare global {
  namespace Express {
    interface Request {
      jwtPayload?: JwtPayload;
    }
  }
}

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export const jwtVerificationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res
      .status(401)
      .json({ message: 'Authorization header missing or malformed' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
  const decoded = jwt.verify(token, JWT_SECRET);

  req.jwtPayload = decoded as JwtPayload; 
  
  next();
} catch (err) {
  if (err instanceof Error) {
    console.error('JWT verification error:', err.message);

    // Optionally, you can further check if err has a 'name' property
    if ((err as any).name === 'TokenExpiredError') {
      res.status(401).json({ message: 'Token expired' });
      return ;
    }
    if ((err as any).name === 'JsonWebTokenError') {
      res.status(401).json({ message: 'Invalid token' });
      return ;
    }
  } else {
    console.error('JWT verification error:', err);
  }
  res.status(401).json({ message: 'Authentication failed' });
  return ;
}
};
