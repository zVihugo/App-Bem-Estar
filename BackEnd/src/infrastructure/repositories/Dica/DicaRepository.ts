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
        title: data.title,
        imageUrl: data.imageUrl,
        type: data.type,
      },
    });

    return Dica.create({
      id: dica.id,
      userId: dica.userId,
      title: dica.title,
      imageUrl: dica.imageUrl,
      type: dica.type,
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
      title: dica.title,
      imageUrl: dica.imageUrl,
      type: dica.type,
    });
  }

  public async findById(id: string): Promise<Dica | null> {
    const dica = await this.prisma.dica.findFirst({ where: { id } });

    if (!dica) return null;

    return Dica.create({
      id: dica.id,
      userId: dica.userId,
      title: dica.title,
      imageUrl: dica.imageUrl,
      type: dica.type,
    });
  }

  public async findAll(): Promise<Dica[]> {
    const dicas = await this.prisma.dica.findMany();

    return dicas.map((dica) =>
      Dica.create({
        id: dica.id,
        userId: dica.userId,
        title: dica.title,
        imageUrl: dica.imageUrl,
        type: dica.type,
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
      title: dica.title,
      imageUrl: dica.imageUrl,
      type: dica.type,
    });
  }

  public async delete(id: string): Promise<void> {
    await this.prisma.dica.delete({ where: { id } });
  }
}
