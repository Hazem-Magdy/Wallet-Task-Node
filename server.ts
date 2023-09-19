import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import './helpers/DataBaseConnection';
import cors from 'cors'
import dotenv from "dotenv";
const { LocalStorage } = require('node-localstorage');
import * as path from 'path';
import * as fs from 'fs';

// Initialize the server-side local storage
const localStorage = new LocalStorage('./localStorage');

// Set data in local storage
localStorage.setItem('language', 'fr');

function translate(key: string, lang: string = 'ar'): string {
  const preferredLang = localStorage.getItem('language') || lang;
  const localesDir = path.join(__dirname, './locales');
  const langFile = path.join(localesDir, `${preferredLang || lang}.json`);
  
  if (!fs.existsSync(langFile)) {
    return `Translation for language '${lang}' not found`;
  }

  const translations = require(langFile);
  return translations[key] || key;
}

console.log(translate("fatal_error"));

dotenv.config();

const app = express();
const port = 84;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST','PUT','DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(routes);

// Home Page
app.get('/', (_req, res) => {
  res.send('welcome from EPL House home page...............');
});

// Error Handling Middleware
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err.stack);
  //res.status(500).send('Something went wrong!');
  if (!res.headersSent) {
    res.status(500).json({ error: 'Something went wrong! from error middleware.........' });
  }
});

app.listen(port, () => {
  console.log(`server is running on port ${port}................`);
});

