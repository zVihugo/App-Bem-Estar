import { CreateDicaDTO } from '../../dtos/dica/CreateDicaDTO';
import { DicaDTO } from '../../dtos/dica/DicaDTO';
import { UpdateDicaDTO } from '../../dtos/dica/UpdateDicaDTO';

export interface IDicaApplication {
  save(data: CreateDicaDTO): Promise<DicaDTO>;
  findAll(): Promise<DicaDTO[]>;
  update(id: string, data: UpdateDicaDTO): Promise<DicaDTO>;
  delete(id: string): Promise<void>;
}
