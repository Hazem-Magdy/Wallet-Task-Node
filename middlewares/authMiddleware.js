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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const DataBaseConnection_1 = require("../helpers/DataBaseConnection");
const isAuthenticated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        const userRoles = yield DataBaseConnection_1.sequelize.query(`
      SELECT r.name
      FROM "UserRoles" ur
      INNER JOIN "Roles" r ON ur."roleId" = r.id
      WHERE ur."userId" = :userId
      `, {
            replacements: { userId },
            type: DataBaseConnection_1.sequelize.QueryTypes.SELECT,
        });
        const roleNames = [];
        for (const userRole of userRoles) {
            roleNames.push(userRole.name);
        }
        req.userRoles = roleNames;
    }
    catch (error) {
        return { isSuccess: false, message: error };
    }
});
exports.isAuthenticated = isAuthenticated;
const isAuthorized = (requiredRole) => {
    return (req, res, next) => {
        const userRoles = req.userRoles;
        if (!userRoles || userRoles.length === 0) {
            // User has no roles, deny access
            return {
                isSuccess: false,
                message: "Unauthorized: User has no roles.",
            };
        }
        if (userRoles.includes(requiredRole)) {
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
};
exports.isAuthorized = isAuthorized;
// Type guard to check if the decoded token matches JwtPayload
function isJwtPayload(token) {
    return (typeof token === "object" &&
        "claims" in token &&
        Array.isArray(token.claims));
}
//# sourceMappingURL=authMiddleware.js.map