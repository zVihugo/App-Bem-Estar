import { CreateReviewDTO } from '../../dtos/review/CreateReviewDTO';
import { ReviewDTO } from '../../dtos/review/ReviewDTO';
import { UpdateReviewDTO } from '../../dtos/review/UpdateReviewDTO';

export interface IReviewApplication {
  save(data: CreateReviewDTO): Promise<ReviewDTO>;
  findById(id: string): Promise<ReviewDTO>;
  findAllByUserId(userId: string): Promise<ReviewDTO[]>;
  update(id: string, data: UpdateReviewDTO): Promise<ReviewDTO>;
  delete(id: string): Promise<void>;
}
