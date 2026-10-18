export function notFound(req, res, next) {
    res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
}

export function errorHandler(error, req, res, next) {
    let statusCode = error.statusCode || error.status || 500;
    let message = error.message || "Internal server error";

    if (error.code === 11000) {
        statusCode = 409;
        message = "A record with this value already exists";
    } else if (error.name === "ValidationError" || error.name === "CastError") {
        statusCode = 400;
    } else if (error.name === "MulterError") {
        statusCode = error.code === "LIMIT_FILE_SIZE" ? 413 : 400;
        message = error.code === "LIMIT_FILE_SIZE" ? "Image exceeds the upload size limit" : error.message;
    } else if (error.message === "Only image files are allowed") {
        statusCode = 400;
    }

    if (statusCode >= 500) console.error(error);
    res.status(statusCode).json({ message: statusCode >= 500 && process.env.NODE_ENV === "production" ? "Internal server error" : message });
}