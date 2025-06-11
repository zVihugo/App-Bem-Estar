import { Request, Response } from 'express';
import { MetasDTO } from '../dtos/metas/MetasDTO';
import { IMetaApplication } from '../application/Metas/IMetasApplication';

export class MetasController {
  constructor(private readonly metaApplication: IMetaApplication) {}

  public static build(metaApplication: IMetaApplication) {
    return new MetasController(metaApplication);
  }

  public async save(request: Request, response: Response) {
    try {
      const data: MetasDTO = request.body;
      const meta = await this.metaApplication.save(data);

      return response.status(201).json(meta);
    } catch (error) {
      if (error instanceof Error)
        return response.status(400).json({ error: error.message });
    }
  }

  public async findById(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const meta = await this.metaApplication.findById(id);
      return response.status(200).json(meta);
    } catch (error) {
      if (error instanceof Error)
        return response.status(400).json({ error: error.message });
    }
  }

  public async findAllByUserId(request: Request, response: Response) {
    try {
      const userId = request.params.userId;
      const metas = await this.metaApplication.findAllByUserId(userId);

      return response.status(200).json(metas);
    } catch (error) {
        console.log("oli")
      if (error instanceof Error)
        return response.status(400).json({ error: error.message });
    }
  }

  public async update(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const data: MetasDTO = request.body;

      const meta = await this.metaApplication.update(id, data);

      return response
        .status(200)
        .json({ message: 'Meta alterada com sucesso.', meta });
    } catch (error) {
      if (error instanceof Error)
        return response.status(400).json({ error: error.message });
    }
  }

  public async delete(request: Request, response: Response) {
    try {
      const { id } = request.params;
      await this.metaApplication.delete(id);
      return response
        .status(200)
        .json({ message: 'Meta deletada com sucesso.' });
    } catch (error) {
      if (error instanceof Error)
        return response.status(400).json({ error: error.message });
    }
  }
}
