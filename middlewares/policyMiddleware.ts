// import { Request, Response, NextFunction } from "express";
// import { policies } from "../policies/policies";

// export const applyPolicy = (req: Request,res: Response,next: NextFunction) => {

//   const urlParts = req.url.split("/").filter((part) => part !== "");
//   const controllerName = urlParts[0] + "Controller";
//   const methodName = urlParts[1];

//   console.log(controllerName)
//   console.log(methodName)

//   // apply policies for specific methods in the specific Controller
//   if (policies[controllerName] && policies[controllerName][methodName]) {
//     console.log("apply policies for specific methods in the specific Controller");
//     const middlewareArray = policies[controllerName][methodName];

//     if (middlewareArray.length > 0) {
//       for (const middleware of middlewareArray) {
//         middleware(req, res, next);
//       }
//     } else {
//       next();
//     }
//     // apply policies for all methods in the same Controller
//   } else if (policies[controllerName] && policies[controllerName]["*"]) {
//     console.log("apply policies for controller name and *")
//     const middlewareArray = policies[controllerName]["*"];
//     if (middlewareArray.length > 0) {
//       for (const middleware of middlewareArray) {
//         middleware(req, res, next);
//       }
//     } else {
//       next();
//     }
//   }
//   // apply policies for all methods
//   else if (policies["*"] && policies["*"]["*"]) {
//     console.log("apply policies for all methods **")
//     const middlewareArray = policies["*"]["*"];
//     if (middlewareArray.length > 0) {
//       for (const middleware of middlewareArray) {
//         middleware(req, res, next);
//       }
//     } else {
//       next();
//     }
//   } else {
//     // no policies
//     console.log("no policies")
//     next();
//   }
// };

import { Request, Response, NextFunction } from "express";
import { policies } from "../policies/policies";

export const applyPolicy = async (req: Request, res: Response, next: NextFunction) => {
  const urlParts = req.url.split("/").filter((part) => part !== "");
  const controllerName = urlParts[0] + "Controller";
  const methodName = urlParts[1];

  console.log(controllerName);
  console.log(methodName);

  try {
    // apply policies for specific methods in the specific Controller
    if (policies[controllerName] && policies[controllerName][methodName]) {
      console.log("apply policies for specific methods in the specific Controller");
      const middlewareArray = policies[controllerName][methodName];

      if (middlewareArray.length > 0) {
        // Chain middlewares sequentially using async/await
        for (const middleware of middlewareArray) {
          await middleware(req, res, next);
        }
      } else {
        next();
      }
    }
    // apply policies for all methods in the same Controller
    else if (policies[controllerName] && policies[controllerName]["*"]) {
      console.log("apply policies for controller name and *");
      const middlewareArray = policies[controllerName]["*"];

      if (middlewareArray.length > 0) {
        // Chain middlewares sequentially using async/await
        for (const middleware of middlewareArray) {
          await middleware(req, res, next);
        }
      } else {
        next();
      }
    }
    // apply policies for all methods
    else if (policies["*"] && policies["*"]["*"]) {
      console.log("apply policies for all methods **");
      const middlewareArray = policies["*"]["*"];

      if (middlewareArray.length > 0) {
        // Chain middlewares sequentially using async/await
        for (const middleware of middlewareArray) {
          await middleware(req, res, next);
        }
      } else {
        next();
      }
    } else {
      // no policies
      console.log("no policies");
      next();
    }
  } catch (error) {
    // Handle any errors that occur during middleware execution
    next(error);
  }
};

