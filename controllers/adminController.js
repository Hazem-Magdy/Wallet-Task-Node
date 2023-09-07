"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBalanceReport = void 0;
const AdminService_1 = __importDefault(require("../services/AdminService"));
const { sequelize } = require("../Helpers/DataBaseConnection");
const adminService = new AdminService_1.default(sequelize);
function getBalanceReport(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const balanceReports = yield adminService.getBalanceReportAsync();
            return res.status(200).json(balanceReports);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'An error occurred while fetching the balance report.' });
        }
    });
}
exports.getBalanceReport = getBalanceReport;
//# sourceMappingURL=adminController.js.map