import { PrismaClient } from '@prisma/client';
import { DicaProps } from '../../../@types/Dica';
import { Dica } from '../../models/Dica';
import { IDicaRepository } from './IDicaRepository';

export class DicaRepository implements IDicaRepository {
  constructor(private readonly prisma: PrismaClient) {}

  public static build(prisma: PrismaClient) {
    return new DicaRepository(prisma);
  }

  public async save(data: Dica): Promise<Dica> {
    const dica = await this.prisma.dica.create({
      data: {
        userId: data.userId,
        titulo: data.titulo,
        thumbnailUrl: data.thumbnailUrl,
        link: data.link,
        tipo: data.tipo,
      },
    });

    return Dica.create({
      id: dica.id,
      userId: dica.userId,
      titulo: dica.titulo,
      thumbnailUrl: dica.thumbnailUrl,
      link: dica.link,
      tipo: dica.tipo,
    });
  }

  public async findByUserId(userId: string): Promise<Dica | null> {
    const dica = await this.prisma.dica.findFirst({
      where: { userId },
    });

    if (!dica) return null;

    return Dica.create({
      id: dica.id,
      userId: dica.userId,
      titulo: dica.titulo,
      thumbnailUrl: dica.thumbnailUrl,
      link: dica.link,
      tipo: dica.tipo,
    });
  }

  public async findById(id: string): Promise<Dica | null> {
    const dica = await this.prisma.dica.findFirst({ where: { id } });

    if (!dica) return null;

    return Dica.create({
      id: dica.id,
      userId: dica.userId,
      titulo: dica.titulo,
      thumbnailUrl: dica.thumbnailUrl,
      link: dica.link,
      tipo: dica.tipo,
    });
  }

  public async findAll(): Promise<Dica[]> {
    const dicas = await this.prisma.dica.findMany();

    return dicas.map((dica) =>
      Dica.create({
        id: dica.id,
        userId: dica.userId,
        titulo: dica.titulo,
        thumbnailUrl: dica.thumbnailUrl,
        link: dica.link,
        tipo: dica.tipo,
      })
    );
  }

  public async update(id: string, data: Partial<DicaProps>): Promise<Dica> {
    const dica = await this.prisma.dica.update({
      where: { id },
      data,
    });

    return Dica.create({
      id: dica.id,
      userId: dica.userId,
      titulo: dica.titulo,
      thumbnailUrl: dica.thumbnailUrl,
      link: dica.link,
      tipo: dica.tipo,
    });
  }

  public async delete(id: string): Promise<void> {
    await this.prisma.dica.delete({ where: { id } });
  }

  public async deleteByUserId(userId: string): Promise<void> {
    await this.prisma.dica.deleteMany({ where: { userId } });
  }
}
