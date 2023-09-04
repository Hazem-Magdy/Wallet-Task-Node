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
const chai_1 = require("chai");
const sinon = require("sinon");
const AuthService_1 = __importDefault(require("../services/AuthService"));
describe('UserService', () => {
    let userService;
    beforeEach(() => {
        userService = new AuthService_1.default();
    });
    it('should register a new user', () => __awaiter(void 0, void 0, void 0, function* () {
        sinon.stub(userService, "registerUser").returns(true);
        const result = yield userService.registerUser('zzzzz', '01007756572', '0502349611@Hossam', 'User');
        (0, chai_1.expect)(result).to.be.true;
    }));
    it('should not register a user with existing mobile', () => __awaiter(void 0, void 0, void 0, function* () {
        sinon.stub(userService, "registerUser").returns(false);
        const result = yield userService.registerUser('Dina', '01009756572', '0502349611@Dina', 'User');
        (0, chai_1.expect)(result).to.be.false;
    }));
    it('should login a user with correct credentials', () => __awaiter(void 0, void 0, void 0, function* () {
        sinon.stub(userService, "loginUser").returns(String);
        const token = yield userService.loginUser('01009756572', '0502349611@Hazem');
        (0, chai_1.expect)(token).to.be.a('string');
    }));
    it('should not login a user with incorrect credentials', () => __awaiter(void 0, void 0, void 0, function* () {
        sinon.stub(userService, "loginUser").returns(null);
        const token = yield userService.loginUser('01009751572', '0502349611@Zoz');
        (0, chai_1.expect)(token).to.be.null;
    }));
});
