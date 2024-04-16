import { z } from 'zod';

export const companySchema = z.object({
  name: z.string().trim().min(1, {
    message: 'Nome da empresa é obrigatório',
  }),
  host: z.string().trim().min(1, {
    message: 'Servidor da empresa é obrigatório',
  }),
  code: z.string().trim().min(1, {
    message: 'Código da empresa é obrigatório',
  }),
});

export const gsafraUsersSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email({
      message: 'Insira um e-mail válido',
    }),
  }),
);
