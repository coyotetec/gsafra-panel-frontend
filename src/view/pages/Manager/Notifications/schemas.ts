import { z } from 'zod';

export const notificationSchema = z
  .object({
    title: z.string().trim().min(1, {
      message: 'Título da notificação é obrigatório',
    }),
    body: z.string().trim().min(1, {
      message: 'Corpo da notificação é obrigatório',
    }),
    allCompanies: z.boolean(),
    selectedCompanies: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
      }),
    ),
  })
  .superRefine((val, ctx) => {
    if (!val.allCompanies && val.selectedCompanies.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Selecione ao menos uma empresa',
        path: ['selectedCompanies'],
      });
    }
  });
