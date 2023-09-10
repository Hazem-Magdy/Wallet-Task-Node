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
class TransactionService {
    constructor(userRepository, transactionRepository) {
        this.userRepository = userRepository;
        this.transactionRepository = transactionRepository;
    }
    transferBalance(senderUser, receiverUser, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (senderUser.balance < amount) {
                    return false;
                }
                senderUser.balance -= amount;
                receiverUser.balance += amount;
                const transactionRecord = {
                    senderMobile: senderUser.mobile,
                    receiverMobile: receiverUser.mobile,
                    balance: senderUser.balance,
                };
                yield this.userRepository.beginTransactionAsync();
                const updateSenderResult = yield this.userRepository.updateUserAsync(senderUser);
                const updateReceiverResult = yield this.userRepository.updateUserAsync(receiverUser);
                const addTransactionResult = yield this.transactionRepository.addTransactionAsync(transactionRecord);
                if (updateSenderResult && updateReceiverResult && addTransactionResult) {
                    yield this.userRepository.commitTransactionAsync();
                    return true;
                }
                else {
                    this.userRepository.rollbackTransaction();
                    return false;
                }
            }
            catch (error) {
                this.userRepository.rollbackTransaction();
                console.error(error);
                return false;
            }
        });
    }
    static generateBalanceReport() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const transactions = yield DataBaseConnection_1.transactionModel.findAll({
                    attributes: ['id', 'senderMobile', 'receiverMobile', 'balance'],
                });
                // Format the data into the DTO
                const reportData = transactions.map((transaction) => ({
                    id: transaction.id,
                    senderMobile: transaction.senderMobile,
                    receiverMobile: transaction.receiverMobile,
                    balance: transaction.balance,
                }));
                return reportData;
            }
            catch (error) {
                throw new Error('Error generating transaction report');
            }
        });
    }
}
exports.default = TransactionService;
//# sourceMappingURL=TransactionService.js.map