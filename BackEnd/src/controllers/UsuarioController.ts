import { Request, Response } from 'express';
import { IUsuarioApplication } from '../application/Usuario/IUsuarioApplication';
import { AtualizarPerfilDTO } from '../dtos/usuario/AtualizarPerfilDTO';
import { AtualizarSenhaDTO } from '../dtos/usuario/AtualizarSenhaDTO';

export class UsuarioController {
  constructor(private readonly userApplication: IUsuarioApplication) {}

  public static build(authApplication: IUsuarioApplication) {
    return new UsuarioController(authApplication);
  }

  public async find(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const user = await this.userApplication.find(id);

      return response.status(200).json({ user: user });
    } catch (error) {
      if (error instanceof Error)
        return response.status(404).json({ error: error.message });
    }
  }

  public async updatePassword(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const data: AtualizarSenhaDTO = request.body;

      await this.userApplication.updatePassword(id, data);
      return response
        .status(200)
        .json({ message: 'Senha Atualizada com sucesso.' });
    } catch (error) {
      if (error instanceof Error)
        return response.status(400).json({ error: error.message });
    }
  }

  public async updateProfile(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const data: AtualizarPerfilDTO = request.body;

      const user = await this.userApplication.updateProfile(id, data);

      return response
        .status(200)
        .json({ message: 'Perfil atualizado com sucesso.', user: user });
    } catch (error) {
      if (error instanceof Error) {
        console.log('Error ', error);
        return response.status(400).json({ error: error.message });
      }
    }
  }

  public async delete(request: Request, response: Response) {
    try {
      const { id } = request.params;
      await this.userApplication.delete(id);
      return response
        .status(200)
        .json({
          message: 'Todos os dados do usuário foram deletados com sucesso.',
        });
    } catch (error) {
      if (error instanceof Error)
        return response.status(404).json({ error: error.message });
    }
  }
}
