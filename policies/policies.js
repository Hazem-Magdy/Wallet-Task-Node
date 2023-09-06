"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.policies = void 0;
const authMiddleware_1 = require("../middlewares/authMiddleware");
const policies = {
    "*": {
        "*": [],
    },
    WalletController: {
        "*": [],
        transfer: [authMiddleware_1.checkUser, authMiddleware_1.testMiddleware],
    },
};
exports.policies = policies;
