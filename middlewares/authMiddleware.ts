import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import { sequelize } from "../helpers/DataBaseConnection";

type MiddlewareFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export const isAuthenticated: MiddlewareFunction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorizationHeader = req.get("authorization");

    if (!authorizationHeader) {
      return { isSuccess: false, message: "Token not provided" };
    }

    const token = req.get("authorization")!.split(" ")[1];

    // decodedToken
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY as string);

    if (!isJwtPayload(decodedToken)) {
      return { isSuccess: false, message: "Invalid token" };
    }

    const userId = decodedToken.claims.find(
      (claim: { name: string; value: any }) => claim.name === "Id"
    ).value;

    const userRoles = await sequelize.query(
      `
      SELECT r.name
      FROM "UserRoles" ur
      INNER JOIN "Roles" r ON ur."roleId" = r.id
      WHERE ur."userId" = :userId
      `,
      {
        replacements: { userId },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    const roleNames = [];

    for (const userRole of userRoles) {
      roleNames.push(userRole.name);
    }

    req.userRoles = roleNames;
  } catch (error) {
    return { isSuccess: false, message: error };
  }
};

export const isAuthorized: (requiredRole: string) => MiddlewareFunction = (
  requiredRole
) => {
  return (req: Request, res: Response, next: NextFunction) => {
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
    } else {
      // User is not authorized, deny access
      return {
        isSuccess: false,
        message: "Unauthorized: User does not have the required role.",
      };
    }
  };
};

// Type guard to check if the decoded token matches JwtPayload
function isJwtPayload(token: any): token is JwtPayload {
  return (
    typeof token === "object" &&
    "claims" in token &&
    Array.isArray(token.claims)
  );
}
