import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const createReview = async (req: Request, res: Response) => {
  const review = await prisma.review.create({
    data: req.body,
  });
  res.json(review);
};
