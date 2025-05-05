import { Request, Response } from 'express';
import { IUserApplication } from '../application/User/IUserApplication';
import { UpdatePasswordDTO } from '../dtos/user/UpdatePasswordDTO';
import { UpdateProfileDTO } from '../dtos/user/UpdateProfileDTO';

export class UserController {
  constructor(private readonly userApplication: IUserApplication) {}

  public static build(authApplication: IUserApplication) {
    return new UserController(authApplication);
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
      const data: UpdatePasswordDTO = request.body;

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
      const data: UpdateProfileDTO = request.body;

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
        .json({ message: 'Usuário deletado com sucesso.' });
    } catch (error) {
      if (error instanceof Error)
        return response.status(404).json({ error: error.message });
    }
  }
}
