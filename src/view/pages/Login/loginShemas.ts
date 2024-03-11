import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string({
      invalid_type_error: 'Email must be a string',
      required_error: 'Email is a required field',
    })
    .email({ message: 'E-mail inválido' })
    .trim(),
  password: z.string().trim(),
  // .superRefine((data, ctx) => {
  //   if (data.length < 8) {
  //     return ctx.addIssue({
  //       code: z.ZodIssueCode.custom,
  //       message: 'A senha deve ter pelo menos 8 caracteres',
  //     });
  //   }
  //   if (!(/[a-zA-Z]/.test(data) && /\d/.test(data))) {
  //     ctx.addIssue({
  //       code: z.ZodIssueCode.custom,
  //       message: 'A senha deve conter letras e números',
  //     });
  //   }
  // }),
});
