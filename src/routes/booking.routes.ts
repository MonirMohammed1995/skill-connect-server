import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  createBooking,
  getMyBookings,
  cancelBooking,
} from "../controllers/booking.controller";

const router: Router = Router();

router.post("/", authMiddleware, createBooking);
router.get("/me", authMiddleware, getMyBookings);
router.patch("/:id/cancel", authMiddleware, cancelBooking);

export default router;
