import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";
import {
  getAllUsers,
  getAllBookings,
  approveTutor,
} from "../controllers/admin.controller";

const router: Router = Router();

router.use(authMiddleware, roleMiddleware("ADMIN"));

router.get("/users", getAllUsers);
router.get("/bookings", getAllBookings);
router.patch("/tutor/:userId/approve", approveTutor);

export default router;
