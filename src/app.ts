import fs from 'fs';
import { createForm } from "./outh/createForm.js";


function main() {
  const filePath = './static/test.json';
  const formData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  console.log("Все успішно прочитано \n Свторення форми..")
  createForm(formData).catch(console.error);
}

main();