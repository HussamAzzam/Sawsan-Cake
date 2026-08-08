import express from "express";
import { upload } from "../config/cloudinary.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// @route   POST /api/upload
// Send a multipart/form-data request with a field named "image"
router.post("/", protect, upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  // req.file.path is the Cloudinary secure URL, req.file.filename is the public_id
  res.json({
    url: req.file.path,
    publicId: req.file.filename,
  });
});

export default router;
