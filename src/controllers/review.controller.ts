import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const getTutorReviews = async (req: Request, res: Response) => {
  const { tutorProfileId } = req.params;
  const where = typeof tutorProfileId === 'string' ? { tutorId: tutorProfileId } : {};
  const reviews = await prisma.review.findMany({
    where,
  });
  res.json(reviews);
};