"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = __importDefault(require("./routes"));
require("./helpers/DataBaseConnection");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const { LocalStorage } = require('node-localstorage');
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
// Initialize the server-side local storage
const localStorage = new LocalStorage('./localStorage');
// Set data in local storage
localStorage.setItem('language', 'en');
function translate(key, lang = 'ar') {
    // Get the preferred language from localStorage, or use the default
    const preferredLang = localStorage.getItem('language') || lang;
    // Adjust the path to your 'locales' folder in the root directory
    const localesDir = path.join(__dirname, '../locales');
    // Check if the requested language file exists
    const langFile = path.join(localesDir, `${preferredLang || lang}.json`);
    if (!fs.existsSync(langFile)) {
        return `Translation for language '${lang}' not found`;
    }
    // Load the language file
    const translations = require(langFile);
    // Retrieve the translation for the given key, or return the key itself if not found
    return translations[key] || key;
}
console.log(translate("fatal_error"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 84;
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(routes_1.default);
// Home Page
app.get('/', (_req, res) => {
    res.send('welcome from EPL House home page...............');
});
// Error Handling Middleware
app.use((err, _req, res, _next) => {
    console.error(err.stack);
    //res.status(500).send('Something went wrong!');
    if (!res.headersSent) {
        res.status(500).json({ error: 'Something went wrong! from error middleware.........' });
    }
});
app.listen(port, () => {
    console.log(`server is running on port ${port}................`);
});
//# sourceMappingURL=server.js.map