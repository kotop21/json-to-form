import fs from 'fs';
import { google } from 'googleapis';

interface CredentialFile {
  path: string;
  errorMessage: string;
}

const CREDENTIALS: CredentialFile = { path: './auth/credentials.json', errorMessage: "Помилка: файлу credentials.json в папці auth/ немає!" };
const TOKEN: CredentialFile = { path: './auth/token.json', errorMessage: "Помилка: файлу token.json в папці auth/ немає!" };

const loadJson = ({ path, errorMessage }: CredentialFile) => {
  if (!fs.existsSync(path)) {
    console.error(errorMessage);
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(path, 'utf-8'));
};

const { client_secret, client_id, redirect_uris } = loadJson(CREDENTIALS).installed;
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
oAuth2Client.setCredentials(loadJson(TOKEN));

export const forms = google.forms({ version: 'v1', auth: oAuth2Client });
