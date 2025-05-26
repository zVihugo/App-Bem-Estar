import { Request, Response, Router } from 'express';
import { RelatorioApplication } from '../../application/Relatorio/RelatorioApplication';
import { RelatorioController } from '../../controllers/RelatorioController';
import { prisma } from '../../infrastructure/bancoContext/prisma';
import { RelatorioRepository } from '../../infrastructure/repositories/Relatorio/RelatorioRepository';
import { authenticateToken } from '../../middleware/authenticateToken';
import { validateRequest } from '../../middleware/validateRequest';
import { relatorioSchemas } from '../../schemas/relatorioSchemas';

const relatorioRoutes = Router();

const repository = RelatorioRepository.build(prisma);
const application = RelatorioApplication.build(repository);
const controller = new RelatorioController(application);

relatorioRoutes.get(
  '/:id',
  authenticateToken,
  validateRequest(relatorioSchemas),
  (request: Request, response: Response) => {
    controller.find(request, response);
  }
);

relatorioRoutes.get(
  '/ultimos7diasRelatorio/:userId',
  authenticateToken,
  validateRequest(relatorioSchemas),
  (request: Request, response: Response) => {
    console.log("oi")
    controller.findLast7DaysRelatorio(request, response);
  }
);

relatorioRoutes.get(
  '/ultimos30diasRelatorio/:userId',
  authenticateToken,
  validateRequest(relatorioSchemas),
  (request: Request, response: Response) => {
    controller.findLast30DaysRelatorio(request, response);
  }
);

relatorioRoutes.get(
  '/todosRelatorio/:userId',
  authenticateToken,
  validateRequest(relatorioSchemas),
  (request: Request, response: Response) => {
    controller.findByUserId(request, response);
  }
);

relatorioRoutes.delete(
  '/:id',
  authenticateToken,
  validateRequest(relatorioSchemas),
  (request: Request, response: Response) => {
    controller.delete(request, response);
  }
);

export { relatorioRoutes };
