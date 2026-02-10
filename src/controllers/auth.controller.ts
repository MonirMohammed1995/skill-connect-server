import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { signToken } from "../utils/jwt"

// Register
export const register = async (req: Request, res: Response) => {
  try {
    const { email, role } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // check existing user
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await prisma.user.create({
      data: { email, role },
    });

    const token = signToken({ id: user.id, role: user.role });

    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ message: "Registration failed" });
  }
};

// Login
export const login = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = signToken({ id: user.id, role: user.role });

    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
};
