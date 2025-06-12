import { Request, Response, Router } from 'express';
import { AuthApplication } from '../../application/Usuario/AuthApplication';
import { AuthController } from '../../controllers/AuthController';
import { prisma } from '../../infrastructure/bancoContext/prisma';
import { UsuarioRepository } from '../../infrastructure/repositories/Usuario/UsuarioRepository';
import { validateRequest } from '../../middleware/validateRequest';
import { authLoginSchema, authRegisterSchema } from '../../schemas/authSchemas';

const authRoutes = Router();

const repository = UsuarioRepository.build(prisma);
const application = AuthApplication.build(repository);
const controller = AuthController.build(application);

authRoutes.post(
  '/registro',
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
