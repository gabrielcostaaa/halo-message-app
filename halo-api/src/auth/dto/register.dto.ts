import { z } from 'zod';

export const registerBodySchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  username: z
    .string()
    .min(3, 'Username deve ter pelo menos 3 caracteres')
    .regex(
      /^[a-zA-Z0-9_]+$/,
      'Username só pode conter letras, números e underscore',
    ),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  avatar: z.string().url().optional(),
});

export type RegisterBodyDto = z.infer<typeof registerBodySchema>;
