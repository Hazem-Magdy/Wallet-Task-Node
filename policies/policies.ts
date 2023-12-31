import { isAuthenticated ,isAuthorized } from '../middlewares/authMiddleware';
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
    "*": [],
  },
  WalletController: {
    "*": [],
    transfer: [isAuthenticated,isAuthorized],
  },
  AdminController: {
    "*": [],
    "balance-report": [isAuthenticated,isAuthorized],
  },
  AccountController:{
    "*": [],
    login:[],
    register:[]
  }
};

export { policies };
