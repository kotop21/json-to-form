# Google Forms JSON to Form Generator

Цей проект на Node.js дозволяє створювати Google Forms з JSON файлу. Програма використовує OAuth 2.0 для доступу до вашого облікового запису Google.

## Початок роботи

### Вимоги

- Node.js >= 18
- pnpm
- Обліковий запис Google

### Встановлення

1. Клонувати репозиторій:

   ```bash
   git clone https://github.com/kotop21/json-to-form.git
   cd json-to-form
   ```

2. Встановити залежності:

   ```bash
   pnpm install
   ```

### Налаштування OAuth 2.0

1. Створіть OAuth 2.0 credentials у Google Cloud Console.
2. Завантажте `credentials.json` та `token.json` збережіть їх у папку `auth`.

Файлова структура папки `auth`:

```
auth/
  ├─ credentials.json
  └─ token.json
```

### Формат JSON для форми

JSON файл повинен містити опис форми та її полів, наприклад:

```json
{
  "title": "Моя крута форма",
  "defaultPoints": 50,
  "questions": [
    {
      "question": "2+2?",
      "options": ["3", "4", "5"],
      "correctAnswer": "4"
    },
    {
      "question": "Столиця Франції?",
      "options": ["Берлін", "Париж", "Лондон"],
      "correctAnswer": "Париж",
      "points": 1
    }
  ]
}
```

### Запуск програми

1. Запустіть програму:

   ```bash
   pnpm start
   ```

2. Вкажіть ваш `json` файл.

3. **Готово** Програма створить форму у вашому Google Form.

### Примітки

- Переконайтеся, що `credentials.json` та `token.json` знаходяться у папці `auth`.
