import bcrypt from 'bcrypt';
import { RelatorioDTO } from '../../dtos/relatorio/RelatorioDTO';
import { passwordHash } from '../../helpers/passwordHash';
import { IRelatorioRepository } from '../../infrastructure/repositories/Relatorio/IRelatorioRepository';
import { IRelatorioApplication } from './IRelatorioApplication';

export class RelatorioApplication implements IRelatorioApplication {
  private constructor(readonly repository: IRelatorioRepository) {}

  public static build(repository: IRelatorioRepository) {
    return new RelatorioApplication(repository);
  }

  public async find(id: string): Promise<RelatorioDTO> {
    const relatorio = await this.repository.findById(id);
    if (!relatorio) throw new Error('Usuário não encontrado.');
    return relatorio;
  }

  public async findAllByUserId(userId: string): Promise<RelatorioDTO[]> {

    const user = await this.repository.findAllByUserId(userId);

    if (!user) throw new Error('Usuário não encontrado.');

    return user;
  }

  public async delete(id: string): Promise<void> {
    const user = await this.repository.findById(id);
    if (!user) throw new Error('Usuário não encontrado.');

    await this.repository.delete(id);
  }

  private async calculoRelatorio() {
      
  }
}
