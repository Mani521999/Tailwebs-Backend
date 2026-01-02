// START OF FILE utils/validators.ts
import * as yup from "yup";

export const registerSchema = yup.object({
  body: yup.object({
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    role: yup.string().oneOf(["teacher", "student"], "Role must be either teacher or student").required("Role is required"),
  }),
});

export const loginSchema = yup.object({
  body: yup.object({
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup.string().required("Password is required"),
  }),
});

export const assignmentSchema = yup.object({
  body: yup.object({
    title: yup.string().min(3, "Title too short").required("Title is required"),
    description: yup.string().required("Description is required"),
    dueDate: yup.date().typeError("Invalid date format").required("Due date is required"),
  }),
});

export const submissionSchema = yup.object({
  body: yup.object({
    assignmentId: yup.string().matches(/^[0-9a-fA-F]{24}$/, "Invalid assignment ID format").required(),
    answer: yup.string().min(10, "Answer must be at least 10 characters").required(),
  }),
});