import { CreateDicaDTO } from '../../dtos/dica/CreateDicaDTO';
import { DicaDTO } from '../../dtos/dica/DicaDTO';
import { UpdateDicaDTO } from '../../dtos/dica/UpdateDicaDTO';
import { Dica } from '../../infrastructure/models/Dica';
import { IDicaRepository } from '../../infrastructure/repositories/Dica/IDicaRepository';
import { IDicaApplication } from './IDicaApplication';

export class DicaApplication implements IDicaApplication {
  private constructor(readonly repository: IDicaRepository) {}

  public static build(repository: IDicaRepository) {
    return new DicaApplication(repository);
  }

  public async save(data: CreateDicaDTO): Promise<DicaDTO> {
    const dica = Dica.create({
      id: '',
      ...data,
    });

    const newDica = await this.repository.save(dica);

    return newDica.toJSON();
  }

  public async findAll(): Promise<DicaDTO[]> {
    const dicas = await this.repository.findAll();

    return dicas.map((dica) => dica.toJSON());
  }

  public async update(id: string, data: UpdateDicaDTO): Promise<DicaDTO> {
    const dica = await this.repository.findById(id);

    if (!dica) throw new Error('Dica do usuário não encontrado.');
    const updatedDica = await this.repository.update(id, data);

    return updatedDica.toJSON();
  }

  public async delete(id: string): Promise<void> {
    const dica = await this.repository.findById(id);

    if (!dica) throw new Error('Dica do usuário não encontrado.');

    await this.repository.delete(id);
  }
}
