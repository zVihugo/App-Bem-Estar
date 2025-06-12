import { Request, Response, Router } from 'express';
import { AvaliacaoApplication } from '../../application/Avaliacao/AvaliacaoApplication';
import { AvaliacaoController } from '../../controllers/AvaliacaoController';
import { prisma } from '../../infrastructure/bancoContext/prisma';
import { AvaliacaoRepository } from '../../infrastructure/repositories/Avaliacao/AvaliacaoRepository';
import { authenticateToken } from '../../middleware/authenticateToken';
import { validateRequest } from '../../middleware/validateRequest';
import {
  reviewCreateSchema,
  reviewFindSchema,
  reviewUpdateSchema,
} from '../../schemas/reviewSchemas';

const avaliacaoRoutes = Router();

const repository = AvaliacaoRepository.build(prisma);
const application = AvaliacaoApplication.build(repository);
const controller = AvaliacaoController.build(application);

avaliacaoRoutes.post(
  '/registrar',
  authenticateToken,
  validateRequest(reviewCreateSchema),
  (request: Request, response: Response) => {
    controller.save(request, response);
  }
);

avaliacaoRoutes.get(
  '/:id',
  authenticateToken,
  validateRequest(reviewFindSchema),
  (request: Request, response: Response) => {
    controller.findById(request, response);
  }
);

avaliacaoRoutes.get(
  '/:id/avaliacoes',
  authenticateToken,
  validateRequest(reviewFindSchema),
  (request: Request, response: Response) => {
    controller.findAllByUserId(request, response);
  }
);

avaliacaoRoutes.put(
  '/:id',
  authenticateToken,
  validateRequest(reviewUpdateSchema),
  (request: Request, response: Response) => {
    controller.update(request, response);
  }
);

avaliacaoRoutes.delete(
  '/:id',
  authenticateToken,
  validateRequest(reviewFindSchema),
  (request: Request, response: Response) => {
    controller.delete(request, response);
  }
);

export { avaliacaoRoutes };
