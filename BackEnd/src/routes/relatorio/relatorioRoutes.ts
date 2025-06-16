import { Request, Response, Router } from 'express';
import { RelatorioApplication } from '../../application/Relatorio/RelatorioApplication';
import { RelatorioController } from '../../controllers/RelatorioController';
import { prisma } from '../../infrastructure/bancoContext/prisma';
import { AvaliacaoRepository } from '../../infrastructure/repositories/Avaliacao/AvaliacaoRepository';
import { RelatorioRepository } from '../../infrastructure/repositories/Relatorio/RelatorioRepository';
import { authenticateToken } from '../../middleware/authenticateToken';

const relatorioRoutes = Router();

const repository = RelatorioRepository.build(prisma);
const repositoryReview = AvaliacaoRepository.build(prisma);
const application = RelatorioApplication.build(repository, repositoryReview);
const controller = new RelatorioController(application);

relatorioRoutes.get(
  '/:id',
  authenticateToken,
  (request: Request, response: Response) => {
    controller.find(request, response);
  }
);

relatorioRoutes.get(
  '/ultimos7diasRelatorio/:userId',
  authenticateToken,
  (request: Request, response: Response) => {
    controller.findLast7DaysRelatorio(request, response);
  }
);

relatorioRoutes.get(
  '/ultimos30diasRelatorio/:userId',
  authenticateToken,
  (request: Request, response: Response) => {
    controller.findLast30DaysRelatorio(request, response);
  }
);

relatorioRoutes.get(
  '/todosRelatorio/:userId',
  authenticateToken,
  (request: Request, response: Response) => {
    controller.findByUserId(request, response);
  }
);

relatorioRoutes.delete(
  '/:id',
  authenticateToken,
  (request: Request, response: Response) => {
    controller.delete(request, response);
  }
);

export { relatorioRoutes };
