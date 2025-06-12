import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../../config/config';
import { AuthResponseDTO } from '../../dtos/usuario/AuthResponseDTO';
import { LoginDTO } from '../../dtos/usuario/LoginDTO';
import { RegistroDTO } from '../../dtos/usuario/RegistroDTO';
import { UsuarioDTO } from '../../dtos/usuario/UsuarioDTO';
import { passwordHash } from '../../helpers/passwordHash';
import { Usuario } from '../../infrastructure/models/Usuario';
import { IUsuarioRepository } from '../../infrastructure/repositories/Usuario/IUsuarioRepository';
import { IAuthApplication } from './IAuthApplication';

export class AuthApplication implements IAuthApplication {
  constructor(private readonly repository: IUsuarioRepository) {}

  public static build(repository: IUsuarioRepository) {
    return new AuthApplication(repository);
  }

  public async register(data: RegistroDTO): Promise<UsuarioDTO> {
    const userExists = await this.repository.findByEmail(data.email);

    if (userExists) throw new Error('Usuário já existe.');

    const senhaEncriptada = passwordHash(data.senha);

    const user = Usuario.create({
      id: '',
      name: data.name,
      email: data.email,
      senha: senhaEncriptada,
      dataDeNascimento: data.dataDeNascimento,
      faculdade: data.faculdade,
      curso: data.curso,
      role: 'USUARIO',
    });

    const newUser = await this.repository.save(user);

    return newUser.toJSON();
  }

  public async login(data: LoginDTO): Promise<AuthResponseDTO> {
    const user = await this.repository.findByEmail(data.email);

    if (!user) throw new Error('Usuário não encontrado.');

    const passwordMatch = await bcrypt.compare(data.senha, user.getSenha());
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
        dataDeNascimento: user.dataDeNascimento,
        faculdade: user.faculdade,
        curso: user.curso,
        role: user.role,
      },
    };
  }
}
