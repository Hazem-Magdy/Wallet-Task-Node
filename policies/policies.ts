import {checkUser,testMiddleware1,testMiddleware2} from '../middlewares/authMiddleware';
import { Request, Response, NextFunction } from 'express';

type MiddlewareFunction = (req: Request, res: Response, next: NextFunction) => void;

type ControllerPolicies = {
  [method: string]: MiddlewareFunction[];
};

type Policies = {
  [controller: string]: ControllerPolicies;
};

const policies: Policies = {
  "*": {
    //"*": [checkUser],
  },
  WalletController: {
    //"*": [checkUser],
    //transfer: [checkUser,testMiddleware1,testMiddleware2],
  },
  AccountController:{
    //"*": [checkUser],
    //login:[checkUser,testMiddleware1],
    //register:[checkUser,testMiddleware1,testMiddleware2]
  }
};

export { policies };
