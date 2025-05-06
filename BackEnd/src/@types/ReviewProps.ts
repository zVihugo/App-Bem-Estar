import {
  DifficultySleepFrequency,
  WakeUpRested,
  DaytimeDrowsiness,
  UsageScreenBeforeSleep,
} from '@prisma/client';

export type ReviewProps = {
  id: string;
  userId: string;
  date: Date;
  sleepHours: number;
  difficultySleepFrequency: DifficultySleepFrequency;
  wakeUpRested: WakeUpRested;
  daytimeDrowsiness: DaytimeDrowsiness;
  usageScreenBeforeSleep: UsageScreenBeforeSleep;
  hasRoutineSleep: boolean;
};
