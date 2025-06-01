import { Request, Response } from 'express';
import { IReviewApplication } from '../application/Review/IReviewApplication';
import { CreateReviewDTO } from '../dtos/review/CreateReviewDTO';
import { UpdateReviewDTO } from '../dtos/review/UpdateReviewDTO';

export class ReviewController {
  constructor(private readonly reviewApplication: IReviewApplication) {}

  public static build(reviewApplication: IReviewApplication) {
    return new ReviewController(reviewApplication);
  }

  public async save(request: Request, response: Response) {
    try {
      const data: CreateReviewDTO = request.body;
      const review = await this.reviewApplication.save(data);

      return response.status(201).json(review);
    } catch (error) {
      if (error instanceof Error)
        return response.status(400).json({ error: error.message });
    }
  }

  public async findById(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const review = await this.reviewApplication.findById(id);
      return response.status(200).json(review);
    } catch (error) {
      if (error instanceof Error)
        return response.status(400).json({ error: error.message });
    }
  }

  public async findAllByUserId(request: Request, response: Response) {
    try {
      const userId = request.params.userId;
      const reviews = await this.reviewApplication.findAllByUserId(userId);

      return response.status(200).json(reviews);
    } catch (error) {
      if (error instanceof Error)
        return response.status(400).json({ error: error.message });
    }
  }

  public async update(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const data: UpdateReviewDTO = request.body;

      const review = await this.reviewApplication.update(id, data);

      return response
        .status(200)
        .json({ message: 'Avaliação alterada com sucesso.', review });
    } catch (error) {
      if (error instanceof Error)
        return response.status(400).json({ error: error.message });
    }
  }

  public async delete(request: Request, response: Response) {
    try {
      const { id } = request.params;
      await this.reviewApplication.delete(id);
      return response
        .status(200)
        .json({ message: 'Avaliação deletada com sucesso.' });
    } catch (error) {
      if (error instanceof Error)
        return response.status(400).json({ error: error.message });
    }
  }
}
