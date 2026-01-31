import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        tutorProfile: true,
      },
    });
    res.json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }
};

export const getAllBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await prisma.booking.findMany({
      select: {
        id: true,
        studentId: true,
        tutorId: true,
      },
    });
    res.json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch bookings",
    });
  }
};

export const approveTutor = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    // Check if user exists and has a tutor profile
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { tutorProfile: true },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.tutorProfile) {
      return res.status(400).json({
        success: false,
        message: "User does not have a tutor profile",
      });
    }

    // Update user role to TUTOR
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role: "TUTOR" },
      include: { tutorProfile: true },
    });

    res.json({
      success: true,
      message: "Tutor approved successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to approve tutor",
    });
  }
};