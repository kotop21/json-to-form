import { loadCredentials, loadToken } from './OAuth.js';
import { google, forms_v1 } from 'googleapis';
import type { Question, FormData } from "../types/create-from-types.js";

export const createForm = async (formData: FormData): Promise<void> => {
  const { client_secret, client_id, redirect_uris } = loadCredentials().installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
  oAuth2Client.setCredentials(loadToken());

  const forms = google.forms({ version: 'v1', auth: oAuth2Client });

  const res = await forms.forms.create({
    requestBody: {
      info: { title: formData.title || 'Новий тест' }
    }
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

  console.log(`Форма створенна: https://docs.google.com/forms/d/${formId}/edit`);
};
