import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  createBooking,
  getMyBookings,
  cancelBooking,
} from "../controllers/booking.controller";

const router: Router = Router();

router.use(authMiddleware);

router.post("/", createBooking);
router.get("/me", getMyBookings);
router.patch("/:id/cancel", cancelBooking);

export default router;
