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
                    name: senderUser.name,
                    mobile: senderUser.mobile,
                    balance: senderUser.balance,
                    role: senderUser.role,
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
}
exports.default = TransactionService;
//# sourceMappingURL=TransactionService.js.map