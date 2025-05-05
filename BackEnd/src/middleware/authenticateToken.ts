import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JwtUserPayload } from '../@types/UserProps';
import { config } from '../config/config';

export interface CustomRequest extends Request {
  user?: JwtUserPayload;
}

export const authenticateToken = (
  request: CustomRequest,
  response: Response,
  next: NextFunction
) => {
  const token = request.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    response.status(401).json({ error: 'Token não fornecido.' });
    return;
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    request.user = decoded as JwtUserPayload;
    next();
  } catch (error) {
    if (error instanceof Error) {
      response
        .status(403)
        .json({ message: error.message || 'Token inválido ou expirado.' });
      return;
    }
  }
};
