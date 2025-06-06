import { Type } from '@prisma/client';
import { z } from 'zod';

export const dicaCreateSchema = {
  body: z.object({
    userId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'ID do usuário inválido'),
    title: z.string().min(1, 'Título é obrigatório'),
    imageUrl: z.string().min(1, 'URL da imagem é obrigatória'),
    type: z.nativeEnum(Type, {
      required_error: 'Campo obrigatório',
      invalid_type_error:
        'Insira uma das opções válidas: ler, assistir ou ouvir',
    }),
  }),
};

export const dicaUpdateSchema = {
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'ID da dica inválido'),
  }),
  body: z.object({
    title: z.string().min(1, 'Título é obrigatório'),
    imageUrl: z.string().min(1, 'URL da imagem é obrigatória'),
    type: z.nativeEnum(Type, {
      required_error: 'Campo obrigatório',
      invalid_type_error:
        'Insira uma das opções válidas: ler, assistir ou ouvir',
    }),
  }),
};
