import { z } from 'zod';

export const userSchema = z
  .object({
    userRole: z.object({
      value: z.enum(['ADMIN', 'USER', 'MANAGER'], {
        invalid_type_error: 'Insira um papel de usuário válido',
      }),
    }),
    company: z
      .object({
        id: z.string(),
      })
      .optional(),
    email: z.string().trim().email({
      message: 'Insira um endereço de email válido',
    }),
  })
  .superRefine((val, ctx) => {
    if (val.userRole.value !== 'MANAGER' && !val.company) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Empresa é obrigatório para este papel',
        path: ['company'],
      });
    }

    
  });
