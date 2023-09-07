import { Request, Response, NextFunction } from "express";
import { policies } from "../policies/policies";

export const applyPolicy = async (req: Request,res: Response,next: NextFunction) => {
  const urlParts = req.url.split("/").filter((part) => part !== "");
  const controllerName = urlParts[0] + "Controller";
  const methodName = urlParts[1];
  
  try {
    // apply policies for all methods
    if (policies["*"] && policies["*"]["*"]) {
      console.log("apply policies for all methods **");
      const middlewareArray = policies["*"]["*"];

      if (middlewareArray.length > 0) {
        // Chain middlewares sequentially
        for (const middleware of middlewareArray) {
          let result: any = await middleware(req, res, next);
          if (result && !result.isSucces) {
            return res.status(400).send({ message: result.message });
          } else {
            continue;
          }
        }
      }
    }

    //check the other conditions
    if (policies[controllerName] && policies[controllerName][methodName]) {
      const middlewareArray = policies[controllerName][methodName];
      if (middlewareArray.length > 0) {
        // Chain middlewares sequentially
        for (const middleware of middlewareArray) {
          let result: any = await middleware(req, res, next);
          if (result && !result.isSucces) {
            return res.status(400).send({ message: result.message });
          } else {
            continue;
          }
        }
        next();
      } else {
        next();
      }
    } else if (policies[controllerName] && policies[controllerName]["*"]) {
      const middlewareArray = policies[controllerName]["*"];
      if (middlewareArray.length > 0) {
        // Chain middlewares sequentially
        for (const middleware of middlewareArray) {
          let result: any = await middleware(req, res, next);
          if (result && !result.isSucces) {
            return res.status(400).send({ message: result.message });
          } else {
            continue;
          }
        }
        next();
      } else {
        next();
      }
    } else {
      // no policies
      next();
    }
  } catch (error) {
    next(error);
  }
};
