import bcrypt from "bcrypt";
import { User } from "../models/users.js";
import { generateOTP, hashOTP } from "../utils/otp.js";
import { transporter } from "../config/mailer.js";

export const checkSession = async (req, res) => {
  try {
    if (req.isAuthenticated && req.isAuthenticated()) {
      return res.json({
        success: true,
        isAuthenticated: true,
        user: {
          username: req.user.username,
          email: req.user.email,
          role: req.user.role,
          id: req.user._id,
        },
      });
    }

    return res.json({
      success: true,
      isAuthenticated: false,
      user: null,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to check session",
    });
  }
};

export const logout = async (req, res) => {
  try {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Logout failed",
        });
      }

      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: "Failed to destroy session",
          });
        }

        res.clearCookie("connect.sid");
        return res.json({
          success: true,
          message: "Logged out successfully",
        });
      });
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Logout failed",
    });
  }
};

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Username, email and password are required",
        otpRequired: false,
      });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
        otpRequired: false,
      });
    }

    if (username.length < 3) {
      return res.status(400).json({
        success: false,
        message: "Username must be at least 3 characters",
        otpRequired: false,
      });
    }

    if (await User.findOne({ email })) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists",
        otpRequired: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOTP();

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      otp: hashOTP(otp),
      otpExpiry: Date.now() + 5 * 60 * 1000,
      isVerified: false,
    });

    await transporter.sendMail({
      from: `"IEEE DTU" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verify your IEEE DTU account",
      html: `<h2>Your OTP is ${otp}</h2><p>Valid for 5 minutes</p>`,
      text: `Your OTP is ${otp}`,
    });

    return res.status(201).json({
      success: true,
      message: "Signup successful. OTP sent to email.",
      otpRequired: true,
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Signup failed",
      otpRequired: false,
    });
  }
};

export const loginAndSendOTP = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
        otpRequired: false,
      });
    }

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
      from: `"IEEE DTU" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your Login OTP",
      html: `<h2>Your OTP is ${otp}</h2><p>Valid for 5 minutes</p>`,
      text: `Your OTP is ${otp}`,
    });

    return res.json({
      success: true,
      message: "OTP sent to email",
      otpRequired: true,
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Login failed",
      otpRequired: false,
    });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
        otpRequired: true,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        otpRequired: false,
      });
    }

    if (!user.otp || !user.otpExpiry || Date.now() > user.otpExpiry) {
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

    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Session creation failed",
        });
      }

      return res.json({
        success: true,
        message: "Authentication successful",
        user: {
          username: user.username,
          email: user.email,
          role: user.role,
          id: user._id,
        },
        otpRequired: false,
      });
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "OTP verification failed",
      otpRequired: true,
    });
  }
};
