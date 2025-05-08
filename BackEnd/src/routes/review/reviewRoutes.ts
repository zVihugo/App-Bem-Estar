import { Request, Response, Router } from 'express';
import { ReviewApplication } from '../../application/Review/ReviewApplication';
import { ReviewController } from '../../controllers/ReviewController';
import { prisma } from '../../infrastructure/bancoContext/prisma';
import { ReviewRepository } from '../../infrastructure/repositories/Review/ReviewRepository';

const reviewRoutes = Router();

const repository = ReviewRepository.build(prisma);
const application = ReviewApplication.build(repository);
const controller = ReviewController.build(application);

reviewRoutes.post('/create', (request: Request, response: Response) => {
  controller.save(request, response);
});

reviewRoutes.get('/:id', (request: Request, response: Response) => {
  controller.findById(request, response);
});

reviewRoutes.get('/:id/reviews', (request: Request, response: Response) => {
  controller.findAllByUserId(request, response);
});

reviewRoutes.put('/:id', (request: Request, response: Response) => {
  controller.update(request, response);
});

reviewRoutes.delete('/:id', (request: Request, response: Response) => {
  controller.delete(request, response);
});

export { reviewRoutes };
