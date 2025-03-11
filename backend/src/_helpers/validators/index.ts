import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string({ required_error: "Name is required" }).min(3),
  email: z
    .string({ required_error: "Email is required" })
    .email('Invalid email address'),
  password: z.string({ required_error: "Password is required" }).min(5),
});

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email('Invalid email address'),
  password: z.string({ required_error: "Password is required" }),
});

export const messageSchema = z.object({
  sender: z.string({ required_error: "Sender is required" }),
  to: z.string({ required_error: "To is required" }),
  subject: z.string({ required_error: "Subject is required" }),
  body: z.string({ required_error: "Body is required" })
});
