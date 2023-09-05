import { Request, Response, NextFunction } from "express";

function checkUser(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Token not provided" });
  }

  next();
}

export default checkUser;
