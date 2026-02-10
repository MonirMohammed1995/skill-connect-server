import { Response, Request } from "express";
import { prisma } from "../lib/prisma";
import { AuthRequest } from "../middlewares/auth.middleware";

// Create Review (Protected)
export const createReview = async (req: AuthRequest, res: Response) => {
  try {
    const review = await prisma.review.create({
      data: {
        ...req.body,
        userId: req.user?.id, // logged-in user
      },
    });

    res.json(review);
  } catch (error) {
    res.status(500).json({ message: "Review creation failed" });
  }
};

// Get Tutor Reviews (Public)
export const getTutorReviews = async (req: Request, res: Response) => {
  try {
    const { tutorProfileId } = req.params;

    const reviews = await prisma.review.findMany({
      where: {
        tutorId: tutorProfileId,
      },
      orderBy: { createdAt: "desc" },
    });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch reviews" });
  }
};
