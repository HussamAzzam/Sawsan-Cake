// src/services/galleryService.js
import mongoose from "mongoose";
import GalleryImage from "../models/GalleryImage.js";
import AppError from "../utils/AppError.js";
import { deleteImage, uploadImage } from "./cloudinaryService.js";

export async function listImages(query) {
    const page = Math.max(Number.parseInt(query.page, 10) || 1, 1);
    const limit = Math.min(Math.max(Number.parseInt(query.limit, 10) || 24, 1), 100);
    const [images, total] = await Promise.all([
        GalleryImage.find().sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
        GalleryImage.countDocuments(),
    ]);
    return { images, page, pages: Math.ceil(total / limit), total };
}

export async function createImage(buffer) {
    const { url, publicId } = await uploadImage(buffer, "sawsan-cake/gallery");
    try {
        return await GalleryImage.create({ image: url, publicId });
    } catch (error) {
        await deleteImage(publicId).catch(() => {});
        throw error;
    }
}

export async function deleteImages(ids) {
    if (!Array.isArray(ids) || ids.length === 0) throw new AppError("Select at least one image", 400);
    if (ids.length > 100) throw new AppError("Too many images in one request", 400);
    if (!ids.every((id) => mongoose.isValidObjectId(id))) throw new AppError("Invalid image id", 400);

    const images = await GalleryImage.find({ _id: { $in: ids } });
    await GalleryImage.deleteMany({ _id: { $in: images.map((i) => i._id) } });
    await Promise.allSettled(images.map((i) => deleteImage(i.publicId)));
}
