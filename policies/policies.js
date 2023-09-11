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
        transfer: [authMiddleware_1.isAuthenticated, authMiddleware_1.isAuthorized],
    },
    AdminController: {
        "*": [],
        "balance-report": [authMiddleware_1.isAuthenticated, authMiddleware_1.isAuthorized],
    },
    AccountController: {
        "*": [],
        login: [],
        register: []
    }
};
exports.policies = policies;
//# sourceMappingURL=policies.js.map