import express, { Application, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";

// Routes
import authRoutes from "./routes/auth.routes";
import tutorRoutes from "./routes/tutor.routes";
import bookingRoutes from "./routes/booking.routes";
import reviewRoutes from "./routes/review.routes";
import adminRoutes from "./routes/admin.routes";
import { errorMiddleware } from "./middlewares/error.middleware";

// Middlewares


const app: Application = express();

////////////////////
/// GLOBAL MIDDLEWARES
////////////////////
app.use(cors({
  origin: "http://localhost:3000", // Next.js frontend
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

////////////////////
/// HEALTH CHECK
////////////////////
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "SkillConnect API is running 🚀",
  });
});

////////////////////
/// API ROUTES
////////////////////
app.use("/api/auth", authRoutes);
app.use("/api/tutors", tutorRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/admin", adminRoutes);

////////////////////
/// 404 HANDLER
////////////////////
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
  });
});

////////////////////
/// GLOBAL ERROR HANDLER
////////////////////
app.use(errorMiddleware);

export default app;
