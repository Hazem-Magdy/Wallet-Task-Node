import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { actionModel,userActionsModel } from "../helpers/DataBaseConnection";

type MiddlewareFunction = (req: Request,res: Response,next: NextFunction) => void;

export const isAuthenticated: MiddlewareFunction = async (req: Request,res: Response,next: NextFunction) => {
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

    const userActions = await userActionsModel.findAll({
      where: {
        userId: userId,
      },
      include: [
        {
          model: actionModel,
          as: "userActions",
          attributes: ["name"],
        },
      ],
    });

    const actionNames = [];

    for (const userAction of userActions) {
      const actionName = userAction?.dataValues?.userActions?.name;
      if (actionName) {
        actionNames.push(actionName);
      }
    }

    req.userActions = actionNames;
  } catch (error) {
    console.log(error);
    return { isSuccess: false, message: error };
  }
};

export const isAuthorized: MiddlewareFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
  } else {
    // User is not authorized, deny access
    return {
      isSuccess: false,
      message: "Unauthorized: User does not have the required role.",
    };
  }
};

// Type guard to check if the decoded token matches JwtPayload
function isJwtPayload(token: any): token is JwtPayload {
  return (
    typeof token === "object" &&
    "claims" in token &&
    Array.isArray(token.claims)
  );
}
