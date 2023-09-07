import { Request, Response, NextFunction } from "express";

type MiddlewareFunction = (req: Request,res: Response,next: NextFunction) => void;

export const checkUser: MiddlewareFunction = async (req: Request,res: Response,next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return ({isSucces: false, message: "Token not provided" });
    }
  } catch (error) {}
};

export const testMiddleware1: MiddlewareFunction = (req: Request,res: Response,next: NextFunction) => {
  console.log("Testing middleware1 .............");
};

export const testMiddleware2: MiddlewareFunction = (req: Request,res: Response,next: NextFunction) => {
  console.log("Testing middleware2 .............");
};
