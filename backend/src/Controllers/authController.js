import bcrypt from "bcrypt";
import { User } from "../models/users.js";
import { generateOTP, hashOTP } from "../utils/otp.js";
import { transporter } from "../config/mailer.js";

/* ================= CHECK SESSION ================= */
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
  } catch {
    return res.status(500).json({
      success: false,
      message: "Failed to check session",
    });
  }
};

/* ================= LOGOUT ================= */
export const logout = async (req, res) => {
  try {
    req.logout(() => {
      req.session.destroy(() => {
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

/* ================= SIGNUP ================= */
export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password)
      return res.status(400).json({
        success: false,
        message: "Username, email and password are required",
        otpRequired: false,
      });

    if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
        otpRequired: false,
      });

    if (username.length < 3)
      return res.status(400).json({
        success: false,
        message: "Username must be at least 3 characters",
        otpRequired: false,
      });

    if (await User.findOne({ email }))
      return res.status(409).json({
        success: false,
        message: "User with this email already exists",
        otpRequired: false,
      });

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOTP();

    await User.create({
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
      html: `
        <div style="background:#0b0f19;padding:40px;font-family:Arial,sans-serif;">
          <div style="max-width:520px;margin:auto;background:#111827;border-radius:14px;padding:32px;color:#fff;">
            <h1 style="margin:0;color:#38bdf8;text-align:center;">IEEE DTU</h1>
            <p style="text-align:center;color:#9ca3af;margin-top:6px;">
              Account Verification
            </p>

            <p style="font-size:16px;margin-top:24px;">
              Hi <strong>${username}</strong>,
            </p>

            <p style="color:#d1d5db;line-height:1.6;">
              Welcome to IEEE DTU! Please use the OTP below to verify your account.
            </p>

            <div style="text-align:center;margin:32px 0;">
              <span style="
                display:inline-block;
                padding:16px 32px;
                font-size:26px;
                letter-spacing:6px;
                color:#38bdf8;
                background:#020617;
                border-radius:10px;
                border:1px dashed #38bdf8;
                font-weight:bold;
              ">
                ${otp}
              </span>
            </div>

            <p style="color:#9ca3af;font-size:14px;">
              ⏳ This OTP is valid for <strong>5 minutes</strong>.
            </p>

            <p style="color:#9ca3af;font-size:14px;">
              If you didn’t request this, you can safely ignore this email.
            </p>

            <hr style="border:none;border-top:1px solid #1f2937;margin:28px 0;" />

            <p style="font-size:12px;color:#6b7280;text-align:center;">
              © ${new Date().getFullYear()} IEEE DTU • All Rights Reserved
            </p>
          </div>
        </div>
      `,
      text: `Your OTP is ${otp}. Valid for 5 minutes.`,
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

/* ================= LOGIN + SEND OTP ================= */
export const loginAndSendOTP = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
        otpRequired: false,
      });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({
        success: false,
        message: "User not found",
        otpRequired: false,
      });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({
        success: false,
        message: "Invalid password",
        otpRequired: false,
      });

    const otp = generateOTP();
    user.otp = hashOTP(otp);
    user.otpExpiry = Date.now() + 5 * 60 * 1000;
    await user.save();

    await transporter.sendMail({
      from: `"IEEE DTU" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your IEEE DTU Login OTP",
      html: `
        <div style="background:#0b0f19;padding:40px;font-family:Arial,sans-serif;">
          <div style="max-width:520px;margin:auto;background:#111827;border-radius:14px;padding:32px;color:#fff;">
            <h1 style="margin:0;color:#38bdf8;text-align:center;">IEEE DTU</h1>
            <p style="text-align:center;color:#9ca3af;">Secure Login</p>

            <p style="margin-top:24px;">Hi <strong>${user.username}</strong>,</p>

            <p style="color:#d1d5db;">
              Use the OTP below to securely log in to your account.
            </p>

            <div style="text-align:center;margin:32px 0;">
              <span style="
                display:inline-block;
                padding:16px 32px;
                font-size:26px;
                letter-spacing:6px;
                color:#38bdf8;
                background:#020617;
                border-radius:10px;
                border:1px dashed #38bdf8;
                font-weight:bold;
              ">
                ${otp}
              </span>
            </div>

            <p style="font-size:14px;color:#9ca3af;">
              ⏳ OTP valid for 5 minutes only.
            </p>

            <hr style="border:none;border-top:1px solid #1f2937;margin:28px 0;" />

            <p style="font-size:12px;color:#6b7280;text-align:center;">
              © ${new Date().getFullYear()} IEEE DTU
            </p>
          </div>
        </div>
      `,
      text: `Your OTP is ${otp}. Valid for 5 minutes.`,
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

/* ================= VERIFY OTP ================= */
export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp)
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
        otpRequired: true,
      });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({
        success: false,
        message: "User not found",
        otpRequired: false,
      });

    if (!user.otp || Date.now() > user.otpExpiry)
      return res.status(400).json({
        success: false,
        message: "OTP expired",
        otpRequired: true,
      });

    if (hashOTP(otp) !== user.otp)
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
        otpRequired: true,
      });

    user.otp = undefined;
    user.otpExpiry = undefined;
    user.isVerified = true;
    await user.save();

    req.login(user, () => {
      return res.json({
        success: true,
        message: "Authentication successful",
        otpRequired: false,
        user: {
          username: user.username,
          email: user.email,
          role: user.role,
          id: user._id,
        },
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
