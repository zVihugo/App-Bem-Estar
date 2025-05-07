import { Request, Response, Router } from 'express';
import { prisma } from '../../infrastructure/bancoContext/prisma';
import { authenticateToken } from '../../middleware/authenticateToken';
import { validateRequest } from '../../middleware/validateRequest';
import { relatorioSchemas } from '../../schemas/relatorioSchemas';
import { RelatorioRepository } from '../../infrastructure/repositories/Relatorio/RelatorioRepository';
import { RelatorioApplication } from '../../application/Relatorio/RelatorioApplication';
import { RelatorioController } from '../../controllers/RelatorioController';

const userRoutes = Router();

const repository = RelatorioRepository.build(prisma);
const application = RelatorioApplication.build(repository);
const controller = new RelatorioController(application);

userRoutes.get(
  '/:id',
  authenticateToken,
  validateRequest(relatorioSchemas),
  (request: Request, response: Response) => {
    controller.find(request, response);
  }
);

userRoutes.get(
    'todosRelatorio/:id',
    authenticateToken,
    validateRequest(relatorioSchemas),
    (request: Request, response: Response) => {
      controller.findByUserId(request, response);
    }
  );

userRoutes.delete(
  '/:id',
  authenticateToken,
  validateRequest(relatorioSchemas),
  (request: Request, response: Response) => {
    controller.delete(request, response);
  }
);

export { userRoutes };
