import { z } from "zod";

export const QuestionSchema = z.object({
  question: z.string().min(1, "Поле `питання` обов'язкове та не може бути порожнім"),
  options: z.array(z.string().min(1)).min(2, "Має бути мінімум 2 варіанти відповіді"),
  correctAnswer: z.string().min(1, "Правильна відповідь обов'язкова"),
  points: z.number().int().positive("Кількість балів повинна бути більшою за 0").default(0),
});

export const Forma = z.object({
  title: z.string().min(1, "Заголовок обов'язковий"),
  defaultPoints: z.number().int().positive("Кількість балів за замовчуванням повинна бути додатною"),
  questions: z.array(QuestionSchema).min(1, "Має бути хоча б одне питання")
});

export type Question = z.infer<typeof QuestionSchema>;
export type Test = z.infer<typeof Forma>;
