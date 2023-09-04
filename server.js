"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = __importDefault(require("./routes"));
require("./Helpers/DataBaseConnection");
const app = (0, express_1.default)();
const port = 6000;
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use(routes_1.default);
// Home Page
app.get('/', (_req, res) => {
    res.send('welcome from EPL House home page...............');
});
// Error Handling Middleware
app.use((err, _req, res, _next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});
app.listen(port, () => {
    console.log(`server is running on port ${port}................`);
});
