import { PrismaClient } from '@prisma/client';
import { ReviewProps } from '../../../@types/ReviewProps';
import { Review } from '../../models/Review';
import { IReviewRepository } from './IReviewRepository';

export class ReviewRepository implements IReviewRepository {
  constructor(private readonly prisma: PrismaClient) {}

  public static build(prisma: PrismaClient) {
    return new ReviewRepository(prisma);
  }

  public async save(data: Review): Promise<Review> {
    const review = await this.prisma.review.create({
      data: {
        userId: data.userId,
        sleepHours: data.mediaSono,
        DificuldadeParaDormir: data.dificuldadeParaDormir,
        AcordaDescansado: data.acordaDescansado,
        SofreComSonoDuranteODia: data.sofreComSonoDuranteODia,
        UsaTelaAntesDeDormir: data.usaTelaAntesDeDormir,
        TemRotinaDeSono: data.hasRoutineSleep,
      },
    });

    return Review.create({
      id: review.id,
      userId: review.userId,
      mediaSono: review.sleepHours,
      DificuldadeParaDormir: review.DificuldadeParaDormir,
      AcordaDescansado: review.AcordaDescansado,
      SofreComSonoDuranteODia: review.SofreComSonoDuranteODia,
      UsaTelaAntesDeDormir: review.UsaTelaAntesDeDormir,
      hasRoutineSleep: review.TemRotinaDeSono,
    });
  }

  public async findById(id: string): Promise<Review | null> {
    const review = await this.prisma.review.findUnique({
      where: { id },
    });

    if (!review) return null;

    return Review.create({
      id: review.id,
      userId: review.userId,
      mediaSono: review.sleepHours,
      DificuldadeParaDormir: review.DificuldadeParaDormir,
      AcordaDescansado: review.AcordaDescansado,
      SofreComSonoDuranteODia: review.SofreComSonoDuranteODia,
      UsaTelaAntesDeDormir: review.UsaTelaAntesDeDormir,
      hasRoutineSleep: review.TemRotinaDeSono,
    });
  }

  public async findAllByUserId(userId: string): Promise<Review[]> {
    const reviews = await this.prisma.review.findMany({
      where: {
        userId,
      },
    });
    return reviews.map((review) =>
      Review.create({
        id: review.id,
        userId: review.userId,
        mediaSono: review.sleepHours,
        DificuldadeParaDormir: review.DificuldadeParaDormir,
        AcordaDescansado: review.AcordaDescansado,
        SofreComSonoDuranteODia: review.SofreComSonoDuranteODia,
        UsaTelaAntesDeDormir: review.UsaTelaAntesDeDormir,
        hasRoutineSleep: review.TemRotinaDeSono,
    })
    );
  }

  public async update(id: string, data: Partial<ReviewProps>): Promise<Review> {
    const review = await this.prisma.review.update({
      where: { id },
      data: {
        sleepHours: data.mediaSono,
        DificuldadeParaDormir: data.DificuldadeParaDormir,
        AcordaDescansado: data.AcordaDescansado,
        SofreComSonoDuranteODia: data.SofreComSonoDuranteODia,
        UsaTelaAntesDeDormir: data.UsaTelaAntesDeDormir,
        TemRotinaDeSono: data.hasRoutineSleep,
      },
    });

    return Review.create({
      id: review.id,
      userId: review.userId,
      mediaSono: review.sleepHours,
      DificuldadeParaDormir: review.DificuldadeParaDormir,
      AcordaDescansado: review.AcordaDescansado,
      UsaTelaAntesDeDormir: review.UsaTelaAntesDeDormir,
      SofreComSonoDuranteODia: review.SofreComSonoDuranteODia,
      hasRoutineSleep: review.TemRotinaDeSono,
    });
  }

  public async delete(id: string): Promise<void> {
    await this.prisma.review.delete({ where: { id } });
  }
}
