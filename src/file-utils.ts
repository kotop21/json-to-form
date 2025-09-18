import fs from 'fs';
import path from 'path';

export async function readJsonFile(filePath: string): Promise<any> {
  if (!path.isAbsolute(filePath)) {
    throw new Error("Вкажи абсолютний шлях до файлу!");
  }

  if (path.extname(filePath).toLowerCase() !== '.json') {
    throw new Error("Файл не є JSON!");
  }

  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (err: any) {
    throw new Error("Помилка при читанні або парсингу JSON: " + err.message);
  }
}
