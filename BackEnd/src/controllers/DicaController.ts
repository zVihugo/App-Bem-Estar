import { Request, Response } from 'express';
import { IDicaApplication } from '../application/Dica/IDicaApplication';
import { CreateDicaDTO } from '../dtos/dica/CreateDicaDTO';
import { UpdateDicaDTO } from '../dtos/dica/UpdateDicaDTO';
import { CustomRequest } from '../middleware/authenticateToken';

export class DicaController {
  constructor(private readonly dicaApplication: IDicaApplication) {}

  public static build(dicaApplication: IDicaApplication) {
    return new DicaController(dicaApplication);
  }

  public async save(request: CustomRequest, response: Response) {
    try {
      const adminId = request.user?.id;

      if (!adminId) {
        return response.status(401).json({ error: 'Usuário não autenticado.' });
      }

      const { titulo, thumbnailUrl, link, tipo } =
        request.body as CreateDicaDTO;

      const dica = await this.dicaApplication.save({
        userId: adminId,
        titulo,
        thumbnailUrl,
        link,
        tipo,
      });

      return response.status(201).json(dica);
    } catch (error) {
      if (error instanceof Error)
        return response.status(400).json({ error: error.message });
    }
  }

  public async findAll(request: Request, response: Response) {
    try {
      const dicas = await this.dicaApplication.findAll();

      return response.status(200).json(dicas);
    } catch (error) {
      if (error instanceof Error)
        return response.status(400).json({ error: error.message });
    }
  }

  public async update(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const data: UpdateDicaDTO = request.body;

      const dica = await this.dicaApplication.update(id, data);

      return response
        .status(200)
        .json({ message: 'Dicas alterado com sucesso.', dica });
    } catch (error) {
      if (error instanceof Error)
        return response.status(400).json({ error: error.message });
    }
  }

  public async delete(request: Request, response: Response) {
    try {
      const { id } = request.params;
      await this.dicaApplication.delete(id);

      return response
        .status(200)
        .json({ message: 'Dicas deletado com sucesso.' });
    } catch (error) {
      if (error instanceof Error)
        return response.status(400).json({ error: error.message });
    }
  }
}
