import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2),
  lastname: z.string().trim().optional().or(z.literal("")),
  email: z.string().email(),
  password: z.string().min(6)
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export const attemptSchema = z.object({
  examId: z.string().min(1),
  score: z.number().min(0).max(100),
  answers: z.array(
    z.object({
      questionId: z.string().min(1),
      answer: z.string().min(1),
      correct: z.boolean()
    })
  )
});

export const supportSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  amount: z.number().min(1),
  message: z.string().max(300).optional()
});
