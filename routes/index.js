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
router.use('/api/account', accountRoutes_1.default);
router.use('/api/wallet', walletRoutes_1.default);
router.use('/api/admin', adminRoutes_1.default);
router.use('/api/country', countryRoutes_1.default);
exports.default = router;
