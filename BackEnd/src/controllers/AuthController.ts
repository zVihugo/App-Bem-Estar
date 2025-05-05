import { Request, Response } from 'express';
import { IAuthApplication } from '../application/User/IAuthApplication';
import { LoginDTO } from '../dtos/user/LoginDTO';
import { RegisterDTO } from '../dtos/user/RegisterDTO';

export class AuthController {
  constructor(private readonly authApplication: IAuthApplication) {}

  public static build(authApplication: IAuthApplication) {
    return new AuthController(authApplication);
  }

  public async register(request: Request, response: Response) {
    try {
      const data: RegisterDTO = request.body;
      const user = await this.authApplication.register(data);

      return response.status(201).json({ user: user });
    } catch (error) {
      if (error instanceof Error)
        return response.status(400).json({ error: error.message });
    }
  }

  public async login(request: Request, response: Response) {
    try {
      const data: LoginDTO = request.body;
      const user = await this.authApplication.login(data);

      return response.status(200).json({ user });
    } catch (error) {
      if (error instanceof Error)
        return response.status(400).json({ error: error.message });
    }
  }
}
