import { ReviewProps } from '../../../@types/ReviewProps';
import { Review } from '../../models/Review';

export interface IReviewRepository {
  save(data: Review): Promise<Review>;
  findAll(): Promise<Review[]>;
  findById(id: string): Promise<Review | null>;
  findAllByUserId(userId: string): Promise<Review[]>;
  update(id: string, data: Partial<ReviewProps>): Promise<Review>;
  delete(id: string): Promise<void>;
}
