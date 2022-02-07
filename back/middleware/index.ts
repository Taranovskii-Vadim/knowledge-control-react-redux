import { NextFunction, Request, Response } from "express";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.headers;
  if (token) {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
};
