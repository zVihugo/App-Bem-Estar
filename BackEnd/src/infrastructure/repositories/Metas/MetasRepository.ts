import { PrismaClient } from '@prisma/client';
import { MetasProps } from '../../../@types/Metas';
import { Metas } from '../../models/Metas';
import { IMetaRepository } from './IMetasRepository';

export class MetaRepository implements IMetaRepository {
  constructor(private readonly prisma: PrismaClient) {}

  public static build(prisma: PrismaClient) {
    return new MetaRepository(prisma);
  }

  public async save(data: Metas): Promise<Metas> {
    const metas = await this.prisma.metas.create({
      data: {
        id: data.id,
        userId: data.userId,
        descricao: data.descricao,
        isCompleted: data.isCompleted,
      },
    });

    return Metas.create({
      id: metas.id,
      userId: metas.userId,
      descricao: metas.descricao,
      isCompleted: metas.isCompleted,
    });
  }

  public async findByUserId(userId: string): Promise<Metas[] | Metas | null> {
    const metas = await this.prisma.metas.findMany({
      where: { userId },
    });

    if (!metas) return null;

    return metas.map((metas) =>
          Metas.create({
            id: metas.id,
            userId: metas.userId,
            isCompleted: metas.isCompleted,
            descricao: metas.descricao,
        })
      );
  }

  public async findById(id: string): Promise<Metas | null> {
    const meta = await this.prisma.metas.findFirst({ where: { id } });

    if (!meta) return null;

    return Metas.create({
      id: meta.id,
      userId: meta.userId,
      isCompleted: meta.isCompleted,
      descricao: meta.descricao,
    });
  }

  public async update(id: string, data: Partial<MetasProps>): Promise<Metas> {
    const meta = await this.prisma.metas.update({
      where: { id },
      data,
    });

    return Metas.create({
      id: meta.id,
      userId: meta.userId,
      descricao: meta.descricao,
      isCompleted: meta.isCompleted,
    });
  }

  public async delete(id: string): Promise<void> {
    await this.prisma.metas.delete({ where: { id } });
  }
}
