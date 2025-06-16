import { PrismaClient } from '@prisma/client';
import { AtualizarPerfilDTO } from '../../../dtos/usuario/AtualizarPerfilDTO';
import { Usuario } from '../../models/Usuario';
import { IUsuarioRepository } from './IUsuarioRepository';

export class UsuarioRepository implements IUsuarioRepository {
  constructor(private readonly prisma: PrismaClient) {}

  public static build(prisma: PrismaClient) {
    return new UsuarioRepository(prisma);
  }

  public async save(data: Usuario): Promise<Usuario> {
    const user = await this.prisma.usuario.create({
      data: {
        name: data.name,
        email: data.email,
        senha: data.getSenha(),
        dataDeNascimento: data.dataDeNascimento,
        faculdade: data.faculdade,
        curso: data.curso,
        role: data.role,
      },
    });

    return Usuario.create({
      id: user.id,
      name: user.name,
      email: user.email,
      senha: user.senha,
      dataDeNascimento: user.dataDeNascimento,
      faculdade: user.faculdade,
      curso: user.curso,
      role: user.role,
    });
  }

  public async find(id: string): Promise<Usuario | null> {
    const user = await this.prisma.usuario.findUnique({
      where: { id },
    });

    if (!user) return null;

    return Usuario.create({
      id: user.id,
      name: user.name,
      email: user.email,
      senha: user.senha,
      dataDeNascimento: user.dataDeNascimento,
      faculdade: user.faculdade,
      curso: user.curso,
      role: user.role,
    });
  }

  public async findByEmail(email: string): Promise<Usuario | null> {
    const user = await this.prisma.usuario.findUnique({
      where: { email },
    });

    if (!user) return null;

    return Usuario.create({
      id: user.id,
      name: user.name,
      email: user.email,
      senha: user.senha,
      dataDeNascimento: user.dataDeNascimento,
      faculdade: user.faculdade,
      curso: user.curso,
      role: user.role,
    });
  }

  public async updatePassword(id: string, senha: string): Promise<void> {
    const data = {
      senha: senha,
    };
    await this.prisma.usuario.update({ where: { id }, data });
  }

  public async updateProfile(
    id: string,
    data: AtualizarPerfilDTO
  ): Promise<Usuario> {
    const user = await this.prisma.usuario.update({
      where: { id },
      data: {
        name: data.name,
        dataDeNascimento: data.dataDeNascimento,
        faculdade: data.faculdade,
        curso: data.curso,
      },
    });

    return Usuario.create({
      id: user.id,
      name: user.name,
      email: user.email,
      senha: user.senha,
      dataDeNascimento: user.dataDeNascimento,
      faculdade: user.faculdade,
      curso: user.curso,
      role: user.role,
    });
  }

  public async delete(id: string): Promise<void> {
    await this.prisma.usuario.delete({ where: { id } });
  }
}
