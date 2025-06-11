import { MetasDTO } from '../../dtos/metas/MetasDTO';
import { IMetaRepository } from '../../infrastructure/repositories/Metas/IMetasRepository';
import { Metas } from '../../infrastructure/models/Metas';
import { IMetaApplication } from './IMetasApplication';


export class MetaAplication implements IMetaApplication{
  private constructor(readonly repository: IMetaRepository) {}

  public static build(repository: IMetaRepository) {
    return new MetaAplication(repository);
  }

  public async save(data: MetasDTO): Promise<MetasDTO> {
    const meta = Metas.create({
      ...data,
    });

    const novaMeta = await this.repository.save(meta);

    return novaMeta.toJSON();
  }

  public async findById(id: string): Promise<MetasDTO>{
    const meta = await this.repository.findById(id);

    if (!meta) throw new Error('Meta do usuário não encontrado.');

    return meta;
  }

  public async findAllByUserId(id: string): Promise<MetasDTO[] | MetasDTO>{
    const metas = await this.repository.findByUserId(id);

    if (!metas) throw new Error('Metas do usuário não encontrado.');

    if (Array.isArray(metas)) {
    return metas.map((meta) =>
      Metas.create({
        id: meta.id,
        userId: meta.userId,
        isCompleted: meta.isCompleted,
        descricao: meta.descricao,
      })
    );
  }

  return Metas.create({
    id: metas.id,
    userId: metas.userId,
    isCompleted: metas.isCompleted,
    descricao: metas.descricao,
  });
  }

  public async update(id: string, data: MetasDTO): Promise<MetasDTO> {
    const meta = await this.repository.findById(id);

    if (!meta) throw new Error('Meta do usuário não encontrado.');

    const updatedMeta = await this.repository.update(id, data);

    return updatedMeta.toJSON();
  }

  public async delete(id: string): Promise<void> {
    const meta = await this.repository.findById(id);

    if (!meta) throw new Error('Meta do usuário não encontrado.');

    await this.repository.delete(id);
  }
}
