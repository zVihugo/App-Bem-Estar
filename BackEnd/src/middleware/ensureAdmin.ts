import { NextFunction, Response } from 'express';
import { CustomRequest } from './authenticateToken';

export function ensureAdmin(
  request: CustomRequest,
  response: Response,
  next: NextFunction
) {
  if (request.user?.role !== 'ADMIN') {
    response
      .status(403)
      .json({ message: 'Apenas administradores têm acesso.' });
    return;
  }

  next();
}
