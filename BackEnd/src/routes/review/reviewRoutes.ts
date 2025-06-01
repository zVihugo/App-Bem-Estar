import { Request, Response, Router } from 'express';
import { ReviewApplication } from '../../application/Review/ReviewApplication';
import { ReviewController } from '../../controllers/ReviewController';
import { prisma } from '../../infrastructure/bancoContext/prisma';
import { ReviewRepository } from '../../infrastructure/repositories/Review/ReviewRepository';
import { authenticateToken } from '../../middleware/authenticateToken';
import { validateRequest } from '../../middleware/validateRequest';
import {
  reviewCreateSchema,
  reviewFindSchema,
  reviewUpdateSchema,
} from '../../schemas/reviewSchemas';

const reviewRoutes = Router();

const repository = ReviewRepository.build(prisma);
const application = ReviewApplication.build(repository);
const controller = ReviewController.build(application);

reviewRoutes.post(
  '/create',
  authenticateToken,
  validateRequest(reviewCreateSchema),
  (request: Request, response: Response) => {
    controller.save(request, response);
  }
);

reviewRoutes.get(
  '/:id',
  authenticateToken,
  validateRequest(reviewFindSchema),
  (request: Request, response: Response) => {
    controller.findById(request, response);
  }
);

reviewRoutes.get(
  '/:id/reviews',
  authenticateToken,
  validateRequest(reviewFindSchema),
  (request: Request, response: Response) => {
    controller.findAllByUserId(request, response);
  }
);

reviewRoutes.put(
  '/:id',
  authenticateToken,
  validateRequest(reviewUpdateSchema),
  (request: Request, response: Response) => {
    controller.update(request, response);
  }
);

reviewRoutes.delete(
  '/:id',
  authenticateToken,
  validateRequest(reviewFindSchema),
  (request: Request, response: Response) => {
    controller.delete(request, response);
  }
);

export { reviewRoutes };
