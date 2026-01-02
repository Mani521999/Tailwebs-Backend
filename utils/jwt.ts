import jwt, { SignOptions } from "jsonwebtoken";

export const generateToken = (payload: object): string => {
  const JWT_SECRET = process.env.JWT_SECRET;
  
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  const options: SignOptions = {
    expiresIn: (process.env.JWT_EXPIRES_IN as any) || "1h"
  };

  return jwt.sign(payload, JWT_SECRET, options);
};