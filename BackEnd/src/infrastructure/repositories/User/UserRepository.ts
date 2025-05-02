import { PrismaClient } from '@prisma/client';
import { Usuario } from '../../models/User';
import { IUserRepository } from './IUserRepository';

export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  public async salvar(data: Usuario): Promise<Usuario> {
    const usuario = await this.prisma.usuario.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.getPassword(),
        dataNascimento: data.dataNascimento,
        faculdade: data.faculdade,
        curso: data.curso,
      },
    });

    return Usuario.create({
      id: usuario.id,
      name: usuario.name,
      email: usuario.email,
      password: usuario.password,
      dataNascimento: usuario.dataNascimento,
      faculdade: usuario.faculdade,
      curso: usuario.curso,
    });
  }

  public async buscar(id: string): Promise<Usuario | null> {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id },
    });

    if (!usuario) return null;

    return Usuario.create({
      id: usuario.id,
      name: usuario.name,
      email: usuario.email,
      password: usuario.password,
      dataNascimento: usuario.dataNascimento,
      faculdade: usuario.faculdade,
      curso: usuario.curso,
    });
  }

  public async buscarComEmail(email: string): Promise<Usuario | null> {
    const usuario = await this.prisma.usuario.findUnique({
      where: { email },
    });

    if (!usuario) return null;

    return Usuario.create({
      id: usuario.id,
      name: usuario.name,
      email: usuario.email,
      password: usuario.password,
      dataNascimento: usuario.dataNascimento,
      faculdade: usuario.faculdade,
      curso: usuario.curso,
    });
  }

  public async atualizar(id: string, password: string): Promise<void> {
    const data = {
      password: password,
    };
    await this.prisma.usuario.update({ where: { id }, data });
  }

  public async deletar(id: string): Promise<void> {
    await this.prisma.usuario.delete({ where: { id } });
  }
}
