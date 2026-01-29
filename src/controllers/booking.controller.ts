import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const createBooking = async (req: Request, res: Response) => {
  const booking = await prisma.booking.create({
    data: req.body,
  });
  res.json(booking);
};
