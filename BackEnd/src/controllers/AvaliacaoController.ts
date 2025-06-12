import { Request, Response } from 'express';
import { IAvaliacaoApplication } from '../application/Avaliacao/IAvaliacaopplication';
import { AtualizarAvaliacaoDTO } from '../dtos/avaliacao/AtualizarAvaliacaoDTO';
import { CriarAvaliacaoDTO } from '../dtos/avaliacao/CriarAvaliacaoDTO';

export class AvaliacaoController {
  constructor(private readonly reviewApplication: IAvaliacaoApplication) {}

  public static build(reviewApplication: IAvaliacaoApplication) {
    return new AvaliacaoController(reviewApplication);
  }

  public async save(request: Request, response: Response) {
    try {
      const data: CriarAvaliacaoDTO = request.body;
      const review = await this.reviewApplication.save(data);

      return response.status(201).json(review);
    } catch (error) {
      if (error instanceof Error)
        return response.status(400).json({ error: error.message });
    }
  }

  public async findById(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const review = await this.reviewApplication.findById(id);
      return response.status(200).json(review);
    } catch (error) {
      if (error instanceof Error)
        return response.status(400).json({ error: error.message });
    }
  }

  public async findAllByUserId(request: Request, response: Response) {
    try {
      const userId = request.params.userId;
      const reviews = await this.reviewApplication.findAllByUserId(userId);

      return response.status(200).json(reviews);
    } catch (error) {
      if (error instanceof Error)
        return response.status(400).json({ error: error.message });
    }
  }

  public async update(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const data: AtualizarAvaliacaoDTO = request.body;

      const review = await this.reviewApplication.update(id, data);

      return response
        .status(200)
        .json({ message: 'Avaliação alterada com sucesso.', review });
    } catch (error) {
      if (error instanceof Error)
        return response.status(400).json({ error: error.message });
    }
  }

  public async delete(request: Request, response: Response) {
    try {
      const { id } = request.params;
      await this.reviewApplication.delete(id);
      return response
        .status(200)
        .json({ message: 'Avaliação deletada com sucesso.' });
    } catch (error) {
      if (error instanceof Error)
        return response.status(400).json({ error: error.message });
    }
  }
}
