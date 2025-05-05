import { Request, Response, Router } from 'express';
import { AuthApplication } from '../../application/User/AuthApplication';
import { AuthController } from '../../controllers/AuthController';
import { prisma } from '../../infrastructure/bancoContext/prisma';
import { UserRepository } from '../../infrastructure/repositories/User/UserRepository';
import { validateRequest } from '../../middleware/validateRequest';
import { authLoginSchema, authRegisterSchema } from '../../schemas/authSchemas';

const authRoutes = Router();

const repository = UserRepository.build(prisma);
const application = AuthApplication.build(repository);
const controller = AuthController.build(application);

authRoutes.post(
  '/register',
  validateRequest(authRegisterSchema),
  (request: Request, response: Response) => {
    controller.register(request, response);
  }
);

authRoutes.post(
  '/login',
  validateRequest(authLoginSchema),
  (request: Request, response: Response) => {
    controller.login(request, response);
  }
);

export { authRoutes };
