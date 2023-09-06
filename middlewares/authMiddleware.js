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
exports.testMiddleware = exports.checkUser = void 0;
const checkUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        console.log("checkUser middleware .............");
        if (!token) {
            console.log("checkUser middleware error.............");
            return res.status(401).json({ message: "Token not provided" });
        }
        console.log("checkUser middleware finish.............");
        next();
    }
    catch (error) {
    }
});
exports.checkUser = checkUser;
const testMiddleware = (req, res, next) => {
    console.log("Testing middleware .............");
    next();
};
exports.testMiddleware = testMiddleware;