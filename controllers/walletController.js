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
exports.transfer = void 0;
const UserRepository_1 = __importDefault(require("../repositories/UserRepository "));
const TransactionRepository_1 = __importDefault(require("../repositories/TransactionRepository "));
const TransactionService_1 = __importDefault(require("../services/TransactionService"));
const userRepository = new UserRepository_1.default();
const transactionRepository = new TransactionRepository_1.default();
const transactionService = new TransactionService_1.default(userRepository, transactionRepository);
function transfer(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { senderMobile, receiverMobile, amount } = req.body;
            const senderUser = yield userRepository.getUserByMobileAsync(senderMobile);
            const receiverUser = yield userRepository.getUserByMobileAsync(receiverMobile);
            if (!senderUser) {
                return res.status(400).json({ message: 'Sender user not found.' });
            }
            if (!receiverUser) {
                return res.status(400).json({ message: 'Receiver user not found.' });
            }
            const transferSuccess = yield transactionService.transferBalance(senderUser, receiverUser, amount);
            if (transferSuccess) {
                return res.status(200).json({ message: 'Balance transfer successful.' });
            }
            else {
                return res.status(500).json({ message: 'An error occurred during balance transfer.' });
            }
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'An error occurred.' });
        }
    });
}
exports.transfer = transfer;
