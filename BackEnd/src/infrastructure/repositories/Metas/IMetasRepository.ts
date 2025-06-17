import { MetasProps } from '../../../@types/Metas';
import { Metas } from '../../models/Metas';

export interface IMetaRepository {
  save(data: Metas): Promise<Metas>;
  findByUserId(userId: string): Promise<Metas[] | Metas | null>;
  findById(id: string): Promise<Metas | null>;
  update(id: string, data: Partial<MetasProps>): Promise<Metas>;
  delete(id: string): Promise<void>;
  deleteByUserId(userId: string): Promise<void>;
}
