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
exports.isAuthorized = exports.isAuthenticated = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const DataBaseConnection_1 = require("../helpers/DataBaseConnection");
const isAuthenticated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const authorizationHeader = req.get("authorization");
        if (!authorizationHeader) {
            return { isSuccess: false, message: "Token not provided" };
        }
        const token = req.get("authorization").split(" ")[1];
        // decodedToken
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
        if (!isJwtPayload(decodedToken)) {
            return { isSuccess: false, message: "Invalid token" };
        }
        const userId = decodedToken.claims.find((claim) => claim.name === "Id").value;
        const userActions = yield DataBaseConnection_1.userActionsModel.findAll({
            where: {
                userId: userId,
            },
            include: [
                {
                    model: DataBaseConnection_1.actionModel,
                    as: "userActions",
                    attributes: ["name"],
                },
            ],
        });
        const actionNames = [];
        for (const userAction of userActions) {
            const actionName = (_b = (_a = userAction === null || userAction === void 0 ? void 0 : userAction.dataValues) === null || _a === void 0 ? void 0 : _a.userActions) === null || _b === void 0 ? void 0 : _b.name;
            if (actionName) {
                actionNames.push(actionName);
            }
        }
        req.userActions = actionNames;
    }
    catch (error) {
        console.log(error);
        return { isSuccess: false, message: error };
    }
});
exports.isAuthenticated = isAuthenticated;
const isAuthorized = (req, res, next) => {
    const userActions = req.userActions;
    if (!userActions || userActions.length === 0) {
        // User has no roles, deny access
        return {
            isSuccess: false,
            message: "Unauthorized: User has no roles.",
        };
    }
    const urlParts = req.url.split("/").filter((part) => part !== "");
    const actionName = urlParts[1];
    if (userActions.includes(actionName)) {
        return;
    }
    else {
        // User is not authorized, deny access
        return {
            isSuccess: false,
            message: "Unauthorized: User does not have the required role.",
        };
    }
};
exports.isAuthorized = isAuthorized;
// Type guard to check if the decoded token matches JwtPayload
function isJwtPayload(token) {
    return (typeof token === "object" &&
        "claims" in token &&
        Array.isArray(token.claims));
}
//# sourceMappingURL=authMiddleware.js.map