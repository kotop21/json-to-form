import express from "express";
import { OAuth2Client } from "google-auth-library";
import { promises as fs } from "fs";
import path from "path";
import keys from "../../auth/credentials.json" with { type: "json" };

const TOKEN_PATH = path.resolve("./auth/token.json");

export async function getToken() {
  return new Promise<void>((resolve, reject) => {
    const creds: any = (keys as any).web ?? (keys as any).installed;
    const oAuth2Client = new OAuth2Client({
      clientId: creds.client_id,
      clientSecret: creds.client_secret,
      redirectUri: creds.redirect_uris[0],
    });

    const authorizeUrl = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: [
        "https://www.googleapis.com/auth/forms.body",
        "https://www.googleapis.com/auth/forms.responses.readonly"
      ],
      prompt: "consent",
    });

    const app = express();
    const server = app.listen(80, () => {
      console.log("👉 Перейди за посиланням для авторизациї:");
      console.log(authorizeUrl);
    });

    app.get("/", async (req, res) => {
      try {
        const code = req.query.code as string;
        if (!code) return reject("❌ No code found");

        const { tokens } = await oAuth2Client.getToken(code);
        await fs.mkdir(path.dirname(TOKEN_PATH), { recursive: true });
        await fs.writeFile(TOKEN_PATH, JSON.stringify(tokens, null, 2), "utf-8");
        console.log(`✅ Токен збережений до ${TOKEN_PATH}`);

        res.send("✅ Авторизація пройшла успішно! Можеш закрити вкладку.");
        server.close();
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  });
}
