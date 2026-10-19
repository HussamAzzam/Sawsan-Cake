import jwt from "jsonwebtoken";
import User from "../models/User.js";
import AppError from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";

export const requireAuth = asyncHandler(async (req, res, next) => {
    const token = req.cookies[process.env.COOKIE_NAME || "token"];
    if (!token) throw new AppError("Authentication required", 401);

    let payload;
    try {
        payload = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
        throw new AppError("Authentication required", 401);
    }
    const user = await User.findById(payload.sub).select("googleId email name avatar role");
    if (!user) throw new AppError("Authentication required", 401);
    req.user = user;
    next();
});

export function requireAdmin(req, res, next) {
    if (req.user?.role !== "admin") return next(new AppError("Administrator access required", 403));
    next();
}

export const optionalAuth = asyncHandler(async (req, res, next) => {
    const token = req.cookies[process.env.COOKIE_NAME || "token"];
    if (!token) return next();

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(payload.sub).select("googleId email name avatar role");
        if (user) req.user = user;
    } catch {
        // invalid or expired token: treat as logged out
    }
    next();
});
