import { z } from 'zod';

export const authRegisterSchema = {
  body: z.object({
    name: z
      .string()
      .min(1, 'Nome é obrigatório')
      .max(30, 'O nome deve ter 30 caracteres ou menos')
      .regex(/^[a-zA-Z ]+$/, {
        message: 'O nome deve conter apenas letras e espaços',
      }),
    email: z.string().email('E-mail inválido'),
    password: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres'),
    dateOfBirth: z
      .string()
      .regex(
        /^\d{2}\/\d{2}\/\d{4}$/,
        'Data de nascimento deve estar no formato dd/mm/yyyy'
      ),
    faculty: z.string().min(1, 'Faculdade é obrigatória'),
    course: z.string().min(1, 'Curso é obrigatório'),
  }),
};

export const authLoginSchema = {
  body: z.object({
    email: z.string().email('E-mail inválido'),
    password: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres'),
  }),
};
