import { DicaProps } from '../../../@types/Dica';
import { Dica } from '../../models/Dica';

export interface IDicaRepository {
  save(data: Dica): Promise<Dica>;
  findByUserId(userId: string): Promise<Dica | null>;
  findById(id: string): Promise<Dica | null>;
  findAll(): Promise<Dica[]>;
  update(id: string, data: Partial<DicaProps>): Promise<Dica>;
  delete(id: string): Promise<void>;
  deleteByUserId(userId: string): Promise<void>;
}
