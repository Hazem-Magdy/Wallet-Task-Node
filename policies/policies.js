"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.policies = void 0;
const policies = {
    "*": {
    //"*": [checkUser],
    },
    WalletController: {
    //"*": [checkUser],
    //transfer: [checkUser,testMiddleware1,testMiddleware2],
    },
    AccountController: {
    //"*": [checkUser],
    //login:[checkUser,testMiddleware1],
    //register:[checkUser,testMiddleware1,testMiddleware2]
    }
};
exports.policies = policies;
//# sourceMappingURL=policies.js.map