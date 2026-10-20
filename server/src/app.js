import "./config/cloudinary.js";
import "./config/passport.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";

import { errorHandler, notFound } from "./middleware/errorHandler.js";
import passport from "./config/passport.js";

const app = express();

app.disable("x-powered-by");
app.use(helmet());
app.use(cors({ 
  origin: process.env.CLIENT_URL, 
  credentials: true 
}));
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());
app.use(passport.initialize());
app.set("trust proxy", 1);

app.get("/api/health", (req, res) => res.json({ status: "ok" }));
app.use("/api/auth/google", rateLimit({ windowMs: 15 * 60 * 1000, limit: 30 }))
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/gallery", galleryRoutes);
app.use(notFound);
app.use(errorHandler);

export default app;
