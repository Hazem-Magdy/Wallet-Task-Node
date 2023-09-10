"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const adminController_1 = __importDefault(require("../controllers/adminController"));
// Balance report route
router.get('/balance-report', adminController_1.default.generateBalanceReport);
exports.default = router;
//# sourceMappingURL=adminRoutes.js.map