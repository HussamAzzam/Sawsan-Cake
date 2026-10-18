// src/routes/galleryRoutes.js
import { Router } from "express";
import * as controller from "../controllers/galleryController.js";
import { requireAdmin, requireAuth } from "../middleware/auth.js";
import imageUpload from "../middleware/upload.js";

const router = Router();

router.get("/", controller.list);
router.post("/", requireAuth, requireAdmin, imageUpload.single("image"), controller.create);
router.delete("/", requireAuth, requireAdmin, controller.removeMany);

export default router;
