import { AtualizarAvaliacaoDTO } from '../../dtos/avaliacao/AtualizarAvaliacaoDTO';
import { AvaliacaoDTO } from '../../dtos/avaliacao/AvaliacaoDTO';
import { CriarAvaliacaoDTO } from '../../dtos/avaliacao/CriarAvaliacaoDTO';

export interface IAvaliacaoApplication {
  save(data: CriarAvaliacaoDTO): Promise<AvaliacaoDTO>;
  findById(id: string): Promise<AvaliacaoDTO>;
  findAllByUserId(userId: string): Promise<AvaliacaoDTO[]>;
  update(id: string, data: AtualizarAvaliacaoDTO): Promise<AvaliacaoDTO>;
  delete(id: string): Promise<void>;
}
