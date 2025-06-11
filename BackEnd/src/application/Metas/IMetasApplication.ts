import { MetasDTO } from "../../dtos/metas/MetasDTO";

export interface IMetaApplication {
  save(data: MetasDTO): Promise<MetasDTO>;
  findById(id: string): Promise<MetasDTO>;
  findAllByUserId(id: string): Promise<MetasDTO[] | MetasDTO>
  update(id: string, data: MetasDTO): Promise<MetasDTO>;
  delete(id: string): Promise<void>;
}
