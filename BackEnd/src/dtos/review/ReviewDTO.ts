import {
  DifficultySleepFrequency,
  WakeUpRested,
  DaytimeDrowsiness,
  UsageScreenBeforeSleep,
} from '@prisma/client';

export interface ReviewDTO {
  id: string;
  userId: string;
  sleepHours: number;
  difficultySleepFrequency: DifficultySleepFrequency;
  wakeUpRested: WakeUpRested;
  daytimeDrowsiness: DaytimeDrowsiness;
  usageScreenBeforeSleep: UsageScreenBeforeSleep;
  hasRoutineSleep: boolean;
}
