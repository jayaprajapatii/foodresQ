import prisma from "../config/prisma.js";
import bcrypt from "bcrypt";
import {
  RegisterUserInput,
  LoginInput,
} from "../types/auth.types.js";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export const registerUser = async (data: RegisterUserInput) => {

  const existingUser = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (existingUser) {
    return {
      success: false, 
      message: "Email already registered",
    };
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      phone: data.phone,
      role: data.role,
    },
  });

  return {
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      createdAt: user.createdAt,
    },

  };
}

export const loginUser = async (data: LoginInput) => {
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!user) {
    return {
      success: false,
      message: "Invalid email or password",
    };
  }

  const isPasswordValid = await bcrypt.compare(
    data.password,
    user.password
  );

  if (!isPasswordValid) {
    return {
      success: false,
      message: "Invalid email or password",
    };
  }
  if (!env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured");
  }

  const token = jwt.sign(
    {
     userId: user.id,
     role: user.role,
    },
    env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  return {
    success: true,
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    },
  };
};