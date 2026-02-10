import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";

export const roleMiddleware = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    // Check user exists
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    // Check role
    if (!roles.includes(req.user.role || "")) {
      res.status(403).json({ message: "Forbidden" });
      return;
    }

    next();
  };
};
