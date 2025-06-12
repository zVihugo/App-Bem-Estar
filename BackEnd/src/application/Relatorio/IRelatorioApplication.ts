import { RelatorioDTO } from '../../dtos/relatorio/RelatorioDTO';
import { ReviewDTO } from '../../dtos/avaliacao/AvaliacaoDTO';

export interface IRelatorioApplication {
  save(data: RelatorioDTO): Promise<RelatorioDTO>;
  find(id: string): Promise<RelatorioDTO>;
  findAllByUserId(email: string): Promise<ReviewDTO[]>;
  findLastDaysReviews(userId: string, seteDias: boolean): Promise<RelatorioDTO>;
  delete(id: string): Promise<void>;
}
