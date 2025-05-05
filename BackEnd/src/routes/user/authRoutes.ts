import { Request, Response, Router } from 'express';
import { AuthApplication } from '../../application/User/AuthApplication';
import { AuthController } from '../../controllers/AuthController';
import { prisma } from '../../infrastructure/bancoContext/prisma';
import { UserRepository } from '../../infrastructure/repositories/User/UserRepository';

const authRoutes = Router();

const repository = UserRepository.build(prisma);
const application = AuthApplication.build(repository);
const controller = AuthController.build(application);

authRoutes.post('/register', (request: Request, response: Response) => {
  controller.register(request, response);
});

authRoutes.post('/login', (request: Request, response: Response) => {
  controller.login(request, response);
});

export { authRoutes };
