import { Request, Response, Router } from 'express';
import { UserApplication } from '../../application/User/UserApplication';
import { UserController } from '../../controllers/UserController';
import { prisma } from '../../infrastructure/bancoContext/prisma';
import { UserRepository } from '../../infrastructure/repositories/User/UserRepository';
import { authenticateToken } from '../../middleware/authenticateToken';

const userRoutes = Router();

const repository = UserRepository.build(prisma);
const application = UserApplication.build(repository);
const controller = new UserController(application);

userRoutes.get(
  '/:id',
  authenticateToken,
  (request: Request, response: Response) => {
    controller.find(request, response);
  }
);

userRoutes.put(
  '/:id/password',
  authenticateToken,
  (request: Request, response: Response) => {
    controller.updatePassword(request, response);
  }
);

userRoutes.put(
  '/:id/profile',
  authenticateToken,
  (request: Request, response: Response) => {
    controller.updateProfile(request, response);
  }
);

userRoutes.delete(
  '/:id',
  authenticateToken,
  (request: Request, response: Response) => {
    controller.delete(request, response);
  }
);

export { userRoutes };
