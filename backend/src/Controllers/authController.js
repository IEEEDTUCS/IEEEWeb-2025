import bcrypt from "bcrypt";
import { User } from "../models/users.js";
import { generateOTP, hashOTP } from "../utils/otp.js";
import { transporter } from "../config/mailer.js";

/* ---------------- CHECK SESSION ---------------- */
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
      error: err.message,
    });
  }
};

/* ---------------- LOGOUT ---------------- */
export const logout = async (req, res) => {
  try {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Logout failed",
          error: err.message,
        });
      }

      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: "Failed to destroy session",
            error: err.message,
          });
        }

        res.clearCookie("connect.sid");
        return res.json({
          success: true,
          message: "Logged out successfully",
        });
      });
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Logout failed",
      error: err.message,
    });
  }
};

/* ---------------- SIGNUP ---------------- */
export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Username, email and password are required",
        otpRequired: false,
      });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
        otpRequired: false,
      });
    }

    // Username length validation
    if (username.length < 3) {
      return res.status(400).json({
        success: false,
        message: "Username must be at least 3 characters",
        otpRequired: false,
      });
    }

    // Check if user exists with email
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists",
        otpRequired: false,
      });
    }

    // Check if user exists with username
    const existingUserByUsername = await User.findOne({ username });
    if (existingUserByUsername) {
      return res.status(409).json({
        success: false,
        message: "Username already taken. Please choose another.",
        otpRequired: false,
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOTP();

    // Create user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      otp: hashOTP(otp),
      otpExpiry: Date.now() + 5 * 60 * 1000, // 5 minutes
      isVerified: false,
    });

    console.log(`📝 New user created: ${username} (${email})`);

    // Send OTP email
    try {
      await transporter.sendMail({
        from: `"IEEE DTU" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "🔐 Verify your IEEE DTU account",
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1976d2;">Welcome to IEEE DTU, ${username}!</h2>
            <p>Your OTP for account verification is:</p>
            <div style="background: #f5f5f5; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0;">
              <h1 style="color: #1976d2; letter-spacing: 10px; margin: 0; font-size: 36px;">${otp}</h1>
            </div>
            <p>This OTP is valid for <strong>5 minutes</strong>.</p>
            <p style="color: #666; font-size: 14px;">If you didn't request this, please ignore this email.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
            <p style="color: #999; font-size: 12px;">IEEE DTU - Delhi Technological University</p>
          </div>
        `,
        text: `Welcome ${username}! Your OTP is ${otp}. It is valid for 5 minutes.`,
      });

      console.log(`✅ Signup OTP sent successfully to ${email}`);
    } catch (emailError) {
      console.error("❌ Email sending failed:", emailError);

      // Delete the user if email fails
      await User.deleteOne({ email });

      return res.status(500).json({
        success: false,
        message: "Failed to send OTP email. Please check email configuration.",
        error: process.env.NODE_ENV === "development" ? emailError.message : undefined,
        otpRequired: false,
      });
    }

    return res.status(201).json({
      success: true,
      message: "Signup successful. OTP sent to email.",
      otpRequired: true,
    });
  } catch (err) {
    console.error("❌ Signup error:", err);
    return res.status(500).json({
      success: false,
      message: "Signup failed",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
      otpRequired: false,
    });
  }
};

/* ---------------- LOGIN ---------------- */
export const loginAndSendOTP = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
        otpRequired: false,
      });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        otpRequired: false,
      });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
        otpRequired: false,
      });
    }

    // Generate OTP
    const otp = generateOTP();

    user.otp = hashOTP(otp);
    user.otpExpiry = Date.now() + 5 * 60 * 1000;
    await user.save();

    console.log(`🔐 Login OTP generated for: ${user.username} (${email})`);

    // Send OTP email
    try {
      await transporter.sendMail({
        from: `"IEEE DTU" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "🔐 Your Login OTP",
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1976d2;">Welcome back, ${user.username}!</h2>
            <p>Your OTP for login is:</p>
            <div style="background: #f5f5f5; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0;">
              <h1 style="color: #1976d2; letter-spacing: 10px; margin: 0; font-size: 36px;">${otp}</h1>
            </div>
            <p>This OTP is valid for <strong>5 minutes</strong>.</p>
            <p style="color: #ff6b6b; font-size: 14px;"><strong>Security Alert:</strong> If you didn't request this, please secure your account immediately.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
            <p style="color: #999; font-size: 12px;">IEEE DTU - Delhi Technological University</p>
          </div>
        `,
        text: `Welcome back ${user.username}! Your OTP is ${otp}. It is valid for 5 minutes.`,
      });

      console.log(`✅ Login OTP sent successfully to ${email}`);
    } catch (emailError) {
      console.error("❌ Email sending failed:", emailError);

      return res.status(500).json({
        success: false,
        message: "Failed to send OTP email. Please try again later.",
        error: process.env.NODE_ENV === "development" ? emailError.message : undefined,
        otpRequired: false,
      });
    }

    return res.json({
      success: true,
      message: "OTP sent to email",
      otpRequired: true,
    });
  } catch (err) {
    console.error("❌ Login error:", err);
    return res.status(500).json({
      success: false,
      message: "Login failed",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
      otpRequired: false,
    });
  }
};

/* ---------------- VERIFY OTP ---------------- */
export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Validation
    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
        otpRequired: true,
      });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        otpRequired: false,
      });
    }

    // Check if OTP exists and is not expired
    if (!user.otp || !user.otpExpiry) {
      return res.status(400).json({
        success: false,
        message: "No OTP found. Please request a new one.",
        otpRequired: true,
      });
    }

    if (Date.now() > user.otpExpiry) {
      return res.status(400).json({
        success: false,
        message: "OTP expired",
        otpRequired: true,
      });
    }

    // Verify OTP
    if (hashOTP(otp) !== user.otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
        otpRequired: true,
      });
    }

    // Clear OTP and mark as verified
    user.otp = undefined;
    user.otpExpiry = undefined;
    user.isVerified = true;
    await user.save();

    // Create session using Passport's login method
    req.login(user, (err) => {
      if (err) {
        console.error("❌ Session creation failed:", err);
        return res.status(500).json({
          success: false,
          message: "Authentication successful but session creation failed",
          error: process.env.NODE_ENV === "development" ? err.message : undefined,
        });
      }

      console.log(`✅ User verified and logged in: ${user.username} (${email})`);

      return res.json({
        success: true,
        message: "Authentication successful",
        role: user.role,
        user: {
          username: user.username,
          email: user.email,
          role: user.role,
          id: user._id,
        },
        otpRequired: false,
      });
    });
  } catch (err) {
    console.error("❌ OTP verification error:", err);
    return res.status(500).json({
      success: false,
      message: "OTP verification failed",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
      otpRequired: true,
    });
  }
};