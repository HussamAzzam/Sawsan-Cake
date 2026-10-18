import { Router } from "express";
import passport from "../config/passport.js";
import { getCurrentUser, googleCallback, logout } from "../controllers/authController.js";
import { requireAuth } from "../middleware/auth.js";
import { createOAuthState, verifyOAuthState } from "../middleware/oauthState.js";
import asyncHandler from "../utils/asyncHandler.js";

const router = Router();

router.get("/google", createOAuthState, (req, res, next) => {
    passport.authenticate("google", {
        scope: ["profile", "email"],
        session: false,
        state: req.oauthState,
    })(req, res, next);
});
router.get("/google/callback", verifyOAuthState, (req, res, next) => {
    passport.authenticate("google", { session: false }, (error, user) => {
        if (error) return next(error);
        if (!user) return next(new Error("Google authentication failed"));
        req.user = user;
        return googleCallback(req, res);
    })(req, res, next);
});
router.get("/me", requireAuth, asyncHandler(getCurrentUser));
router.post("/logout", logout);

export default router;