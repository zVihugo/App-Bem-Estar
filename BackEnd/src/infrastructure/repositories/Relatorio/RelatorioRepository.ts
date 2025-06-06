import { PrismaClient } from '@prisma/client';
import { RelatorioProps } from '../../../@types/RelatorioProps';
import { Relatorio } from '../../models/Relatorio';
import { IRelatorioRepository } from './IRelatorioRepository';

export class RelatorioRepository implements IRelatorioRepository {
  constructor(private readonly prisma: PrismaClient) {}

  public static build(prisma: PrismaClient) {
    return new RelatorioRepository(prisma);
  }

  public async save(data: Relatorio): Promise<Relatorio> {
    const relatorio = await this.prisma.relatorio.create({
      data
    });

    return Relatorio.create({
      id: relatorio.id,
      userId: relatorio.userId,
      cansacoAoAcordar: relatorio.cansacoAoAcordar,
      dificuldadeParaDormir: relatorio.dificuldadeParaDormir,
      mediaSono: relatorio.mediaSono,
      regularidadeRotina: relatorio.regularidadeRotina,
      createdAt: relatorio.createdAt,
      sonolenciaDiurna: relatorio.sonolenciaDiurna,
      usoDeTelasAntesDeDormir: relatorio.usoDeTelasAntesDeDormir
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
      createdAt: relatorio.createdAt,
      sonolenciaDiurna: relatorio.sonolenciaDiurna,
      usoDeTelasAntesDeDormir: relatorio.usoDeTelasAntesDeDormir
    });
  }

  public async findAllByUserId(userId: string): Promise<Relatorio[]> {
    console.log("userid: " + userId)
    console.log("userid leng" + userId.length)
    const relatorios = await this.prisma.relatorio.findMany({
      where: {
        userId,
      },
    });

    console.log("relatorios aqui rep: " + relatorios)

    return relatorios.map((relatorio) =>
      Relatorio.create({
        id: relatorio.id,
        userId: relatorio.userId,
        cansacoAoAcordar: relatorio.cansacoAoAcordar,
        dificuldadeParaDormir: relatorio.dificuldadeParaDormir,
        mediaSono: relatorio.mediaSono,
        regularidadeRotina: relatorio.regularidadeRotina,
        createdAt: relatorio.createdAt,
        sonolenciaDiurna: relatorio.sonolenciaDiurna,
        usoDeTelasAntesDeDormir: relatorio.usoDeTelasAntesDeDormir
      })
    );
  }

  public async delete(id: string): Promise<void> {
    await this.prisma.relatorio.delete({ where: { id } });
  }
}
