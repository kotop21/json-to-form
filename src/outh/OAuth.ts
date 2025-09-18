import fs from 'fs';

const CREDENTIALS_PATH = './auth/credentials.json';
const TOKEN_PATH = './auth/token.json';

if (!fs.existsSync(CREDENTIALS_PATH)) {
  console.error("Помилка: файлу credentials.json в папці auth/ немає!");
  process.exit(1);
}

if (!fs.existsSync(TOKEN_PATH)) {
  console.error("Помилка: файлу token.json в папці auth/ немає!");
  process.exit(1);
}

export const loadCredentials = () => {
  return JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf-8'));
};

export const loadToken = () => {
  return JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf-8'));
};
