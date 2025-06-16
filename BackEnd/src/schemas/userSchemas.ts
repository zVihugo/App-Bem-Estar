import { z } from 'zod';

export const userFindSchema = {
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'ID inválido'),
  }),
};

export const userUpdatePasswordSchema = {
  body: z.object({
    senhaAntiga: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres'),
    novaSenha: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres'),
  }),
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'ID inválido'),
  }),
};

export const userUpdateProfileSchema = {
  body: z.object({
    name: z
      .string()
      .min(1, 'Nome é obrigatório')
      .max(30, 'O nome deve ter 30 caracteres ou menos')
      .regex(/^[a-zA-Z ]+$/, {
        message: 'O nome deve conter apenas letras e espaços',
      }),
    dataDeNascimento: z
      .string()
      .regex(
        /^\d{2}\/\d{2}\/\d{4}$/,
        'Data de nascimento deve estar no formato dd/mm/yyyy'
      ),
    faculdade: z.string().min(1, 'Faculdade é obrigatória'),
    curso: z.string().min(1, 'Curso é obrigatório'),
  }),
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'ID inválido'),
  }),
};
