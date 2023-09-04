"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const bcrypt = __importStar(require("bcrypt"));
const jwt = __importStar(require("jsonwebtoken"));
const UserRepository_1 = __importDefault(require("../repositories/UserRepository "));
const { userModel } = require("../Helpers/DataBaseConnection");
const userRepository = new UserRepository_1.default();
class UserService {
    registerUser(name, mobile, password, role) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingUser = yield userRepository.getUserByMobileAsync(mobile);
                if (existingUser) {
                    return false;
                }
                const hashedPassword = yield bcrypt.hash(password, 10);
                const newUser = {
                    name,
                    mobile,
                    password: hashedPassword,
                    role,
                    balance: 1000.0,
                };
                const createdUser = yield userModel.create(newUser);
                return !!createdUser;
            }
            catch (error) {
                console.error(error);
                return false;
            }
        });
    }
    loginUser(mobile, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userModel.findOne({ where: { mobile } });
                if (user && (yield bcrypt.compare(password, user.password))) {
                    const token = this.generateToken(user);
                    return token;
                }
                else {
                    return null;
                }
            }
            catch (error) {
                console.error(error);
                return null;
            }
        });
    }
    generateToken(user) {
        const secretKey = "blalalalalala658998989";
        const userClaims = [
            { name: "Id", value: user.id },
            { name: "jti", value: jwt.sign({ id: user.id }, secretKey) },
        ];
        if (user.role) {
            userClaims.push({ name: "role", value: user.role });
        }
        const token = jwt.sign({ claims: userClaims }, secretKey, {
            expiresIn: "8h",
        });
        return token;
    }
}
exports.default = UserService;
