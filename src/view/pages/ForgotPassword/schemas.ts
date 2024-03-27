import { z } from 'zod';

export const emailSchema = z.string().trim().email({
  message: 'Insira um e-mail válido',
});
