import { Response } from "express";
import { prisma } from "../lib/prisma";
import { AuthRequest } from "../middlewares/auth.middleware";

// Create Booking
export const createBooking = async (req: AuthRequest, res: Response) => {
  try {
    const booking = await prisma.booking.create({
      data: {
        ...req.body,
        userId: req.user?.id,
      },
    });

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: "Booking creation failed" });
  }
};

// Get My Bookings
export const getMyBookings = async (req: AuthRequest, res: Response) => {
  try {
    const bookings = await prisma.booking.findMany({
      where: { userId: req.user?.id },
      orderBy: { createdAt: "desc" },
    });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};

// Cancel Booking
export const cancelBooking = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const booking = await prisma.booking.update({
      where: { id },
      data: { status: "CANCELLED" },
    });

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: "Cancel booking failed" });
  }
};
