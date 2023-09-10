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
const DataBaseConnection_1 = require("../helpers/DataBaseConnection");
class TransactionRepository {
    constructor() { }
    addTransactionAsync(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield DataBaseConnection_1.transactionModel.create(transaction);
                return true;
            }
            catch (error) {
                console.error(error);
                return false;
            }
        });
    }
}
exports.default = TransactionRepository;
//# sourceMappingURL=TransactionRepository%20.js.map