import fs from 'fs';
import { google } from 'googleapis';
import { getToken } from "./get-token.js";

interface CredentialFile {
  path: string;
  errorMessage: string;
}

const CREDENTIALS: CredentialFile = {
  path: './auth/credentials.json',
  errorMessage: "❌ Помилка: файлу credentials.json в папці auth/ немає!"
};

const TOKEN: CredentialFile = {
  path: './auth/token.json',
  errorMessage: "❌ Помилка: файлу token.json в папці auth/ немає!"
};

const loadJson = (file: CredentialFile) => {
  if (!fs.existsSync(file.path)) {
    return null;
  }
  return JSON.parse(fs.readFileSync(file.path, 'utf-8'));
};

if (!fs.existsSync(CREDENTIALS.path)) {
  console.error(CREDENTIALS.errorMessage);
  process.exit(1);
}
const { client_secret, client_id, redirect_uris } = loadJson(CREDENTIALS).installed;

const ensureToken = async (): Promise<any> => {
  let tokenData = loadJson(TOKEN);
  while (!tokenData) {
    console.log("⚠️ Токен не знайденний, створюємо новий...");
    try {
      await getToken();
      tokenData = loadJson(TOKEN);
    } catch (err) {
      console.error("❌ Помилка при отриманні токену:", err);
      console.log("⚠️ Пробуємо наново...");
    }
  }
  return tokenData;
};

const tokenData = await ensureToken();

// настройка OAuth2
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
oAuth2Client.setCredentials(tokenData);

export const forms = google.forms({ version: 'v1', auth: oAuth2Client });
