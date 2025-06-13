import { Tipo } from '@prisma/client';
import { z } from 'zod';

export const dicaCreateSchema = {
  body: z.object({
    userId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'ID do usuário inválido'),
    titulo: z.string().min(1, 'Título é obrigatório'),
    thumbnailUrl: z.string().min(1, 'URL da imagem é obrigatória'),
    tipo: z.nativeEnum(Tipo, {
      required_error: 'Campo obrigatório',
      invalid_type_error:
        'Insira uma das opções válidas: ler, assistir ou ouvir',
    }),
    link: z.string().min(1, 'Link é obrigatório'),
  }),
};

export const dicaUpdateSchema = {
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'ID da dica inválido'),
  }),
  body: z.object({
    titulo: z.string().min(1, 'Título é obrigatório'),
    thumbnailUrl: z.string().min(1, 'URL da imagem é obrigatória'),
    tipo: z.nativeEnum(Tipo, {
      required_error: 'Campo obrigatório',
      invalid_type_error:
        'Insira uma das opções válidas: ler, assistir ou ouvir',
    }),
    link: z.string().min(1, 'Link é obrigatório'),
  }),
};
