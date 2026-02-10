import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

/** Shape of decoded JWT */
export interface JwtUserPayload {
  id: string;
  email?: string;
  role?: string;
}

/** Extend Express Request */
export interface AuthRequest extends Request {
  user?: JwtUserPayload;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;

    // Check header
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "Token missing" });
      return;
    }

    // Verify token
    const decoded = verifyToken(token) as JwtUserPayload;

    // Attach user
    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
