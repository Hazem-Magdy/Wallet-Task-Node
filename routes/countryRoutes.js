"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const CountryController_1 = require("../controllers/CountryController");
const countryControllerInstance = new CountryController_1.CountryController();
// getAllCountries route
router.get('/list', authMiddleware_1.default, (req, res) => {
    countryControllerInstance.getAllCountries(req, res);
});
router.post('/create', authMiddleware_1.default, (req, res) => {
    countryControllerInstance.createCountry(req, res);
});
exports.default = router;
