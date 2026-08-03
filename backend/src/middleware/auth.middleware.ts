import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Authentication required",
    });
  }

  const token = authHeader.split(" ")[1];

  if (!env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured");
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as {
      userId: number;
      role: "RESTAURANT" | "NGO" | "VOLUNTEER" | "ADMIN";
    };

    req.user = {
      userId: decoded.userId,
      role: decoded.role,
    };

    next();
  } catch {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};