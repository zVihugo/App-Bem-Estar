import { PrismaClient } from '@prisma/client';
import { Relatorio } from '../../models/Relatorio';
import { IRelatorioRepository } from './IRelatorioRepository';

export class RelatorioRepository implements IRelatorioRepository {
  constructor(private readonly prisma: PrismaClient) {}

  public static build(prisma: PrismaClient) {
    return new RelatorioRepository(prisma);
  }

  public async save(data: Relatorio): Promise<Relatorio> {
    const relatorio = await this.prisma.relatorio.create({
      data,
    });

    return Relatorio.create({
      id: relatorio.id,
      userId: relatorio.userId,
      cansacoAoAcordar: relatorio.cansacoAoAcordar,
      dificuldadeParaDormir: relatorio.dificuldadeParaDormir,
      mediaSono: relatorio.mediaSono,
      regularidadeRotina: relatorio.regularidadeRotina,
      sonolenciaDiurna: relatorio.sonolenciaDiurna,
      usoDeTelasAntesDeDormir: relatorio.usoDeTelasAntesDeDormir,
    });
  }

  public async findById(id: string): Promise<Relatorio | null> {
    const relatorio = await this.prisma.relatorio.findUnique({
      where: { id },
    });

    if (!relatorio) return null;

    return Relatorio.create({
      id: relatorio.id,
      userId: relatorio.userId,
      cansacoAoAcordar: relatorio.cansacoAoAcordar,
      dificuldadeParaDormir: relatorio.dificuldadeParaDormir,
      mediaSono: relatorio.mediaSono,
      regularidadeRotina: relatorio.regularidadeRotina,
      sonolenciaDiurna: relatorio.sonolenciaDiurna,
      usoDeTelasAntesDeDormir: relatorio.usoDeTelasAntesDeDormir,
    });
  }

  public async findAllByUserId(userId: string): Promise<Relatorio[]> {
    const relatorios = await this.prisma.relatorio.findMany({
      where: {
        userId,
      },
    });

    return relatorios.map((relatorio) =>
      Relatorio.create({
        id: relatorio.id,
        userId: relatorio.userId,
        cansacoAoAcordar: relatorio.cansacoAoAcordar,
        dificuldadeParaDormir: relatorio.dificuldadeParaDormir,
        mediaSono: relatorio.mediaSono,
        regularidadeRotina: relatorio.regularidadeRotina,
        sonolenciaDiurna: relatorio.sonolenciaDiurna,
        usoDeTelasAntesDeDormir: relatorio.usoDeTelasAntesDeDormir,
      })
    );
  }

  public async delete(id: string): Promise<void> {
    await this.prisma.relatorio.delete({ where: { id } });
  }

  public async deleteByUserId(userId: string): Promise<void> {
    await this.prisma.relatorio.deleteMany({ where: { userId } });
  }
}
