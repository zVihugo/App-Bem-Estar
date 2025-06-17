import { AvaliacaoProps } from '../../../@types/AvaliacaoProps';
import { Avaliacao } from '../../models/Avaliacao';

export interface IAvaliacaoRepository {
  save(data: Avaliacao): Promise<Avaliacao>;
  findById(id: string): Promise<Avaliacao | null>;
  findAllByUserId(userId: string): Promise<Avaliacao[]>;
  update(id: string, data: Partial<AvaliacaoProps>): Promise<Avaliacao>;
  delete(id: string): Promise<void>;
  deleteByUserId(userId: string): Promise<void>;
}
