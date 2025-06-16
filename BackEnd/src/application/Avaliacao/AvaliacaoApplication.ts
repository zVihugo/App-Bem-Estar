import { AtualizarAvaliacaoDTO } from '../../dtos/avaliacao/AtualizarAvaliacaoDTO';
import { AvaliacaoDTO } from '../../dtos/avaliacao/AvaliacaoDTO';
import { CriarAvaliacaoDTO } from '../../dtos/avaliacao/CriarAvaliacaoDTO';
import { Avaliacao } from '../../infrastructure/models/Avaliacao';
import { IAvaliacaoRepository } from '../../infrastructure/repositories/Avaliacao/IAvaliacaoRepository';
import { IAvaliacaoApplication } from './IAvaliacaopplication';

export class AvaliacaoApplication implements IAvaliacaoApplication {
  private constructor(readonly repository: IAvaliacaoRepository) {}

  public static build(repository: IAvaliacaoRepository) {
    return new AvaliacaoApplication(repository);
  }

  public async save(data: CriarAvaliacaoDTO): Promise<AvaliacaoDTO> {
    const review = Avaliacao.create({
      id: '',
      ...data,
    });

    const newReview = await this.repository.save(review);

    return newReview.toJSON();
  }

  public async findById(id: string): Promise<AvaliacaoDTO> {
    const review = await this.repository.findById(id);

    if (!review) throw new Error('Usuário não encontrado.');

    return review.toJSON();
  }

  public async findAllByUserId(userId: string): Promise<AvaliacaoDTO[]> {
    const reviews = await this.repository.findAllByUserId(userId);

    if (!reviews) throw new Error('Usuário não encontrado.');

    return reviews.map((review) => review.toJSON());
  }

  public async update(
    id: string,
    data: AtualizarAvaliacaoDTO
  ): Promise<AvaliacaoDTO> {
    const review = await this.repository.findById(id);
    if (!review) throw new Error('Usuário não encontrado.');
    const updated = await this.repository.update(id, data);

    return updated.toJSON();
  }
  public async delete(id: string): Promise<void> {
    const review = await this.repository.findById(id);
    if (!review) throw new Error('Usuário não encontrado.');

    await this.repository.delete(id);
  }
}
