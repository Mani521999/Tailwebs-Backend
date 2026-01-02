import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User";
import { generateToken } from "../utils/jwt";

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken({ id: user._id, role: user.role });
    // Return extra user info for Frontend Context
    res.json({ token, role: user.role, name: user.name, email: user.email });
  } catch (error) {
    next(error);
  }
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password, role } = req.body; // <--- Added name

    if (!email || !password || !role || !name) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!["teacher", "student"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name, // <--- Save name
      email,
      password: hashedPassword,
      role
    });

    const token = generateToken({ id: user._id, role: user.role });

    res.status(201).json({
      message: "User registered successfully",
      token,
      role: user.role,
      name: user.name,
      email: user.email
    });
  } catch (error) {
    next(error);
  }
};