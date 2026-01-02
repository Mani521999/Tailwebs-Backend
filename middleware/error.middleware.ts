import { Request, Response, NextFunction } from "express";

const errorMiddleware = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  
  console.error(`[Error] ${message}`);
  
  res.status(status).json({
    message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export default errorMiddleware;