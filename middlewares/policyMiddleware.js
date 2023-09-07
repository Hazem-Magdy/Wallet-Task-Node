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
exports.applyPolicy = void 0;
const policies_1 = require("../policies/policies");
const applyPolicy = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const urlParts = req.url.split("/").filter((part) => part !== "");
    const controllerName = urlParts[0] + "Controller";
    const methodName = urlParts[1];
    try {
        // apply policies for all methods
        if (policies_1.policies["*"] && policies_1.policies["*"]["*"]) {
            console.log("apply policies for all methods **");
            const middlewareArray = policies_1.policies["*"]["*"];
            if (middlewareArray.length > 0) {
                // Chain middlewares sequentially
                for (const middleware of middlewareArray) {
                    let result = yield middleware(req, res, next);
                    if (result && !result.isSucces) {
                        return res.status(400).send({ message: result.message });
                    }
                    else {
                        continue;
                    }
                }
            }
        }
        //check the other conditions
        if (policies_1.policies[controllerName] && policies_1.policies[controllerName][methodName]) {
            const middlewareArray = policies_1.policies[controllerName][methodName];
            if (middlewareArray.length > 0) {
                // Chain middlewares sequentially
                for (const middleware of middlewareArray) {
                    let result = yield middleware(req, res, next);
                    if (result && !result.isSucces) {
                        return res.status(400).send({ message: result.message });
                    }
                    else {
                        continue;
                    }
                }
                next();
            }
            else {
                next();
            }
        }
        else if (policies_1.policies[controllerName] && policies_1.policies[controllerName]["*"]) {
            const middlewareArray = policies_1.policies[controllerName]["*"];
            if (middlewareArray.length > 0) {
                // Chain middlewares sequentially
                for (const middleware of middlewareArray) {
                    let result = yield middleware(req, res, next);
                    if (result && !result.isSucces) {
                        return res.status(400).send({ message: result.message });
                    }
                    else {
                        continue;
                    }
                }
                next();
            }
            else {
                next();
            }
        }
        else {
            // no policies
            next();
        }
    }
    catch (error) {
        next(error);
    }
});
exports.applyPolicy = applyPolicy;
//# sourceMappingURL=policyMiddleware.js.map