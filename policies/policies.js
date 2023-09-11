"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.policies = void 0;
//import {checkUser,testMiddleware1,testMiddleware2} from '../middlewares/authMiddleware';
const authMiddleware_1 = require("../middlewares/authMiddleware");
const policies = {
    "*": {
        "*": [],
    },
    WalletController: {
        //"*": [checkUser],
        transfer: [authMiddleware_1.isAuthenticated, (0, authMiddleware_1.isAuthorized)("User"),],
    },
    AccountController: {
    //"*": [checkUser],
    //login:[checkUser,testMiddleware1],
    //register:[checkUser,testMiddleware1,testMiddleware2]
    }
};
exports.policies = policies;
//# sourceMappingURL=policies.js.map