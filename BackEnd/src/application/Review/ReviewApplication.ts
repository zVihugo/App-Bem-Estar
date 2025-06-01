import { CreateReviewDTO } from '../../dtos/review/CreateReviewDTO';
import { ReviewDTO } from '../../dtos/review/ReviewDTO';
import { UpdateReviewDTO } from '../../dtos/review/UpdateReviewDTO';
import { Review } from '../../infrastructure/models/Review';
import { IReviewRepository } from '../../infrastructure/repositories/Review/IReviewRepository';
import { IReviewApplication } from './IReviewApplication';

export class ReviewApplication implements IReviewApplication {
  private constructor(readonly repository: IReviewRepository) {}

  public static build(repository: IReviewRepository) {
    return new ReviewApplication(repository);
  }

  public async save(data: CreateReviewDTO): Promise<ReviewDTO> {
    const review = Review.create({
      id: '',
      ...data,
    });

    const newReview = await this.repository.save(review);

    return newReview.toJSON();
  }

  public async findById(id: string): Promise<ReviewDTO> {
    const review = await this.repository.findById(id);

    if (!review) throw new Error('Usuário não encontrado.');

    return review.toJSON();
  }

  public async findAllByUserId(userId: string): Promise<ReviewDTO[]> {
    const reviews = await this.repository.findAllByUserId(userId);

    if (!reviews) throw new Error('Usuário não encontrado.');

    return reviews.map((review) => review.toJSON());
  }

  public async update(id: string, data: UpdateReviewDTO): Promise<ReviewDTO> {
    const review = await this.repository.findById(id);
    if (!review) throw new Error('Usuário não encontrado.');
    const updated = await this.repository.update(id, data);

    return updated.toJSON();
  }
  public async delete(id: string): Promise<void> {
    const review = await this.repository.findById(id);
    if (!review) throw new Error('Usuário não encontrado.');

    await this.repository.delete(id);
  }
}
