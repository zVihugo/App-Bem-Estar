import { Request, Response, Router } from 'express';
import { prisma } from '../../infrastructure/bancoContext/prisma';
import { authenticateToken } from '../../middleware/authenticateToken';
import { validateRequest } from '../../middleware/validateRequest';
import { MetaRepository } from '../../infrastructure/repositories/Metas/MetasRepository';
import { MetaAplication } from '../../application/Metas/MetasApplication';
import { MetasController } from '../../controllers/MetasController';
import { MetasCreateSchema, MetasUpdateSchema } from '../../schemas/metasSchema';

const metaRoutes = Router();

const repository = MetaRepository.build(prisma);
const application = MetaAplication.build(repository);
const controller = MetasController.build(application);

metaRoutes.post(
  '/create',
  authenticateToken,
  validateRequest(MetasCreateSchema),
  (request: Request, response: Response) => {
    controller.save(request, response);
  }
);

metaRoutes.get('/:id', (request: Request, response: Response) => {
  controller.findById(request, response);
});

metaRoutes.get('/todosDoUsuario/:id', (request: Request, response: Response) => {
 console.log(request)
  controller.findAllByUserId(request, response);
});

metaRoutes.put(
  '/:id',
  authenticateToken,
  validateRequest(MetasUpdateSchema),
  (request: Request, response: Response) => {
    controller.update(request, response);
  }
);

metaRoutes.delete(
  '/:id',
  authenticateToken,
  (request: Request, response: Response) => {
    controller.delete(request, response);
  }
);

export { metaRoutes };
