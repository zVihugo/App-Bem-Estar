import bcrypt from 'bcrypt';
import { RelatorioDTO } from '../../dtos/relatorio/RelatorioDTO';
import { passwordHash } from '../../helpers/passwordHash';
import { IRelatorioRepository } from '../../infrastructure/repositories/Relatorio/IRelatorioRepository';
import { IRelatorioApplication } from './IRelatorioApplication';
import { read } from 'fs';

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

    const relatorios = await this.repository.findAllByUserId(userId);

    if (!relatorios) throw new Error('Usuário não encontrado.');

    return relatorios;
  }

  public async findLast7DaysReviews(userId: string): Promise<RelatorioDTO[]> {

    const relatorios = await this.findAllByUserId(userId);

    const relatorioPorDia = new Map<string, RelatorioDTO[]>()

    for (const relatorio of relatorios) {
      const dayKey = new Date(relatorio.createdAt).toISOString().split('T')[0]
      if (!relatorioPorDia.has(dayKey)) {
        relatorioPorDia.set(dayKey, [relatorio])
      }
    }

  if (relatorioPorDia.size < 1) {
    throw new RangeError('Usuário possui menos de 7 dias distintos de avaliações.')
  }

  return [...relatorioPorDia.values()].slice(0, 1).flat()
  }

  public async findLast30DaysReviews(userId: string): Promise<RelatorioDTO[]> {

    const relatorios = await this.findAllByUserId(userId);

    const relatorioPorDia = new Map<string, RelatorioDTO[]>()

    for (const relatorio of relatorios) {
      const dayKey = new Date(relatorio.createdAt).toISOString().split('T')[0]
      if (!relatorioPorDia.has(dayKey)) {
        relatorioPorDia.set(dayKey, [relatorio])
      }
    }

  if (relatorioPorDia.size < 30) {
    throw new RangeError('Usuário possui menos de 30 dias distintos de avaliações.')
  }

  return [...relatorioPorDia.values()].slice(0, 30).flat()
  }

  public async delete(id: string): Promise<void> {
    const relatorio = await this.repository.findById(id);
    if (!relatorio) throw new Error('Usuário não encontrado.');

    await this.repository.delete(id);
  }
}
