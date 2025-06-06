import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../../config/config';
import { AuthResponseDTO } from '../../dtos/user/AuthResponseDTO';
import { LoginDTO } from '../../dtos/user/LoginDTO';
import { RegisterDTO } from '../../dtos/user/RegisterDTO';
import { UserDTO } from '../../dtos/user/UserDTO';
import { passwordHash } from '../../helpers/passwordHash';
import { User } from '../../infrastructure/models/User';
import { IUserRepository } from '../../infrastructure/repositories/User/IUserRepository';
import { IAuthApplication } from './IAuthApplication';

export class AuthApplication implements IAuthApplication {
  constructor(private readonly repository: IUserRepository) {}

  public static build(repository: IUserRepository) {
    return new AuthApplication(repository);
  }

  public async register(data: RegisterDTO): Promise<UserDTO> {
    const userExists = await this.repository.findByEmail(data.email);

    if (userExists) throw new Error('Usuário já existe.');

    const passwordEncrypted = passwordHash(data.password);

    const user = User.create({
      id: '',
      name: data.name,
      email: data.email,
      password: passwordEncrypted,
      dateOfBirth: data.dateOfBirth,
      faculty: data.faculty,
      course: data.course,
      role: 'USER',
    });

    const newUser = await this.repository.save(user);

    return newUser.toJSON();
  }

  public async login(data: LoginDTO): Promise<AuthResponseDTO> {
    const user = await this.repository.findByEmail(data.email);

    if (!user) throw new Error('Usuário não encontrado.');

    const passwordMatch = await bcrypt.compare(
      data.password,
      user.getPassword()
    );
    if (!passwordMatch) throw new Error('Senha inválida.');

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    const token = jwt.sign(payload, config.JWT_SECRET, {
      expiresIn: '1h',
    });

    return {
      token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        dateOfBirth: user.dateOfBirth,
        faculty: user.faculty,
        course: user.course,
        role: user.role,
      },
    };
  }
}
