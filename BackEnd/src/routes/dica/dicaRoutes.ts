import { Request, Response, Router } from 'express';
import { DicaApplication } from '../../application/Dica/DicaApplication';
import { DicaController } from '../../controllers/DicaController';
import { prisma } from '../../infrastructure/bancoContext/prisma';
import { DicaRepository } from '../../infrastructure/repositories/Dica/DicaRepository';
import { authenticateToken } from '../../middleware/authenticateToken';
import { ensureAdmin } from '../../middleware/ensureAdmin';
import { validateRequest } from '../../middleware/validateRequest';
import { dicaCreateSchema, dicaUpdateSchema } from '../../schemas/dicaSchemas';

const dicaRoutes = Router();

const repository = DicaRepository.build(prisma);
const application = DicaApplication.build(repository);
const controller = DicaController.build(application);

dicaRoutes.post(
  '/create',
  authenticateToken,
  ensureAdmin,
  validateRequest(dicaCreateSchema),
  (request: Request, response: Response) => {
    controller.save(request, response);
  }
);

dicaRoutes.get('/', (request: Request, response: Response) => {
  controller.findAll(request, response);
});

dicaRoutes.put(
  '/:id',
  authenticateToken,
  ensureAdmin,
  validateRequest(dicaUpdateSchema),
  (request: Request, response: Response) => {
    controller.update(request, response);
  }
);

dicaRoutes.delete(
  '/:id',
  authenticateToken,
  ensureAdmin,
  (request: Request, response: Response) => {
    controller.delete(request, response);
  }
);

export { dicaRoutes };
