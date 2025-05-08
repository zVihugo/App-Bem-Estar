import {
  DaytimeDrowsiness,
  DifficultySleepFrequency,
  UsageScreenBeforeSleep,
  WakeUpRested,
} from '@prisma/client';
import { z } from 'zod';

export const reviewFindSchema = {
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'ID inválido'),
  }),
};

export const reviewCreateSchema = {
  body: z.object({
    userId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'ID do usuário inválido'),
    sleepHours: z
      .number()
      .min(0, 'A quantidade mínima de horas de sono é 0')
      .max(24, 'A quantidade máxima de horas de sono é 24'),
    difficultySleepFrequency: z.nativeEnum(DifficultySleepFrequency, {
      errorMap: () => ({
        message: 'Frequência inválida para dificuldade para dormir.',
      }),
    }),
    wakeUpRested: z.nativeEnum(WakeUpRested, {
      required_error: 'Campo obrigatório',
      invalid_type_error: 'Insira uma das opções válidas',
    }),
    daytimeDrowsiness: z.nativeEnum(DaytimeDrowsiness, {
      required_error: 'Campo obrigatório',
      invalid_type_error: 'Insira uma das opções válidas',
    }),
    usageScreenBeforeSleep: z.nativeEnum(UsageScreenBeforeSleep, {
      required_error: 'Campo obrigatório',
      invalid_type_error: 'Insira uma das opções válidas',
    }),
    hasRoutineSleep: z.boolean({
      required_error: 'Campo obrigatório',
      invalid_type_error: 'Insira uma das opções válidas',
    }),
  }),
};

export const reviewUpdateSchema = {
  body: z.object({
    sleepHours: z
      .number()
      .min(0, 'A quantidade mínima de horas de sono é 0')
      .max(24, 'A quantidade máxima de horas de sono é 24'),
    difficultySleepFrequency: z.nativeEnum(DifficultySleepFrequency, {
      errorMap: () => ({
        message: 'Frequência inválida para dificuldade para dormir.',
      }),
    }),
    wakeUpRested: z.nativeEnum(WakeUpRested, {
      required_error: 'Campo obrigatório',
      invalid_type_error: 'Insira uma das opções válidas',
    }),
    daytimeDrowsiness: z.nativeEnum(DaytimeDrowsiness, {
      required_error: 'Campo obrigatório',
      invalid_type_error: 'Insira uma das opções válidas',
    }),
    usageScreenBeforeSleep: z.nativeEnum(UsageScreenBeforeSleep, {
      required_error: 'Campo obrigatório',
      invalid_type_error: 'Insira uma das opções válidas',
    }),
    hasRoutineSleep: z.boolean({
      required_error: 'Campo obrigatório',
      invalid_type_error: 'Insira uma das opções válidas',
    }),
  }),
};
