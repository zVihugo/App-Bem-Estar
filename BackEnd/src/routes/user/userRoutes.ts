import { Request, Response, Router } from 'express';
import { UserApplication } from '../../application/User/UserApplication';
import { UserController } from '../../controllers/UserController';
import { prisma } from '../../infrastructure/bancoContext/prisma';
import { UserRepository } from '../../infrastructure/repositories/User/UserRepository';
import { authenticateToken } from '../../middleware/authenticateToken';
import { validateRequest } from '../../middleware/validateRequest';
import {
  userFindSchema,
  userUpdatePasswordSchema,
  userUpdateProfileSchema,
} from '../../schemas/userSchemas';

const userRoutes = Router();

const repository = UserRepository.build(prisma);
const application = UserApplication.build(repository);
const controller = new UserController(application);

userRoutes.get(
  '/:id',
  authenticateToken,
  validateRequest(userFindSchema),
  (request: Request, response: Response) => {
    controller.find(request, response);
  }
);

userRoutes.put(
  '/:id/password',
  authenticateToken,
  validateRequest(userUpdatePasswordSchema),
  (request: Request, response: Response) => {
    controller.updatePassword(request, response);
  }
);

userRoutes.put(
  '/:id/profile',
  authenticateToken,
  validateRequest(userUpdateProfileSchema),
  (request: Request, response: Response) => {
    controller.updateProfile(request, response);
  }
);

userRoutes.delete(
  '/:id',
  authenticateToken,
  validateRequest(userFindSchema),
  (request: Request, response: Response) => {
    controller.delete(request, response);
  }
);

export { userRoutes };
