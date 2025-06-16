import { z } from 'zod';

export const MetasCreateSchema = {
  body: z.object({
    userId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'ID do usuário inválido'),
    descricao: z.string().min(1, 'Descrição é obrigatória'),
    isCompleted: z.boolean({ required_error: "É obrigatório dizer se está ou não completa a tarefa"}),
  }),
};

export const MetasUpdateSchema = {
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'ID da meta é inválido'),
  }),
  body: z.object({
    userId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'ID do usuário inválido'),
    descricao: z.string().min(1, 'Descrição é obrigatória'),
    isCompleted: z.boolean({ required_error: "É obrigatório dizer se está ou não completa a tarefa"}),
  })
}