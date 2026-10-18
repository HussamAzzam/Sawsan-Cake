// src/models/GalleryImage.js
import mongoose from "mongoose";

const galleryImageSchema = new mongoose.Schema(
    {
        image: { type: String, required: true },
        publicId: { type: String, required: true },
    },
    { timestamps: true }
);

galleryImageSchema.index({ createdAt: -1 });

export default mongoose.model("GalleryImage", galleryImageSchema);
