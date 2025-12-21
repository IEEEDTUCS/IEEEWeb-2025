import express from "express";
import {
  signup,
  loginAndSendOTP,
  verifyOTP,
  checkSession,
  logout,
} from "../Controllers/authController.js";

const router = express.Router();

// Session check middleware - blocks if already authenticated
const requireNoAuth = (req, res, next) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return res.status(403).json({
      success: false,
      message: `Already logged in as ${req.user.username || req.user.email}. Please logout first.`,
      currentUser: {
        username: req.user.username,
        email: req.user.email,
        role: req.user.role,
      },
    });
  }
  next();
};

// Auth routes
router.post("/signup", requireNoAuth, signup);
router.post("/login", requireNoAuth, loginAndSendOTP);
router.post("/verify-otp", verifyOTP); // No auth check here - needed to complete login
router.get("/check-session", checkSession);
router.post("/logout", logout);

export default router;