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
Object.defineProperty(exports, "__esModule", { value: true });
const Utilservice_1 = require("./Utilservice");
const { transactionModel, userModel } = require("../Helpers/DataBaseConnection");
class AdminService {
    constructor(sequelizeInstance) {
        this.sequelizeInstance = sequelizeInstance;
    }
    getBalanceReportAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const UtilService = new Utilservice_1.Utilservice();
                console.log(UtilService.add(10, 20));
                const balanceReports = yield userModel.findAll({
                    attributes: ["mobile", "name"],
                    include: [
                        {
                            model: transactionModel,
                            as: "SentTransactions",
                            attributes: [
                                [
                                    this.sequelizeInstance.fn("SUM", this.sequelizeInstance.col("amount")),
                                    "TotalSentAmount",
                                ],
                            ],
                            where: { senderUserId: this.sequelizeInstance.col("User.id") },
                        },
                    ],
                });
                return balanceReports;
            }
            catch (error) {
                console.error(error);
                return [];
            }
        });
    }
}
exports.default = AdminService;
