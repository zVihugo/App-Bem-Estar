import {
  DificuldadeParaDormir,
  AcordaDescansado,
  SofreComSonoDuranteODia,
  UsaTelaAntesDeDormir,
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
    mediaSono: z
      .number()
      .min(0, 'A quantidade mínima de horas de sono é 0')
      .max(24, 'A quantidade máxima de horas de sono é 24'),
    DificuldadeParaDormir: z.nativeEnum(DificuldadeParaDormir, {
      errorMap: () => ({
        message: 'Frequência inválida para dificuldade para dormir.',
      }),
    }),
    AcordaDescansado: z.nativeEnum(AcordaDescansado, {
      required_error: 'Campo obrigatório',
      invalid_type_error: 'Insira uma das opções válidas',
    }),
    SofreComSonoDuranteODia: z.nativeEnum(SofreComSonoDuranteODia, {
      required_error: 'Campo obrigatório',
      invalid_type_error: 'Insira uma das opções válidas',
    }),
    UsaTelaAntesDeDormir: z.nativeEnum(UsaTelaAntesDeDormir, {
      required_error: 'Campo obrigatório',
      invalid_type_error: 'Insira uma das opções válidas',
    }),
    TemRotinaDeSono: z.boolean({
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
    DificuldadeParaDormir: z.nativeEnum(DificuldadeParaDormir, {
      errorMap: () => ({
        message: 'Frequência inválida para dificuldade para dormir.',
      }),
    }),
    AcordaDescansado: z.nativeEnum(AcordaDescansado, {
      required_error: 'Campo obrigatório',
      invalid_type_error: 'Insira uma das opções válidas',
    }),
    SofreComSonoDuranteODia: z.nativeEnum(SofreComSonoDuranteODia, {
      required_error: 'Campo obrigatório',
      invalid_type_error: 'Insira uma das opções válidas',
    }),
    UsaTelaAntesDeDormir: z.nativeEnum(UsaTelaAntesDeDormir, {
      required_error: 'Campo obrigatório',
      invalid_type_error: 'Insira uma das opções válidas',
    }),
    TemRotinaDeSono: z.boolean({
      required_error: 'Campo obrigatório',
      invalid_type_error: 'Insira uma das opções válidas',
    }),
  }),
};
