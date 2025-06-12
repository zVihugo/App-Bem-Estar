import { PrismaClient } from '@prisma/client';
import { AvaliacaoProps } from '../../../@types/AvaliacaoProps';
import { Avaliacao } from '../../models/Avaliacao';
import { IAvaliacaoRepository } from './IAvaliacaoRepository';

export class AvaliacaoRepository implements IAvaliacaoRepository {
  constructor(private readonly prisma: PrismaClient) {}

  public static build(prisma: PrismaClient) {
    return new AvaliacaoRepository(prisma);
  }

  public async save(data: Avaliacao): Promise<Avaliacao> {
    const review = await this.prisma.avaliacao.create({
      data: {
        userId: data.userId,
        mediaSono: data.mediaSono,
        dificuldadeParaDormir: data.dificuldadeParaDormir,
        acordaDescansado: data.acordaDescansado,
        sofreComSonoDuranteODia: data.sofreComSonoDuranteODia,
        usaTelaAntesDeDormir: data.usaTelaAntesDeDormir,
        temRotinaDeSono: data.temRotinaDeSono,
        createdAt: data.createdAt,
      },
    });

    return Avaliacao.create({
      id: review.id,
      userId: review.userId,
      mediaSono: review.mediaSono,
      dificuldadeParaDormir: review.dificuldadeParaDormir,
      acordaDescansado: review.acordaDescansado,
      sofreComSonoDuranteODia: review.sofreComSonoDuranteODia,
      usaTelaAntesDeDormir: review.usaTelaAntesDeDormir,
      temRotinaDeSono: review.temRotinaDeSono,
      createdAt: review.createdAt,
    });
  }

  public async findById(id: string): Promise<Avaliacao | null> {
    const review = await this.prisma.avaliacao.findUnique({
      where: { id },
    });

    if (!review) return null;

    return Avaliacao.create({
      id: review.id,
      userId: review.userId,
      mediaSono: review.mediaSono,
      dificuldadeParaDormir: review.dificuldadeParaDormir,
      acordaDescansado: review.acordaDescansado,
      sofreComSonoDuranteODia: review.sofreComSonoDuranteODia,
      usaTelaAntesDeDormir: review.usaTelaAntesDeDormir,
      temRotinaDeSono: review.temRotinaDeSono,
      createdAt: review.createdAt,
    });
  }

  public async findAllByUserId(userId: string): Promise<Avaliacao[]> {
    const reviews = await this.prisma.avaliacao.findMany({
      where: {
        userId,
      },
    });

    return reviews.map((review) =>
      Avaliacao.create({
        id: review.id,
        userId: review.userId,
        mediaSono: review.mediaSono,
        dificuldadeParaDormir: review.dificuldadeParaDormir,
        acordaDescansado: review.acordaDescansado,
        sofreComSonoDuranteODia: review.sofreComSonoDuranteODia,
        usaTelaAntesDeDormir: review.usaTelaAntesDeDormir,
        temRotinaDeSono: review.temRotinaDeSono,
        createdAt: review.createdAt,
      })
    );
  }

  public async update(
    id: string,
    data: Partial<AvaliacaoProps>
  ): Promise<Avaliacao> {
    const review = await this.prisma.avaliacao.update({
      where: { id },
      data: {
        mediaSono: data.mediaSono,
        dificuldadeParaDormir: data.dificuldadeParaDormir,
        acordaDescansado: data.acordaDescansado,
        sofreComSonoDuranteODia: data.sofreComSonoDuranteODia,
        usaTelaAntesDeDormir: data.usaTelaAntesDeDormir,
        temRotinaDeSono: data.temRotinaDeSono,
        createdAt: data.createdAt,
      },
    });

    return Avaliacao.create({
      id: review.id,
      userId: review.userId,
      mediaSono: review.mediaSono,
      dificuldadeParaDormir: review.dificuldadeParaDormir,
      acordaDescansado: review.acordaDescansado,
      sofreComSonoDuranteODia: review.sofreComSonoDuranteODia,
      usaTelaAntesDeDormir: review.usaTelaAntesDeDormir,
      temRotinaDeSono: review.temRotinaDeSono,
      createdAt: review.createdAt,
    });
  }

  public async delete(id: string): Promise<void> {
    await this.prisma.avaliacao.delete({ where: { id } });
  }
}
