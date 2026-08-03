import { Request, Response } from "express";
import {
  registerUser,
  loginUser,
} from "../services/auth.service.js";

export const register = async (req: Request, res: Response) => {
  try {
    const result = await registerUser(req.body);

    if (!result.success) {
      return res.status(409).json(result);
    }

    res.status(201).json(result);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
};
export const login = async (req: Request, res: Response) => {
  try {
    const result = await loginUser(req.body);

    if (!result.success) {
      return res.status(401).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};