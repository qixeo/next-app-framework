import { z } from 'zod';

export const userSchema = z.object({
  name: z.string().min(1, 'Name is required.').max(255),
  email: z.string().min(1, 'Email is required.'),
});

