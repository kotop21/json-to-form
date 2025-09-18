import { forms } from './auth-form.js';
import { forms_v1 } from 'googleapis';
import type { FormData } from "../types/create-from-types.js";


export const createForm = async (formData: FormData): Promise<string> => {
  try {
    const res = await forms.forms.create({
      requestBody: { info: { title: formData.title || 'Нова форма' } }
    });

    const formId = res.data.formId as string;

    const requests: forms_v1.Schema$Request[] = [
      {
        updateSettings: {
          settings: { quizSettings: { isQuiz: true } },
          updateMask: 'quizSettings'
        }
      },
      ...formData.questions.map((q, index) => {
        const points = q.points ?? formData.defaultPoints ?? 0;
        const grading: forms_v1.Schema$Grading = q.correctAnswer
          ? {
            pointValue: points,
            correctAnswers: { answers: [{ value: q.correctAnswer }] }
          }
          : {} as forms_v1.Schema$Grading;

        return {
          createItem: {
            item: {
              title: q.question,
              questionItem: {
                question: {
                  required: true,
                  grading,
                  choiceQuestion: {
                    type: 'RADIO',
                    options: q.options.map(option => ({ value: option })),
                    shuffle: false
                  }
                }
              }
            },
            location: { index }
          }
        };
      })
    ];

    await forms.forms.batchUpdate({
      formId,
      requestBody: { requests }
    });

    return formId;
  } catch (err: any) {
    throw new Error("❌ Помилка при створенні форми: " + err.message);
  }
};
