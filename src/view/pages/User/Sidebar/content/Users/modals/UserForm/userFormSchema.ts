import { z } from 'zod';

export const userFormSchema = z.object({
  name: z
    .string({ required_error: 'Nome é um campo obrigatório' })
    .min(3, { message: 'Nome deve ter no mínimo 3 caracteres' })
    .trim(),
  email: z
    .string({ required_error: 'Email é um campo obrigatório' })
    .email({ message: 'Seu email deve ter o formato correto de email' })
    .trim(),
  role: z.enum(['USER', 'ADMIN', 'MANAGER'], {
    required_error:
      'Papel de usuário é um campo obrigatório, selecione uma opção',
  }),
  companyId: z
    .string({
      required_error: 'Empresa é um campo obrigatório, selecione uma opção',
    })
    .uuid(),
  externalId: z.number({
    required_error:
      'Usuário no sistema é um campo obrigatório, selecione uma opção',
  }),
});
