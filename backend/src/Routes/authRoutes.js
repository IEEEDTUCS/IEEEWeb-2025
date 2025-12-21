import express from "express";
import {
  signup,
  loginAndSendOTP,
  verifyOTP,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", loginAndSendOTP);
router.post("/verify-otp", verifyOTP);

export default router;

