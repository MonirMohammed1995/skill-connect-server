import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

//////////////////////////////
// CREATE TUTOR PROFILE
//////////////////////////////
export const createTutorProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const { bio, hourlyRate, experience, categories } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!bio || !hourlyRate || !experience) {
      return res.status(400).json({
        message: "Bio, hourlyRate and experience are required",
      });
    }

    // prevent duplicate profile
    const existingProfile = await prisma.tutorProfile.findUnique({
      where: { userId },
    });

    if (existingProfile) {
      return res.status(409).json({
        message: "Tutor profile already exists",
      });
    }

    const createData = {
      userId,
      bio,
      hourlyRate: Number(hourlyRate),
      experience: Number(experience),
      ...(categories?.length && {
        categories: {
          connect: categories.map((id: string) => ({ id })),
        },
      }),
    };

    const tutorProfile = await prisma.tutorProfile.create({
      data: createData,
    });

    return res.status(201).json({
      success: true,
      data: tutorProfile,
    });
  } catch (error) {
    console.error("Create Tutor Error:", error);
    return res.status(500).json({
      message: "Failed to create tutor profile",
    });
  }
};

//////////////////////////////
// GET ALL TUTORS (PUBLIC)
//////////////////////////////
export const getAllTutors = async (_req: Request, res: Response) => {
  try {
    const tutors = await prisma.tutorProfile.findMany({
      include: {
        categories: true,
        availability: true,
      },
    });

    return res.status(200).json({
      success: true,
      data: tutors,
    });
  } catch (error) {
    console.error("Fetch Tutors Error:", error);
    return res.status(500).json({
      message: "Failed to fetch tutors",
    });
  }
};

//////////////////////////////
// GET SINGLE TUTOR BY ID
//////////////////////////////
export const getTutorById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || typeof id !== "string") {
      return res.status(400).json({
        message: "Invalid tutor ID",
      });
    }

    const tutor = await prisma.tutorProfile.findUnique({
      where: { id },
      include: {
        categories: true,
        availability: true,
      },
    });

    if (!tutor) {
      return res.status(404).json({
        message: "Tutor not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: tutor,
    });
  } catch (error) {
    console.error("Fetch Tutor Error:", error);
    return res.status(500).json({
      message: "Failed to fetch tutor",
    });
  }
};
