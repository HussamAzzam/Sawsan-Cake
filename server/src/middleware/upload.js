import multer from "multer";

const maxFileSize = (Number(process.env.MAX_IMAGE_SIZE_MB) || 5) * 1024 * 1024;

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: maxFileSize, files: 1 },
    fileFilter(req, file, callback) {
        if (!file.mimetype.startsWith("image/")) return callback(new Error("Only image files are allowed"));
        callback(null, true);
    },
});

export default upload;