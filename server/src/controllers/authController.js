import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";

const cookieOptions = () => ({
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.COOKIE_SAME_SITE || "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/",
});

export const googleCallback = (req, res) => {
    const token = jwt.sign({ sub: req.user.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    });
    res.cookie(process.env.COOKIE_NAME || "token", token, cookieOptions());
    res.redirect(process.env.CLIENT_URL);
};

export const getCurrentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});

export const logout = (req, res) => {
    res.clearCookie(process.env.COOKIE_NAME || "token", {
        ...cookieOptions(),
        maxAge: undefined,
    });
    res.status(204).end();
};