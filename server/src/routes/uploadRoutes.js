import { Router } from "express";
import { upload } from "../controllers/uploadController.js";
import { requireAdmin, requireAuth } from "../middleware/auth.js";
import imageUpload from "../middleware/upload.js";

const router = Router();

router.post("/", requireAuth, requireAdmin, imageUpload.single("image"), upload);

export default router;