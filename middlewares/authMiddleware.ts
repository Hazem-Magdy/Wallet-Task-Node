import { Request, Response, NextFunction } from "express";

type MiddlewareFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export const checkUser: MiddlewareFunction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization;
    console.log("checkUser middleware .............");
    if (!token) {
      console.log("checkUser middleware error.............");
      return res.status(401).json({ message: "Token not provided" });
    }
    console.log("checkUser middleware finish.............");
    next();
  } catch (error) {
  }
};
export const testMiddleware: MiddlewareFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Testing middleware .............");
  next();
};
