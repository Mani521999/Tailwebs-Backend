// START OF FILE middleware/validate.middleware.ts
import { Request, Response, NextFunction } from "express";
import { AnySchema } from "yup";

export const validate = (schema: AnySchema) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schema.validate({
      body: req.body,
      query: req.query,
      params: req.params,
    }, { abortEarly: true }); // abortEarly: false collects all errors, not just the first one
    next();
  } catch (error: any) {
    console.log("validation error:", error)
    return res.status(400).json({ 
      message: error.errors[0], 
      errors: error.errors 
    });
  }
};