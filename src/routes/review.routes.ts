import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  createReview,
  getTutorReviews,
} from "../controllers/review.controller";

const router: Router = Router();

router.use(authMiddleware);

router.post("/", createReview);
router.get("/tutor/:tutorProfileId", getTutorReviews);

export default router;
