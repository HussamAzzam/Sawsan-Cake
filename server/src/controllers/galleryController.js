// src/controllers/galleryController.js
import * as galleryService from "../services/galleryService.js";
import AppError from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";

export const list = asyncHandler(async (req, res) => res.json(await galleryService.listImages(req.query)));

export const create = asyncHandler(async (req, res) => {
    if (!req.file) throw new AppError("Choose an image to upload", 400);
    res.status(201).json(await galleryService.createImage(req.file.buffer));
});

export const removeMany = asyncHandler(async (req, res) => {
    await galleryService.deleteImages(req.body?.ids);
    res.status(204).end();
});
