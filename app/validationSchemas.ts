import { z } from 'zod';

export const userSchema = z.object({
  name: z.string().min(1, 'Name is required.').max(255),
  email: z.string().min(1, 'Email is required.'),
});

export const registerUserSchema = z.object({
  name: z.string().min(1, 'Name is required.').max(255),
  email: z.string().min(1, 'Email is required.'),
  password: z
    .string()
    .min(6, 'Password with a minimum of 6 characters is required.'),
});

export const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required.').max(255),
  email: z.string().min(1, 'Email is required.'),
  message: z.string().min(1, 'A message is required.'),
});
