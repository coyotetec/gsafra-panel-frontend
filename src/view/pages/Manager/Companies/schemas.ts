import { z } from 'zod';

export const companySchema = z.object({
  name: z.string().trim().min(1, {
    message: 'Nome da empresa é obrigatório',
  }),
  code: z.string().trim().min(1, {
    message: 'Código da empresa é obrigatório',
  }),
});
