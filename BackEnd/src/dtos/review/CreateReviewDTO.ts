import {
  DifficultySleepFrequency,
  WakeUpRested,
  DaytimeDrowsiness,
  UsageScreenBeforeSleep,
} from '@prisma/client';

export interface CreateReviewDTO {
  userId: string;
  date: Date;
  sleepHours: number;
  difficultySleepFrequency: DifficultySleepFrequency;
  wakeUpRested: WakeUpRested;
  daytimeDrowsiness: DaytimeDrowsiness;
  usageScreenBeforeSleep: UsageScreenBeforeSleep;
  hasRoutineSleep: boolean;
}
