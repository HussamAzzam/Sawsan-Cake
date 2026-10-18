import { randomBytes, timingSafeEqual } from "node:crypto";
import AppError from "../utils/AppError.js";

const cookieOptions = () => ({
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 10 * 60 * 1000,
    path: "/api/auth",
});

export function createOAuthState(req, res, next) {
    const state = randomBytes(32).toString("hex");
    res.cookie("oauth_state", state, cookieOptions());
    req.oauthState = state;
    next();
}

export function verifyOAuthState(req, res, next) {
    const cookieState = req.cookies.oauth_state || "";
    const queryState = req.query.state || "";
    res.clearCookie("oauth_state", { ...cookieOptions(), maxAge: undefined });
    const cookieBuffer = Buffer.from(cookieState);
    const queryBuffer = Buffer.from(queryState);
    if (!cookieBuffer.length || cookieBuffer.length !== queryBuffer.length || !timingSafeEqual(cookieBuffer, queryBuffer)) {
        return next(new AppError("Invalid OAuth state", 401));
    }
    next();
}