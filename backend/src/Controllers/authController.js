import bcrypt from "bcrypt";
import { User } from "../models/users.js";
import { generateOTP, hashOTP } from "../utils/otp.js";
import { transporter } from "../config/mailer.js";

/* ---------------- SIGNUP ---------------- */
export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
        otpRequired: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOTP();

    await User.create({
      email,
      password: hashedPassword,
      otp: hashOTP(otp),
      otpExpiry: Date.now() + 5 * 60 * 1000, 
      isVerified: false,
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "🔐 Verify your IEEE DTU account",
      text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
    });

    return res.status(201).json({
      success: true,
      message: "Signup successful. OTP sent to email.",
      otpRequired: true, 
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Signup failed",
      otpRequired: false,
    });
  }
};

/* ---------------- LOGIN ---------------- */
export const loginAndSendOTP = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        otpRequired: false,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
        otpRequired: false,
      });
    }

    const otp = generateOTP();

    user.otp = hashOTP(otp);
    user.otpExpiry = Date.now() + 5 * 60 * 1000;
    await user.save();

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "🔐 Your Login OTP",
      text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
    });

    return res.json({
      success: true,
      message: "OTP sent to email",
      otpRequired: true, 
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Login failed",
      otpRequired: false,
    });
  }
};

/* ---------------- VERIFY OTP ---------------- */
export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        otpRequired: false,
      });
    }

    if (!user.otp || Date.now() > user.otpExpiry) {
      return res.status(400).json({
        success: false,
        message: "OTP expired",
        otpRequired: true,
      });
    }

    if (hashOTP(otp) !== user.otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
        otpRequired: true,
      });
    }

    user.otp = undefined;
    user.otpExpiry = undefined;
    user.isVerified = true;
    await user.save();

    return res.json({
      success: true,
      message: "Authentication successful",
      role: user.role,
      otpRequired: false, 
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "OTP verification failed",
      otpRequired: true,
    });
  }
};
