import express from "express";
import passport from "passport";
import generateToken from "../utils/generateToken.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// @route   GET /api/auth/google
// Kicks off the Google OAuth flow
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// @route   GET /api/auth/google/callback
// Google redirects back here after the user approves
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.CLIENT_URL}/login`,
  }),
  (req, res) => {
    // req.user was set by the passport GoogleStrategy callback
    generateToken(res, req.user._id);
    res.redirect(process.env.CLIENT_URL);
  }
);

// @route   GET /api/auth/me
// Returns the logged-in user (reads the jwt cookie)
router.get("/me", protect, (req, res) => {
  res.json(req.user);
});

// @route   POST /api/auth/logout
router.post("/logout", (req, res) => {
  res.clearCookie("jwt");
  res.json({ message: "Logged out" });
});

export default router;
