import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const getTutors = async (_: Request, res: Response) => {
  const tutors = await prisma.tutorProfile.findMany({
    include: { user: true },
  });
  res.json(tutors);
};
