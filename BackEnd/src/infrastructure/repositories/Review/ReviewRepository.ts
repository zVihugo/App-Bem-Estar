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
        date: data.date,
        sleepHours: data.sleepHours,
        difficultySleepFrequency: data.difficultySleepFrequency,
        wakeUpRested: data.wakeUpRested,
        daytimeDrowsiness: data.daytimeDrowsiness,
        usageScreenBeforeSleep: data.usageScreenBeforeSleep,
        hasRoutineSleep: data.hasRoutineSleep,
      },
    });

    return Review.create({
      id: review.id,
      userId: review.userId,
      date: review.date,
      sleepHours: review.sleepHours,
      difficultySleepFrequency: review.difficultySleepFrequency,
      wakeUpRested: review.wakeUpRested,
      daytimeDrowsiness: review.daytimeDrowsiness,
      usageScreenBeforeSleep: review.usageScreenBeforeSleep,
      hasRoutineSleep: review.hasRoutineSleep,
    });
  }

  public async findAll(): Promise<Review[]> {
    const reviews = await this.prisma.review.findMany();

    return reviews.map((review) =>
      Review.create({
        id: review.id,
        userId: review.userId,
        date: review.date,
        sleepHours: review.sleepHours,
        difficultySleepFrequency: review.difficultySleepFrequency,
        wakeUpRested: review.wakeUpRested,
        daytimeDrowsiness: review.daytimeDrowsiness,
        usageScreenBeforeSleep: review.usageScreenBeforeSleep,
        hasRoutineSleep: review.hasRoutineSleep,
      })
    );
  }

  public async findById(id: string): Promise<Review | null> {
    const review = await this.prisma.review.findUnique({
      where: { id },
    });

    if (!review) return null;

    return Review.create({
      id: review.id,
      userId: review.userId,
      date: review.date,
      sleepHours: review.sleepHours,
      difficultySleepFrequency: review.difficultySleepFrequency,
      wakeUpRested: review.wakeUpRested,
      daytimeDrowsiness: review.daytimeDrowsiness,
      usageScreenBeforeSleep: review.usageScreenBeforeSleep,
      hasRoutineSleep: review.hasRoutineSleep,
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
        date: review.date,
        sleepHours: review.sleepHours,
        difficultySleepFrequency: review.difficultySleepFrequency,
        wakeUpRested: review.wakeUpRested,
        daytimeDrowsiness: review.daytimeDrowsiness,
        usageScreenBeforeSleep: review.usageScreenBeforeSleep,
        hasRoutineSleep: review.hasRoutineSleep,
      })
    );
  }

  public async update(id: string, data: Partial<ReviewProps>): Promise<Review> {
    const review = await this.prisma.review.update({
      where: { id },
      data: {
        date: data.date,
        sleepHours: data.sleepHours,
        difficultySleepFrequency: data.difficultySleepFrequency,
        wakeUpRested: data.wakeUpRested,
        daytimeDrowsiness: data.daytimeDrowsiness,
        usageScreenBeforeSleep: data.usageScreenBeforeSleep,
        hasRoutineSleep: data.hasRoutineSleep,
      },
    });

    return Review.create({
      id: review.id,
      userId: review.userId,
      date: review.date,
      sleepHours: review.sleepHours,
      difficultySleepFrequency: review.difficultySleepFrequency,
      wakeUpRested: review.wakeUpRested,
      daytimeDrowsiness: review.daytimeDrowsiness,
      usageScreenBeforeSleep: review.usageScreenBeforeSleep,
      hasRoutineSleep: review.hasRoutineSleep,
    });
  }
  public async delete(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
}
