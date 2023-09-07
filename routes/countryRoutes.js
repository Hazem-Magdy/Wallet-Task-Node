"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const CountryController_1 = require("../controllers/lookups/CountryController");
const countryControllerInstance = new CountryController_1.CountryController();
// getAllCountries route
router.get('/list', (req, res) => {
    countryControllerInstance.getAllCountries(req, res);
});
// createCountry route
router.post('/create', (req, res) => {
    countryControllerInstance.createCountry(req, res);
});
exports.default = router;
//# sourceMappingURL=countryRoutes.js.map