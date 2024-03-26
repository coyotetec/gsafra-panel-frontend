import { z } from 'zod';

export const createPasswordSchema = z
  .object({
    password: z.string().trim().min(8, {
      message: 'A senha deve conter pelo menos 8 caracteres',
    }),
    confirmPassword: z.string().trim().min(8, {
      message: 'A senha deve conter pelo menos 8 caracteres',
    }),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'As senhas não são iguais',
        path: ['confirmPassword'],
      });
    }
  });
