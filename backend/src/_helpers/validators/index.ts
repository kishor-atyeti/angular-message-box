import { z } from 'zod';

export const registerSchema = z.object({

  name: z.string({required_error: "Name is required"}).min(3),
  email: z
    .string({required_error: "Email is required"})
    .email('Invalid email address'),
  password: z.string({required_error: "Password is required"}).min(5),

});

export const loginSchema = z.object({
  email: z
    .string({required_error: "Email is required"})
    .email('Invalid email address'),
  password: z.string({required_error: "Password is required"}),

});
