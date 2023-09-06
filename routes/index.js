"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const accountRoutes_1 = __importDefault(require("./accountRoutes"));
const walletRoutes_1 = __importDefault(require("./walletRoutes"));
const adminRoutes_1 = __importDefault(require("./adminRoutes"));
const countryRoutes_1 = __importDefault(require("./countryRoutes"));
const policyMiddleware_1 = require("../middlewares/policyMiddleware");
let webBaseUrl = '/api/v1/web';
router.use(`${webBaseUrl}`, policyMiddleware_1.applyPolicy);
router.use(`${webBaseUrl}/Account`, accountRoutes_1.default);
router.use(`${webBaseUrl}/Wallet`, walletRoutes_1.default);
router.use(`${webBaseUrl}/Admin`, adminRoutes_1.default);
router.use(`${webBaseUrl}/Country`, countryRoutes_1.default);
exports.default = router;
