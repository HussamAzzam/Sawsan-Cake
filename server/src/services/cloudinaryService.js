import cloudinary from "../config/cloudinary.js";

export function uploadImage(buffer, folder = "sawsan-cake") {
    return new Promise((resolve, reject) => {
        const upload = cloudinary.uploader.upload_stream(
            { folder, resource_type: "image" },
            (error, result) => {
                if (error) return reject(error);
                resolve({ url: result.secure_url, publicId: result.public_id });
            }
        );
        upload.end(buffer);
    });
}

export function deleteImage(publicId) {
    return cloudinary.uploader.destroy(publicId, { resource_type: "image" });
}