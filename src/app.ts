import fs from 'fs';
import { createForm } from "./form/create-form.js";
import { readJsonFile } from "./file-utils.js";
import * as readline from 'readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const input = (str: string) => {
  return new Promise<string>((resolve) => {
    rl.question(str, (answer) => resolve(answer));
  });
}

async function main() {
  while (true) {
    const filePath = await input("Файл: ");
    const formData = await readJsonFile(filePath);

    console.log("Все успішно прочитано \nСтворення форми...");
    const formId = await createForm(formData);

    console.log(`Форма створена: https://docs.google.com/forms/d/${formId}/edit`);
    break;
  }
  rl.close();
}

main()
  .then(() => {
    console.log("Вкажи путь до файлу.")
  })
  .catch((err: any) => {
    console.log("Помилка: ", err.message);
    console.log("Спробуйте ще раз...\n");
    process.exit(1);
  });