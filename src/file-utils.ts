import fs from "fs";
import path from "path";
import { Forma } from "./schemas.js";
import type { Test } from "./schemas.js";
import { ZodError } from "zod";

export async function readJsonFile(filePath: string): Promise<Test> {
  if (!path.isAbsolute(filePath)) {
    throw new Error("Вкажи абсолютний шлях до файлу!");
  }

  if (path.extname(filePath).toLowerCase() !== ".json") {
    throw new Error("Файл не є JSON!");
  }

  try {
    const content = fs.readFileSync(filePath, "utf-8");
    const jsonData = JSON.parse(content);

    return Forma.parse(jsonData);

  } catch (err: any) {
    if (err instanceof ZodError) {
      const formatted = err.issues
        .map((issue) => `- ${issue.path.join(".")}: ${issue.message}`)
        .join("\n");
      throw new Error("Валідації JSON:\n" + formatted);
    }

    throw new Error("При читанні або парсингу JSON: " + err.message);
  }
}
