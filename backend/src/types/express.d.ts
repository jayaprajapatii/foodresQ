import { UserRole } from "../generated/prisma/enums.js";

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: number;
        role: UserRole;
      };
    }
  }
}

export {};