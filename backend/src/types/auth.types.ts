import { UserRole } from "../generated/prisma/enums.js";

export interface RegisterUserInput {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: UserRole;
}