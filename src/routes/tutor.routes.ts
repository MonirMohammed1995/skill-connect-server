import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";
import {
  createTutorProfile,
  getAllTutors,
  getTutorById,
} from "../controllers/tutor.controller";

const router: Router = Router();

router.get("/", getAllTutors);
router.get("/:id", getTutorById);

router.post(
  "/profile",
  authMiddleware,
  roleMiddleware("TUTOR"),
  createTutorProfile
);

// router.patch(
//   "/profile",
//   authMiddleware,
//   roleMiddleware("TUTOR"),
//   updateTutorProfile
// );

export default router;
