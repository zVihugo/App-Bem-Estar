import {
  DifficultySleepFrequency,
  WakeUpRested,
  DaytimeDrowsiness,
  UsageScreenBeforeSleep,
} from '@prisma/client';

export interface UpdateReviewDTO {
  sleepHours: number;
  difficultySleepFrequency: DifficultySleepFrequency;
  wakeUpRested: WakeUpRested;
  daytimeDrowsiness: DaytimeDrowsiness;
  usageScreenBeforeSleep: UsageScreenBeforeSleep;
  hasRoutineSleep: boolean;
}
