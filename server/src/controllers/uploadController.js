import { uploadImage } from "../services/cloudinaryService.js";
import AppError from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";

export const upload = asyncHandler(async (req, res) => {
    if (!req.file) throw new AppError("Choose an image to upload", 400);
    res.status(201).json(await uploadImage(req.file.buffer));
});