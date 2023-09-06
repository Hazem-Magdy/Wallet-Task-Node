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
const { sequelize, userModel } = require("../Helpers/DataBaseConnection");
class UserRepository {
    constructor() {
        this._transaction = null;
    }
    getUserByIdAsync(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return userModel.findByPk(userId);
        });
    }
    getUserByMobileAsync(mobile) {
        return __awaiter(this, void 0, void 0, function* () {
            return userModel.findOne({ where: { mobile } });
        });
    }
    updateUserAsync(user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield user.save();
            return true;
        });
    }
    beginTransactionAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            this._transaction = yield sequelize.transaction();
        });
    }
    commitTransactionAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._transaction) {
                yield this._transaction.commit();
                this._transaction = null;
            }
        });
    }
    rollbackTransaction() {
        if (this._transaction) {
            this._transaction.rollback();
            this._transaction = null;
        }
    }
}
exports.default = UserRepository;