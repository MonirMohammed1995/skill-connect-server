import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { signToken } from "../utils/jwt";

export const register = async (req: Request, res: Response) => {
  const { email, role } = req.body;

  const user = await prisma.user.create({
    data: { email, role },
  });

  const token = signToken({ id: user.id, role: user.role });
  res.json({ user, token });
};

export const login = async (req: Request, res: Response) => {
  const { email } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(404).json({ message: "User not found" });

  const token = signToken({ id: user.id, role: user.role });
  res.json({ user, token });
};
