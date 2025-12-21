import express from "express";
import { loginAndSendOTP, verifyOTP } from "../Controllers/authController.js";

const router = express.Router();

router.post("/login", loginAndSendOTP);
router.post("/verify-otp", verifyOTP);

export default router;
